import React, { useState } from 'react';
import { addFood } from '../../services/foodService';
import { toast } from 'react-toastify';
import './AddFood.css';

const categories = ['Biryani', 'Cake', 'Burger', 'Pizza', 'Rolls', 'Salad', 'Ice Cream'];

const AddFood = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Biryani'
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!image) {
            toast.error('Please select a photo for the dish.');
            return;
        }
        try {
            await addFood(data, image);
            toast.success('Dish added to the menu.');
            setData({ name: '', description: '', category: 'Biryani', price: '' });
            setImage(null);
        } catch (error) {
            toast.error('Could not add the dish. Try again.');
        }
    }

    return (
        <div className="add-food">
            <div className="add-food__card">
                <div className="add-food__head">
                    <h2>Add a dish</h2>
                    <p>This is what customers will see on the menu.</p>
                </div>

                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="image" className="add-food__upload">
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="Dish preview" />
                        ) : (
                            <span className="add-food__upload-icon">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 16.5V18a2 2 0 002 2h12a2 2 0 002-2v-1.5M12 15V4M12 4L7 9M12 4l5 5"
                                        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        )}
                        <span className="add-food__upload-label">
                            {image ? 'Change photo' : 'Add photo'}
                        </span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <div className="add-food__field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Chicken Biryani"
                            required
                            value={data.name}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="add-food__field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Describe the dish, ingredients, spice level..."
                            required
                            value={data.description}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="add-food__row">
                        <div className="add-food__field">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={data.category}
                                onChange={onChangeHandler}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="add-food__field">
                            <label htmlFor="price">Price</label>
                            <div className="add-food__price">
                                <span>₹</span>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    placeholder="200"
                                    required
                                    value={data.price}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="add-food__save">Save dish</button>
                </form>
            </div>
        </div>
    )
}

export default AddFood;