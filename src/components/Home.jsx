import accountImg from '../assets/account.png'
import "../index.css";
import NavBar from './Navbar';
import logoImg from '../assets/logo.png'
import { Link } from 'react-router-dom';
import imgR from '../assets/imgP.jpg'
import img12 from '../img/img1.jpg'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () =>{
    const navigateTo = useNavigate();

    const [recipeNum,setRecipeNum] = useState(0);

    const [recipes, setRecipe] = useState([]);
    
    useEffect(()=>{

        if(localStorage.getItem('user_id')==null){
            navigateTo('/login');
        }   
        
        const checkNumOfRecipes=async()=>{

            const response = await fetch('http://localhost/cooking-diary-backend/index.php/recipes');
            const data = await response.json();

            console.log("len:",data.length);   
            for(let i=0;i<data.length;i++){
                //console.log("hh:",data[i]);
                setRecipe(pr=>[...pr, data[i]]); 
            }
            console.log("R:",recipes);  
       }
       
       checkNumOfRecipes();
       
    },[]);

    const loadRecipe = async (e)=>{
        //event.preventDefault();
        //console.log("jamate:",e.target.parentNode.id);
        await axios.get('http://localhost:80/cooking-diary-backend/index.php/recipes/?recipe='+e.target.parentNode.id).then(response => {
            console.log(e.target.parentNode.id);
            navigateTo("/recipe?id="+e.target.parentNode.id);
            //localStorage.setItem('recipe', e.target.parentNode.id);
        }).catch(error => {
        console.error('Error:', error);
        });
    }
    
    return(<>
        <NavBar/>
        <div className="main-wrapper">
            <h2>All recipes</h2>
            <div className="all-recipes"> 
                <ul className="row">
                    {recipes.map((recipe, index) => (
                    <li id={recipe.recipe_id.toString()} key={index} className="recipe" onClick={loadRecipe}>
                        <img src={`/src/img/${recipe.imgPath}`} alt="img" />
                        <h3>{recipe.recipeName}</h3>
                        <p>{recipe.shortDesc}</p>
                        <h5>Prep Time: {recipe.prepTime}</h5>
                    </li>))}
                </ul>
            </div>
        </div>
    </>);
}

export default Home;