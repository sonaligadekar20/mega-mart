import React from 'react';
import "./ProductCard.css"

function ProductCard( {name, description, price, image}) {
    
    return (
        <div className='product-card'>
            <img src={image} alt={name} className='product-card-image'/>
            <h2 className='product-card-name'>{name} </h2>
            <p className='product-card-description'>{description}</p>
            <p className='product-card-price'> ₹ {price}</p>
            <button className='btn'>Buy Now</button>
            </div>
    )
}

export default ProductCard


