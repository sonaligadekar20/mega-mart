import React from 'react';
import "./ProductCard.css";
import { Link } from 'react-router-dom';


function ProductCard( {id,name, description, price, image}) {
    
    return (
        <div className='product-card'>
            <img src={image} alt={name} className='product-card-image'/>
            <h2 className='product-card-name'>{name} </h2>
            <p className='product-card-description'>{description}</p>
            <p className='product-card-price'> ₹ {price}</p>
            <Link to={`/buy/${id}`} className='btn product-button'>Buy Now</Link>
            </div>
    )
}

export default ProductCard


