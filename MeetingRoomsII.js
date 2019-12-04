/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]
Output: 1
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */

// var minMeetingRooms = function(intervals) {
//     if (!intervals.length) {
//         return 0; 
//     }
//     let starts = [];
//     let ends = [];

//     for (let i = 0; i < intervals.length; i++) {
//         let current = intervals[i];
//         starts.push(current[0]);
//         ends.push(current[1]); 
//     }

//     starts.sort((a,b) => a - b);
//     ends.sort((a,b) => a - b); 

//     for (let i = 0; i < starts.length; i++) {
//         if (starts[i + 1] > ends[i]) {
//             return false; 
//         }
//     }
//     return true; 
// }





var minMeetingRooms = function(intervals) {
  if (!intervals.length) {
      return 0;
  }
  let rooms = 0;
  let end = 0; 
  
  //sort starts and ends
  let starts = intervals.map(a => a[0]).sort((a,b) => a - b);
  let ends = intervals.map(a => a[1]).sort((a,b) => a - b);
  
  for (let i = 0; i < intervals.length; i++) {
      if (starts[i] < ends[end]) {
          rooms++;
      } else {
          end++;
      }
  }
  return rooms;
};