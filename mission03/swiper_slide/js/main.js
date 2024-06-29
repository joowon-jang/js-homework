import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper(".swiper", {
  loop:true,
  autoplay: {
    delay: 30,
    disableOnInteraction: false,
  },
  effect: "fade",
});

const slides = document.querySelectorAll('.swiper-slide');

for(let i=0; i<5; i++) {
  for(let j=0; j<5; j++) {
    if(i*5 + j >= slides.length) break;
    slides[i*5 + j].style.backgroundPosition = `-${120*j}px -${157*i}px`;
    console.log(slides[i*5 + j].style.backgroundPosition);
  }
}