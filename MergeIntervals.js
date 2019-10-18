/*
Given a collection of intervals, merge all overlapping intervals.

Example 1:

Input: [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intverals.length === 0) {
        return intervals; 
    }
    intervals.sort((a,b) => {
        a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1];  
    });
    //define prev as the first in intervals 
    let prev = intervals[0]; 
    var res = [prev];
    
    for (var curr of intervals) {
        if (curr[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], curr[1]); 
        } else {
            res.push(curr);
            prev = curr; 
        }
    }
    return res; 
};