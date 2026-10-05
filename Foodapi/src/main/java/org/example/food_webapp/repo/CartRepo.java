package org.example.food_webapp.repo;

import org.example.food_webapp.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<CartEntity,Long> {

    Optional<CartEntity> findByUserId(Long userId);

    void deleteByUserId(Long userId);
    }

