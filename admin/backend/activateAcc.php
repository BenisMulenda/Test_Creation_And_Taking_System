
<?php
include 'mcq_server_connect.php';

//The following document gets the email of the user from the URL 
//And uses it to activate the user's account
//The link is sent through email
function updateActivate($email, $mysqli){
    //This function attempts to activate the account 
    //By querying the database
    $sql = "UPDATE tbl_teacher SET Active= TRUE WHERE Email='$email'";
    if($mysqli->query($sql) === TRUE){
        return true;
      }
      else{
        return false;
      }
}
$email = $_GET["email"];


if(updateActivate($email, $mysqli)){
     //Redirects to the main admin page with those parameters which will popup a message before the page loads
    header('Location: /admin/index.html?active=TRUE&');
   
}else{
    header('Location: /admin/index.html?active=FALSE&');
}

?>
