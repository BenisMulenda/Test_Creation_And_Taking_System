////////////////////////////
////////////////JAVASCRIPT
////////////////////////////

/////////////////////////////////////////////////////////////////////BEGIN///////////////////////////////////////////

/* The function below serves the purpose
of removing the loading screen once the 
app has loaded on the user's screen*/

//save answers in case of reload
//time save 

let testID = "";


var stuAtmpt = parseInt(0); //student attempts
var stuMark = parseInt(-1); //student's current mark
var total = parseInt(-1); //total marks for the test
var maxAtmpt = parseInt(-1); //maximum allowable attempts
let stu_ID = ""; //stores student ID
let ans = []; //stores question Objects
let studans = null; //stores student answers 
var count = 10 * localStorage.getItem("duration") * 60; // tenths * seconds * hours, TIMER
var playing = true; //If timer is ticking or not
let pageID = ""; //used to change the page id 

function removeLoadScreen() {


    testID = localStorage.getItem("testID");
    stuAtmpt = parseInt(localStorage.getItem("attempts"));
    maxAtmpt = parseInt(localStorage.getItem("maxAttempts"));
    stuMark = parseInt(localStorage.getItem("mark"));
    total = parseInt(localStorage.getItem("total"));
    stu_ID = localStorage.getItem("pass");

    if (testID != null) {
        document.getElementById("stuID").innerHTML = stu_ID;
        //Updating homepage values depending on whether not a student has attempted the test before
        if (stuAtmpt < maxAtmpt) {
            if (stuAtmpt != 0) {
                let showMark = "Mark: <b>" + stuMark + "/" + total + " (" + Math.round(stuMark / total * 100) + "%)</b> <span></span> Attempts: " + stuAtmpt + "/" + maxAtmpt;
                document.getElementById("marks").innerHTML = showMark;
            }
        } else {
            let btnTest = document.getElementById("testbegin");
            btnTest.disabled = true;
            btnTest.style.background = "grey";
            let showMark = "Mark: <b>" + stuMark + "/" + total + " (" + Math.round(stuMark / total * 100) + "%)</b> <span></span> Attempts: " + stuAtmpt + "/" + maxAtmpt;
            document.getElementById("marks").innerHTML = showMark;
        }
        let loadScreen = document.getElementById("loading");
        let App = document.getElementById("mainApp");
        let stuPortal = document.getElementById("homepage");
        pageID = "myportal@" + testID;

        stuPortal.id = pageID;
        loadScreen.style.display = "none";
        App.style.display = "flex";
        window.location = "./#" + pageID;

    } else {
        window.location = "../";
    }
}

/*This function toggles the instructions on or off on the new test section*/
function toggleInstructions() {
    let icon = document.getElementById("showInst");

    if (icon.getAttribute("class") == "fa fa-eye") {
        icon.setAttribute("class", "fa fa-eye-slash");
        document.getElementById("inst").style.display = "none";
    } else {
        icon.setAttribute("class", "fa fa-eye");
        document.getElementById("inst").style.display = "block";
    }
}

//COUNTDOWN FUNCTIONS STARTS HERE
function countdown() {

    // playing = true;
    displayTime();
    if (count == 0) {
        playing = false;
        document.getElementById("par-question").innerHTML = "";
        document.getElementById("par-question").innerHTML = '<div class="test-q"><p id="time_left"></p></div>';
    } else if (playing) {
        setTimeout(countdown, 100);
        count--;
    } else {
        clearTimeout(setTimeout(countdown, 100));

    }
}


function displayTime() {

    var tenths = count;
    var sec = Math.floor(tenths / 10);
    var hours = Math.floor(sec / 3600);
    sec -= hours * (3600);
    var mins = Math.floor(sec / 60);
    sec -= mins * (60);

    if (hours < 1) {
        document.getElementById('time_left').innerHTML = LeadingZero(mins) + ':' + LeadingZero(sec);
    } else {
        document.getElementById('time_left').innerHTML = hours + ':' + LeadingZero(mins) + ':' + LeadingZero(sec);
    }
}

function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : +Time;
}
//COUNTDOWN FUNCTIONS ENDS HERE

//THIS FUNCTION STARTS THE TEST
//CHECK WHETHER OR NOT STUDENT HAS ALREADY ATTEMPTED 
//THE TEST
function testStart() {
    let btnTest = document.getElementById("submitTest");
    btnTest.disabled = true;
    btnTest.style.background = "grey";
    count = 10 * localStorage.getItem("duration") * 60; // tenths * seconds * hours

    if (stuAtmpt < maxAtmpt) {

        document.getElementById("test-questions").innerHTML = "Test ID: " + testID;
        document.getElementById("ul-test-total").innerHTML = "This test has a total of " + total + " marks.";
        document.getElementById("ul-test-attempts").innerHTML = "You have " + maxAtmpt + " attempts.";
        playing = true;
        window.location = "./#tests";

    } else {
        alert("You have already exceeded the maximum allowable test attempts");
    }

}

