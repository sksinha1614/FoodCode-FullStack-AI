package org.example.food_webapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="carts")
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    @ElementCollection
    @CollectionTable(
            name = "cart-items",
            joinColumns =@JoinColumn(name="cart_id")
    )
    @MapKeyColumn(name = "item_name")
    @Column(name = "quantity")
    private Map<String,Integer> items=new HashMap<>();
}
