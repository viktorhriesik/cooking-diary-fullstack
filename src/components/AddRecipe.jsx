import React from "react";
import { useState } from "react";
import mainImg from '../assets/main.jpg'
import logoImg from '../assets/logo.png'
import "../index.css"
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import NavBar from "./Navbar";
import { Link } from "react-router-dom";
const AddRecipe = () =>{

    const navigateTo = useNavigate();

    const [recipeName,setRecipeName] = useState('');
    const [shortDesc,setShortDesc] = useState('');
    const [ingridients,setIngridients] = useState('');
    const [instructions,setInstructions] = useState('');
    const [prepTime,setPreptime] = useState('');
    const [recipeImg,setRecipeImg] = useState();
    const [wrongData,setWrongData] = useState(false);

    const handleFileChange = event => {
        //console.log(event.target.files[0]['name']);
        setRecipeImg(event.target.files[0]['name']);
      };

    const addNewRecipe=(event)=>{
        event.preventDefault();
        
        let data = {
            user_id:localStorage.getItem('user_id'),
            recipeName:recipeName,
            shortDesc:shortDesc,
            ingridients:ingridients,
            instructions:instructions,
            prepTime:prepTime,
            imgPaht:recipeImg,
            wrongData:wrongData
        }
        axios.post("http://localhost:80/cooking-diary-backend/index.php/add-recipe",data).then(response=>{
            console.log(response.data);
            navigateTo('/home');
        }).catch(error=>{
            console.log("Error",error);
        })

    }

    return(
    <>
        <NavBar/>
        <div className="back-to-all-recipes">
        <Link to="/home"> <button>All recipes 🡰</button></Link>
        </div>
        <div className="main-window">
            <div className="add-holder">
                <h2>Add new Recipe</h2>
                <form className="login-form" action="" method="post" onSubmit={addNewRecipe} encType="multipart/form-data">
                <label htmlFor="">Recipe Name: </label><br/>
                <input type="text" required={true} onChange={(e) => setRecipeName(e.target.value)} /><br/>
                <label htmlFor="">Short Description</label><br/>
                <textarea type="text"  rows="5" required={true} onChange={(e) => setShortDesc(e.target.value)} /><br/>
                <label htmlFor="" >Ingridiets: </label><br/>
                <textarea type="text" rows="7" required={true} onChange={(e) => setIngridients(e.target.value)} /><br/>
                <label>Istructions: </label><br/>
                <textarea type="Text" rows="10" required={true} onChange={(e) => setInstructions(e.target.value)} /><br />
                <label>Preparation Time: </label><br/>
                <input type="text" required={true} onChange={(e) => setPreptime(e.target.value)} /><br />
                <label>Recipe image: </label><br/>
                <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Add Recipe</button>
                
                </form>
            </div>
        </div>
    </>
    )}

export default AddRecipe;