<?php

$comment = new Comment();

if($_SERVER['REQUEST_METHOD']=="POST"){
    $requestUri = $_SERVER['REQUEST_URI'];

    
    $data = json_decode(file_get_contents('php://input'), true);

    //add comment
    if(str_ends_with($requestUri,"/comment")){
        $comment->addComment($data['username'],$data['recipe_id'],$data['comment']);
      
    }
}
if($_SERVER['REQUEST_METHOD']=="GET"){
    $requestUri = $_SERVER['REQUEST_URI'];
    if(str_contains($requestUri,"/comment")){
        $comment->getAllComments($_GET['recipe_id']);
    }
}
?>