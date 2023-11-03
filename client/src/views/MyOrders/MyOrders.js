import React from 'react'
import "./MyOrders.css";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar';

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
                        const {product, quantity, status, delivaryCharges,} = order;
                        return(
                            <div className='order-card'> 
                                <h3>{product.name}</h3>
                                <h4>₹{product.price} x {quantity} = ₹{product.price * quantity}</h4>
                                <span className="order-status">{status}</span>
                                </div>
                        )

                    })
                }
            </div>
            </div>
    )
}

export default MyOrders