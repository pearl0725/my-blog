package com.choidoa.blog.domain;

import com.choidoa.blog.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // 회원의 id 를 받아 데이터베이스에서 조회한다.
    Optional<User> findByKakaoId(Long kakaoId);
}