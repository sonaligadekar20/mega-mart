import React, { useState } from "react";
import axios from 'axios';
import "./Signup.css"
function Signup(){
    const [name, setName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('female');

    const signup = async ()=>{
        if(!name){
            alert("Name is required");
            return;
        }
        const response = await axios.post("/signup",{
            name:name,
            email:email,
            password:password,
            mobile: mobile,
            address:address,
            gender:gender

        })
        
        alert(response?.data?.message);
        if(response?.data?.success){
            window.location.href = "/login";

        }
    };

    return(
        <div>
            <form className="signup-form">
                <h1 class="text-center">Signup Form</h1>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    placeholder="Enter your name"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) =>{
                       setName(e.target.value);
                    }}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text"
                    placeholder="Enter your email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) =>{
                       setEmail(e.target.value);
                    }}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    placeholder="Enter password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>{
                       setPassword(e.target.value);
                    }}/>
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text"
                    placeholder="Enter your mobile"
                    id="mobile"
                    className="form-control"
                    value={mobile}
                    onChange={(e) =>{
                       setMobile(e.target.value);
                    }}/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text"
                    placeholder="Enter your address"
                    id="address"
                    className="form-control"
                    value={address}
                    onChange={(e) =>{
                       setAddress(e.target.value);
                    }}/>
                </div>
                <div>
                    <input type="radio"
                    id="male"
                    name="gender"
                    className='gender'
                    checked={gender === "male"}
                    onClick={()=>{
                        setGender("male")
                    }}
                    />
                    <label htmlFor="male">male</label>

                    <input type="radio"
                    id="female"
                    name="gender"
                    className='gender'
                    checked={gender === "female"}
                    onClick={()=>{
                        setGender("female")
                    }}
                    />
                    <label htmlFor="female">Female</label>
                     
                </div>

                <button type="button" className="btn signup-btn" onClick={signup}>Signup</button>

            </form>
        </div>
    );

}

export default Signup