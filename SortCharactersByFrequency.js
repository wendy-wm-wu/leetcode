/*
Given a string, sort it in decreasing order based on the frequency of characters.

Example 1:

Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input:
"cccaaa"

Output:
"cccaaa"

Explanation:
Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:

Input:
"Aabb"

Output:
"bbAa"

Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
*/

var frequencySort = function(s) {
  let hash = {};
  let output = ''; 
  for (let i = 0; i < s.length; i++) {
      let letter = s[i];
      if (!hash[letter]) {
          hash[letter] = 1; 
      } else {
          hash[letter]++; 
      }
  }
  Object.keys(hash).sort((a,b) => hash[b] - hash[a]).forEach((v) => {
    for (let i = 0; i < hash[v]; i++) {
      output += v; 
    }
  });
  return output; 
};

/*
"tree" 

{"t" : 1, "r" : 1, "e" : 2}

sort and return keys and join to make string again 
*/