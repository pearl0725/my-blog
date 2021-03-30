package com.choidoa.blog.domain;

import com.choidoa.blog.domain.Timestamped;
import com.choidoa.blog.domain.SignupRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter // get 함수를 일괄적으로 만들어줍니다.
@NoArgsConstructor // 기본 생성자를 만들어줍니다.
@Entity // DB 테이블 역할을 합니다.
public class User {
    // 추상클래스 재정의 하는 방법이 뭐지....????????????????????????ㅜㅜㅜㅜㅜㅜㅜㅜㅜ

    public User(String username, String password, String email, UserRole role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }
    // ID가 자동으로 생성 및 증가합니다.
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    // 반드시 값을 가지도록 합니다.
    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    // UserRole 이 뭐지? enum 으로 설정한다고 함... enum 이 뭐더라;;
    // 상수 클래스..! 왜 이런 상수 클래스를 정의해서 하지? 관리자?
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRole role;
}