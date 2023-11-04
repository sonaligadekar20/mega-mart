import React from 'react'
import "./MyOrders.css";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar';
import {Link} from 'react-router-dom'

const STATUS_BADGE_COLOR_MAP = {
    "pending": "badge-danger",
    "shipped": "badge-warning",
    "delivered": "badge-success"
}
function MyOrders(){
    const [user, setUser] = useState('');

    const [orders, setOrders] = useState([]);               

    const loadOrders = async () => {
        const userId = user._id;

        if(!userId){
            return;
        }
        const response = await axios.get(`/orders/user/${userId}`)
        setOrders(response?.data?.data);
    }

    useEffect(()=>{
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');

        if(storageUser?.email) if (storageUser?.email) {
            setUser(storageUser);
         }
        else{
            alert("You are not logged in!");
            window.location.href = "/login";
        }
    },[])

    useEffect(()=>{
        loadOrders()   
    },[user])

    return(
        <div>
            <Navbar/>
            <h1 className='text-center'>My Orders</h1>
            <div className='orders-container'>
                {
                    orders?.map((order, index)=>{
                        const {image,product, quantity, status, delivaryCharges,} = order;
                        return(
                            <div className='order-card'> 
                            <div>
                            <img src= {product.image} className='product-img'/>
                             </div>  
                             <div>
                                <Link to={`/buy/${product._id}`}>{product.name}</Link>
                                <h4>₹{product.price} x {quantity} = ₹{product.price * quantity}</h4>
                                <span className={`order-status ${STATUS_BADGE_COLOR_MAP[status]}`}>{status}</span>
                                </div>
                                </div>
                        )

                    })
                }
            </div>
            </div>
    )
}

export default MyOrders