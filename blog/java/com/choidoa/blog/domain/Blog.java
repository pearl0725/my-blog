package com.choidoa.blog.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter // 클래스 내의 모든 필드의 Getter 메소드를 자동 생성
@NoArgsConstructor  // 기본 생성자 추가
@Entity // 테이블과 링크될 클래스
// DB 테이블과 매칭이 될 클래스, Entity 클래스
public class Blog extends Timestamped {

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

    public Blog(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public Blog(BlogRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.author = requestDto.getAuthor();
    }

    // 게시글을 변경하기 위한 클래스, 변경할 데이터의 정보(DTO)를 전달해준다.
    // findByID 로 찾은 데이터를 담는 정보
    public void update(BlogRequestDto requestDto) {
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.author = requestDto.getAuthor();
    }

//    @Override
//    public void view(BlogRequestDto requestDto) {
//        this.title = requestDto.getTitle();
//        this.content = requestDto.getContent();
//        this.author = requestDto.getAuthor();
//    }
}
