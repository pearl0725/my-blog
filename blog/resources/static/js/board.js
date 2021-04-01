$(document).ready(function () {
    $('#board-details').empty();

    let id = window.location.search.split('=')[1];
    viewPost(id);
    // readComment(id);    // 해당하는 게시글의 고유값인 id 값을 함수 호출과 동시에 전달한다.
    readComment();  // id 값 전달하면 데이터가 전달되지 않음
})


function viewPost(id) {
    console.log(id)
    $.ajax({
        type: "GET",
        url: `/api/blog/${id}`,
        success: function (response) {
            let id = response.id;
            let title = response.title;
            let author = response.author;
            let content = response.content;
            let createAt = response.createAt;
            // console.log(response.title)
            addviewHTML(id, title, author, content, createAt);
        },
        error: function (response) {
            if (response.title == '') {
                alert("잘못된 요청입니다.");
                return;
            }
        }
    })
}

function deletePost(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/blog/${id}?`,
        success: function (response) {
            alert('게시글 삭제가 완료되었습니다.');
            window.location.href="/"
        },
        error: function () {
            alert("잘못된 요청입니다.");
            return;
        }
    })
}


function addviewHTML(id, title, author, content, createAt) {
    let tempHTML = `<div class="row">
                        <table class="table table-striped" style="text-align: center; border: 1px solid #dddddd">
                            <thead>
                            <tr>
                                <th colspan="3"
                                    style="background-color: #eeeeee; text-align: center;">글 보기
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr id="${id}-titles">
                                <td style="width: 20%;"> 글 제목</td>
                                <td colspan="2" id="${id}-title">${title}</td>
                            </tr>
                             <div id="${id}-edittitle" class="edit">
                                 <textarea id="${id}-edittitlearea" placeholder="수정할 제목을 입력해주세요" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                            <tr id="${id}-authors">
                                <td>작성자</td>
                                <td colspan="2" id="${id}-author">${author}</td>
                            </tr>
                            <div id="${id}-editauthor" class="edit">
                                 <textarea id="${id}-editauthorarea" placeholder="게시글 수정자" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                            </div>
                            <tr>
                                <td>작성일</td>
                                <td colspan="2" id="${id}-time">
                                    ${createAt}
                                </td>
                            </tr>
                            <tr id="${id}-contents">
                                <td>내용</td>
                                <td id="${id}-content" colspan="2" style="min-height: 200px; text-align: left;">${content}</td>
                            </tr>
                             <tr id="${id}-editarea">
                                <textarea id="${id}-textarea" placeholder="수정할 텍스트를 입력해주세요" rows="10" style="width:100%;"></textarea><br>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="footers">
                       <button id="${id}-edit" value="수정" onclick="editPost('${id}')">수정</button>
                       <button id="${id}-delete" value="삭제" onclick="deletePost('${id}')">삭제</button>
                       <button id="${id}-submit" value="수정완료" onclick="submitEdit('${id}')">수정완료</button>
                       <button value="메인" onclick='location.href="/"'>메인</button>
                    </div>
`
    $('.board-details').append(tempHTML);
    $(`#${id}-edittitle`).hide();
    $(`#${id}-editauthor`).hide();
    $(`#${id}-textarea`).hide();
    $(`#${id}-submit`).hide();
}


// 수정버튼을 클릭하면 발생하는 이벤트
function editPost(id) {
    showEdits(id);
    let content = $(`#${id}-content`).text().trim();
    $(`#${id}-content`).val(content);

    let author = $(`#${id}-author`).text().trim();
    $(`#${id}-author`).val(author);

    let title = $(`#${id}-title`).text().trim();
    $(`#${id}-title`).val(title);
}

// 수정버튼을 클릭함과 동시에 수정 외의 버튼을 숨김처리하고, 수정하는 버튼을 활성화 하도록 수정
function showEdits(id) {
    console.log("${id}-edittitle");
    $(`#${id}-contents`).hide();
    $(`#${id}-authors`).hide();
    $(`#${id}-titles`).hide();
    $(`#${id}-edit`).hide();

    $(`#${id}-edittitle`).show();
    $(`#${id}-editauthor`).show();
    $(`#${id}-textarea`).show();
    $(`#${id}-delete`).show();
    $(`#${id}-submit`).show();
}

