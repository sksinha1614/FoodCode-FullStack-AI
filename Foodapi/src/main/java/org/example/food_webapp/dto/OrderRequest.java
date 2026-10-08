package org.example.food_webapp.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.food_webapp.model.OrderItem;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    List<OrderItem> orderedItems;
    private  String email;
    private double amount;
    private  String phoneNumber;
    private  String userAddress;
    private  String orderStatus;
}
