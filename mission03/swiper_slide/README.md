# 자율 주제 구현 (Swiper를 사용한 FlipBook)

---

## 구현

### FlipBook 도안으로 사용한 png파일
<img src="./assets/pngwing.com.png" alt="플립북 도안" width="300px"></img>

- png파일을 swiper slide의 배경 이미지로 사용
```css
/* style.css */
.swiper {
    width: 120px;
    height: 157px;
    transform: scale(5);
}

.swiper-slide {
    width: 120px;
    height: 157px;
    background-color: #fff;
    background-image: url('./../assets/pngwing.com.png');
    background-repeat: no-repeat;
}
```
> 원래 png파일은 가로\*세로 600\*785 크기인데 잘라서 사용(js에서 처리)
>
> `transform` 속성을 사용해 확대

- 각각의 슬라이드에 보여줄 png파일의 부분(position)을 지정
```js
// main.js
const slides = document.querySelectorAll('.swiper-slide');

for(let i=0; i<5; i++) {
  for(let j=0; j<5; j++) {
    if(i*5 + j >= slides.length) break;
    slides[i*5 + j].style.backgroundPosition = `-${120*j}px -${157*i}px`;
  }
}
```
> slide DOM요소를 Node List로 가져온 후, 해당 Node List의 index를 통해 `background-position`을 계산하여 지정

- Swiper 객체 생성 + 속성 설정
```js
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper(".swiper", {
  loop:true,
  autoplay: {
    delay: 30,
    disableOnInteraction: false,
  },
  effect: "fade",
});
```
> cdn을 이용하여 Swiper를 import
>
> Swiper 객체를 생성하고 `autoplay` 속성을 통해 페이지 자동이동 + fade 효과를 주어 FlipBook처럼 연속으로 보여줌
