package com.choidoa.blog.controller;

import com.choidoa.blog.domain.SignupRequestDto;
import com.choidoa.blog.domain.UserDto;
import com.choidoa.blog.security.UserDetailsImpl;
import com.choidoa.blog.service.UserService;
import com.choidoa.blog.domain.User;
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

    @GetMapping("/user/login/error")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        return "login";
    }

    // 회원 가입 페이지
    @GetMapping("/user/signup")
    public String signup(UserDto userDto) {
        return "signup";
    }

     회원 가입 요청 처리
    @PostMapping("/user/signup")
    public String registerUser(@Valid SignupRequestDto requestDto, Errors errors, Model model) {
        userService.registerUser(requestDto);
        if (errors.hasErrors()) {
            // 회원가입 실패시 입력 데이터를 유지하도록 함
            model.addAttribute("userDto", requestDto);

            // 유효성 검사를 통과하지 못한 필드와 메세지를 핸들링, 서비스에 validateHandling 메서드 추가할 것
            Map<String, String> validatorResult = userService.validateHandling(errors);
            for (String key : validatorResult.keySet()) {
                model.addAttribute(key, validatorResult.get(key));
            }
            return "login"; // 회원가입 이후에 메인 페이지가 아닌 로그인 페이지로 이동하게끔 수정
        }

        userService.signUp(requestDto);
        return "redirect:/user/login";
    }

//    @GetMapping("/user/signup/error")
//    public String signupError(Model model) {
//        model.addAttribute("signupError", true);
//        return "signup";
}