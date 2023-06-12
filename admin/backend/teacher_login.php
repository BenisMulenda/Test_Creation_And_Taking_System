<?php

include 'mcq_server_connect.php';
include 'psw_hshing.php';

//============================================================
//function to get the teacher, returns a object of the teacher
//============================================================
function queryTeachers($email, $mysqli){
	
	$email = strtolower($email);
	$sql = "SELECT * FROM tbl_teacher WHERE Email = '".$email."'";
    $result = $mysqli->query($sql);
    if ($result){
        $res = $result->fetch_assoc();
        return $res;
    }else{
        return null;
    }
}


//=================================================
//function to update last login details
//================================================
function addLogin($email, $mysqli){
	$date = date("Y-m-d");
    $sql = "INSERT INTO tbl_log (Email, LastLogin) VALUES ('$email', '$date')";
    $result = $mysqli->query($sql);
    
}
//=================================================
//function to Dehash & Compare Password, returns an array of data (accepts an array)
//================================================
function comparePasswords($password, $row){
    if (password_verify($password,$row["Password"])){
        return TRUE;
    }else{
        return FALSE;
    }
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
//---------------------------------------START MAIN ---------------------------------------------//
//===========================================================

$email = $data['email_address'];
$password = $data['password'];

$obj = queryTeachers($email, $mysqli);
if ($obj != null){
    if (comparePasswords($password, $obj)){
        //addLogin($obj["Email"], $mysqli); 

        //send object with student name, email, id, surname, record last login 
        if ($obj["Active"]=='1'){
            $new_user [] = array(
                'header'=> 'Success',
                'message'=>'',
                'name'=>$obj["Name"],
                'email'=>$obj['Email'],
                'surname'=>$obj['Surname']
            );
            echo json_encode($new_user);
        }else{
            $new_user [] = array(
                'header'=> 'Active',
                'message'=>'Account has not been activated! Please check your email.',
                'name'=>null,
                'email'=>null,
                'surname'=>null
            );
            echo json_encode($new_user);
        }
       
       
    }else{
        //send message incorrect password
        $new_user [] = array(
			'header'=> 'Password',
            'message'=>'Password is incorrect!',
            'name'=>null,
            'email'=>null,
            'surname'=>null
		);
        echo json_encode($new_user);
    }
}else{

    //send message account does not exist
   
    $new_user [] = array(
        'header'=> 'Account',
        'message'=>'Account does not exist!',
        'name'=>null,
        'email'=>null,
        'surname'=>null
    );
    echo json_encode($new_user);
}
?>