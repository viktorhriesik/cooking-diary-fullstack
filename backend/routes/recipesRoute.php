<?php


$recipe = new Recipe();
    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    

    $requestUri = $_SERVER['REQUEST_URI'];


    //add recipe
    if(str_ends_with($requestUri,"/add-recipe")){
        
            $data = json_decode(file_get_contents('php://input'), true);
            var_dump($data);

            $user_id = $data['user_id'];
            $recipeName= $data['recipeName'];
            $shortDesc= $data['shortDesc'];
            $ingridients= $data['ingridients'];;
            $instructions= $data['instructions'];
            $prepTime= $data['prepTime'];
            $imgPaht = $data['imgPaht'];
    
            $recipe->addRecipe($user_id,$recipeName, $shortDesc, $ingridients, $instructions,$prepTime,$imgPaht);
    
    }
    

}
if ($_SERVER['REQUEST_METHOD'] === 'GET'){

    $requestUri = $_SERVER['REQUEST_URI'];

    if(str_contains($requestUri,"/recipes")){
        if(isset($_GET['id'])){
            //echo $_GET['id'];
            $recipe->getAllRecipeData($_GET['id']);
        }else{
            $recipe->getRecipeNum();
        }
    }
}   

?>