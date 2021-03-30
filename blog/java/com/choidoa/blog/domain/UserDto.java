package com.choidoa.blog.domain;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDto {
    // Dto 는 전달 객체로서 다음과 같은 목적으로 활용된다.
    // 1. 클라이언트의 요청 데이터가 DTO 클래스로 캡슐화 되어 서버로 전달
    // 2. Controller <-> Service 계층간 데이터 전달
    // 따라서 유효성 검사는 1번의 케이스로 DTO 를 활용, 아래와 같이 DTO 클래스의 필드에 어노테이션을 추가하여 유효성 체크를 한다.
    // 조건을 만족하지 못할 경우 에러메세지를 반환한다.
//    private Long id;

    @NotBlank(message = "아이디를 입력해주세요")
    private String username;

    @NotBlank(message = "이메일을 입력해주세요")
    @Email(message = "이메일 형식에 알맞지 않습니다")
    private String email;

    // @Pattern() 패턴 추가하기!
    @NotBlank(message = "패스워드를 입력해주세요")
    private String password;

    @Builder
    public UserDto(Long id, String username, String email, String password) {
//        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
