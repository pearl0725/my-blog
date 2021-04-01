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
    let password = $("#password").val()
    let repassword = $("#re-password").val()
    let email = $("#email").val()


    if (username.length == 0) {
        $("#username-check").text("아이디를 입력해주세요.").addClass("is-danger").css("color", "crimson")
        $("#username").focus();
        return;
    } else if (username.trim().length > 11) {
        alert("아이디는 10자 이하로 입력해주세요.");
        $("#username").focus();
        return;
    }

    if (password.length == 0) {
        $("#password-check").text("패스워드를 입력해주세요.").addClass("is-danger").css("color", "crimson")
        $("#password").focus();
        return;
    }

    if (repassword.length == 0) {
        $("#password-recheck").text("패스워드를 입력해주세요.").addClass("is-danger").css("color", "crimson")
        $("#re-password").focus();
        return;
    }

    if (is_password(password)) {
        $("#password-check").text("패스워드에는 닉네임이 포함될 수 없습니다.").addClass("is-danger").css("color", "crimson")
        $("#password").focus();
        return;
    }

    if (password != repassword) {
        $("#password-recheck").text("패스워드 형식이 올바르지 않습니다 .").addClass("is-danger").css("color", "crimson")
        $("#re-password").focus();
        return;
    }

    if (email == '') {
        $("#email-check").text("이메일 형식이 올바르지 않습니다 .").addClass("is-danger").css("color", "crimson")
        return;
    }

    // 모든 조건을 통과하면 해당 함수를 실행한다.
    checkSuccess();
}

function checkSuccess() {
    let username = $("#username").val()
    let password = $("#password").val()
    let email = $("#email").val()

    let data = {'username':username, 'password':password, 'email':email}
    console.log(data)

    $.ajax({
        type: "POST",
        url: "/user/signup",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            // alert("회원가입을 축하드립니다!");
            console.log(data)
            // location.href="/"
        },
        error: function (response) {
            console.log(response)
        }
    });
}


// 정규식을 사용하여 아이디 형식 검사
function is_id(asValue) {
    let regExp = /^(?=.*[a-z])[-a-z0-9_]{4,10}$/;
    return;
}

// 정규식을 사용하여 패스워드 검사, 정규표현식에서 특정 단어를 제외하고 검색을 하려면 아래와 같이 하면 됌.
// Note that the solution to does not start with "hede"
// ^(?!hede).*$
function is_password() {
    let username = $("#username").val()
    let password = $("#password").val()

    // 자바스크립트에서 특정 문자열을 확인하는 방법!
    // https://electronic-moongchi.tistory.com/13
    // "문자열".indexOf("찾을문자")
    if(password.indexOf(username) != -1) {
        return true;    // 리턴값이 참이면 종속문장을 실행 -> 종속문장 "패스워드에는 닉네임이 포함될 수 없습니다." 임
    } else {
        return false;   // 리턴값이 거짓이면 닉네임이 포함이 되어 있지 않다는 것이므로 조건식을 수행하지 않음
    }
    // let regExp = /^(?!#${"#username"}).$/;
    // console.log(/^(?!#${"#username"}).$/)
    return;
}

// 정규식을 사용하여 이메일 검사
function is_email() {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return;
}