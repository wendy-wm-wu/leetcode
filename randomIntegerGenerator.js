function rand5() {
  var result = 7; //arbitrarily large
  while (result > 5) {
    result = rand7();
  }
  return result; 
}

console.log(rand5()); 