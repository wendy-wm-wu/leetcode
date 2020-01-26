/*
Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. 

Example:

Input: n = 10
Output: 12
Explanation: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.
Note:  

1 is typically treated as an ugly number.
n does not exceed 1690.
*/

var nthUglyNumber = function(n) {
  if (!n) return 0; 
  let i2 = 0, i3 = 0, i5 = 0; //2, 3, 5 indices 
  let cache = [1];  //fill with ugly multiples
  
  while (!cache[n - 1]) {
    let c2 = cache[i2] * 2; 
    let c3 = cache[i3] * 3;
    let c5 = cache[i5] * 5; 
    //in c2, c3, c5, we now have 3 candidates for the next number. Pick the lowest one, to record in order 
    //in the first round, that will be 2 
    let next = Math.min(c2, c3, c5);
    cache.push(next); 

    if (next === c2) {
      //now the 2 index will increase, and next round, c2 will be 4, so c3 = 3 will be the lowest
      i2++; 
    }
    if (next === c3) {
      i3++; 
    }
    if (next === c5) {
      i5++; 
    }
  }
  return cache[n - 1]; 
};


/*
use a cache [1] => initialize with 1 because 1 is considered an ugly number

// General idea is to build up an array with ugly numbers till we reach n-1
// So we will iterate multiples of 2,3,5 and record them.
// But, if just store 2,3,5 - 4,6,10 - 6,9,15 etc we'd be going out of order
// So we need to increase the indeces for 2,3,5 more wisely.
*/