//STORES STUDENT'S ANSWERS IN AN ARRAY
function AddToArray(x) {
    ele = document.getElementsByName("ans" + x);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            studans[x] = ele[i].value;
    }
}
//MARKS THE STUDENT TEST 
function MarkTest() {
    var sMark = parseInt(0);
    for (let i = 0; i < studans.length; i++) {
        if (studans[i] === ans[i].ans) {
            sMark += parseInt(ans[i].mark);
        }
    }
    return sMark;
}


/////////////////////////////
/////////////////JQUERY
//////////////////////////////
$(document).ready(function() {
    ////SAVES STUDENT'S TEST
    $('#submitTest').click(function() {
        let text = "Are you sure you want to submit your test?";

        if (confirm(text) == true) {

            stuAtmpt++;
            console.log("Attempts " + stuAtmpt)
            var cred = {};
            cred["mark"] = MarkTest();
            cred["attempts"] = stuAtmpt;
            cred["stuID"] = stu_ID;
            cred["testID"] = testID;
            cred["testTotal"] = total;
            cred["name"] = localStorage.getItem('name');
            cred["surname"] = localStorage.getItem('surname');
            var credJSON = JSON.stringify(cred);

            localStorage.setItem('attempts', stuAtmpt); //updating attempts

            //highest marks stored
            if (cred["mark"] > stuMark) {
                stuMark = cred["mark"];
                localStorage.setItem('mark', stuMark);
            }


            $.ajax({
                url: "./backend/saveTest.php",
                type: "POST",
                cache: false,
                data: credJSON,
                success: function(response) {
                    data = JSON.parse(response);
                    if (data[0]['header'] == 'Submission Received') {
                        //display POPUP
                        $('#title').html(data[0]['header']);
                        $('#msg').html(data[0]['message']);
                        $('#redirect').attr('href', '#' + pageID);
                        //update homepage stuff
                        let showMark = "Mark: <b>" + stuMark + "/" + total + " (" + Math.round(stuMark / total * 100) + "%)</b> <span></span> Attempts: " + stuAtmpt + "/" + maxAtmpt;
                        $("#marks").html(showMark);
                        //clear timer
                        playing = false;
                        //count = 10 * localStorage.getItem("duration") * 60; // tenths * seconds * hours
                        //clear div questions 
                        $('#par-question').empty();
                        $('#par-question').html('<div class="test-q"><p id="time_left"></p></div>');

                        if (stuAtmpt >= maxAtmpt) {
                            $('#testbegin').css('background', 'grey');
                            $('#testbegin').prop('disabled', true);
                        }
                        $('#generateTest').css('background', 'linear-gradient(-20deg, #ff2846 0%, #6944ff 100%)');
                        $('#generateTest').prop('disabled', false);
                        //countdown();
                        window.location = "./#popup1";
                    } else {
                        //display POPUP
                        $('#title'.html(data[0]['header']));
                        $('#msg'.html(data[0]['message']));
                        $('#redirect').attr('href', '#');
                        //clear timer
                        playing = false;

                        //countdown();
                        //clear div questions 
                        $('#par-question').empty();
                        $('#par-question').html('<div class="test-q"><p id="time_left"></p></div>');

                        window.location = "./#popup1";
                    }
                }
            });
        }
    });

    //FUNCTION TO GET ALL TEST QUESTIONS AND IMAGES
    $("#generateTest").click(function() {
        if (stuAtmpt < maxAtmpt) {

            let quesJSON = '/admin/homepage/backend/TestQuestions/' + testID + '.json';
            $.getJSON(quesJSON, function(json) {
                var count = Object.keys(json).length;
                var imgCount = parseInt(0);
                var filepath = '';
                studans = new Array(count);
                var testQuestion = '<div class="test-blocks">';
                if (count > 0) {
                    for (let i = 0; i < count; i++) {
                        testQuestion += '<p>' + json[i].question + '</p><br></br>';
                        ans.push(json[i]);
                        studans[i] = '';

                        if (json[i].fileType != '') {
                            var ext = json[i].fileType.replace('image/', '')
                            console.log(ext);
                            console.log(imgCount);
                            filepath = '/admin/homepage/backend/TestImages/' + testID + '_' + imgCount + '.' + ext;
                            testQuestion += '<img class="questionImages" src="' + filepath + '" alt="" /><br>';
                            imgCount += 1;
                        }
                        //options for question 
                        for (let d = 0; d < json[i].arrOptions.length; d++) {
                            testQuestion += '<input type="radio" onclick="AddToArray(' + i + ')" id="' + json[i].arrOptions[d] + '" name="ans' + i + '" value="' + json[i].arrOptions[d] + '">' +
                                '<label for = "' + json[i].arrOptions[d] + '"> ' + json[i].arrOptions[d] + '</label><br></br>';
                        }

                        testQuestion += '</div>';
                        $('#par-question').append($(testQuestion));
                        testQuestion = '<div class="test-blocks">';

                    }
                    playing = true;
                    $('#submitTest').css('background', 'linear-gradient(-20deg, #ff2846 0%, #6944ff 100%)');
                    $('#submitTest').prop('disabled', false);
                    $('#generateTest').css('background', 'grey');
                    $('#generateTest').prop('disabled', true);
                    countdown();
                }

            });
        } else {
            $('#submitTest').css('background', 'grey');
            $('#submitTest').prop('disabled', true);
        }
    });
});


///////////////////////////////////////////////END////////////////////////////////////////////////////