import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFoodDetails } from '../../service/foodService'
import { toast } from 'react-toastify'
import './FoodDetails.css'
import {useContext} from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const FoodDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [added, setAdded] = useState(false)

    const { increaseQuantity } = useContext(StoreContext)

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const foodData = await fetchFoodDetails(id)
                setData(foodData)
            } catch (error) {
                toast.error('Error displaying the food details.')
            }
        }
        loadFoodDetails()
    }, [id])

    const handleAdd = () => {
        increaseQuantity(id)
        setAdded(true)
        setTimeout(() => setAdded(false), 1600)
    }

    if (!data) {
        return (
            <section className="fd-page">
                <div className="fd-shell fd-shell-loading">
                    <div className="fd-media fd-skeleton-media" />
                    <div className="fd-content">
                        <div className="fd-skeleton-line fd-skeleton-tag" />
                        <div className="fd-skeleton-line fd-skeleton-title" />
                        <div className="fd-skeleton-line" />
                        <div className="fd-skeleton-line" style={{ width: '80%' }} />
                        <div className="fd-skeleton-line" style={{ width: '60%' }} />
                    </div>
                </div>
            </section>
        )
    }

    const { name, description, price, imageUrl, category } = data

    return (
        <section className="fd-page">
            <div className="fd-shell">
                <div className="fd-media">
                    <img className="fd-img" src={imageUrl} alt={name} />
                    <div className="fd-price-tag">
                        <span className="fd-price-currency">&#8377;</span>
                        <span className="fd-price-amount">{price}</span>
                    </div>
                </div>

                <div className="fd-content">
                    {category && <span className="fd-tag">{category}</span>}

                    <h1 className="fd-title">{name}</h1>

                    <p className="fd-description">{description}</p>

                    <div className="fd-divider" />

                    <button
                        type="button"
                        className={`fd-add-btn ${added ? 'fd-add-btn-done' : ''}`}
                        onClick={handleAdd}  
                    >
                        {added ? 'Added' : `Add to cart  ·  ₹${price}`}
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FoodDetails