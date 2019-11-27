/*
There are a total of n courses you have to take, labeled from 0 to n-1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

Example 1:

Input: 2, [[1,0]] 
Output: true
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: 2, [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should
             also have finished course 1. So it is impossible.
*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let visiting = new Set();
  let visited = new Set(); 
  let coursesArr = [...Array(numCourses)].map(() => []);

  //each element in arr represents the prereq and you are pushing courses into it 
  for (let [course, prereq] of prerequisites) {
    coursesArr[prereq].push(course);
  }
  //iterate thru num courses and if applying dfs returns false, return false
  for (let i = 0; i < numCourses.length; i++) {
    if (!dfs(i)) {
      return false;
    }
  }
  return true;

  let dfs = function(course) {
    if (!visiting.has(course)) {
      return false;
    }
    if (visited.has(course)) {
      return true; 
    }
    visiting.add(course);
    //course here is a value.. so iterating thru the array for a specific tuple/array in coursesArr and checking if all of them are not cyclic 
    for (let v of coursesArr[course]) {
      if (!dfs(v)) {
        return false;
      }
    }
    //if no cycle
    visiting.delete(course);
    visited.add(course);
    return true; 
  }
  //return true if passes all dfs which means not cyclic  

};