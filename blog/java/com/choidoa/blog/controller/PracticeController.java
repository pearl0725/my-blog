package com.choidoa.blog.controller;

import com.choidoa.blog.domain.Blog;
import com.choidoa.blog.domain.BlogRepository;
import com.choidoa.blog.domain.BlogRequestDto;
import com.choidoa.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// 컨트롤러 : URL 을 매핑하고, 비즈니스 로직 함수를 호출하여 view 에 뿌려주는 역할
@RequiredArgsConstructor
@RestController // 컨트롤러를 JSON 으로 반환하는 컨트롤러로 만든다.
public class PracticeController {

    // 업데이트를 위해서는 서비스, 나머지 데이터는 Repository 가 필요하다.
    private final BlogRepository blogRepository;
    private final BlogService blogService;

     // 게시글 생성, RequestBody to RequestDto
    @PostMapping("/api/blog")
    public Blog createBlog(@RequestBody BlogRequestDto requestDto) {
        Blog blog = new Blog(requestDto);
        return blogRepository.save(blog);   // 생성한 데이터를 저장
    }

    // 게시글 목록 조회
    @GetMapping("/api/blog")
    public List<Blog> readBlog() {
        return blogRepository.findAllByOrderByModifiedAtDesc(); // 데이터를 돌려준다.
    }

    // 게시글 수정
    @PutMapping("/api/blog/{id}")
    public Long updateBlog(@PathVariable Long id, @RequestBody BlogRequestDto requestDto) {
        blogService.update(id, requestDto);
        return id;
    }

    // 게시글 삭제
    @DeleteMapping("/api/blog/{id}")
    // 경로에 있는 변수를 받기 위해 @PathVatiable
    public Long deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return id;
    }

}
