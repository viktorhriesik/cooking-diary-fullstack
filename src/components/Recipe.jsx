import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import imgT from '../assets/imgP.jpg'
import { Link } from "react-router-dom";
const Recipe = () =>{

    const [recipeName,setRecipeName] = useState('');
    const [shortDesc,setShortDesc] = useState('');
    const [ingridients,setIngridients] = useState('');
    const [ingridientsList,setIngridientsList] = useState([]);
    const [instructions,setInstructions] = useState('');
    const [prepTime,setPreptime] = useState('');
    const [recipeImg,setRecipeImg] = useState();
    const [description,setDesription] = useState();
    const [date,setDate] = useState();
    const [user_id,setUserId] = useState();
    const [owner,setOwner] = useState();

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const recipe_id = urlParams.get('id');

        const getUserInfo = async(id) =>{
            await axios.get('http://localhost:80/cooking-diary-backend/index.php/users?user_id='+id).then(response => {
                       // console.log(response.data);
                        setOwner(response.data['username']);
            }).catch(error => {
                    console.error('Error:', error);
            });
            }

        const getRecipeInfo = async() =>{
            await axios.get('http://localhost:80/cooking-diary-backend/index.php/recipes?id='+recipe_id).then(response => {
        
            setRecipeName(response.data['recipeName']);
            setShortDesc(response.data['shortDesc']);
            setIngridients(response.data['ingridients']);
            setInstructions(response.data['instructions']);
            setRecipeImg(response.data['imgPath']);
            setDate(response.data['date']);
            setUserId(response.data['user_id']);
            getUserInfo(response.data['user_id']);
        }).catch(error => {
            console.error('Error:', error);
        });
        
        }


        getRecipeInfo();

    },[]);

    return(
        <>
        <Navbar/>
        <div className="back-to-all-recipes">
        <Link to="/home"> <button>All recipes 🡰</button></Link>
        </div>
        <div className="main-holder">
            <div className="main-holder-box">
                <h1>{recipeName}</h1>
                <div className="owner-info">
                    <h5>Submitted by : {owner}</h5>
                    <div className="small-border"></div>
                    <h5>Updated on: {date}</h5>
                </div>
                <p>{shortDesc}</p>

                <div className="container">
                    <div className="left-c">
                        <h2>Ingridients:</h2>
                        <ul className="ingridients">
                        {ingridients.split("\n").map((item,key) => (
                            <li key={key}>{item}</li>
                        ))}
                        </ul>
                    </div>
                    <div className="right-c">
                        <img src={`/src/img/${recipeImg}`} alt="" />
                    </div>
                </div>

                <h2>Instructions</h2>
                <p className="instructions">{instructions}</p>
            </div>
        </div>
        </>
    );

}

export default Recipe;