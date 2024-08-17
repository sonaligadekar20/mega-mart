import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./BuyPage.css";
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function BuyPage() { 
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [delivaryCharges, setdelivaryCharges] = useState(50);
    const [shippingAddress, setshippingAddress]= useState('');

    const { id } = useParams();
    const loadProduct = async () => {
        try{
            const response = await axios.get(`/api/product/${id}`)
            setProduct(response?.data?.data)
        }
        catch(e){
            console.log(e.message);
    }
}

    useEffect(() => {
        loadProduct()
    }, [id]);

    const increaseQuantity=()=>{
        setQuantity(quantity + 1)
    }
    const decreaseQuantity =()=> {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }

  

    const placeOrder = async ()=>{

        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const orderDetails ={
            user: currentUser._id,
            product: id,
            quantity: quantity,
            delivaryCharges:delivaryCharges,
            shippingAddress: shippingAddress
        }

        const response = await axios.post('/order', orderDetails);
        alert(response?.data?.message);
        if(response?.data?.success){
            window.location.href = '/orders';
        }
    }

   

    return (
        <div>
             <Navbar/>
            <div className='product-container'>
            <div>
                <img src={product.image} className='buy-product-image' alt={product.name} />
            </div>
            <div>
                <h2>₹ {product?.price}</h2>
                <h2>{product.name}</h2>
                <p>{product?.description}</p>
                
                <div>
                    <p className='text-quantity'>Quantity:</p>
                    <span className='btn-dec-quantity' onClick={decreaseQuantity}> ➖ </span>
                    <span className='product-quantity-text'> {quantity} </span>
                    <span className='btn-inc-quantity' onClick={increaseQuantity}> ➕</span>
                </div>
                <div>
                    <input type = "radio"
                    id = "50"
                    name="delivaryCharges"
                    className='delivary-charges'
                    checked={delivaryCharges === 50}
                    onChange={() => 
                        setdelivaryCharges(50)
                    }/>
                    <label htmlFor='50'>Regular delivary</label>

                    <input type = "radio"
                    id = "100"
                    name="delivary-charges"
                    className='delivaryCharges'

                    checked={delivaryCharges === 100}
                    onChange={()=>
                        setdelivaryCharges(100)
                    }/>
                    <label htmlFor= '100'>Fastest delivary</label>

                    <h3>Delivary Charges: {delivaryCharges}</h3>
                    <h3>Total Pay Amount:  ₹{(product.price * quantity)+delivaryCharges}</h3>
                </div>
                <div>
                    <input type = "text" 
                    placeholder='Enter Shipping Address'
                    className='input-shipping-address'
                    value={shippingAddress}
                    onChange={(e) =>{
                        setshippingAddress(e.target.value)
                    }}
                    />
                    <button type="button" className='btn btn-place-order'
                    onClick={placeOrder}> Place Order</button>
                   
                </div>
                
            </div>
        </div>

        </div>
        
    )
}
export default BuyPage



