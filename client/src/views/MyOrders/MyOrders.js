import React from 'react'
import "./MyOrders.css";
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';

function MyOrders(){
    const [user, setUser] = useState({});

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

    return(
        <div>
            <Navbar/>
            <h1>My Orders</h1>
            </div>
    )
}

export default MyOrders