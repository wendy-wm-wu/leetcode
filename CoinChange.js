/*
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3 
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
*/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let res = Infinity;
  
  //we want to get the highest options first so we can sort 
  coins = coins.sort((a,b) => b - a); 
  
  let helper = function(idx, amount, count) {
      const coin = coins[idx];
      
      //smallest coin
      if (idx === coins.length - 1) {
          if (amount % coin === 0) {
              res = Math.min(res, count + Math.floor(amount/coin))
          }
      } else {
          for (let i = Math.floor(amount/coin); i >= 0 && count + i < res; i--) {
              helper(idx + 1, amount - coin * i, count + i);
          }
      }
  }
  helper(0, count, 0); 
  
  return res === Infinity? -1 : res; 
};