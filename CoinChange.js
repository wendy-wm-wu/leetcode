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
    
    let helper = function(amountLeft, coins, currentIndex) {
        currentIndex = currentIndex || 0; 

        //we hit the amount spot on 
        if (amountLeft === 0) return 1;
        //used too many coins 
        if (amoutnLeft < 0) return 0; 
        //we're out of coins
        if (currentIndex >= denominations.length) return 0; 
        //choose a current coin
        var currentCoin = coins[currentIndex]; 

        //check possibilities for each number of times to use currentCoin 
        var numPossibilities = 0; 
        while (amountLeft >= 0) {
            numPossibilities += helper(amountLeft, coins, currentIndex + 1); 
            amountLeft -= currentCoin; 
        }
        return numPossibilities; 
    }
    return helper(coins, amount); 
};