/*
Given a collection of numbers that might contain duplicates, return all possible unique permutations.

Example:

Input: [1,1,2]
Output:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = (nums) => {
  //define result as empty array
  let result = [];
  //define a visited array as a new array with all items filled with false to indicate visited 
  let visited = new Array(nums.length).fill(false);
  //sort nums to ensure uniques
  nums.sort((a, b) => a - b);

  //define helper function with nums, current, and visited
  function dfs(nums, current, visited) {
      if (current.length === nums.length) {
          result.push(current);
          return;
      }
      for (let i = 0; i < nums.length; i++) {
          //will skip if it's been visited
          //will skip if the number is equal to the number before it and the number before it has not been visited 
          if (visited[i] || i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]) {
              continue; 
          }
          //set to true when visited 
          visited[i] = true; 
          //this will recurse until everything is visited and will push into array 
          dfs(nums, current.concat(nums[i]), visited); 
          //this resets everything to beginning 
          visited[i] = false; 
      }
  }

  dfs(nums, [], visited);
  return result; 
  //if current length is equal to nums length
  //push to result
  //return to exit loop
  //iterate through nums array
  //if item is visited or the value is greater than one and the num is equal to the number bfeore it and it's false 
  //continue an skip
  //set visited to true
  //call recusive function 
  //set visit to false to reset 

  //call helper function with nums, empty array, and visited 
  //return result
};
//define helper function 
//if the length of nums = 0 
//push a copy into array 
//return 

//define a previous variable 
//iterate through the nums array 
//if previous equals the item in the array, continue and skip
//else, set previous to the next item 


//Inputs: array of nums
//Outputs: nested array of all possible combinations  
//Edge Cases: none
//Constraints: no duplicates

