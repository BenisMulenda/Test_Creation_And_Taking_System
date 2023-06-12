<?php

include 'mcq_server_connect.php';
    include 'classes/students.php';
//=================================================
//Gets the students that did a particular test
//returns their details and the mark they obtained
//=================================================

function queryGetStudent($id, $mysqli){

	
	$sql = "SELECT * FROM tbl_marks WHERE TestID = '".$id."'";
    $result = $mysqli->query($sql);

    $arrTest = array();
	$counter = 0;
	
	if ($result->num_rows > 0){
		while($row = $result->fetch_assoc()){
            $tmp = new Student();
            $tmp->studentID = $row["StudentID"];
            $tmp->surname = $row["Surname"];
			$tmp->name = $row["Name"];
            $tmp->marks = $row["Mark"];
            $tmp->dateTaken = $row["Date"];
            $tmp->testTotal = $row["TestTotal"];
			$arrTest[$counter]=$tmp;
			$counter = $counter+1;
		}
		return $arrTest;
		
	}else return $arrTest;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = $data['testID'];

$output = queryGetStudent($id, $mysqli);
echo json_encode($output);
?>