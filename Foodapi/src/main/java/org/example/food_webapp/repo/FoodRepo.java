package org.example.food_webapp.repo;

import org.example.food_webapp.entity.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepo extends JpaRepository<FoodEntity,Long> {
}
