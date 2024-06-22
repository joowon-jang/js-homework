
// 객체 -> 배열로 바꿨음
// user가 한 명에 대한 정보만 있지 않을 것이라 생각했음
const user = [{
  id: "asd@naver.com",
  pw: "spdlqj123!@",
}];

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;
  return re.test(String(text).toLowerCase());
}


/* -------------------------------------------------------------------------- */
/*                                   My Code                                  */
/* -------------------------------------------------------------------------- */


/* -------------------------------- DOM 요소 접근 ------------------------------- */
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const btnLogin = document.querySelector('.btn-login');

/* ----------------------------- 버튼 활성화/비활성화 함수 ----------------------------- */
function manageBtnStatus(condition) {
  if(condition) {
    btnLogin.style.cursor = 'pointer';
    btnLogin.disabled = false;
  }
  else {
    btnLogin.style.cursor = 'no-drop';
    btnLogin.disabled = true;
  }
};

/* ------------------------- 두 가지 input의 이벤트핸들링 함수(closure) ------------------------- */
const handleInput = (function() {

  // id와 pw가 모두 올바른 형식인지 체크하는 상태 변수
  let isCorrect = false;

  // 내부함수에서 매개변수로 event 객체 전달받음
  return function(e) {
    // event target이 email input일 경우
    if (e.target.type === "email") {
      emailReg(e.target.value) ? e.target.classList.remove("is--invalid") : e.target.classList.add("is--invalid");
    }
    // event target이 password input일 경우
    else if (e.target.type === "password") {
      pwReg(e.target.value) ? e.target.classList.remove("is--invalid") : e.target.classList.add("is--invalid");
    }

    // 상태 변수 관리
    (userEmailInput.classList.contains("is--invalid") || 
    userEmailInput.value == '' || 
    userPasswordInput.classList.contains("is--invalid") || 
    userPasswordInput.value == '')
      ? isCorrect = false : isCorrect = true;

    // 상태에 따라 버튼 활성화/비활성화
    manageBtnStatus(isCorrect);
  }
})();

/* ------------------------------ input의 이벤트 추가 ----------------------------- */
userEmailInput.addEventListener("input", handleInput);
userPasswordInput.addEventListener("input", handleInput);

/* ----------------------------- button의 이벤트 추가 ----------------------------- */
btnLogin.addEventListener('click',function(e) {
  // form action 방지
  e.preventDefault();

  // forEach메서드가 아닌 일반 for문을 사용
  // 왜냐하면 페이지 이동시에는 return으로 함수를 종료함으로써 아래의 alert()를 실행하지 않기 위함
  for(let i = 0; i < user.length; i++) {
    if(user[i].id === userEmailInput.value && user[i].pw === userPasswordInput.value) {
      window.location.href += 'welcome.html';
      return;
    }
  }

  // id, pw가 일치하지 않을 때 input 칸을 비워줌
  userEmailInput.value = '';
  userPasswordInput.value = '';
  
  alert('아이디 또는 비밀번호가 일치하지 않습니다.')
})