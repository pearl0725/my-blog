package com.choidoa.blog.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Comment extends Timestamped{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // 게시글과 관련된 board_id 값을 담을 컬럼
    @Column(nullable = false)
    private Long boardid;

    // 로그인한 사용자에 대한 정보를 담는다.
    @Column(nullable = false)
    private String username;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String comment;

    public Comment(String username, String comment, Long board_id) {
        this.boardid = board_id;
        // 댓글을 작성한 회원 아이디를 저장한다.
        this.username = username;
        this.comment = comment;
    }

    public Comment(CommentRequestDto requestDto) {
        this.boardid = requestDto.getBoardid();
        this.username = requestDto.getUsername();
        this.comment = requestDto.getComment();
    }

    // update 메소드, 수정 관련 -> Comment 데이터만 수정이 필요함
    public void update(CommentRequestDto requestDto) {
        this.comment = requestDto.getComment();
    }

}
