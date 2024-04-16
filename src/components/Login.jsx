import React from "react";
import { useState,useEffect } from "react";
import mainImg from '../assets/main.jpg'
import logoImg from '../assets/logo.png'
import "../index.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () =>{
    const navigateTo = useNavigate();

    useEffect(()=>{
        const checkLogIn=async()=>{
             await axios.post('http://localhost/cooking-diary-backend/index.php/auth').then(response => {
                //console.log(response.data);
             }).catch(error => {
                console.error('Error:', error);
                });
        }

        checkLogIn();

    },[]);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [wrongData,setWrongData] = useState(false);

    const submitLogin = async (event)=>{
        event.preventDefault();
        

        await axios.post('http://localhost:80/cooking-diary-backend/index.php/login',{
            username: username,
            password: password,
          }).then(response => {
            console.log(response.data);
            if(response.data['success']){
                localStorage.setItem("user_id", response.data['user_id'])
                navigateTo('/home');
            }else{
                setWrongData(true);
            }

        }).catch(error => {
        console.error('Error:', error);
        });
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
            <form className="login-form" action="" method="POST" onSubmit={submitLogin}>
                <label htmlFor="">Username</label><br/>
                <input type="text" onChange={(e) => setUsername(e.target.value)} /><br/>
                <label htmlFor="">Password</label><br/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/><br />
                <button type="submit">Log In</button>
                {wrongData&&<p className="wrong-data">Wrong username or password!</p>}
                <p>Dont have account?<a href="/register"> Register here</a></p><br/>
            </form>
        </div>

    </div>)

}

export default Login;