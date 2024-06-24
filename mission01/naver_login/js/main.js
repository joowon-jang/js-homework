const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

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
const emailInput = document.getElementById("userEmail");
const passwordInput = document.getElementById("userPassword");
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

/* ------------------------- 두 가지 input의 이벤트 핸들링 함수(closure) ------------------------- */
const handleInput = (function() {

  // id와 pw가 모두 올바른 형식인지 체크하는 상태 변수
  let emailChecked = false;
  let passwordChecked = false;

  // 내부함수에서 매개변수로 event 객체 전달받음
  return function(e) {
    const target = e.target;
    
    // event target이 email input일 경우
    if (target.type === "email") {
      if(emailReg(target.value)) {
        target.classList.remove("is--invalid");
        emailChecked = true;
       }
       else {
        target.classList.add("is--invalid");
       } 
    }
    // event target이 password input일 경우
    else if (target.type === "password") {
      if(pwReg(target.value)) {
        target.classList.remove("is--invalid")
        passwordChecked = true;
       } else {
        target.classList.add("is--invalid");
       }
    }

    // 상태에 따라 버튼 활성화/비활성화
    manageBtnStatus(emailChecked && passwordChecked);
  }
})();

/* ------------------------------ input의 이벤트 추가 ----------------------------- */
emailInput.addEventListener("input", handleInput);
passwordInput.addEventListener("input", handleInput);

/* -------------------------- btnLogin의 이벤트 핸들링 함수 -------------------------- */
function handleBtnClick(e) {
  // form action 방지
  e.preventDefault();

  try {
    const id = emailInput.value;
    const pw = passwordInput.value;

    // 서버와의 통신에서 id, pw를 서버로 보내서 비교하는 상황처럼 가정
    const getUserId = user.id;
    const getUserPw = user.pw;

    if (id === getUserId && pw === getUserPw) {
      location.href = 'welcome.html';
    }
    else {
      // id, pw가 일치하지 않을 때
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

  } catch {
    
  }
}

/* ----------------------------- button의 이벤트 추가 ----------------------------- */
btnLogin.addEventListener('click',handleBtnClick)