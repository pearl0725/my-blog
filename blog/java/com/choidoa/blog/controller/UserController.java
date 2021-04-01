package com.choidoa.blog.controller;

import com.choidoa.blog.domain.SignupRequestDto;
import com.choidoa.blog.domain.UserDto;
import com.choidoa.blog.security.UserDetailsImpl;
import com.choidoa.blog.service.UserService;
import com.choidoa.blog.domain.User;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Map;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원 로그인 페이지
    @GetMapping("/user/login")
    public String login() {
        return "login";
    }

    // 사용자가 회원 로그인 페이지에서 로그인을 했을 경우에는 메인 페이지로 이동하게 한다.
    @PostMapping("/user/login")
    public String logins() {
        return "index";
    }

    // 로그인 실패 API
    @GetMapping("/user/login/error")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        return "login";
    }

    // 회원 가입 API
    @GetMapping("/user/signup")
    public String signup() {
        return "signup";
    }

    // 회원 가입 요청 처리 API
    @PostMapping("/user/signup")
    public String registerUser(SignupRequestDto requestDto) {
        System.out.println("테스트임다 : "+ new Gson().toJson(requestDto));
        userService.registerUser(requestDto);
        return "redirect:/";
    }

    @GetMapping("/user/kakao/callback")
    public String kakaoLogin(String code) {
        // authorizedCode: 카카오 서버로부터 받은 인가 코드
        userService.kakaoLogin(code);

        return "redirect:/";
    }
}