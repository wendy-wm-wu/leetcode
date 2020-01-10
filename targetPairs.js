let nums = [1, 6, 9, 3, 2, 2, 3];
let k = 1; 

//a + k = b 
//output: [[1,2],[2,3]]

let targetPairs = function(nums, k) {
  let map = new Map();
  let hash = {};
  for (let i = 0; i < nums.length; i++) {
    if (!hash[nums[i]]) {
      hash[nums[i]] = 1; 
    } else {
      hash[nums[i]]++; 
    }
  }
  for (let j = 0; j < nums.length; j++) {
    let target = nums[j] - k; 
    if (target in hash) {
      map.set(target, nums[j]);
      // res.push([target, nums[j]]); 
    }
  }
  return map; 
}

console.log(targetPairs(nums, k)); 