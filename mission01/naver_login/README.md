# 네이버 로그인 페이지 구현

---

로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.


---
- [x] 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.
<br/>

## JS Code

- user 정보를 배열로 만듬 -> 다시 객체로 바꿈.
```js
const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};
```
> user의 id와 pw를 체크해서 목록에 있으면 로그인되는 것이므로 여러 명의 유저를 체크한다고 생각해서 유저 정보를 배열로 만들었음.
>
> -> 서버에서 비교하는 상황으로 가정해 다시 객체로 변경.

<br/>

- id와 pw형식이 맞지 않으면 버튼을 클릭할 수 없게 설정하는 함수

html
```html
<button type="submit" class="btn-login" disabled>로그인</button>
```
css
```css
.btn-login {
  background: #03cf5d;
  padding: 1.6rem 0;
  color: #fff;
  border: 0;
  margin-top: 1rem;
  /* 페이지 로딩 시 btn-login이 비활성화 상태임을 보여주기 위해 cursor 속성 변경했음 */
  cursor: no-drop;
}
```
js
```js
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
```
> button의 disabled 설정 및 시각적으로 보여주기 위한 style 속성까지 변경
> 
> js에서 disable와 cursor속성을 변경할 수도 있지만 페이지 로딩 시에 설정되어 있는 것은 직접 html과 css에 설정해 두는 것이 효율적이라고 생각해 변경했음

<br/>

- eamil과 password의 input event를 handling할 함수
```js
/* ------------------------- 두 가지 input의 이벤트핸들링 함수(closure) ------------------------- */
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
```
> email, password 두가지 input에 동일한 event handling을 해주어야 하므로, 하나의 함수에서 조건으로 처리하여 코드의 중복을 줄였음
>
> 상태 변수를 전역에 노출하지 않기 위해 closure로 구현
>
> addEventListener() 메서드에 콜백함수를 전달할 때, 함수 실행부로 인한 혼란을 방지하기 위해 즉시실행 후 handleInput 변수에 할당
>
> -> email과 password를 체크하는 과정에서 상태변수를 함께 관리

<br/>

- btnLogin 버튼 이벤트 핸들링 함수
```js
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
```
