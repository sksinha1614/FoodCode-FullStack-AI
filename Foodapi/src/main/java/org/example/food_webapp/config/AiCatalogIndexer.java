package org.example.food_webapp.config;

import org.example.food_webapp.service.AiChatService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@ConditionalOnBean(AiChatService.class)
public class AiCatalogIndexer {

    private static final Logger logger = LoggerFactory.getLogger(AiCatalogIndexer.class);
    private final AiChatService aiChatService;

    public AiCatalogIndexer(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void indexCatalog() {
        try {
            aiChatService.reindexCatalog();
        } catch (RuntimeException exception) {
            logger.error("FoodCode AI catalog indexing failed; the API will remain available.", exception);
        }
    }
}
