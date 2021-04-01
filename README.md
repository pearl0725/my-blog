# my-blog

# 📕 소개


### 기간

본 프로젝트의 진행 기간은 2021.03.23(화) ~ 2021.03.25(목) 이다.

<br>

### 프로젝트 개발환경

프로젝트 개발 환경은 다음과 같다.

- IDE : Intellij IDEA
- OS : Ubuntu 18.04
- SpringBoot v2.4.4
- Java8
- Gradle

<br>

### 기능 및 목표

**스프링 부트로 로그인 기능이 없는 나만의 블로그 제작!**

- Lombok 과 JPA 를 사용하여 원하는 데이터베이스를 만들고 활용해보자!
- Spring Boot 를 기반으로한 CRUD(Create, Read, Update, Delete) 기능이 포함된 웹 서비스를 만들어보자!
- 프론트엔드에 많은 시간을 투자하지 않고, **정확히 동작하게 구현 하는 것**을 목표로 하자!

<br>

### 프로젝트 핵심 키워드

- RestController
- Service
- Repository
- RequestDto
<br>

### CRUD 기능을 가진 프로젝트 API 설계

기획했던 게시판 서비스를 구현하기 위해서는 총 다섯가지 기능이 필요하다.

먼저 게시글을 생성해야 하므로, 게시글 생성 기능과 생성한 게시글의 목록을 조회하는 기능, 그리고 게시글 목록에서 게시글의 상세 내용을 조회하기 위한 기능, 해당 게시글을 수정하고 삭제할 수 있는 기능이 필요하다.

