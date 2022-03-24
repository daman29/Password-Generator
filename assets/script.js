// Assignment Code
var generateBtn = document.querySelector("#generate");
const upperCaseLetters = [...Array(26)].map((val,i)=>String.fromCharCode(i + 65))
const lowerCaseLetters = upperCaseLetters.map(letter => letter.toLowerCase())

function generatePassword(){
  var passwordLength = Number(window.prompt("Please enter the password length (Minimum 8 characters and no more than 128)"))
  if(passwordLength<8 || passwordLength>128){
    window.alert("Please use a password length of minimum 8 characters and maximum 128")
    passwordLength = Number(window.prompt("Please enter the password length (Minimum 8 characters and no more than 128)"))
  }
  
  var includesLowerCase = window.confirm("Include lower case?")
  var includesUpperCase = window.confirm("Include upper case?")
  var includesNumeric = window.confirm("Include numbers?")
  var includesSpecialCharacters = window.confirm("Include special characters?")

  if(includesLowerCase){

  }
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
