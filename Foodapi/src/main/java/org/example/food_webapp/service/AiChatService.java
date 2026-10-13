package org.example.food_webapp.service;

import org.example.food_webapp.entity.FoodEntity;
import org.example.food_webapp.dto.AiChatResponse;
import org.example.food_webapp.repo.FoodRepo;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.nio.charset.StandardCharsets;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AiChatService {

    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    private final FoodRepo foodRepo;
    private final String apiKey;

    public AiChatService(
            ChatClient.Builder chatClientBuilder,
            VectorStore vectorStore,
            FoodRepo foodRepo,
            @Value("${spring.ai.openai.api-key:}") String apiKey) {
        this.chatClient = chatClientBuilder.build();
        this.vectorStore = vectorStore;
        this.foodRepo = foodRepo;
        this.apiKey = apiKey;
    }

    public AiChatResponse ask(String message) {
        ensureConfigured();
        final List<Document> matches;
        try {
            matches = vectorStore.similaritySearch(
                    SearchRequest.builder().query(message).topK(5).build());
        } catch (RuntimeException exception) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Ask AI could not read the menu index. Restart the backend to rebuild the local menu index.",
                    exception);
        }

        String context = matches.isEmpty()
                ? "No matching FoodCode catalog information was found."
                : matches.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n"));

        final String answer;
        try {
            answer = chatClient.prompt()
                    .system("""
                            You are FoodCode's helpful food ordering assistant.
                            Answer using the supplied FoodCode catalog context when relevant.
                            Never invent prices, availability, ingredients, or order status.
                            If the context does not answer the question, say that you do not
                            have that information and suggest browsing the menu or contacting support.
                            Keep answers concise and friendly.
                            """)
                    .user("""
                            Catalog context:
                            %s

                            Customer question:
                            %s
                            """.formatted(context, message))
                    .call()
                    .content();
        } catch (RuntimeException exception) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Groq could not answer the request. Check that GROQ_API_KEY is valid and restart the backend.",
                    exception);
        }

        return new AiChatResponse(answer == null || answer.isBlank()
                ? "I could not generate an answer right now. Please try again."
                : answer);
    }

    public int reindexCatalog() {
        if (apiKey.isBlank()) {
            return 0;
        }
        List<Document> documents = foodRepo.findAll().stream()
                .map(this::toDocument)
                .toList();
        if (!documents.isEmpty()) {
            vectorStore.add(documents);
        }
        return documents.size();
    }

    private Document toDocument(FoodEntity food) {
        String text = """
                Food item: %s
                Category: %s
                Description: %s
                Price: INR %.2f
                """.formatted(
                food.getName(),
                food.getCategory(),
                food.getDescription(),
                food.getPrice());
        String documentId = UUID.nameUUIDFromBytes(
                ("food-" + food.getId()).getBytes(StandardCharsets.UTF_8)).toString();
        return new Document(documentId, text, java.util.Map.of(
                "foodId", food.getId(),
                "category", food.getCategory() == null ? "" : food.getCategory()));
    }

    private void ensureConfigured() {
        if (apiKey.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "Ask AI is not configured. Set GROQ_API_KEY before starting the API.");
        }
    }
}
