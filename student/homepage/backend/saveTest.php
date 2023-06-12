<?php 

include 'mcq_server_connect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = $data['testID'];
$stuID = $data['stuID'];
$mark =  $data['mark'];
$testTotal =  $data['testTotal'];
$name =  $data['name'];
$surname =  $data['surname'];
$atmpt =  $data['attempts'];


//-----------------------------------------------------------------------------------------
//function to add test results
//-----------------------------------------------------------------------------------------
function insertRecord($id, $stuID, $mark, $testTotal, $name, $surname, $atmpt, $mysqli){

    $date = date("Y-m-d");
    $sql = "Insert Into tbl_marks (StudentID, Mark, TestID, Date, Name, Surname, TestTotal, Attempts) values ('$stuID', '$mark', '$id', '$date','$name', '$surname', '$testTotal','$atmpt')";

	if($mysqli->query($sql)=== TRUE){
		return TRUE;
	}
	else{
		return FALSE;
	}
}
//function to check if record exists 
function doesRecordExist($id, $stuID, $mysqli){
    $sql = "SELECT * FROM tbl_marks WHERE TestID = '".$id."' AND StudentID ='".$stuID."'";
	$result = $mysqli->query($sql);

	if ($result->num_rows > 0){
		 $row=$result->fetch_assoc();
         return $row['Mark'];
	}else{
		return -1;
	}
}
//function to update attempts and mark 
function updateRecord($testID,$stuID,$mark, $atmpt, $mysqli){
    $date = date("Y-m-d");
    $sql = "UPDATE tbl_marks SET Mark = '$mark', Attempts= '$atmpt', Date = '$date' WHERE StudentID = '$stuID' AND TestID = '$testID'";
    if($mysqli->query($sql) === TRUE){
        return true;
      }
      else{
        return false;
      }

}

function updateAttempt($testID,$stuID, $atmpt, $mysqli){
    $date = date("Y-m-d");
    $sql = "UPDATE tbl_marks SET Attempts= '$atmpt', Date = '$date' WHERE StudentID = '$stuID' AND TestID = '$testID'";
    if($mysqli->query($sql) === TRUE){
        return true;
      }
      else{
        return false;
      }

}


//==========================================================================================

$current_mark = doesRecordExist($id, $stuID, $mysqli);
if ($current_mark != -1){
    if ($current_mark < $mark){
        if (updateRecord($id,$stuID,$mark, $atmpt, $mysqli)){
            $new_user [] = array(
                'header'=> 'Submission Received',
                'message'=> 'You have achieved the following mark: '.$mark.'/'.$testTotal
            );
            echo json_encode($new_user);
        }else{
            $new_user [] = array(
                'header'=> 'Submission Failed',
                'message'=> 'Could not update your mark. Try again.'
            );
            echo json_encode($new_user);
        }
    }else{
        if (updateAttempt($id,$stuID, $atmpt, $mysqli)){
            $new_user [] = array(
                'header'=> 'Submission Received',
                'message'=> 'You have achieved the following mark: '.$mark.'/'.$testTotal.', but your highest mark is '.$current_mark. '/'.$testTotal
            );
            echo json_encode($new_user);
        }else{
            $new_user [] = array(
                'header'=> 'Submission Failed',
                'message'=> 'Could not update your mark. Try again.'
            );
            echo json_encode($new_user);
        }
    }
   
}else{
    if (insertRecord($id, $stuID, $mark, $testTotal, $name, $surname, $atmpt, $mysqli)){
        $new_user [] = array(
			'header'=> 'Submission Received',
			'message'=> 'You have achieved the following mark: '.$mark.'/'.$testTotal
		);
        echo json_encode($new_user);
    }else{
        $new_user [] = array(
			'header'=> 'Submission Failed',
			'message'=> 'Could not record your mark. Try again.'
		);
        echo json_encode($new_user);
    }
}


?>