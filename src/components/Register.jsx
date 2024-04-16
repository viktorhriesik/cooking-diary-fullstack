import React from "react";
import { useState } from "react";
import mainImg from '../assets/main.jpg'
import logoImg from '../assets/logo.png'
import "../index.css"
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const Register = () =>{

    const navigateTo = useNavigate();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [wrongData,setWrongData] = useState(false);

    const registerUser=(event)=>{
        event.preventDefault();
        
        let data = {
            username:username,
            password:password,
            email:email,
            phone_number:phone,
        }
        axios.post("http://localhost:80/cooking-diary-backend/index.php/register",data).then(response=>{
            console.log(response.data);
            navigateTo('/login');
        }).catch(error=>{
            console.log("Error",error);
        })

    }

    return(
    <div className="main-window">

        <div className="left-side">
            <img src={mainImg} alt="main" />
        </div>
        <div className="borderc">

        </div>

        <div className="right-side">
            <img src={logoImg} alt="logo" className="logoImg"/>
            <form className="login-form" action="" method="post" onSubmit={registerUser}>
                <label htmlFor="">Username</label><br/>
                <input type="text" required={true} onChange={(e) => setUsername(e.target.value)} /><br/>
                <label htmlFor="">Email</label><br/>
                <input type="text" required={true} onChange={(e) => setEmail(e.target.value)} /><br/>
                <label htmlFor="">Phone Number</label><br/>
                <input type="text" required={true} onChange={(e) => setPhone(e.target.value)} /><br/>
                <label>Password</label><br/>
                <input type="password" required={true} onChange={(e) => setPassword(e.target.value)} /><br />
                <button type="submit">Register</button>
                
            </form>
        </div>

    </div>)

}

export default Register;