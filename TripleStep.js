/*
 A child is running up a staircase with n steps and can hop either 1 step, 2 steps, or 3
steps at a time, implement a method to count how many possible ways the child can run up the
stairs.
*/

function tripleStep(n) {
  let count = 0;
  function recurse(num) {
    if (num === 0) {
      count++; 
    } else {
      recurse(num - 1);
      recurse(num - 2);
      recurse(num - 3); 
    }
  }
  recruse(n);
  return count; 
}