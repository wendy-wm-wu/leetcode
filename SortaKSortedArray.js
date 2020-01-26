/*
Write a program which takes as input a very long sequence of numbers and prints the numbers in sorted order. Each number is at most k away from its correctly sorted position. (Such an array is sometimes referred to as being k-sorted).
*/

///Quick Sort - (O (n log n)) time complexity - brute force

var input = [ 3, -1, 2, 6, 4, 5 , 8 ], k = 2

function sortKSortedArray(input, k) {
  if (input.length <= 1) return input; 
  let pivot = input[Math.floor(Math.random() * input.length)];
  let left = [];
  let equal = [];
  let right = [];
  
  for (let i = 0; i < input.length; i++) {
    let num = input[i];
    if (num < pivot) {
      left.push(num);
    } else if (num > pivot) {
      right.push(num);
    } else {
      equal.push(num); 
    }
  }

  left = sortKSortedArray(left, k);
  right = sortKSortedArray(right, k);

  return left.concat(equal, right); 

}

console.log(sortKSortedArray(input, k)); 