var nestedObject = {
  speakers: 'Elie',
  data: {
    continents: {
      europe: {
        countries: {
          switzerland: {
            capital: "Bern",
            population: 8000000
          }
        }
      }
    },
    languages: {
      spanish: {
          hello: "Hola"
      },
      french: {
          hello: "Bonjour"
      }
    }
  }
}

var flattenObject = function(object) {
  let flatObject = {};
  flattenObjectHelper('', object, flatObject); 
  return flatObject; 
}

var flattenObjectHelper = function(initialKey, object, flatObject) {
  for (let key in object) {
    if (typeof object[key] !== "object") { 
      if (initialKey == null) {
        flatObject[key] = object[key]; 
      } else {
        flatObject[`${initialKey}.${key}`] = object[key]; 
      }
    } else {
      if (initialKey == null) {
        flattenObjectHelper(key, object[key], flatObject); 
      } else {
        flattenObjectHelper(`${initialKey}.${key}`, object[key], flatObject); 
      }
    }
  }
}

var flattenedObject = { '.speakers': 'Elie',
'.data.continents.europe.countries.switzerland.capital': 'Bern',
'.data.continents.europe.countries.switzerland.population': 8000000,
'.data.languages.spanish.hello': 'Hola',
'.data.languages.french.hello': 'Bonjour' 
}; 

var obj = {
    'property1': 'value1',
        'property2.property3': 'value2',
        'property2.property7': 'value4',
        'property4.property5.property6': 'value3'
};

var convert = function(obj) {
  //define an empty object 
  let output = {};
  for (let i in obj) {    //iterate thru keys in object 
    let value = obj[i]; 
    let currObj = output;  //current object pointer 
    let currArr = i.split('.');   
    for (let j = 1; j < currArr.length; j++) { 
      let key = currArr[j]; 
      if (j === currArr.length - 1) {  //if index is last in array 
        currObj[key] = value;  //set key/value pair 
      } else { //otherwise 
        currObj[key] = currObj[key] || {}; //keep current key or if current key does not exist, set key to empty object 
      }
      currObj = currObj[key];   //set current object as the next object in iteration 
    }
  }
  return output; 
}

console.log(convert(flattenedObject))






