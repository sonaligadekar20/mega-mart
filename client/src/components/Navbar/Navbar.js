import React from 'react'
import "./Navbar.css"
import {Link} from "react-router-dom"

 function Navbar() {

    return(
        <div className='navbar'>
            <Link to ='/' className="navbar-band"> Mega Mart🏬  </Link>

            <div>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Register</Link>
                <Link to="/orders" className="navbar-link">My Orders</Link>
            </div>
            <div>
                Hello,user
            </div>

        </div>
    )
 }    
 
 export default Navbar