let array = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10];
let n = 10; 

function findDuplicateNumber(array, n) {
  let sum = ((n * n) + n)/2; 
  let arraySum = 0;

  for (let i = 0; i < array.length; i++) {
    let num = array[i];
    arraySum += num; 
  }
  return arraySum - sum; 
}

console.log(findDuplicateNumber(array, n)); 