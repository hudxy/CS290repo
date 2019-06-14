
function deepEqual(x, y) {
  if (x === y) {
    return true;
  }
  else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
    if(Object.keys(x).length != Object.keys(y).length) {
      return false;
    }
    for(var p in x) {
      if(y.hasOwnProperty(p)) {
        if(!deepEqual(x[p], y[p])) {
          return false;
        }
      }
    }
  } else {
    return false;
  }
}


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
