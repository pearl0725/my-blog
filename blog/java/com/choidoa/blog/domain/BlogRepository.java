package com.choidoa.blog.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Blog 클래스에서 DB 를 접근하게 할 Repo
// DAO 역할을 한다. JAP 에서는 Repository 라고 부르며, 인터페이스에서 생성한다.
// 인터페이스만 정의해놓으면 해당 조건에 일치하는 데이터를 컨트롤 할 수 있음
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findAllByOrderByModifiedAtDesc();
    //findAllByOrOrderByModifiedAtDesc();
}
