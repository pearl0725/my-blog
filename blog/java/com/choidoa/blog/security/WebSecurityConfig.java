package com.choidoa.blog.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity // 스프링 Security 지원을 가능하게 함, 스프링 시큐리티 로그인 페이지
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();

        http.authorizeRequests()
                // 이미지 폴더와 CSS 폴더에 대해서도 login 없이 허용하도록 한다.
                .antMatchers("/assets/img/**").permitAll()
                .antMatchers("/css/**").permitAll()
                // js 파일도 허용이 되도록 한다.
                .antMatchers("/js/**").permitAll()
                // 회원가입 페이지도 허용이 되도록 구현
                .antMatchers("/user/**").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                // 그 외 모든 요청은 인증 과정이 필요하다.
                .anyRequest().authenticated()
                .and()
                .formLogin()
//                .loginPage("/user/login") // 기본 로그인 페이지가 아닌, login.html 페이지가 출력되도록 한다.
                .loginPage("/user/login")
                .failureUrl("/user/login/error")
                .defaultSuccessUrl("/") // 로그인이 성공했을 경우 이동하는 페이지
                .permitAll()    // 로그인 메인 페이지 접근 허용
                .and()
                .logout()
                .logoutUrl("/user/logout")
                .permitAll();
    }
    // 패스워드 암호화는 구현하지 않아도 됌.
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }
}