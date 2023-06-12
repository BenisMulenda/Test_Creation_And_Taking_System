<?php

    include 'mcq_server_connect.php';
    include 'classes/tests.php';

//=================================================
//function function to return test details
//=================================================
function queryGetTests($testID, $stu, $mysqli){
	//TestID, Duration, Active, FullMarks
	
	$sql = "SELECT * FROM tbl_test WHERE TestID = '".$testID."'";
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
            $tmp->attempts = $row["Attempts"];
			$tmp->stuAttempts = queryAttempts($stu,$testID, $mysqli);
			$tmp->stuMark = queryMarks($stu,$testID, $mysqli);

			$arrTest[$counter]=$tmp;
			$counter = $counter+1;
		}
		return $arrTest;
		
	}else return $arrTest;
}
//===========================================================
//function to check if the student has attempted test before
//===========================================================
function queryAttempts($stu, $testID, $mysqli){
	$sql = "SELECT * FROM tbl_marks WHERE StudentID ='".$stu."'AND TestID = '".$testID."'" ;
	$result = $mysqli->query($sql);
	if ($result->num_rows > 0){
		$row = $result->fetch_assoc();
		return $row["Attempts"];
	}else{
		return 0;
	}
}
//===========================================================
//function to send back test results of student
//===========================================================
function queryMarks($stu, $testID, $mysqli){
	$sql = "SELECT * FROM tbl_marks WHERE TestID = '".$testID."' AND StudentID ='".$stu."'";
	$result = $mysqli->query($sql);

	if ($result->num_rows > 0){
		$row = $result->fetch_assoc();
		return $row["Mark"];
	}else{
		return -1;
	}
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$testID = $data['testID'];
$stu = $data['stuID'];
$output = queryGetTests($testID, $stu, $mysqli);
echo json_encode($output);
?>