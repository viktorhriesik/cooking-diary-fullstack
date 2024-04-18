<?php


class Comment{

    private $conn;

    function __construct(){
        global $conn;
        $this->conn = $conn;
    }

    public function addComment($username,$recipe_id,$comment){
        
        $sql = "INSERT INTO comments (username, recipeId, commentTxt) VALUES (?,?,?);";
        $run = $this->conn->prepare($sql);
        $run->bind_param("sss",$username, $recipe_id, $comment);
        $run->execute();
        $result = $run->get_result();
    }

    public function getAllComments($recipeId){
        $sql ='SELECT * FROM comments WHERE recipeId = ? ;';
        $run = $this->conn->prepare($sql);
        $run->bind_param("s",$recipeId);
        $run->execute();

        $result = $run->get_result();
        $numm = $result->num_rows;

        $comments = array();

        if ($result->num_rows > 0) {
           
            while($row = $result->fetch_assoc()) {
                 $comment = array(
                'username' => $row['username'],
                'commentTxt' => $row['commentTxt']);
                $comments[] = $comment;
            }

            $json = json_encode($comments);
    
            echo $json;
        } else {
            echo "0 results";
        }
   
    }
}


?>