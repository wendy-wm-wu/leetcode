let message = 'find you will pain only go you recordings security the into if'; 

function reverseWords(message) {
  var messageArray = message.split(''); 

  reverseChars(messageArray, 0, messageArray.length - 1); 

  let wordStartIndex = 0; 

  for (let i = 0; i <= messageArray.length; i++) {
    let item = messageArray[i]; 
    if (i === messageArray.length || item === ' ') {
      reverseChars(messageArray, wordStartIndex, i - 1); 
      wordStartIndex = i + 1; 
    }
  }
  return messageArray.join(''); 
}

function reverseChars(messageArray, startIndex, endIndex) {
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