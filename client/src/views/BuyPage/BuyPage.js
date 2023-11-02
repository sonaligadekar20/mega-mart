import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BuyPage.css";
import { useParams } from 'react-router-dom';

function BuyPage() {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [charges, setCharges] = useState('50')
    const { id } = useParams();

    const increaseQuantity=()=>{
        setQuantity(quantity + 1)
    }
    const decreaseQuantity =()=> {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    const loadProduct = async () => {
        if (!id) {
            return
        }
        const response = await axios.get(`/product/${id}`)
        setProduct(response?.data?.data)
    }

    useEffect(() => {
        loadProduct()
    }, [])

    return (
        <div className='product-container'>
            <div>
                <img src={product.image} />
            </div>
            <div>
                <h2>₹ {product.price}</h2>
                <h2>{product.name}</h2>
                <p>{product.description}</p>

                <div>
                    <p className='text-quantity'>Quantity:</p>
                    <span className='dec-quantity' onClick={decreaseQuantity}> ➖ </span>
                    <span className='quantity-number'> {quantity} </span>
                    <span className='inc-quantity' onClick={increaseQuantity}> ➕</span>
                </div>
                <div>
                    <input type = "radio"
                    name="charges"
                    className='charges'
                    checked={charges === "50"}
                    onClick={()=>{
                        setCharges("50")
                    }}/>
                    <label htmlFor='50'>Regular delivary</label>

                    <input type = "radio"
                    name="charges"
                    className='charges'
                    checked={charges === "100"}
                    onClick={()=>{
                        setCharges("100")
                    }}/>
                    <label htmlFor= '100'>Fastest delivary</label>
                </div>

            </div>
        </div>
    )
}
export default BuyPage