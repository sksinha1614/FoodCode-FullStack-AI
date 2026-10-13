package org.example.food_webapp.config;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.transformers.TransformersEmbeddingModel;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AiEmbeddingConfig {

    @Bean
    @Primary
    public EmbeddingModel embeddingModel() throws Exception {
        TransformersEmbeddingModel embeddingModel = new TransformersEmbeddingModel();
        embeddingModel.setResourceCacheDirectory(
                System.getProperty("user.home") + "/.foodcode/onnx-model");
        embeddingModel.afterPropertiesSet();
        return embeddingModel;
    }
}
