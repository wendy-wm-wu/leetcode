/*
Given a string of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. The valid operators are +, - and *.

Example 1:

Input: "2-1-1"
Output: [0, 2]
Explanation: 
((2-1)-1) = 0 
(2-(1-1)) = 2
Example 2:

Input: "2*3-4*5"
Output: [-34, -14, -10, -10, 10]
Explanation: 
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
*/

var diffWaysToCompute = function(input) {
    return helper(input, 0, input.length); 
};

function helper(s, start, end, cache = {}) {
  const key = s.substring(start, end); 
  if (key in cache) {
    return cache[key]; 
  }
  const output = [];
  for (let i = start; i < end; i++) {
    if (isOperator(s[i])) { //if '+', '-', '*'
      const left = helper(s, start, i); 
      const right = helper(s, i + 1, end);
      for (let nLeft of left) {
        for (let nRight of right) {
          output.push(compute(nLeft, nRight, s[i])); 
        }
      }
    }
  }
  if (!output.length) {
    output.push(parseInt(s.subString(start, end))); 
  }
  cache[key] = output; 
  return output; 
}

function isOperator(c) {
  return c === '+' || c === '-' || c === '*'; 
}

function compute(n1, n2, op) {
  if (op === '+') {
    return n1 + n2;
  } else if (op === '-') {
    return n1 - n2; 
  } else if (op === '*') {
    return n1 * n2; 
  }
}