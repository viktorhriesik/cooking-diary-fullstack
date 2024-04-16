<?php


class Recipe{


    private $conn;

    public $user_id;
    public function __construct()
    {
        global $conn;
        $this->conn = $conn;
    }


    public function addRecipe($user_id,$recipeName, $shortDesc, $ingridients, $instructions,$prepTime,$imgPaht){

        $sql = "INSERT INTO recipes (recipeName,shortDesc, ingridients, instructions,prepTime,user_id,imgPath) VALUES (?,?,?,?,?,?,?);";
        $run = $this->conn->prepare($sql);
        $run->bind_param("sssssss",$recipeName, $shortDesc, $ingridients, $instructions,$prepTime,$user_id,$imgPaht);
        $run->execute();

        $result = $run->get_result();
    }

    public function getRecipeNum(){
        $sql ='SELECT * FROM recipes;';
        $run = $this->conn->prepare($sql);
        //$run->bind_param("",$recipeName, $shortDesc, $ingridients, $instructions,$prepTime,$user_id);
        $run->execute();

        $result = $run->get_result();
        $numm = $result->num_rows;

        $recipes = array();

        if ($result->num_rows > 0) {
           
            while($row = $result->fetch_assoc()) {
                 $recipe = array(
                'recipeName' => $row['recipeName'],
                'recipe_id' => $row['recipe_id'],
                'shortDesc' => $row['shortDesc'],
                'prepTime' => $row['prepTime'],
                'imgPath' => $row['imgPath']);
                $recipes[] = $recipe;
            }

            $json = json_encode($recipes);
    
            echo $json;
        } else {
            echo "0 results";
        }
    }


    public function getAllRecipeData($recipeId){
        $sql ='SELECT * FROM recipes WHERE recipe_id = ? ;';
        $run = $this->conn->prepare($sql);
        $run->bind_param("s",$recipeId);
        $run->execute();

        $result = $run->get_result();
        if($result->num_rows==1){
            $result = $result->fetch_assoc(); 

           /* while($row = $result->fetch_assoc()) {
                 $recipe = array(
                'recipeName' => $row['recipeName'],
                'recipe_id' => $row['recipe_id'],
                'shortDesc' => $row['shortDesc'],
                'prepTime' => $row['prepTime'],
                'imgPath' => $row['imgPath']);
                $recipes[] = $recipe;
            }*/

            //$json = json_encode($result);
            $json = json_encode($result);
            echo $json;
        } else {
            echo "0 results";
        }
    }
}

?>