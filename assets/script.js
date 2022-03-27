// Assignment Code
var generateBtn = document.querySelector("#generate");

const upperCaseLetters = [...Array(26)].map((val,i)=>String.fromCharCode(i + 65)) //array with all CAPS letters
const lowerCaseLetters = upperCaseLetters.map(letter => letter.toLowerCase()) //convert caps array to lower case
const specialCharactersString = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~\\" //special characters string
const specialCharacters = specialCharactersString.split("") //turn special characters string to array
const numbers = [0,1,2,3,4,5,6,7,8,9] //numbers array
const wrongLength = "Please use a numeric password length of minimum 8 characters and maximum 128" //wrong length alert
const lengthPrompt = "Please enter the password length (Minimum 8 characters and no more than 128)" //length prompt

var localPasswordPosition //Array to build an index array same length as the password
var localPasswordArray //Array to hold the local password
var localPasswordString //Local variable to hold the password as a string
var passwordSelection //Local array to hold all possible characters as selected by the user

//Generate password function
function generatePassword(){
  var passwordLengthPrompt = window.prompt(lengthPrompt) //Prompt user to enter password length
  var passwordLength = Number(passwordLengthPrompt) //convert input to number

  //If password length prompt is cancelled return function
  if (!passwordLengthPrompt){
    return
  }

  //If password length doesn't meet the length criteria then alert the user and type of number
  if(passwordLength<8 || passwordLength>128 || isNaN(passwordLengthPrompt)){
    window.alert(wrongLength)
    generatePassword() //Restart the function to prompt again
    return //Return the current call so the call stack doesn't build
  }
  
  //Ask the user if they want to include lower case letters as a criteria
  var includesLowerCase = window.confirm("Include lower case?")
  //If yes then add the lowercase letters array to the empty password selection array
  if(includesLowerCase){
    passwordSelection = lowerCaseLetters.slice(0)
  }//If no the password selection array remains empty

  //Ask the user if they want to include upper case letters as a criteria
  var includesUpperCase = window.confirm("Include UPPER case?")
  //Check if password selection array has any content if not then copy the upper case letters array
  if(!includesLowerCase && includesUpperCase){//If lower case false and upper case true
    passwordSelection = upperCaseLetters.slice(0)
  //If password selection array is not empty then concat the upper case letters array to the existing password selection array
  }else if(includesUpperCase){
    passwordSelection = passwordSelection.concat(upperCaseLetters.slice(0))
  }

  //Ask the user if they want to include numbers as a criteria
  var includesNumeric = window.confirm("Include numbers (1,2,3,...)?") //same behavior as above
  if(!includesLowerCase && !includesUpperCase && includesNumeric){
    passwordSelection = numbers.slice(0)
  }else if(includesNumeric){
    passwordSelection = passwordSelection.concat(numbers.slice(0))
  }

  //Ask the user if they want to include special characters as a criteria
  var includesSpecialCharacters = window.confirm("Include special characters (*,&,#,...) ?") //same behavior as above
  if(!includesLowerCase && !includesUpperCase && !includesNumeric && includesSpecialCharacters){
    passwordSelection = specialCharacters.slice(0)
  }else if(includesSpecialCharacters){
    passwordSelection = passwordSelection.concat(specialCharacters.slice(0))
  }

  //if the user doesn't select any type of character alert the user of the criteria and re run the function
  if(!includesLowerCase && !includesUpperCase && !includesNumeric && !includesSpecialCharacters){
    window.alert("Please select at least one character type")
    generatePassword() //Re run the function
    return //Return the current call so the call stack doesn't build
  }

  //define the length of the local password array and local password position array
  localPasswordArray = [...Array(passwordLength)]
  localPasswordPosition = [...Array(passwordLength)]

  //fill position array with index values
  for(var j = 0;j<passwordLength;j++){
    localPasswordPosition[j] = j 
  }

  //loop through the selected length of the password and add randomly selected character from the chosen criteria to the local password array
  for(var i=0;i<localPasswordArray.length;i++){
    localPasswordArray[i] = randomCharacterSelector(passwordSelection) //selects random value from passwordSelection array to build password array
  }

  checkCriteria(includesLowerCase,includesUpperCase,includesNumeric,includesSpecialCharacters, passwordLength)//checking criteria met

  //convert password array to string
  localPasswordString = localPasswordArray.join('')
  return localPasswordString
}

//function to check at least one character of selected criteria is in the password
function checkCriteria(includesLower, includesUpper, includesNumber, includesSpecial, passLength){
  var finalCheck = false
  while(!finalCheck){ //run this loop until at least one character of selected criteria is in the password
    finalCheck = true //sets to true if all criteria met then while loop stops
    if(includesLower){ //check if the lower case criteria is selected
      var checkOne  = localPasswordArray.some(r=>lowerCaseLetters.includes(r)) //check if a lower case letter is in the password
      if(!checkOne){ //if no lower case letters found in the password then run this
        var firstIndex = randomIndex(passLength)
        localPasswordArray[firstIndex] = randomCharacterSelector(lowerCaseLetters) //replace a random character in the password with a random lowercase letter
        finalCheck = false
      }
    }
    if(includesUpper){ //same behavior as above
      var checkTwo  = localPasswordArray.some(r=>upperCaseLetters.includes(r))
      if(!checkTwo){
        var secondIndex = randomIndex(passLength)
        localPasswordArray[secondIndex] = randomCharacterSelector(upperCaseLetters)
        finalCheck = false
      }
    }
    if(includesNumber){ //same behavior as above
      var checkThree  = localPasswordArray.some(r=>numbers.includes(r))
      if(!checkThree){
        var thirdIndex = randomIndex(passLength)
        localPasswordArray[thirdIndex] = randomCharacterSelector(numbers)
        finalCheck = false
      }
    }
    if(includesSpecial){ //same behavior as above
      var checkFour  = localPasswordArray.some(r=>specialCharacters.includes(r))
      if(!checkFour){
        var fourthIndex = randomIndex(passLength)
        localPasswordArray[fourthIndex] = randomCharacterSelector(specialCharacters)
        finalCheck = false
      }
    }
  }
}

//choose random index that hasn't been chosen before
function randomIndex(arrayLength){
  var localLength = arrayLength
  var currentIndex = Math.floor(Math.random() * localLength)
  if(localPasswordPosition.includes(currentIndex)){
    localPasswordPosition.splice(localPasswordPosition[currentIndex],1)
    return currentIndex
  }else{
    randomIndex(localLength)
    return
  }
}

//Choose random character from a given array
function randomCharacterSelector(type){
  var randomIndex = Math.floor(Math.random() * type.length)
  return (type[randomIndex])
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
