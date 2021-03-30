package com.choidoa.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing      // JPA 기능 사용
@SpringBootApplication  // 스프링 부트의 자동 설정, 스프링 Bean 읽기와 생성을 모두 자동으로 생성한다.
public class BlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogApplication.class, args); // 내장 WAS 실행, 외부에 별도로 WAS 를 두지 않고 내부에서 실행
        // 스프링 부트에서는 내장 WAS 를 사용하는 것을 권장하고 있다.
        // 이유는 '언제 어디서나 같은 환경에서 스프링 부트를 배포하기 위함'
        // 외장 WAS 를 사용하면 모든 서버는 WAS 의 종류와 버전 등의 개발 환경을 맞추어야 하기 때문이다.
    }
}
