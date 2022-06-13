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
  for (var i = 0; i < 100; i++) {
    var keys = Object.keys(obj);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];
    const keyValuePicked = obj[randomKey];
    values.push(getPrimitive(keyValuePicked));
  }

  const FORBIDDEN_WORDS = ['@', '_', '-', 'N/A', 'NA', 'None', 'null', 'full' ,'none', 'unknown', 'mismatch', 'NaN', 'no', 'yes', 'True', 'False']
  return [...new Set(values
          .filter(a => typeof a === "string")
          .filter(a => !(/\d/.test(a)))
          .filter(a => !!a && a !== ' ')
          .filter(a => !check(FORBIDDEN_WORDS, a))
          )
        ];
}

var obj = a.result[0];

randomValues(obj);

function check(words, string) {
    for (const i in words) {
        if (string?.toLowerCase().indexOf(words[i].toLowerCase()) > -1) {
            return true;
        }
    }
    return false;
}

function sum(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}