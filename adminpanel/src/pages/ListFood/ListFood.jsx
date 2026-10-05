import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { deleteFood, getFoodList } from '../../services/foodService';

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error('Error while reading the foods.');
    }
  }

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success('Food removed.');
        await fetchList();
      } else {
        toast.error('Error occurred while removing the food.');
      }
    } catch (error) {
      toast.error('Error occurred while removing the food.');
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-food">
      <div className="list-food__card">
        <div className="list-food__head">
          <h2>Menu</h2>
          <p>{list.length} {list.length === 1 ? 'dish' : 'dishes'} live on the menu</p>
        </div>

        {list.length === 0 ? (
          <div className="list-food__empty">
            No dishes yet. Add one to see it here.
          </div>
        ) : (
          <table className="list-food__table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className="list-food__thumb" src={item.imageUrl} alt={item.name} />
                  </td>
                  <td className="list-food__name">{item.name}</td>
                  <td>
                    <span className="list-food__tag">{item.category}</span>
                  </td>
                  <td className="list-food__price">₹{item.price}.00</td>
                  <td>
                    <button
                      type="button"
                      className="list-food__remove"
                      onClick={() => removeFood(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10zM10 11v6M14 11v6"
                          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ListFood;