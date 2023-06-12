<?php

//-------------------------------------------BEGIN-------------------------------------
//RECEIVES TYPE FORM DATA FROM JQUERY 

include 'mcq_server_connect.php';

//---------------------------------------------
//Checks if the folder below has been created
//---------------------------------------------
$dir = "TestQuestions";
if( is_dir($dir) === false ){
    mkdir($dir);
}

$dirImages = "TestImages";
if( is_dir($dirImages) === false ){
    mkdir($dirImages);
}

//---------------------------------------------------
//The function below upload a JSON array of questions
//---------------------------------------------------
function uploadQuestions($obj, $filename, $dir ){
    $objJSON = json_encode($obj);
    $file = fopen($dir . '/' . $filename,"w");
    fwrite($file, $objJSON);
    fclose($file);
    
}

//----------------------------------------------------
//Uploads the picture received into a folder
//It renames the pictures with the test ID and add _X 
//X being a unique picture number
//----------------------------------------------------
function uploadImage($Images, $testID,$target_dir){
    $size = count($Images);
    for ($x = 0; $x < $size; $x++) {
        $name = $testID."_".$x;
        $target_file = $target_dir ."/". $name;
        $target_file_tmp = $target_dir ."/".basename($Images[$x]["name"]);
        $imageFileType = strtolower(pathinfo($target_file_tmp,PATHINFO_EXTENSION));
        move_uploaded_file($Images[$x]["tmp_name"], $target_file.".".$imageFileType);
        
    } 
}

//----------------------------------------------------------
//Updates adds the test into the database
//----------------------------------------------------------
function addTest($fmarks, $dur, $attempts, $email, $mysqli){
    $date = date("Y-m-d");
    $email = strtolower($email);

	$sql = "SELECT * FROM tbl_test ORDER BY ID DESC LIMIT 1";
    $result = $mysqli->query($sql);
    $last_id = 0;

    if ($result->num_rows>0){
        $res = $result->fetch_assoc();
        $last_id = $res["ID"];
    }

    $last_id = $last_id + 1;

    if ($last_id < 10){
        $Spr_id = "00".$last_id;
    }
    else if($last_id < 100){
        $Spr_id = "0".$last_id;
    }

    $newID = date("Y")."MJW".$Spr_id;
    $sql = "INSERT INTO tbl_test (TestID, FullMarks, Attempts, Duration, Active,TeacherEmail, Date) VALUES ('$newID', '$fmarks', '$attempts', '$dur', '0', '$email','$date')";

    if($mysqli->query($sql) === TRUE){
      return $newID;
    }
    else{
      return "";
    }
}

//===========================================================================================================================

$marks = $_POST['marks'];
$attempts = $_POST['attempts'];
$dur = $_POST['dur'];
$temail = $_POST['temail'];

$data = json_decode($_POST["quesObj"],true);

$quesObj = $data;
$nrImages = 0;

//get number of pictures 
for ($x = 0; $x < count($data); $x++) {
    
    if($data[$x]["fileType"] != ''){
        
        $nrImages = $nrImages + 1;
    }
}

//Opens individual images
$arrImg = array();
for ($x = 0; $x < $nrImages; $x++) {
    $arrImg[$x] = $_FILES["Image_".$x];
}

$filename = addTest($marks, $dur, $attempts, $temail, $mysqli);
if ( $filename!= ""){
    $new_user [] = array(
        'header'=> 'Success',
        'message'=> 'Test '.$filename.' has been successfully created.',
        'testID'=>  $filename
    );
    uploadImage($arrImg, $filename,$dirImages);
    $filename.=".json";
    uploadQuestions($quesObj, $filename, $dir );
    
    echo json_encode($new_user);

}else{
    $new_user [] = array(
        'header'=> 'Error',
        'message'=> 'Your desired test could not be created. Try again.',
        'testID'=>  $filename
    );
    echo json_encode($new_user);
}

//-----------------------------END---------------------------------------

?>