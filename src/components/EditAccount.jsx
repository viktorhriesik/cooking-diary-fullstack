import NavBar from "./Navbar";
import { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
const EditAccount = ()=>{
    const navigateTo = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [wrongData,setWrongData] = useState(false);

    useEffect(()=>{
        const checkLogIn=async()=>{

            if(localStorage.getItem('user_id')){
                
                await axios.get('http://localhost/cooking-diary-backend/index.php/users/?user_id='+localStorage.getItem('user_id')).then(response => {  
                console.log("TRENUTNI:",response.data);    
                setUsername(response.data['username']);
                setEmail(response.data['email']);
                setPhone(response.data['phone_number']);
                setPassword("");
             }).catch(error => {
                console.error('Error:', error);
                });
            }
        }

        checkLogIn();

    },[]);

    const editAccount = (e)=>{
        e.preventDefault();
        let data = {
            user_id:localStorage.getItem('user_id'),
            username:username,
            password:password,
            email:email,
            phone_number:phone,
        }
        console.log(data);
        axios.post("http://localhost/cooking-diary-backend/index.php/edit",data).then(response=>{
            
        //console.log(response.data);
        navigateTo("/home");
        }).catch(error=>{
            console.log("Error",error);
        })
    }

    return(<>
        <NavBar/>
        <div className="back-to-all-recipes">
        <Link to="/home"> <button>All recipes 🡰</button></Link>
        </div>
        <div className="form-holder">
            <div className="add-holder">
                <h2>Edit Account</h2>
                <form className="login-form" action="" method="" onSubmit={(e)=>{editAccount(e)}} >
                <label htmlFor="">Username:</label><br/>
                <input type="text" value={username}  onChange={(e) => setUsername(e.target.value)} /><br/>
                <label htmlFor="">Email</label><br/>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                <label htmlFor="">Phone Number</label><br/>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /><br/>
                <label>Password</label><br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button type="submit">Save changes</button>
                </form>
            </div>
        </div>
        </>);
}
export default EditAccount;