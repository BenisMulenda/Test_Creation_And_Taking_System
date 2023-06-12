<?php
    include 'mcq_server_connect.php';
    include 'classes/tests.php';

//======================================================
//Returns all the test a particular teacher has created
//======================================================

function queryGetTests($email, $mysqli){
	//TestID, Duration, Active, FullMarks
	$email = strtolower($email);
	$sql = "SELECT * FROM tbl_test WHERE TeacherEmail = '".$email."'";
    $result = $mysqli->query($sql);

    $arrTest = array();
	$counter = 0;
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()){
            $tmp = new Test();
            $tmp->testID = $row["TestID"];
            $tmp->date = $row["Date"];
			$tmp->dur = $row["Duration"];
            $tmp->marks = $row["FullMarks"];
            $tmp->status = $row["Active"];

			$arrTest[$counter]=$tmp;
			$counter = $counter+1;
		}
		return $arrTest;
		
	}else return $arrTest;
}


$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = $data['email'];

$output = queryGetTests($email, $mysqli);
echo json_encode($output);
?>