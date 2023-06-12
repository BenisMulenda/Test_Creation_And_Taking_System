<?php
//-----------------------------------------------------BEGIN-----------------------------------------
/*This file serves one purpose which is to send all the neccessary emails 
namely Activation email and forgot password email*/

//-------------------------------------------------------------------------
//  #~# NB :SENDER'S EMAIL NEEDS TO BE SPECIFIED IN LINE 13 AND 72 #~#     |
//-------------------------------------------------------------------------
//LINKS REQUIRE A DOMAIN
//Verification Email 
function sendVerification($fname, $lname, $email){
    //The URL below is masked in a button, Onclick the URL will automatically 
    //activate the user's account
    //the same concept applies for forgot password
    $url = '/admin/backend/activateAcc.php/GET?email='.$email.'&';//link requires domain
    $senderEmail = '';
    $message = '<html>
                    <head>
                        <title>Hazloc</title>
                        <style type="text/css">
                            body{
                                text-align:center;
                                }
                            .banner{
                                height:500px;
                                width:500px;
                                margin:0 auto;
                                }
                            .content{
                                font-family: Arial;
                                text-align:justify;
                                }
                            h1{
                                text-align:center;
                                }
                            .footer{
                                font-family: Arial;
                                text-align:justify;
                                }

                            a button{
                                background: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);
                                margin-top: 10px;
                                outline: none;
                                border: none;
                                border-radius: 50px;
                                width: 24vh;
                                height: 5vh;
                                color: white;
                                }
                        </style>
                    </head>
                    <body>
                        <h1> Welcome to Hazloc</h1>
                        <br><p class="content"> Hello '.$fname.' '.$lname.',</p><br>

                        <p class="content">You have signed up to be a Hazloc Instructor, this is a confirmation of the activation of your account. Please validate your email by clicking below:</p><p class="content"> <a href='.$url.'><button>validate</button></a></p>
                        <br>
                        <p class="content">Regards,</p>
                        <p class="footer"> - The Hazloc Team </p>

                    </body>
            </html>';
			
			$subject = "Account Activation";
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From:'.$senderEmail."\r\n";
			mail($email,$subject,$message,$headers);
}

//Forgot Password
function sendForgetPassword($fname, $lname, $email){
    $url = '/admin/backend/forgetPassword.php/GET?email='.$email.'&';//link requires domain
    $senderEmail = '';
    $message = '<html>
                    <head>
                        <title>Hazloc</title>
                        <style type="text/css">
                            body{
                                text-align:center;
                                }
                            .banner{
                                height:500px;
                                width:500px;
                                margin:0 auto;
                                }
                            .content{
                                font-family: Arial;
                                text-align:justify;
                                }
                            h1{
                                text-align:center;
                                }
                            .footer{
                                font-family: Arial;
                                text-align:justify;
                                }
                            a button{
                            background: linear-gradient(-20deg, #ff2846 0%, #6944ff 100%);
                            margin-top: 10px;
                            outline: none;
                            border: none;
                            border-radius: 50px;
                            width: 24vh;
                            height: 5vh;
                            color: white;
                            }
                        </style>
                    </head>
                    <body>
                        <h1> Welcome to Hazloc</h1>
                        <br><p class="content"> Hello '.$fname.' '.$lname.',</p><br>

                        <p class="content">Click below to activate reset your password</p>
                        <p class="content"><a href='.$url.'><button>Reset</button></a></p>
                        <br>
                        <p class="content">Regards,</p>
                        <p class="footer"> - The Hazloc Team </p>
                    </body>
                </html>';
    $subject = "Password Reset Request";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From:'.$senderEmail."\r\n";
    mail($email,$subject,$message,$headers);
}
function emailPasswordReset($name, $email){
    $senderEmail = '';
    $message = '<html>
                    <head>
                        <title>Hazloc</title>
                        <style type="text/css">
                            body{
                                text-align:center;
                                }
                            .banner{
                                height:500px;
                                width:500px;
                                margin:0 auto;
                                }
                            .content{
                                font-family: Arial;
                                text-align:justify;
                                }
                            h1{
                                text-align:center;
                                }
                            .footer{
                                font-family: Arial;
                                text-align:justify;
                                }
                        </style>
                    </head>
                    <body>
                        <h1> Password Reset</h1>
                        <br><p class="content"> Hello '.$name.',</p><br>
                        <p class="content">Your password was reset on '.date("Y-m-d h:i:sa").'.</p>
                        <p class="content">If you do not recognize this password reset, contact support.</p>
                        <br>
                        <p class="content">Regards,</p>
                        <p class="footer"> - The Hazloc Team </p>
                    </body>
				</html>';
									
					$subject = "Confirmation of Password Reset";
					$headers = "MIME-Version: 1.0" . "\r\n";
					$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
					$headers .= 'From: info@fixitapp.co.za' . "\r\n";
					mail($email,$subject,$message,$headers);
}
//----------------------------END--------------------------------------------------------------------------------------
?>
