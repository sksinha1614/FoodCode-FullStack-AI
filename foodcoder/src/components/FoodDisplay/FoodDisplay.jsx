import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, searchText }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoods = foodList.filter(food => (
    (category === 'All' || food.category === category) &&
    food.name.toLowerCase().includes(searchText.toLowerCase())
  ));

  return (
    <div className="container py-3">
      <div className="row g-3">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem
              key={food.id || index}
              name={food.name}
              description={food.description}
              id={food.id}
              imageUrl={food.imageUrl}
              price={food.price}
            />
          ))
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-emoji-frown" style={{ fontSize: '2.5rem', color: '#ccc' }}></i>
            <h4 className="mt-3 text-muted">No food found</h4>
            <p className="text-muted small">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;