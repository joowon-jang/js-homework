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

function getNumberAtArray(arr, index) {
  if (!Array.isArray(arr)) {
    throw new Error("대상이 배열이 아닙니다.");
  }
  if (index >= 0 && index < arr.length) return arr[index];
  else throw new Error("유효한 index가 아닙니다.");
}

getValueAtObject(person, "name");
