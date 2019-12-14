let string = 'reversethis'

//important: strings are immutable in JavaScript

function reverseStringInPlace(string) {
  let array = string.split('');
  
  let left = 0; 
  let right = string.length - 1; 

  while (left < right) {
    let temp = array[right]; 
    array[right] = array[left];
    array[left] = temp; 

    left++;
    right--; 
  }
  return array.join(''); 
}

console.log(reverseStringInPlace(string)); 



