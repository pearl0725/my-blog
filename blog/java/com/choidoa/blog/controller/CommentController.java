package com.choidoa.blog.controller;

import com.choidoa.blog.domain.BlogRequestDto;
import com.choidoa.blog.domain.Comment;
import com.choidoa.blog.domain.CommentRepository;
import com.choidoa.blog.domain.CommentRequestDto;
import com.choidoa.blog.service.CommentService;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentRepository commentRepository;
    private final CommentService commentService;


    // 댓글 작성 API
    @PostMapping("/blog/comment")
    public Comment createComment(@RequestBody CommentRequestDto requestDto) {
        Comment comment = new Comment(requestDto);
        System.out.println("테스트임다 : "+ new Gson().toJson(comment));
        return commentRepository.save(comment);
    }

    @GetMapping("/blog/comment/{id}")
    public List<Comment> readComment(@PathVariable Long id) {
        return commentRepository.findAllByboardid(id);
    }

    // 댓글 수정 API
    @PutMapping("/blog/comment/{id}")
    public Long updateComment(@PathVariable Long id, @RequestBody CommentRequestDto requestDto) {
        System.out.println("테스트임다 : "+ new Gson().toJson(requestDto));
        commentService.update(id, requestDto);
//        System.out.println("테스트임다 : "+ new Gson().toJson(requestDto));
        System.out.println("테스트임다 : "+ new Gson().toJson(id));
        return id;
    }

    @DeleteMapping("/blog/comment/{id}")
    public Long deleteMemo(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return id;
    }

}
