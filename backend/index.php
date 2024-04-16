<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

session_start();

require_once 'config/Config.php';
require_once 'models/User.php';
require_once 'models/Recipe.php';
require_once 'routes/recipesRoute.php';
require_once 'routes/userRoute.php';

if($_SERVER['REQUEST_METHOD']=="POST"){

    $requestUri = $_SERVER['REQUEST_URI'];
    
    //check if session exists
    if(str_ends_with($requestUri,"/auth")){
        echo "true";
    }



}


?>