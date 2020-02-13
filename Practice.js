/*
At a lemonade stand, each lemonade costs $5. 

Customers are standing in a queue to buy from you, and order one at a time (in the order specified by bills).

Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill.  You must provide the correct change to each customer, so that the net transaction is that the customer pays $5.

Note that you don't have any change in hand at first.

Return true if and only if you can provide every customer with correct change.

Example 1:

Input: [5,5,5,10,20]
Output: true
Explanation: 
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
Example 2:

Input: [5,5,10]
Output: true
Example 3:

Input: [10,10]
Output: false
Example 4:

Input: [5,5,10,10,20]
Output: false
Explanation: 
From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we can't give change of $15 back because we only have two $10 bills.
Since not every customer received correct change, the answer is false.
*/ 

var bills = [5,5,10,10,20];

var lemonadeChange = function(bills) {
  let count5 = 0;
  let count10 = 0;
  let lemonadeCost = 5;  

  for (let i = 0; i < bills.length; i++) {
    let bill = bills[i]; 
    if (bill === 5) {
      count5++; 
    } else if (bill === 10) {
      count10++; 
    }
    if (bill === 20) {
      if (count10 >= 1 && count5 >= 1) {
        count10--;
        count5--; 
      } else if (count5 >= 3) {
        count5 -= 3; 
      } else {
        return false; 
      }
    }
    if (bill === 10) {
      if (count5 >= 1) {
        count5--; 
      } else {
        return false; 
      }
    }
  }
  return true; 
}

console.log(lemonadeChange(bills)); 

/*
collect 5s and 10s for change
return difference if greater than 5 
if 20, return 15
if 10, return 5 

*/