package com.choidoa.blog.domain;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class SignupRequestDto {
    private String username;
    private String password;
    private String email;
}