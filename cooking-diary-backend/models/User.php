<?php 


class User{

    private $conn;

    public $user_id;
    public function __construct()
    {
        global $conn;
        $this->conn = $conn;
    }

    public function logInUser($username,$password){
        $sql = "SELECT user_id,password FROM users WHERE username = ?";
        $run = $this->conn->prepare($sql);
        $run->bind_param("s",$username);
        $run->execute();

        $result = $run->get_result();
        if($result->num_rows==1){
            $result = $result->fetch_assoc(); 
           if(password_verify($password,$result['password'])){
            //$_SESSION['user_id']=$result['user_id'];
            
            return $result['user_id'];
           }else{
            return false;
           }
        }else{
            return false;
        }
    }

    public function addUser($username,$password,$email,$phone){

        $hashed_passwd = password_hash($password,PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username,email, password, phone_number) VALUES (?,?,?,?);";
        $run = $this->conn->prepare($sql);
        $run->bind_param("ssss",$username,$email,$hashed_passwd,$phone);
        $run->execute();

        $result = $run->get_result();
        echo "username: ". $username . "email" . $email;
    }

    public function isLogedIn(){
    }

    public function editUser($user_id,$username,$password,$email,$phone){
        $hashed_passwd = password_hash($password,PASSWORD_DEFAULT);
        $sql = "UPDATE users SET username=?,email=?,password=?, phone_number=? WHERE user_id=?";
        $run = $this->conn->prepare($sql);
        $run->bind_param("sssss",$username,$email,$hashed_passwd,$phone,$user_id);
        $run->execute();

        $result = $run->get_result();
    }

    public function getUserData($user_id){
        $sql = "SELECT * FROM users WHERE user_id = ?";
        $run = $this->conn->prepare($sql);
        $run->bind_param("s",$user_id);
        $run->execute();

        $result = $run->get_result();
        if($result->num_rows==1){

            $result = $result->fetch_assoc(); 

            $data = array(
                'user_id' => $user_id,
                'username' => $result['username'],
                'email' => $result['email'],
                'phone_number' => $result['phone_number']
            );

            $json = json_encode($data);
            echo $json;
        }
    }
}

?>