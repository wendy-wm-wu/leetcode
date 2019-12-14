let message = 'find you will pain only go you recordings security the into if'; 

function reverseWords(message) {

  var messageArray = message.split('');
  //reverse the characters in the entire message
  reverseLetters(messageArray, 0, messageArray.length - 1); 
  //gives us the right worder
  //but with each word backwards
  var currentWordStartIndex = 0;
  for (let i = 0; i < messageArray.length; i++) {
    //found the end of the current word
    let char = messageArray[i]; 
    if (i === messageArray.length || char === ' ') {
      //if we haven't exhausted the string 
      //our next word's start is one character ahead 
      reverseLetters(messageArray, currentWordStartIndex, i - 1); 
      currentWordStartIndex = i + 1; 
    }
  }
  return messageArray.join(''); 
}

function reverseLetters(messageArray, startIndex, endIndex) {
  while (startIndex < endIndex) {
    let temp = messageArray[startIndex];
    messageArray[startIndex] = messageArray[endIndex];
    messageArray[endIndex] = temp; 

    startIndex++;
    endIndex--; 
  }
}
/*
Reverse all the characters in the entire message, giving us the correct word order but with each word backwards.
Reverse the characters in each individual word
*/

console.log(reverseWords(message)); 