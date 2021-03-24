$(document).ready(function() {
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
        error: function(response) {
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
        url: `/api/blog/${id}`,
        success: function (response) {
            alert('게시글 삭제가 완료되었습니다.');
            window.location.reload();
        },
        error: function() {
            alert("잘못된 요청입니다.");
            return;
        }
    })
}

// function viewPost(id) {
//     console.log(`id: ${id}`)
//     $.ajax({
//         type: "GET",
//         url: `/api/blog/${id}`,
//         success: function (response) {
//             addviewHTML(
//                 response.id,
//                 response.title,
//                 response.author,
//                 response.content,
//                 response.createAt
//             )
//         }
//     })
// }



function addviewHTML(id, title, author, content, createAt) {
    let tempHTML = `<div class="row">
                        <table class="table table-striped"
                               style="text-align: center; border: 1px solid #dddddd">
                            <thead>
                            <tr>
                                <th colspan="3"
                                    style="background-color: #eeeeee; text-align: center;">글 보기
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style="width: 20%;"> 글 제목</td>
                                <td colspan="2" id="${id}-title">${title}</td>
                            </tr>
                            <tr>
                                <td>작성자</td>
                                <td colspan="2" id="${id}-author">${author}</td>
                            </tr>
                            <tr>
                                <td>작성일</td>
                                <td colspan="2" id="${id}-time">
                                    ${createAt}
                                </td>
                            </tr>
                            <tr>
                                <td>내용</td>
                                <td id="${id}-content" colspan="2" style="min-height: 200px; text-align: left;">${content}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                     <input type="button" value="수정" onclick='location.href="/api/blog/${id}"'>
                     <form action="/api/blog/${id}">
                          <input id="${id}-delete" onclick="deletePost(${id})" type="submit" value="삭제">
                     </form>
                    <input type="button" value="메인으로" onclick='location.href="/"'>
`
    $('.board-details').append(tempHTML);
}