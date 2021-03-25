package com.choidoa.blog.controller;

import com.choidoa.blog.domain.Blog;
import com.choidoa.blog.domain.BlogRepository;
import com.choidoa.blog.domain.BlogRequestDto;
import com.choidoa.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
@RestController // 컨트롤러를 JSON 으로 반환하는 컨트롤러로 만든다.
public class PracticeController {

    private final BlogRepository blogRepository;    // 데이터 관련 작업
    private final BlogService blogService;  // 업데이트
//    private String mainPage = "redirect:/";
//    private Object SpringVersion;

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

    // 게시글 상세보기
    @GetMapping("/api/blog/{id}")
    public Optional<Blog> viewBlog(@PathVariable Long id) {
//        log.info("id: {}", id);
        return blogRepository.findById(id);
    }

    // 게시글 수정 -> 어떤 id 값을 가진 게시글을 삭제할지 요청을 받음. -> Body 영역의 변경된 데이터는 Dto 로 전달된다.
    @PutMapping("/api/blog/{id}")
    public Long updateBlog(@PathVariable Long id, @RequestBody BlogRequestDto requestDto) {
        blogService.update(id, requestDto); // requestDto 에서 변경해야 할 데이터를 가져온다.
        return id;
    }

    // 게시글 삭제
    @DeleteMapping("/api/blog/{id}")
    public Long deleteBlog(@PathVariable Long id) {
        blogRepository.deleteById(id);
        return id;
    }

//    @SneakyThrows
//    @GetMapping("/api/blog/{id}?")
//    public void mainRe(HttpServletResponse response){
//        String redirect_uri="/";
//        response.sendRedirect(redirect_uri);
//    }
}
