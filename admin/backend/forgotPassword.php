<?php
include 'mcq_server_connect.php';
include 'psw_hshing.php';
include 'email_messages.php';
///LOCATE USER'S NAME
function getName($email,$mysqli){
	$sql = "SELECT * FROM tbl_teacher WHERE Email='$email'";
	$result = $mysqli->query($sql);
	if ($result->num_rows>0){
		$row = $result->fetch_assoc();
        return $row["Name"];
	}
	else return "";
}

//HASHED PASSWORD
function generateHashPass($pass){
	return password_hash($pass, PASSWORD_DEFAULT);
}
//SQL UPDATE
function updatePass($email, $hashed,$mysqli){
    $sql_update = "UPDATE tbl_teacher SET Password='".$hashed."' WHERE Email='".$email."'";
    if($mysqli->query($sql_update)){
        return true;
    }else{
        return false;
    }
}


$email = $_GET["email"];
$name = getName($email,$mysqli);

if ($name !=""){
    $prompt_msg = "Hi ".$name. ", Please enter your new password below. Be sure to choose a strong password.";
    echo("<script type='text/javascript'> var answer = prompt('".$prompt_msg."'); </script>");
    $answer = "<script type='text/javascript'> document.write(answer); </script>";
    //echo $answer.'<br>';
    //HASH PASSWORD
	$answer = 'Mul3nd@2706';
    $pass = generateHashPass($answer);
    //echo $pass;
    //UPDATE PASSWORD
    if(updatePass($email, $pass,$mysqli)){
        emailPasswordReset($name, $email);
        echo "<script> alert('Password has been successfully changed!');
					window.location.href='/admin/';
				 </script>";
    }else{
        echo "<script> alert('Password could not be changed. Try again later!');
        window.location.href='/admin/';
     </script>";
    }
    
}

?>