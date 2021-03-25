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

    // 게시글 수정 메서드
    @Transactional
    public Long update(Long id, BlogRequestDto requestDto) {
        Blog blog = blogRepository.findById(id).orElseThrow(
                () -> new IllegalMonitorStateException("변경할 게시글 정보가 없습니다.")
        );
        blog.update(requestDto);
        return blog.getId();
    }
}

