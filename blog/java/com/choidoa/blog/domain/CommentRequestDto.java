package com.choidoa.blog.domain;

import lombok.Getter;


@Getter
public class CommentRequestDto {

    private Long boardid;
    private String username;
    private String comment;
}
