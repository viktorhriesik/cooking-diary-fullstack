import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import EditAccount from "./components/EditAccount"
import AddRecipe from "./components/AddRecipe"
import Recipe from "./components/Recipe"

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="*" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/edit-acc" element={<EditAccount/>} />
        <Route path="/add-recipe" element={<AddRecipe/>} />
        <Route path="/recipe" element={<Recipe/>} />
    </Routes>
</BrowserRouter>
  )
}

export default App
