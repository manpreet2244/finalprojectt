var attempt = 3; 
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if ( username == "user" && password == "user"){
alert ("Login successfully");
window.location = "final_project.html"; 
return false;
}
else{

alert("please fill the empty fields or you have entered the wrong user id or password!");


}
}