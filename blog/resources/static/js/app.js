let targetId;

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 게시글 목록을 가져온다.
    getPost();
})

// 유효성 검사
function isValidTitle(title) {
    if (title == '') {
        alert("제목을 입력해주세요!");
        return false;
    }
    if (title.trim().length > 20) {
        alert("공백 포함 20 자 이내로 입력해주세요.");
        return false;
    }
    return true;
}

// 게시글 작성
function writePost() {
    // 게시판의 작성한 내용을 불러온다.
    let title = $('#title').val();
    let content = $('#content').val();
    let author = $('#author').val();
    // 작성한 게시글이 올바른지 isValidContents 함수를 통해 확인한다.
    if (isValidTitle(title) == false) {
        return;
    }
    // 전달할 데이터들을 JSON 타입으로 만든다.
    let data = {'title': title, 'content': content, 'author': author}
    // post /api/blog 에 데이터를 전달한다.
    $.ajax({
        type: "POST",
        url: "/api/blog",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("게시글이 성공적으로 작성되었습니다.");
            window.location.reload();
        }
    });
}

// 게시글 목록을 가져와 뿌려준다.
function getPost() {
    $.ajax({
        type: "GET",
        url: "/api/blog",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let posting = response[i];
                let id = posting['id']; // id 값을 어떻게 가져올 수 있을까?
                let title = posting['title'];
                let author = posting['author'];
                let content = posting['content'];
                let createAt = posting['createAt']; // 게시글 생성 날짜 기준
                addHTML(id, title, author, content, createAt);
            }
        }
    })
}

// 데이터 붙히기, 타이틀에는 자바스크립트 함수를 호출하게 해야 하나 ?
// 아니면 id 파라미터로..?
// 아이디 파라미터로 넘어갔을 때 전체 게시물이 조회된다....
// 해당하는 아이디값만 테이블에서 출력될 수 있도록 하면 된다.
function addHTML(id, title, author, content, createAt) {
    let tempHTML = `<tr>
                        <td>${id}</td>
<!--                        <td><a href="javascript:void(0);" onclick="viewPost();">${title}</a></td>-->
                        <td><a href="board.html?id=${id}" onclick="viewPost()">${title}</a></td>
                        <td>${author}</td>
                        <td>${createAt}</td>
                        <td>2</td>
                    </tr>`
    $('.board-table').append(tempHTML);
}


// $(location).ready(function viewPost(id) {
//     let link = document.location.href;
//     console.log(link);
//     let para = document.location.href.split("?");
//     console.log(para[1]);
// })

