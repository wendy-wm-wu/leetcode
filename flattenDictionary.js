/*
A dictionary is a type of data structure that is supported natively in all major interpreted languages such as JavaScript, Python, Ruby and PHP, where it’s known as an Object, Dictionary, Hash and Array, respectively. In simple terms, a dictionary is a collection of unique keys and their values. The values can typically be of any primitive type (i.e an integer, boolean, double, string etc) or other dictionaries (dictionaries can be nested). However, for this exercise assume that values are either an integer, a string or another dictionary.

Given a dictionary dict, write a function flattenDictionary that returns a flattened version of it .

If you’re using a compiled language such Java, C++, C#, Swift and Go, you may want to use a Map/Dictionary/Hash Table that maps strings (keys) to a generic type (e.g. Object in Java, AnyObject in Swift etc.) to allow nested dictionaries.

If a certain key is empty, it should be excluded from the output (see e in the example below).

Example:

input:  dict = {
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

output: {
            "Key1" : "1",
            "Key2.a" : "2",
            "Key2.b" : "3",
            "Key2.c.d" : "3",
            "Key2.c.e" : "1"
        }
Important: when you concatenate keys, make sure to add the dot character between them. For instance concatenating Key2, c and d the result key would be Key2.c.d.

Constraints:

[time limit] 5000ms
[input] Dictionary dict
[output] Dictionary
*/

let dict = {
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
}; 

function flattenDictionary(dict) {
  let flatDictionary = {};
  flattenDictionaryHelper('', dict, flatDictionary);
  return flatDictionary;
}

function flattenDictionaryHelper(initialKey, dict, flatDictionary) {
  //initialKey is the pointer 
  for (let i in dict) {
    //if value is not an object
    if (typeof dict[i] !== "object") {
      if (initialKey == null || initialKey == "") {
        flatDictionary[i] = dict[i]; 
      } else {
        if (i == "") {
          flatDictionary[`${initialKey}`] = dict[i]; 
        } else {
          flatDictionary[`${initialKey}.${i}`] = dict[i]; 
        }
      }
    } else { //if it is an object, call recursion
      if (initialKey == null || initialKey == "") {
        flattenDictionaryHelper(i, dict[i], flatDictionary); 
      } else {
        flattenDictionaryHelper(`${initialKey}.${i}`, dict[i], flatDictionary); 
      }
    }
  }
}

console.log(flattenDictionary(dict));


//input1: {"Key1":"1","Key2":{"a":"2","b":"3","c":{"d":"3","e":"1"}}}
//output1: {"Key1":"1","Key2.a":"2","Key2.b":"3","Key2.c.d":"3","Key2.c.e":"1"}

//input2: {"Key":{"a":"2","b":"3"}}
//output2: {"Key.a":"2","Key.b":"3"}

//input3: {"Key1":"1","Key2":{"a":"2","b":"3","c":{"d":"3","e":{"f":"4"}}}}
//output3: {"Key1":"1","Key2.a":"2","Key2.b":"3","Key2.c.d":"3","Key2.c.e.f":"4"}

//input4: {"":{"a":"1"},"b":"3"}
//output4: {"a":"1","b":"3"}

/*
if value is an object, recursively go into nested objects
if value is not an object
  check if key is "" 
    add to dict
  if not ""
    concat keys and add to dict

input:  dict = {
            "Key1" : "1",
            "Key2" : {
                "a" : "2",
                "b" : "3",
                "c" : {
                    "d" : "3",
                    "e" : {
                        "" : "1"       //if key is empty, exclude from output
                    }
                }
            }
        }

output: {
            "Key1" : "1",
            "Key2.a" : "2",
            "Key2.b" : "3",
            "Key2.c.d" : "3",
            "Key2.c.e" : "1"
        }

*/