// - 회원가입 버튼을 클릭하기
// - 닉네임, 비밀번호, 비밀번호 확인을 입력하기
// - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
// - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
// - 비밀번호 확인은 비밀번호와 정확하게 일치하기
// - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지를 프론트엔드에서 보여주기
// - 회원가입 버튼을 누르고 에러메세지가 발생하지 않는다면 `로그인 페이지`로 이동시키기
// post 방식으로 데이터 전송시 아래 텍스트가 출력되도록 재구현할 것

// 회원가입 페이지 유효성 검사
function sign_up() {
    let username = $("#username").val()
    // console.log(username) 잘 가져옴
    let password = $("#password").val()
    let repassword = $("#re-password").val()
    let email = $("#email").val()


    if (username.length == 0) {
        alert("아이디를 올바르게 입력해주세요.");
        $("#username").focus();
        return false;
    } else if (username.trim().length > 11) {
        alert("아이디는 10자 이하로 입력해주세요.");
        $("#username").focus();
        return false;
    }

    if (password.length == 0) {
        alert("패스워드를 올바르게 입력해주세요.");
        $("#password").focus();
        return false;
    }

    if (!is_password(password)) {
        alert("패스워드 형식이 올바르지 않습니다.");
        $("#password").focus();
        return false;
    }

    if (password != repassword) {
        alert("입력한 패스워드가 일치하지 않습니다.");
        $("#password").focus();
        return false;
    }

    if (email == '') {
        alert("이메일을 올바르게 입력해주세요.");
        return;
    } else if (!is_email(email)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return;
    }

    // 모든 조건을 통과했을 경우 해당 URL 로 데이터를 보낸다.
    $.ajax({
        type: "POST",
        url: "/user/signup",
        data: {
            userid_give: username,
            password_give: password,
            email_give: email
        },
        success: function(response) {
            alert("회원가입을 축하드립니다!");
            location.href="/"
        }
    });
}


// 정규식을 사용하여 아이디 형식 검사
function is_id(asValue) {
    let regExp = /^(?=.*[a-z])[-a-z0-9_]{4,10}$/;
    return;
}

// 정규식을 사용하여 패스워드 검사, 닉네임이랑 같은 값이 들어가있을 경우로 수정하기!
function is_password() {
    let regExp = /^{4}$/;
    return;
}

// 정규식을 사용하여 이메일 검사
function is_email() {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return;
}