![](https://images.velog.io/images/pearl0725/post/86038e05-1820-43f9-afc9-059e033320fa/image.png)

<br>


# 🧐 마무리

- **메인 페이지**

![](https://images.velog.io/images/pearl0725/post/a3acc50f-04e6-49e6-be02-3b764418ccd3/image.png)

<br>

- **메인 페이지 - 게시글 목록**

![](https://images.velog.io/images/pearl0725/post/b406108a-f44e-461a-b548-633547cdb66b/image.png)

<br>

- **메인 페이지 - 게시글 작성**

![](https://images.velog.io/images/pearl0725/post/a41350a0-f7b2-4a91-88bd-8f5925514acf/image.png)

<br>

- **게시글 상세 보기 페이지 - 게시글 조회 및 수정, 삭제**

![](https://images.velog.io/images/pearl0725/post/c98a2723-69ad-4319-a594-4321862f80b0/image.png)

<br>

# 😀 주요 기능

## 1. 게시글 수정

게시글 수정 로직은 다음과 같다.
<br>

1. **Client**

js 에서 사용자가 수정 요청을 한 데이터를 가져오고, 사용자가 수정 요청을 한 데이터는 JSON 타입으로 변환해 ajax 통신하여 서버로 해당 데이터를 전달한 후 응답이 정상 응답일 경우 '메세지 변경에 성공하였습니다' 라는 팝업창을 띄우고 현재 페이지를 새로고침한다.

```java
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
```
<br>

**2. Controller**

PUT 방식의 API, 컨트롤러의 updateBlog 메서드는 하기와 같다. 해당 API 에서는 어떠한 id 값을 가진 게시글을 수정하는지 전달을 받고, 변경된 데이터는 JSON 타입으로 전달받은 피라미터를 받아야 하므로 @RequestBody 어노테이션으로 Body 의 내용을 자바 객체로 매핑하도록 하였다. **즉, HTTP 요청의 내용을 BlogRequestDto 에 매핑하기 위해 RequestBody 어노테이션을 설정한다.**

```java
@PutMapping("/api/blog/{id}")
    public Long updateBlog(@PathVariable Long id, @RequestBody BlogRequestDto requestDto) {
        blogService.update(id, requestDto);
        return id;
    }
```
<br>

**3. Service**

'update' 메서드는 다음과 같다. blogRepository 인터페이스의 Blog 엔티티 클래스에서 데이터베이스를 접근하게 할 Repo 를 통해 데이터베이스 연결 및 해제를 수행하며, 정의한 인터페이스에 따라 해당 조건에 일치하는 데이터 정보를 조회하여 조회되는 id 값이 존재하지 않을 경우 '변경할 게시글 정보가 없습니다' 라는 IllegalMonitorStateException 예외를 발생시킨다. 만일 조회되는 데이터가 있을 경우 requestDto 에 해당 정보를 담아 업데이트 하며, 반환값으로 어떠한 데이터가 업데이트 되었는지 id 값을 반환한다.

```java
@Transactional
    public Long update(Long id, BlogRequestDto requestDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new IllegalMonitorStateException("변경할 게시글 정보가 없습니다.")
        );
        blog.update(requestDto);
        return blog.getId();
    }
```
<br>

**4. Entity Class**

엔티티 클래스의 update 메서드는 전달 받는 값이 requestDto 이므로, 변경할 데이터의 정보는 아래와 같이 받는다.

```java
public void update(BlogRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.author = requestDto.getAuthor();
    }
```
<br>

- **구현하며 아쉬웠던 점** 😕
1. 잘못된 문자열 및  공백을 전달받게 되었을 때, 예외처리를 해주어야 하는데 예외 처리를 하지 않았다.
2. 게시글의 '제목', '내용', '작성자' 를 모두 수정하여야 한다는 결함이 있다. 기존에 작성되어 있던 게시글에서 요소 안의 내용을 가져오도록 하여 기존 내용에서 수정을 할 수 있도록 했었어야 했는데, 기능 구현만에 집중하다보니 이 부분은 미처 신경쓰지 못하였다.
3. '수정' 버튼을 클릭하면, showEdits 함수에 의해 기존에 게시글 정보는 hide() 함수로 숨기고, 수정할 영역의 요소에서 텍스트 박스가 보이도록 하려고 하였으나, 무엇 때문인지, '수정' 버튼을 클릭하면 아래 사진과 같이 table 태그 위에 textarea 태그가 노출이 되었다.

![](https://images.velog.io/images/pearl0725/post/ba7f1887-c87b-4575-a21f-317aa19024f3/image.png)


나를 고민하게 했던 코드의 일부는 하기와 같다. '이틀' 이라는 시간 내에 기능 구현에 집중을 했었어야 했기 때문에 이를 보완하는 작업은 추후에 할 생각이다.
<br>

```
<tr id="${id}-contents">
    <td>내용</td>
    <td id="${id}-content" colspan="2" style="min-height: 200px; text-align: left;">${content}</td>
</tr>
 <tr id="${id}-editarea">
    <textarea id="${id}-textarea" placeholder="수정할 텍스트를 입력해주세요" rows="10" style="width:100%;"></textarea><br>
</tr>
```
<br>

## 2. 게시글 생성

게시글 생성 로직은 다음과 같다.
<br>

1. **Client**

클라이언트에서 게시글을 작성하고 'send' 버튼을 클릭하면 자바스크립트의 writePost() 함수가 호출이 된다.
<br>

```java
<button class="btn btn-primary btn-xl" id="sendMessageButton" type="submit"
       onclick="writePost()">Send
</button>
```
<br>

js 의 writePost() 함수에서는 사용자가 입력한 텍스트를 변수에 담아 전달할 데이터를 JSON 타입으로 변환한 후, 서버에 해당 데이터를 전달한다. 이후 서버측에서 전달받은 데이터를 데이터베이스에 저장하면 "게시글이 성공적으로 작성되었습니다." 라는 팝업창을 띄우고 현재 페이지를 새로고침한다.
<br>

```java
function writePost() {
    // 게시판의 작성한 내용을 불러온다.
    let title = $('#title').val();
    let content = $('#content').val();
    let author = $('#author').val();

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
```
<br>

**2. Controller**

POST 요청 방식의 API, createBlog 메서드는 다음과 같다. 생성할 데이터는 json 타입으로 전달받은 피라미터를 받아야 하므로 @RequestBody 어노테이션으로 Body 의 내용을 자바 객체로 매핑하여야 한다. 상기에 서술한 내용과 마찬가지로, HTTP 요청의 내용을 BlogRequestDto 에 매핑하기 위해 RequestBody  어노테이션을 설정하고 피라미터로 전달받은 데이터는 데이터베이스에 저장한다.

```java
@PostMapping("/api/blog")
    public Blog createBlog(@RequestBody BlogRequestDto requestDto) {
        Blog blog = new Blog(requestDto);
        return blogRepository.save(blog);   // 생성한 데이터를 저장
    }
```
<br>

## 3. 게시글 상세 보기

게시글 조회 로직은 다음과 같다.
<br>

1. **Client**

사용자가 특정 게시글을 클릭하면, 해당 게시글의 id 값을 게시글 상세보기 페이지의 URI 파라미터 값으로 전달하도록 하였다.

```java
<td><a href="board.html?id=${id}">${title}</a></td>
```
<br>

상기의 board.html 페이지는 DOM 이 로드되면 피라미터로 넘긴 URI 정보를 가지고 와서 첫 번째 인덱스의 값을 파싱하여  id 변수에 파싱 결과를 대입하고 viewPost() 함수를 호출하여 해당 함수의 인자로 id 값을 전달한다. viewPost() 함수에서는 ajax 통신을 이용하여 서버로 데이터를 전달하고 서버로부터 응답받은 결과를 받아 게시글 상세 페이지에서 출력이 되어야 할 데이터를 'board-details' 클래스에 append 하여 사용자가 원하는 게시글의 정보만 보여질 수 있도록 구현하였다.
<br>

```java
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
```
<br>

**2. Controller**

GET 방식의 API, viewBlog 메서드는 다음과 같다. URL 경로에 id 값을 넣기 위해 @PathVariable 어노테이션을 설정하였으며, 해당하는 id 값의 데이터를 조회하여 해당 행을 반환하도록 하였다.

```java
    GetMapping("/api/blog/{id}")
    public Optional<Blog> viewBlog(@PathVariable Long id) {
        return blogRepository.findById(id);
    }
```

<br>

## 4. 게시글 삭제

게시글 삭제 로직은 다음과 같다.

1. **Client**

게시글 삭제 기능은 게시글 상세보기 페이지에서 구현하였다. 상세 보기 페이지의 id 값과 일치하는 데이터를 delete() 함수에 전달하여 삭제될 수 있도록 하였다.

```java
<button id="${id}-delete" value="삭제" onclick="deletePost('${id}')">삭제</button>
```

이번에도 마찬가지로 ajax 통신으로 서버에 데이터를 전달하였으며, id 값과 일치하는 데이터가 정상적으로 삭제 되었을 경우 "게시글 삭제가 완료되었습니다." 라는 팝업창을 띄우고 최상위 경로인 메인 페이지로 이동이 될 수 있도록 하였다.
<br>

```java
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
```
<br>

**2. Controller**

DELETE 방식의 API, deleteBlog 메서드에서는 URL 경로에 id 값을 넣기 위해 @PathVariable 어노테이션을 설정하였으며, 해당하는 id 값의 데이터를 조회하여 주어진 id 를 가진 엔티티를 삭제하도록 한다.

```java
@DeleteMapping("/api/blog/{id}")
    public Long deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return id;
    }
```

<br>

## 5. 게시글 목록 조회

게시글 목록 조회는 다음과 같다.

1. **Client**

사용자가 메인 페이지에 접근하게 되면, getPost() 함수가 호출된다. 해당 함수도 마찬가지로 ajax 통신으로 서버에 데이터를 전달하고 응답 받은 데이터를 모두 출력하도록 구현을 하여야 하기 때문에 아래와 같이 반복문을 돌려 게시글 데이터베이스에 저장된 모든 행을 반환하도록 하고, board-table 클래스에 append 하도록 하였다.
<br>

```java
function getPost() {
    $.ajax({
        type: "GET",
        url: "/api/blog",
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let posting = response[i];
                let id = posting['id'];
                let title = posting['title'];
                let author = posting['author'];
                let content = posting['content'];
                let createAt = posting['createAt'];
                addHTML(id, title, author, content, createAt);
            }
        }
    })
}
```
<br>

```java
function addHTML(id, title, author, content, createAt) {
    let tempHTML = `<tr>
                        <td>${id}</td>
                        <td><a href="board.html?id=${id}">${title}</a></td>
                        <td>${author}</td>
                        <td>${createAt}</td>
                        <td>2</td>
                    </tr>`
    $('.board-table').append(tempHTML);
}
```
<br>

**2. Controller**

```java
@GetMapping("/api/blog")
    public List<Blog> readBlog() {
        return blogRepository.findAllByOrderByModifiedAtDesc();
    }
```

<br>

# 📕 주요 기능 외

## 1. Application Class

스프링부트에서 Application Class 는 생성할 프로젝트의 메인이 되는 클래스이다.

해당 클래스에서 @SpringBootApplication 어노테이션은 스프링부트의 자동설정과 스프링의 Bean 읽기와 생성을 모두 자동으로 설정한다.

```java
@EnableJpaAuditing      // JPA 기능을 사용한다.
@SpringBootApplication  // 스프링 부트의 자동 설정, 스프링 Bean 읽기와 생성을 모두 자동으로 생성한다.
public class BlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args);
    }

}
```

해당 클래스는 항상 프로젝트 최상단에 위치하여야 하며, 스프링 부트의 내장 WAS 는 main 메서드에서 실행되는 [SpringApplication.run](http://springapplication.run) 으로 인해 내장 WAS 가 실행된다.

별도로 외부에 WAS 를 두지 않고 애플리케이션을 실행할 때 내부에서 WAS 를 실행하는 것을 의미한다. 이와 같이 내장 WAS 가 있어 서버에 WAS 를 별도로 설치해야 하는 번거로움이 없어진다. 스프링부트에서는 **언제 어디서나 같은 환경에서 스프링 부트를 배포 할 수 있게끔 내장 WAS 를 사용하는 것을 권장한다.**

- **어노테이션 정리**
    1. EnableJpaAuditing : JPA 기능을 사용하기 위해 추가
    2. SpringBootApplication : 스프링 부트의 자동 설정과 스프링 Bean 읽기와 생성을 모두 자동으로 생성

<br>

## 2. DTO

계층간 이동을 담당할 DTO 는 다음과 같다.

```java
@Getter
public class BlogRequestDto {

    private String title;
    private String author;
    private String content;
}
```
<br>

## 3. Entity

```bash
    @Id // 해당 테이블의 PK 필드임을 나타낸다.
    @GeneratedValue(strategy = GenerationType.AUTO) // 자동 숫자 올림
    private Long id;

    // 제목은 20자 이내로 받는다.
    @Column(length = 20, nullable = false)
    private String title;

    // 텍스트로 데이터를 받는다.
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private String author;
```

- **Column**
    1. id
    2. title
    3. content
    4. author

    <br>

## 4. Repository

Entity 클래스에서 데이터베이스를 접근하게 할 인터페이스이다. DAO 역할을 하며, JPA 에서는 이 DAO 역할을 하는 인터페이스를 Repository 라고 부른다. 아래와 같이 인터페이스를 정의하면 해당 조건에 일치하는 데이터를 컨트롤 할 수 있다.

```java
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByOrderByModifiedAtDesc();
    Optional<Blog> findById(Long id);
}
```

- BlogRepository 가 JpaRepository 를 상속 받아 Blog Entiry 클래스에서 사용한다.
- 즉, 자바 코드로 쿼리를 만들기 위해 미리 작성된 코드인 findall, delete, findbyid, save 등을 사용할 수 있도록 상속 받는다.
- List<Blog> findAllByOrderByModifiedAtDesc()
    - findAll → 데이터 전체를 조회한다. (select * from blog)
    - OrderBy → 데이터 전체를 지정된 컬럼으로 정렬한다. 상속한 Timestamp 클래스의 modifiedAt 기준으로 정렬 (select * from blog order by modifiedAt)
    - Desc → 데이터 전체를 지정된 컬럼을 내림차순으로 정렬한다. (select * from blog order by modifiedAt desc)

Hibernate 를 이용하여 디비에 전달되는 쿼리 로그를 조회해보았을 때, 확인되는 쿼리 로그는 다음과 같다. Spring boot 에서 Query DSL 이든 JPA 를 사용하든 간에 쿼리를 튜닝할 때 전달되는 SQL 를 봐야하는 일이 반드시 있을 것 같다.

```java
Hibernate:
    select
        blog0_.id as id1_0_,
        blog0_.create_at as create_a2_0_,
        blog0_.modified_at as modified3_0_,
        blog0_.author as author4_0_,
        blog0_.content as content5_0_,
        blog0_.title as title6_0_
    from
        blog blog0_
    order by
        blog0_.modified_at desc
```

- Optional<Blog> findById(Long id)
    - 해당 쿼리는 클라이언트로부터 전달 받은 id 값과 일치하는 특정 행에 대해서만 반환하여, 요청한 해당 게시글만 뷰에 보여질 수 있도록 하기 위해 작성하였다.
    - 전달되는 쿼리는 다음과 같다. → select * from blog where id='요청 데이터'

```java
Hibernate:
    select
        blog0_.id as id1_0_0_,
        blog0_.create_at as create_a2_0_0_,
        blog0_.modified_at as modified3_0_0_,
        blog0_.author as author4_0_0_,
        blog0_.content as content5_0_0_,
        blog0_.title as title6_0_0_
    from
        blog blog0_
    where
        blog0_.id=?
```

  <br>

## 5. Timestamp

```java
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Timestamped {

    @CreatedDate
    private LocalDateTime createAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public abstract void view(BlogRequestDto requestDto);
}
```

- **자료형 및 기타**
    1. LocalDateTime : 시간을 나타내는 자료형
    2. abstract : 다른 클래스에서 상속이 되어야만 사용이 가능하다.

- **어노테이션 정리**
    1. MappedSupperclass : 해당 클래스를 상속하면 자동으로 생성 시간과 수정 시간을 컬럼으로 인식하도록 한다.
    2. EntiryListeners : 생성 시간과 수정 시간의 변화가 있을 때 자동으로 업데이트 되도록 한다.

  <br>

# 🤔 돌아보며 (작성중)

 객체 지향 프로그래밍에 대해서 잘 모르는 상태로 시작했던 과제였기 때문에 많은 어려움이 있었던 것 같다. 과제를 시작하기 전, 이틀 간 스프링 강의를 들으며 스프링에 대한 학습을 하고 진행하였는데, 이해하지 못한 부분이 많아 '내가 기능 하나라도 이틀 내로 구현을 할 수 있을까?' 고심했던 것 같다.

 결론적으로는 목표했던 기능은 잘 구현해냈지만, 시간 관계상 예외처리를 마무리하지 않아 아쉬웠던 점이 있었다. 마무리하지 못한 부분은 이번에 할당된 새로운 과제가 마무리 되면 보완을 해보아야겠다. :)


