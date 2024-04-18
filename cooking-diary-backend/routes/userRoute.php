<?php

$user = new User();

if($_SERVER['REQUEST_METHOD']=="POST"){

  //login
  if(str_ends_with($requestUri,"/login")){

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $password = $data['password'];

    $isLoged = $user->logInUser($username,$password);
    $loged=true;

    if($isLoged==false){
        $loged=false;
    }

    $data = array(
            'success' => $loged,
            'user_id' => $isLoged,
    );
    $json = json_encode($data);

    echo $json;
    
}

//register
if(str_ends_with($requestUri,"/register")){

    $data = json_decode(file_get_contents('php://input'), true);

    $username = $data['username'];
    $password = $data['password'];
    $email = $data['email'];
    $phone = $data['phone_number'];

    $user->addUser($username,$password,$email,$phone);
}

//edit acc
if(str_ends_with($requestUri,"/edit")){
    $data = json_decode(file_get_contents('php://input'), true);
    
    $user_id = $data['user_id'];
    $username = $data['username'];
    $password = $data['password'];
    $email = $data['email'];
    $phone = $data['phone_number'];

    $user->editUser($user_id,$username,$password,$email,$phone);
}
}


if($_SERVER['REQUEST_METHOD']=="GET"){
    
    if(str_contains($requestUri,"/users")){
        //var_dump($_GET['user_id']);
        $user->getUserData($_GET['user_id']);   
    }
}

?>