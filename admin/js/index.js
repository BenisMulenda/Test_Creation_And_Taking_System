//-------------------------------------------
//JAVASCRIPT
//-------------------------------------------

//--------------------------BEGIN---------------------------------

//--------------------------------------------
//CLEARS LOADING SCREEN
//--------------------------------------------
/* The function below serves the purpose
of removing the loading screen once the 
app has loaded on the user's screen*/
function removeLoadScreen() {
    let loadScreen = document.getElementById("loading");
    if (localStorage.getItem('email') != null) {
        window.location = "./homepage";
    } else {
        //check URL for activated
        //Below the page URL is extracted to see if an activate flag has been triggered
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');

        //The for loop below loops through all the parameters specified in the page
        //URL and see if the active flag has been set
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] == "active") {

                if (sParameterName[1] === "TRUE") {
                    alert('Email successfully validated. Please Login.');
                } else {
                    alert('Email could not be validated. Please Try Again.');
                }
            }
        }
        //This last part redirects to the login page of the website
        let App = document.getElementById("mainApp");
        loadScreen.style.display = "none";
        window.location = "./#sl-form";
        App.style.display = "flex";
    }
}


//---------------------------------------------------------
//JQUERY HAS BEEN USED FOR DB BACK AND FORTH INTERACTION
//---------------------------------------------------------
$(document).ready(function() {
    //-------------------------------------------------------
    //DISPLAY LOG IN ERROR
    //-------------------------------------------------------
    /* The following function toggles the small error block
    between visible and invincible*/
    $("#errLogin").click(function() {
        if ($("#errLogin").css("display") == "block") {
            $("#errLogin").css("display", "none")
        } else {
            $("#errLogin").css("display", "block");
        }
    });
    //-------------------------------------------------------
    //SHOW PASSWORD
    //------------------------------------------------------
    /* Toggle between type = text or password */
    $("#showPass").click(function() {
        if ($("#password").attr('type') == 'password') {
            $("#password").attr('type', 'text');
            $("#showPass").attr('class', 'fa fa-eye');
        } else {
            $("#password").attr('type', 'password');
            $("#showPass").attr('class', 'fa fa-eye-slash');
        }
    });
    //---------------------------------------------------------
    //LOGIN QUERY
    //---------------------------------------------------------
    $("#loginForm").on("submit", function(e) {
        e.preventDefault(); //avoid submitting an empty form
        //creating JSON object to send over data to the server
        var cred = {};
        cred["email_address"] = $("#email_address").val().toString().toLowerCase();
        cred["password"] = $("#psw").val();
        var credJSON = JSON.stringify(cred);

        $.ajax({
            url: "./backend/teacher_login.php",
            type: "POST",
            cache: false,
            data: credJSON,
            success: function(response) {
                data = JSON.parse(response);
                //A success message is expected
                if (data[0]["header"] != "Success") {
                    $("#errLogin").html(data[0]["message"]);
                    $("#errLogin").css("display", "block");
                } else {
                    $('#loginForm').trigger("reset");
                    //set localStorage
                    localStorage.setItem('email', data[0]["email"]);
                    localStorage.setItem('fname', data[0]["name"]);
                    localStorage.setItem('lname', data[0]["surname"]);
                    $(location).attr('href', './homepage');
                }

            }
        });
    });

    //-----------------------------
    //JQUERY SIGN UP
    //--------------------------
    $("#signupForm").on("submit", function(e) {
        e.preventDefault();

        var cred = {};
        cred["fname"] = $("#fname").val();
        cred["lname"] = $("#lname").val();
        cred["email"] = $("#email").val().toString().toLowerCase();
        cred["password"] = $("#password").val();
        var credJSON = JSON.stringify(cred);

        $.ajax({
            url: "./backend/create_teacher.php",
            type: "POST",
            cache: false,
            data: credJSON,
            success: function(response) {

                data = JSON.parse(response);
                //console.log(data);
                if (data[0]["header"] == "Oops" || data[0]["header"] == "Account Exists!") {
                    $('#popClose').attr("href", "#sl-form-signup");
                } else {
                    $('#popClose').attr("href", "#sl-form");
                    $('#signupForm').trigger("reset");
                }

                $('#popHeader').html(data[0]["header"]);
                $('#popBody').html(data[0]["message"]);
                $(location).attr('href', '#popup1');
            }
        });
    });


});

//-----------------------------END----------------------------------