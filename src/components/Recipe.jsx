import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import Navbar from "./Navbar";
import imgT from '../assets/imgP.jpg'
import accImg from '../assets/account.png'
import { Link} from "react-router-dom";

const Recipe = () =>{
    const navigateTo = useNavigate();

    const [recipeName,setRecipeName] = useState('');
    const [shortDesc,setShortDesc] = useState('');
    const [ingridients,setIngridients] = useState('');
    const [ingridientsList,setIngridientsList] = useState([]);
    const [instructions,setInstructions] = useState('');
    const [prepTime,setPreptime] = useState('');
    const [recipeImg,setRecipeImg] = useState();
    const [description,setDesription] = useState();
    const [date,setDate] = useState();
    const [likes,setLikes] = useState(0);
    const [user_id,setUserId] = useState();
    const [comment, setComment] = useState('');
    const [comments,setComments] = useState([]);
    const [owner,setOwner] = useState();

    const urlParams = new URLSearchParams(window.location.search);
    const recipe_id = urlParams.get('id');

    useEffect(()=>{
        if(localStorage.getItem('user_id')==null){
            navigateTo('/login');
        }   
        setComments([]);
        const getComments = async(recipeId) =>{
        
            await axios.get('http://localhost:80/cooking-diary-backend/index.php/comment?recipe_id='+recipeId).then(response => {
                
                for(let i = 0;i<response.data.length;i++){
                    let com = {
                        username:response.data[i]['username'],
                        comment:response.data[i]['commentTxt']
                    }
                    setComments(pr=>[...pr,com]);
                }     
                console.log("comm:",comment.length);     
               
            
            }).catch(error => {
                    console.error('Error:', error);
            });
        }
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
            setLikes(response.data['likes']);
            getUserInfo(response.data['user_id']);

        }).catch(error => {
            console.error('Error:', error);
        });
        
        }

        getComments(recipe_id);
        getRecipeInfo();
        

    },[]);

    const likeRecipe = async(e)=>{
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const recipe_id = urlParams.get('id');

        await axios.post('http://localhost:80/cooking-diary-backend/index.php/like-recipe',{
            recipe_id: recipe_id
          }).then(response => {
            setLikes(likes+1);
            //console.log(response.data);
        }).catch(error => {
        console.error('Error:', error);
        });
    }

    const commentRecipe = async(e)=>{
        e.preventDefault();
        //setComments([]);
        const urlParams = new URLSearchParams(window.location.search);
        const recipe_id = urlParams.get('id');

        await axios.post('http://localhost:80/cooking-diary-backend/index.php/comment',{
            recipe_id: recipe_id,
            comment:comment,
            username:owner
          }).then(response => {
            console.log(response.data);
            setComment("");
        }).catch(error => {
        console.error('Error:', error);
        });
        window.location.reload();
        //getComments();
    }

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

            <div className="comments-div">
                <h4>{likes} likes <button className="like-btn" onClick={likeRecipe}>Like</button></h4>
               <form action="" method="post" onSubmit={commentRecipe} required>
                    <label>Your Review:</label><br  />
                    <textarea type="text" value={comment}  onChange={(e) => setComment(e.target.value)}  /><br/>
                    <button type="submit">Submit</button>
                </form> 
                <div className="hor-line">
                </div>
                <div className="comments">
                        {
                          comments.length>0 && comments.map((recipe, index) => (
                            <div key={index} className="comment">
                                <h5>{recipe['username']}</h5>
                                <p>{recipe['comment']}</p>
                                <div className="hor-line"></div>    
                            </div>                           
                        ))
                            
                    }
                </div>
            </div>
        </div>
        </>
    );

}

export default Recipe;