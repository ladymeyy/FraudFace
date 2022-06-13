function getPrimitive(obj) {
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
    return obj;
  }

  for (let key in obj) {
    let result = getPrimitive(obj[key]);
    if (result) {
      return result;
    }
  }
}


function randomValues(obj) {
  var values = [];
  for (var i = 0; i < 5; i++) {
    var keys = Object.keys(obj);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    const keyValuePicked = obj[randomKey];
    values.push(getPrimitive(keyValuePicked));
  }
  return values;
}

var obj = {
  a: [{'b': 'hello'}],
  b: 'world',
  c: 'this',
  d: 'is',
  e: 'a',
  f: 'test',
  g: 'of',
  h: 'the',
  i: 'emergency',
  j: 'broadcast',
  k: 'system'
};

randomValues(obj);

//write a function that takes an array of numbers and returns the sum of the numbers:

function sum(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}