
let obj = {
  "Key1" : "1",
  "Key2.a" : "2",
  "Key2.b" : "3",
  "Key2.c.d" : "3",
  "Key2.c.e" : "1"
}

function turnIntoNestedObject(obj) {
  let output = {};
  for (let key in obj) {
    let currObj = output; 
    let array = key.split('.'); 
    console.log(array);
    for (let i = 0; i < array.length; i++) {
      if (currObj[array[i]]) {
        continue; 
        //don't reassign
      } else {
        currObj[array[i]] = {};
      }
      if (i === array.length - 1) {
        currObj[array[i]] = obj[key];
      }
      // if (currObj[array[i]] || i === array.length - 1) {
      //   currObj[array[i]] = obj[key]; 
      // } else {
      //   currObj[array[i]] = {};
      // }
      currObj = currObj[array[i]];
    }
  }
  return output; 
}

console.log(turnIntoNestedObject(obj)); 

/*
split key by . 
if length greater than 1
iterate thru key
every element = {}
pointer to keep track of current obj 

input: {
  "Key1" : "1",
  "Key2.a" : "2",
  "Key2.b" : "3",
  "Key2.c.d" : "3",
  "Key2.c.e" : "1"
}

output:  dict = {
  "Key1" : "1",
  "Key2" : {
      "a" : "2",
      "b" : "3",
      "c" : {
          "d" : "3",
          "e" : {
              "" : "1"
          }
      }
  }
}
*/