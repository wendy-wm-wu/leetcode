/*
You are given a string representing an attendance record for a student. The record only contains the following three characters:
'A' : Absent.
'L' : Late.
'P' : Present.
A student could be rewarded if his attendance record doesn't contain more than one 'A' (absent) or more than two continuous 'L' (late).

You need to return whether the student could be rewarded according to his attendance record.

Example 1:
Input: "PPALLP"
Output: True
Example 2:
Input: "PPALLL"
Output: False
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function(s) {
  //iterate over string
  let numberA = 0; 
  for (let i = 0; i < s.length; i++) {
      if (s[i] === 'A') {
          numberA++;
      } else if (s[i] === 'L' && s[i + 1] === 'L' && s[i + 2] === 'L') {
          return false;
      }
  }
  if (numberA > 1) {
      return false;
  }
  return true; 
  //if contains more than one A 
      //return false
  //if contains more than two continuous L
      //return false 
};

//Inputs: string
//Outputs: boolean
//Constraints: none 
//Edge cases: cannot contain more than one A or more than two continuous L 