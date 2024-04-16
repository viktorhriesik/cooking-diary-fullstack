import logoImg from '../assets/logo.png'
import accountImg from '../assets/account.png'
import "../index.css";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

const NavBar = ()=>{
    const navigateTo = useNavigate();

    const addRecipeFnc = (e) =>{
        e.preventDefault();
    }

    const logout = (e)=>{
        e.preventDefault();

        localStorage.removeItem('user_id');
        localStorage.removeItem('recipe');
        navigateTo("/login");
    }

    const editAcc = (e)=>{
        e.preventDefault();

        navigateTo("/edit-acc");
    }

    // <img src={accountImg} alt="" />
    return(<>
        <nav>
        <Link to="/home"><img src={logoImg} alt="logo" className="logoImg"/></Link>
        <h1>Cooking Recipes</h1>
        <div className="account">
            <button className="add-recipe" onClick={()=>{navigateTo("/add-recipe")}}>Add Recipe</button>
            <div className='small-border'></div>
            <p className="accTxt" onClick={editAcc}>account</p>
            <div className='small-border'></div>
            <p className="logout" onClick={logout}>logout</p>
            
        
        </div>
        </nav>
        </>);
}
export default NavBar;