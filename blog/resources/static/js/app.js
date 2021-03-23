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