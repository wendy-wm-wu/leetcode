/*
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true
*/

var map = {
  '(': ')',
  '{': '}',
  '[': ']'
}

var isValid = function(s) {
  //define a stack as an empty array that will get items pushed into it 
  let stack = [];
  //iterate through string
  for (let i = 0; i < s.length; i++) {
      let el = s[i];
      
      if (map[el]) {
          stack.push(map[el]);
      } else {
          if (el !== stack.pop()) {
              return false;
          }
      }
  }
  return stack.length === 0;
  //if the item matches the value
  //push into stack 
  //otherwise
  //if it's a key and the item does not equal to what's removed from the stack
  //return false
  
  //return true if the length of stack is 0 and every item has been visited 
};