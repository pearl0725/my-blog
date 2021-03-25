$(document).ready(function () {
    $('#board-details').empty();

    let id = window.location.search.split('=')[1];
    viewPost(id);
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


function editPost(id) {
    showEdits(id);
    let content = $(`#${id}-content`).text().trim();
    $(`#${id}-content`).val(content);

    let author = $(`#${id}-author`).text().trim();
    $(`#${id}-author`).val(author);

    let title = $(`#${id}-title`).text().trim();
    $(`#${id}-title`).val(title);
}

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
