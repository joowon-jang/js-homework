/* ---------------------------- getValueAtObject ---------------------------- */

function getValueAtObject(obj, key) {
  // 구글에 검색해보고 썼는데 이거랑 차이가 있나요?
  // Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === "object"
  if (obj.constructor !== Object) {
    throw new Error("대상이 객체가 아닙니다.");
  }
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    throw new Error("해당 key가 존재하지 않습니다.");
  }
}

/* --------------------------------- Example -------------------------------- */

const person = {
  name: "Alice",
  age: 25,
  city: "Wonderland",
};

console.log(getValueAtObject(person, "name")); // 'Alice'
console.log(getValueAtObject(person, "age")); // 25
console.log(getValueAtObject(person, "city")); // 'Wonderland'
console.log(getValueAtObject(person, "country")); // Error !

/* ---------------------------- getNumberAtArray ---------------------------- */

function getNumberAtArray(arr, index) {
  if (!Array.isArray(arr)) {
    throw new Error("대상이 배열이 아닙니다.");
  }
  if (index >= 0 && index < arr.length) return arr[index];
  else throw new Error("유효한 index가 아닙니다.");
}

/* --------------------------------- Example -------------------------------- */

const numbers = [10, 20, 30, 40, 50];

console.log(getNumberAtArray(numbers, 2)); // 30
console.log(getNumberAtArray(numbers, 4)); // 50
console.log(getNumberAtArray(numbers, 5)); // Error!
console.log(getNumberAtArray(numbers, -1)); // Error!
