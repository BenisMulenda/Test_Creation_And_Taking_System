<?php

include 'mcq_server_connect.php';
include 'psw_hshing.php'
//check if active first

//=================================================
//function to QueryStudents, returns a ID
//================================================
function queryStudents($email, $mysqli){
	
	$email = strtolower($email);
	$sql = "SELECT * FROM tbl_student WHERE Email = '".$email."'";
    $result = $mysqli->query($sql);
    if ($result){
        $res = $result->fetch_assoc();
        return $res;
    }else{
        return null;
    }
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
//INPUT MANAGEMENT
//$input = '{"email_address": "dflorrian@jbsr.com", "password": "dimitri"}';

$input = file_get_contents('php://input');
$data = json_decode($input, true);
//---------------------------------------START MAIN ---------------------------------------------//
//===========================================================
$email = $data['email_address'];
$password = $data['password'];

$obj = queryStudents($email, $mysqli);
if ($obj != null){
    if (comparePasswords($password, $obj)){
        //send object with student name, email, id, surname, record last login 
    }
}
?>