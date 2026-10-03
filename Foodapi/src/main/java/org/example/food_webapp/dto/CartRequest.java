package org.example.food_webapp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Builder
@Data
@AllArgsConstructor
public class CartRequest {

    private Long foodId;
}
