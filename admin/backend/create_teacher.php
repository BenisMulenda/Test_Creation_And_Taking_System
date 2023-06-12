<?php
//header("Content-Type: application/json; charset=UTF-8");
include 'mcq_server_connect.php';
include 'psw_hshing.php';
include 'email_messages.php';

//----------------------------------------------BEGIN----------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------
//function used to check if the provided email is unique eturns true/false
//-----------------------------------------------------------------------------------------
function isUniqueEmail($email,$mysqli){
	$sql = "SELECT * FROM tbl_teacher WHERE Email='$email'";
	$result = $mysqli->query($sql);
	if ($result->num_rows>0){
		return false;
	}
	else return true;
}

//----------------------------------------------------------------------------------------------------
//This function inserts new teacher into the tbl_teacher returns true/false if the query went through
//----------------------------------------------------------------------------------------------------
function addTeacher($fname, $lname, $email,$hashed_pass, $mysqli){
	$sql = "Insert Into tbl_teacher (Name, Surname, Email, Password, Active) values ('$fname', '$lname', '$email', '$hashed_pass',FALSE)";

	if($mysqli->query($sql)=== TRUE){
		return TRUE;
	}
	else{
		//echo $mysqli->error;
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

//GETS THE JSON BACK
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = $data['email'];
$pass = $data['password'];
$first_name = $data['fname'];
$last_name = $data['lname'];


//An object containing a message is send back and read
if (isUniqueEmail($email,$mysqli) === TRUE){
    $hashed_pass = generateHashPass($pass);
    if (addTeacher($first_name, $last_name, $email,$hashed_pass, $mysqli) === TRUE){
		//EMAIL to validate email
        //sendVerification($first_name, $last_name, $email);
		$new_user [] = array(
			'header'=> 'Welcome '.$first_name.' '.$last_name,
			'message'=> 'You have successfully registered as a Hazloc examiner. Please check your email to confirm your account.'
		);
        echo json_encode($new_user);
    }else{
		$new_user [] = array(
			'header'=> 'Oops',
			'message'=> 'There seems to be a problem with creating your account. Please try again.'
		);
        echo json_encode($new_user);

        
    }
}else{

	$new_user [] = array(
		'header'=> 'Account Exists!',
		'message'=> 'This email already has an associated account, please provide a different email if you wish to create an account.'
	);
	echo json_encode($new_user);
    
}

//-----------------------------------------------------------END--------------------------------------------//