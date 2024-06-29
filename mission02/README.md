# Poster UI

## HTML

- type="module" 속성을 추가하고 main.js 파일 하나만 사용
```html
<script type="module" src="./js/main.js" defer></script>
```

## data.js

- audio.js의 AudioPlayer class를 export 후 data.js에서 import하여 data 객체에 audio(인스턴스) 프로퍼티를 추가
```js
import { AudioPlayer } from "./audio.js";

export const data = [
  {
    color: ["#ff6a00", "#720400"],
    name: "EMBER",
    alt: "엠버 포스터",
    audio: new AudioPlayer("./assets/audio/ember.m4a"),
  },
  {
    color: ["#1ca9f8", "#000054"],
    name: "WADE",
    alt: "웨이드 포스터",
    audio: new AudioPlayer("./assets/audio/wade.m4a"),
  },
  {
    color: ["#98d00f", "#002906"],
    name: "CLOD",
    alt: "클로드 포스터",
    audio: new AudioPlayer("./assets/audio/clod.m4a"),
  },
  {
    color: ["#d968e6", "#30003c"],
    name: "GALE",
    alt: "게일 포스터",
    audio: new AudioPlayer("./assets/audio/gale.m4a"),
  },
];
```

## main.js

- nav 요소에 이벤트 바인딩
```js
nav.addEventListener("click", handleNavClick);
```

- nav 클릭 이벤트 핸들링 함수
```js
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
```
> nav의 자식 요소인 li에 이벤트 위임
>
> 'is-active'클래스와 audio toggle
>
> 배경색, 이미지, 텍스트 변경 함수를 분리 + 렌더링 함수에 전달할 데이터 구성

- 유틸함수
```js
function isString(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase() === 'string'
}
```
> type 체크용 isString 함수를 만들어두고 렌더링 함수에서 사용

- 분리한 렌더링 함수
```js
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
```
> 타겟 노드와 설정할 옵션들을 매개변수로 받음
>
> 옵션들을 객체로 받아서 구조분해할당
