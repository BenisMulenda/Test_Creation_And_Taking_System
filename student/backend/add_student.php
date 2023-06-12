<?php

include 'mcq_server_connect.php';
include 'psw_hshing.php'
include 'email_messages.php'

//--------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------
//function used to check if the provided email is unique (queryAllUsers) returns true/false
//-----------------------------------------------------------------------------------------
function isUniqueEmail($email,$mysqli){
	$sql = "SELECT * FROM tbl_student WHERE Email='$email'";
	$result = $mysqli->query($sql);
	if ($result->num_rows>0){
		return false;
	}
	else return true;
}

//-----------------------------------------------------------------------------------
//This function inserts new data into the sponsor_user's table and returns insert id
//-----------------------------------------------------------------------------------
function addStudent($fname, $lname, $email,$hashed_pass, $student_id, $mysqli){
	$sql = "Insert Into tbl_student (Name, Surname, Email, Password, StudentID, Active) values ('$fname', '$lname', '$email', '$hashed_pass','$student_id',FALSE)";

	if($mysqli->query($sql)=== TRUE){
		return TRUE;
	}
	else{
		echo $mysqli->error;
		return FALSE;
	}
}
//-------------------------------------------------------------------
//function Hashes the user's password and returns the hashed password
//-------------------------------------------------------------------
function generateHashPass($pass){
	return password_hash($pass, PASSWORD_DEFAULT);
}

//--------------------------------------------------------------------------------------------------------------------//
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = $data['email'];
$pass = $data['password'];
$first_name = $data['fname'];
$last_name = $data['lname'];
$studentID = $data['sID'];

//Class to send back to login info (if not active can't create test)
if (isUniqueEmail($email,$mysqli) === TRUE){
    $hashed_pass = generateHashPass($pass);
    if (addStudent($first_name, $last_name, $email,$hashed_pass, $studentID, $mysqli) === TRUE){
        sendVerification($first_name, $last_name,TRUE);
        $new_user->message = "Welcome ".$first_name.", your account has been created. Check your email to verify your account.";
        echo json_encode($new_user);
    }else{
        $new_user->message = "ERROR! Your account could not be created. Try again later.";
        echo json_encode($new_user);
    }
}else{
    $new_user->message = "There's already an account with the email address ".$email.". Please provide a different email."
    echo json_encode($new_user);
}

?>