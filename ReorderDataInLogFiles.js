/*
You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.

 

Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
 

Constraints:

0 <= logs.length <= 100
3 <= logs[i].length <= 100
logs[i] is guaranteed to have an identifier, and a word after the identifier.
*/

/**
 * @param {string[]} logs
 * @return {string[]}
 */
/**
 * @param {string[]} logs
 * @return {string[]}
 */
var reorderLogFiles = function(logs) {
  let letter = [];
  let digit = [];
  for (let i of logs) {
      if (i.split(' ')[1].charAt(0) >= '0' && i.split(' ')[1].charAt(0) <= '9') {
          digit.push(i);
      } else {
          letter.push(i);
      }
  }
  letter.sort((a, b) => {
      if (a.split(' ')[1].localeCompare(b.split(' ')[1]) === 0 && a.split(' ')[2].localeCompare(b.split(' ')[2]) === 0) {
          return a.split(' ')[0].localeCompare(b.split(' ')[0]); 
      } else {
          return a.split(' ')[1].localeCompare(b.split(' ')[1]) || a.split(' ')[2].localeCompare(b.split(' ')[2]);
      }
  });
  return letter.concat(digit);
};