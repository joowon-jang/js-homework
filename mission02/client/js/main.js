/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

import { data } from "./data.js";

/* -------------------------- 유틸함수 -------------------------- */
function isString(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === 'string'
}


/* ------------------------------ 렌더링 함수 ----------------------------- */
function setBgColor(node, {firstColor, secondColor}) {
  if (isString(node)) node = document.querySelector(node);
  
  node.style.background = `linear-gradient(to bottom, ${firstColor}, ${secondColor})`;
}

function setImage(node, {src, alt}) {
  if (isString(node)) node = document.querySelector(node);

  node.src = src;
  node.alt = alt;
}

function setNameText(node, name) {
  if (isString(node)) node = document.querySelector(node);
  
  node.textContent = name;
}


/* -------------------------------- DOM 요소 접근 ------------------------------- */
const body = document.querySelector("body");
const visualImg = document.querySelector(".visual img");
const nickName = document.querySelector(".nickName");
const nav = document.querySelector(".nav");
const ul = nav.querySelector("ul");


/* ---------------------------- nav 클릭 이벤트 핸들링 함수 --------------------------- */
function handleNavClick(e) {
  const target = e.target;

  const li = target.closest("li");
  if (!li) return;

  const index = li.dataset.index - 1;
  const children = ul.children;

  // border 속성 toggle을 위한 class 추가/제거
  for (let li of children) {
    li.classList.remove("is-active");
  }
  li.classList.add("is-active");

  // audio 멈춤/재생
  for (let i=0; i<4; i++) {
    data[i].audio.stop();
  }
  data[index].audio.play();

  // 함수에 전달할 데이터들
  const bgColor = {
    firstColor : data[index].color[0], 
    secondColor : data[index].color[1]
  };
  const imgData = {
    src : `./assets/${data[index].name.toLowerCase()}.jpeg`, 
    alt : data[index].alt
  }
  const nameText = data[index].name;

  // 렌더링 함수 호출
  setBgColor(body, bgColor);
  setImage(visualImg, imgData);
  setNameText(nickName, nameText);
}


/* --------------------------------- 이벤트 바인딩 --------------------------------- */
nav.addEventListener("click", handleNavClick);