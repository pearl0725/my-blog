package com.choidoa.blog.service;

import com.choidoa.blog.domain.Blog;
import com.choidoa.blog.domain.BlogRepository;
import com.choidoa.blog.domain.BlogRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sun.java2d.pipe.SpanIterator;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;


    // 데이터베이스에 반영되도록 어노테이션을 추가
    @Transactional
    public Long update(Long id, BlogRequestDto requestDto) {
        System.out.println(id);
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new IllegalMonitorStateException("아이디가 존재하지 않습니다.")
        );
        System.out.println(blog);
        blog.update(requestDto);
        return blog.getId();
    }

    @Transactional
    public Long view(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new IllegalMonitorStateException("아이디가 존재하지 않습니다.")
        );
        return blog.getId();
    }

}
