/*

We have a list of points on the plane.  Find the K closest points to the origin (0, 0).
(Here, the distance between two points on a plane is the Euclidean distance.)=
You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)
Example 1:

Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
*/
let points = [[3,3],[5,-1],[-2,4]];
let K = 2; 

var kClosest = function(points, K) {
  return points.sort((a,b) => distance(a) - distance(b)).slice(0, K); 
};

var distance = function(a) {
  return a[0] * a[0] + a[1] * a[1]; 
}

console.log(kClosest(points, K)); 

/*
Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
3^2 + 3^2 = 18
5^2 + -1(^2) = 26
-2(^2) + 4^2 = 4 + 16 = 20 

distance formula used inside sorting function
multiply a[0] * a[0] + a[1] * a[1]

sort possibilities and slice by k options 
*/