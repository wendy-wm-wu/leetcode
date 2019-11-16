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
  
  for (let [course, prereq] of prerequisites) {
      coursesArr[prereq].push(course);
  }
  
  for (let i = 0; i < numCourses; i++) {
      if (!dfs(i)) {
          return false;
      }
  }
  return true;
  
  function dfs(course) {
      if (visited.has(course)) {
          return true;
      }
      if (visiting.has(course)) {
          return false;
      }
      visiting.add(course);
      for (let c of coursesArr[course]) {
          if (!dfs(c)) {
              return false;
          }
      }
      visiting.delete(course);
      visited.add(course);
      return true;
  }
};