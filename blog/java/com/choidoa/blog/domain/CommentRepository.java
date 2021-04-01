package com.choidoa.blog.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByOrderByModifiedAtDesc();

//    @Query(value="select * from Comment m where m.id like Comment.id", nativeQuery = true)
    List<Comment> findAllByboardid(Long board_id);


    // 추후에는 게시글에 대한 id 값이 일치한 댓글만 조회할 수 있도록 구현하여야 한다.
}