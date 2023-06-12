//////////////////////////////
/////JAVASCRIPT
/////////////////////////////


//////BEGIN///////////////////////////////////////////


/* The function below serves the purpose
of removing the loading screen once the 
app has loaded on the user's screen*/
function removeLoadScreen() {
    let loadScreen = document.getElementById("loading");
    let App = document.getElementById("mainApp");
    loadScreen.style.display = "none";
    window.location = "./#test";
    App.style.display = "flex";
    //check if local storage is set then login simple 
}

//////////////////////////////////////////
////////JQUERY LOGIN
/////////////////////////////////////////
$(document).ready(function() {
    //--------------------------
    $("#loginForm").on("submit", function(e) {
        e.preventDefault();
        //JSON OBJECT of stu credentials as well as test ID
        var cred = {};
        cred["testID"] = $("#testID").val();
        cred["stuID"] = $("#pass").val();
        var credJSON = JSON.stringify(cred);
        localStorage.setItem('pass', $("#pass").val());
        localStorage.setItem('name', $("#name").val());
        localStorage.setItem('surname', $("#surname").val());

        $.ajax({
            url: "./backend/checkTestExists.php",
            type: "POST",
            cache: false,
            data: credJSON,
            success: function(response) {
                data = JSON.parse(response);
                var count = Object.keys(data).length;

                if (count > 0) {
                    console.log(data)

                    localStorage.setItem('attempts', data[0]["stuAttempts"]);
                    localStorage.setItem('maxAttempts', data[0]["attempts"]);
                    localStorage.setItem('mark', data[0]["stuMark"]);
                    localStorage.setItem('total', data[0]["marks"]);
                    localStorage.setItem('duration', data[0]["dur"]);
                    localStorage.setItem('testID', data[0]["testID"]);
                    window.location = "./homepage";

                } else {
                    //popup test does not exist
                    $("#title").html("Test does not exist!");
                    $("#title").css("color", "white");
                    $(".popup").css("background", "red");
                    $("#msg").css("color", "white");
                    $("#msg").html("The requested test does not exist. Please enter the correct test ID.");
                    window.location = "./#popup1";

                }

            }
        });
    });

});

////////////////END//////////////////////////////////