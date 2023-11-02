import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import "./BuyPage.css";
import { useParams } from 'react-router-dom';

function BuyPage(){
    const [product , setProduct]= useState({});
    const {id} = useParams();

    const loadProduct = async() =>{
        if(!id){
            return
        }
        const response = await axios.get(`/product/${id}`)
        setProduct(response?.data?.data)
    }
 
    useEffect(()=>{
        loadProduct()
    },[])
   

    return(
        <div className='product-container'>
            {/* <h2>{id}</h2> */}
            <div>
            <img src= {product.image}/>
            </div>
            <div>
            <h2>₹ {product.price}</h2>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>+{product.quantity}</p>

            </div>
        </div>
    )

}
export default BuyPage