// 수정 완료 버튼을 눌렀을 경우 발생되는 이벤트
function submitEdit(id) {
    let content = $(`#${id}-edittitlearea`).val().trim();
    let author = $(`#${id}-editauthorarea`).val().trim();
    let title = $(`#${id}-textarea`).val().trim();

    let data = {'title':title, 'author':author, 'content': content};

    $.ajax({
        type: "PUT",
        url: `/api/blog/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("메세지 변경에 성공하였습니다.");
            window.location.reload();
        }
    });
}

// 여기에 아이디값을 전달해주어야 함.
// URI id 값을 파싱하여 가져온다.
function writeComment() {
    let id = window.location.search.split('=')[1];  // 여기서 URI 파라미터 값을 가져오도록 설정하여 json object 로 만들 수 있음
    console.log("테스트 입니다! id 값 잘 가져오나?: ",id);
    let comment = $('#comment').val();
    let username = $('#author').val();
    console.log(comment)
    console.log(username)

    if (isValidTitle(comment) == false) {
        return;
    }

    // 제발 오타내지 말자
    // DTO 로 넘겨주면 됌!
    // insert into comment (create_at, modified_at, board_id, comment, username, id) values ('2021-03-31T18:57:30.021+0900', '2021-03-31T18:57:30.021+0900', 2, 'test', 'test', 3);
    let data = {'username': username, 'comment':comment, 'boardid':id};
    console.log(data);

    $.ajax({
        type: "POST",
        url: "/blog/comment",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
            alert("댓글이 성공적으로 작성 되었습니다.");
            window.location.reload();
        }
    })

}

function isValidTitle(comment) {
    if (comment == '') {
        // alert("제목을 입력해주세요!");
        return false;
    }
    if (comment.trim().length > 20) {
        // alert("공백 포함 20 자 이내로 입력해주세요.");
        return false;
    }
    return true;
}

function readComment() {
    let id = window.location.search.split('=')[1];

    $.ajax({
        type: "GET",
        url: `/blog/comment/${id}`,
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let commenting = response[i];
                let id = commenting['id'];
                let username = commenting['username'];
                let comment = commenting['comment'];
                let createAt = commenting['createAt'];
                addCommentHTML(id, username, comment, createAt);
            }
        }
    });
}

function addCommentHTML(id, username, comment, createAt) {
    let tempHTML = `<div class="commentList">
                            <div class="commentArea" style="border-bottom:1px solid  darkgray; margin-bottom: 15px;">
                                <div class="commentInfo">댓글번호 : ${id} / 작성자 : ${username} / 작성일자 : ${createAt}</div>
                                <div class="CommentContent" id="${id}-CommentContents"> ${comment} </p></div>
                                <div class="commentModify">
                                    <textarea type="text" id="${id}-textarea"></textarea>
                                </div>
                                <a href='javascript:void(0);' id="${id}-textEdit" onclick="editComment(${id});">수정</a>
                                <a href='javascript:void(0);' id="${id}-textEditSubmit" onclick="editSubmit(${id});">수정완료</a>
                                <a href='javascript:void(0);' id="${id}-textDelete" onclick="deleteComment(${id})"'>삭제</a>
                            </div>
                        </div>`
    $('.comment-list').append(tempHTML);
    $(`#${id}-textarea`).hide();
    $(`#${id}-textEditSubmit`).hide();
}

function editComment(id) {
    showEditComment(id);
    let comment = $(`#${id}-CommentContents`).text().trim();
    $(`#${id}-textarea`).val(comment);
}

// 댓글 수정 기능
function showEditComment(id) {
    console.log("실행은 되니?" + id);
    $(`#${id}-textarea`).show();
    $(`#${id}-textEditSubmit`).show();

    $(`#${id}-textEdit`).hide();
}

// 댓글 수정 버튼을 누르면 실행되는 함수
function editSubmit(id) {
    let comment = $(`#${id}-textarea`).val().trim();

    if (isValidComment(comment) == false) {
        return;
    }

    let data = {'comment': comment};

    $.ajax({
        type: "PUT",
        url: `/blog/comment/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("메세지 변경에 성공하였습니다.");
            window.location.reload();
        }
    });
}

// 댓글 수정 유효성 검사, 공백이 들어가 있을 경우 수정 실패
function isValidComment(comment) {
    if (comment == '') {
        alert("수정할 내용을 입력해주세요!");
        return false;
    }

    return true;
}

function deleteComment(id) {
    $.ajax({
        type: "DELETE",
        url: `/blog/comment/${id}`,
        success: function(response) {
            alert("댓글 삭제가 완료되었습니다.");
            window.location.reload();
        }
    });
}
