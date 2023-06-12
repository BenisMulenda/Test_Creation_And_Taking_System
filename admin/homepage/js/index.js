////////////////////////////////////
///JAVASCRIPT
///////////////////////////////////

/////BEGIN/////////////////////////////////////////////////////////////////////////////////////////////
let countOptions = 1;
let ls_ques = []; //USED TO STORE QUESTIONS OF TESTS CREATED
let choiceClass = ["fas fa-cat", "fas fa-dog", "fas fa-dove", "fas fa-horse", "fas fa-fish", "fas fa-frog"]; //Extra feature
const br = document.createElement("br");

/* The function below serves the purpose
of removing the loading screen once the 
app has loaded on the user's screen*/
function removeLoadScreen() {

    let loadScreen = document.getElementById("loading");

    if (localStorage.getItem('email') == null) {
        window.location = "../";
    } else {
        let loadScreen = document.getElementById("loading");
        let App = document.getElementById("mainApp");
        loadScreen.style.display = "none";
        App.style.display = "flex";
    }


}

/*This function adds another option to the multiple
choice batch*/
function addOptions() {
    let newOption = document.createElement("input");
    document.getElementById("mcq_opts").style.height = "auto";
    var newID = "opt" + countOptions;
    countOptions += 1;
    newOption.setAttribute("id", newID);
    newOption.setAttribute("name", newID);
    newOption.setAttribute("placeholder", "Enter option")
    newOption.required = true;
    document.getElementById("mcq_opts").appendChild(newOption);
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
/*This function previews the question created*/
function quesPreview(ques, options, file) {

    let container = document.createElement("div");
    container.setAttribute("class", "test-blocks");
    document.getElementById("par-question").appendChild(container);
    let para = document.createElement("p");
    para.innerText = ques;
    container.style.alignItems = "center";
    container.appendChild(para);
    container.appendChild(br);

    if (file != null) {
        let img = document.createElement("img");
        img.setAttribute("class", "questionImages");
        img.setAttribute("src", URL.createObjectURL(file));
        container.appendChild(img);
        container.appendChild(br);
    }


    for (let i = 0; i < options.length; i++) {
        let radio = document.createElement("input");
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "answer");
        radio.setAttribute("value", options[i].toLowerCase());
        radio.style.marginLeft = "10px";
        container.appendChild(radio);
        let label = document.createElement("label");
        label.setAttribute("for", options[i].toLowerCase());
        label.innerHTML = options[i];
        label.style.marginLeft = "3px";
        label.style.marginTop = "0px"

        container.appendChild(label);
        container.appendChild(br);
    }

}
/*This function stores the questions in an object called question and appends to an array of questions*/
function appendQuestion() {

    let ques = document.getElementById("test_quest");
    let ans = document.getElementById("correct_ans");
    let alloc_mark = document.getElementById("mark_alloc");
    let options = [];
    for (let i = 0; i < countOptions; i++) {
        var newID = "opt" + i;
        options.push(document.getElementById(newID).value);
    }
    var file = document.getElementById("picture-files");
    var tmpFile = null;
    let questObject = null;
    if (file.files.length > 0) {
        tmpFile = file.files[0];
        questObject = new Questions(ques.value, options, ans.value, alloc_mark.value, tmpFile, tmpFile.type);
    } else {
        questObject = new Questions(ques.value, options, ans.value, alloc_mark.value);
    }

    ls_ques.push(questObject);

    for (let i = 1; i < countOptions; i++) {
        var newID = "opt" + i;
        document.getElementById(newID).remove();
    }
    countOptions = 1;
    document.getElementById("mcq_opts").innerHtml = '';
    document.getElementById("mcq_opts").innerHtml = '<input type="text" id="opt0" name="opt0" placeholder="Enter option" required><br>';


    quesPreview(ques.value, options, tmpFile);
    document.getElementById("addQues").reset();


}
///////////////////////////////////////////////////////
///JQUERY
///////////////////////////////////////////////////////
$(document).ready(function() {
    //-------------------------------------------------------
    var name = localStorage.getItem('fname');
    var surname = localStorage.getItem('lname');
    var email = localStorage.getItem('email');

    $('#teacherName').html(name + " " + surname);

    ////LOAD CURRENT CREATED BY LECTURER
    $('#gotoHome').click(function() {

        $("#testTable tbody").empty();
        var items = {};
        items["email"] = email;
        var itemJSON = JSON.stringify(items);
        //console.log(itemJSON);
        $.ajax({
            url: "./backend/getTests.php",
            type: "POST",
            cache: false,
            data: itemJSON,
            success: function(response) {

                data = JSON.parse(response);
                var count = Object.keys(data).length;
                if (count > 0) {
                    //add rows into tables
                    for (let i = count - 1; i >= 0; i--) {

                        var testID = data[i]["testID"];
                        var date = data[i]["date"];
                        var dur = data[i]["dur"];
                        var marks = data[i]["marks"];
                        var markup = "<tr><td>" + testID + "</td><td>" + dur + "</td><td>" + marks + "</td><td>" + date + "</td></tr>";
                        $("#testTable tbody").append(markup);
                    }
                    console.log("In here");
                    console.log(data);
                }
            }
        });
    });

    ////LOGOUT
    $('#logout').click(function() {
        localStorage.clear();
        window.location = "../";
    });

    ////SAVE CREATED TEST
    $("#save_Test").on("submit", function(e) {
        e.preventDefault();

        var fd = new FormData();
        fd.append("marks", $("#marks").val());
        fd.append("attempts", $("#attempts").val());
        fd.append("dur", $("#dur").val());
        fd.append("temail", email);

        fd.append("quesObj", JSON.stringify(ls_ques));

        var theCounter = parseInt(0);
        for (let i = 0; i < ls_ques.length; i++) {
            if (ls_ques[i].getFile() != null) {
                fd.append("Image_" + theCounter, ls_ques[i].getFile());
                theCounter++;
            }
        }
        ////CHECKING EMPTY SUBMISSION
        if (ls_ques.length > 0) {
            $.ajax({
                url: "./backend/create_test.php",
                type: "POST",
                cache: false,
                data: fd,
                processData: false,
                contentType: false,
                success: function(response) {

                    data = JSON.parse(response);

                    if (data[0]["header"] != "Error") {
                        //flag = true;
                        for (let i = 1; i < countOptions; i++) {
                            var newID = "#opt" + i;
                            $(newID).remove();
                        }
                        countOptions = 1;
                        $("#mcq_opts").css("height", "10vh");
                        $("#addQues").trigger("reset");
                        $("#save_Test").trigger("reset");
                        $("#save_response").css("background", "green");
                        $("#save_response").html(data[0]["message"]);
                        $("#save_response").css("display", "block");
                        ls_ques = [];
                        $("#par-question").empty();
                    } else {
                        $("#save_response").css("background", "red");
                        $("#save_response").html(data[0]["message"]);
                        $("#save_response").css("display", "block");
                    }
                }
            });

        } else {
            $("#save_response").css("background", "red");
            $("#save_response").html("Test must have at least one question!");
            $("#save_response").css("display", "block");

        }

    });

    $("#save_response").click(function() {
        $("#save_response").css("display", "none");
    });

    ///Query Students taking a specific test to get their results/////
    $("#getStudent").on("submit", function(e) {
        e.preventDefault();
        $("#student-container").empty();
        let cdefault = '<p id="list-students">Students</p>';
        for (let i = 0; i < 3; i++) {
            cdefault += '<div class="dummy-row"></div>';
        }
        $("#student-container").append($(cdefault));

        var items = {};
        items["testID"] = $("#search_text").val();
        var itemJSON = JSON.stringify(items);

        $.ajax({
            url: "./backend/getStudents.php",
            type: "POST",
            cache: false,
            data: itemJSON,
            success: function(response) {
                data = JSON.parse(response);
                var count = Object.keys(data).length;
                if (count > 0) {
                    for (let d = 0; d < count; d++) {

                        let x = Math.floor(Math.random() * (5 - 0 + 1)) + 0;

                        let createStudent = '<div class="student"><div class="student-card">' +
                            '<i id="studentIcon" class="' + choiceClass[x] + '" aria-hidden="true"></i>' +
                            '<p id="studentName">' + data[d]["studentID"] + '</p>' +
                            '<p>' + data[d]["name"] + ' ' + data[d]["surname"] + '</p>';
                        if (Math.round((data[d]["marks"] / data[d]["testTotal"]) * 100) < 50) {
                            createStudent +=
                                '<p><i id="mark" style="color:red" class="fa fa-circle" aria-hidden="true"></i> ' + Math.round(data[d]["marks"] / data[d]["testTotal"] * 100) +
                                ' <span>    </span><i id="minutes" class="fa fa-calendar" aria-hidden="true"></i> ' + data[d]["dateTaken"] + ' </p></div></div>';

                        } else if (Math.round((data[d]["marks"] / data[d]["testTotal"]) * 100) >= 50 && Math.round((data[d]["marks"] / data[d]["testTotal"]) * 100) < 75) {
                            createStudent += '<p><i id="mark" style="color:yellow" class="fa fa-circle" aria-hidden="true"></i> ' + Math.round(data[d]["marks"] / data[d]["testTotal"] * 100) +
                                ' <span>    </span><i id="minutes" class="fa fa-calendar" aria-hidden="true"></i> ' + data[d]["dateTaken"] + ' </p></div></div>';
                        } else {
                            createStudent += '<p><i id="mark" style="color:green" class="fa fa-circle" aria-hidden="true"></i> ' + Math.round(data[d]["marks"] / data[d]["testTotal"] * 100) +
                                ' <span>     </span><i id="minutes" class="fa fa-calendar" aria-hidden="true"></i> ' + data[d]["dateTaken"] + ' </p></div></div>';
                        }
                        console.log(createStudent);
                        $("#student-container").append($(createStudent));
                    }

                }
            }
        });
    });
});

///////////END/////////////////////////////////////////////////////////////////////////////////////////