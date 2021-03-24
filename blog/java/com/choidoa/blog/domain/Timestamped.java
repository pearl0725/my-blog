package com.choidoa.blog.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter             // 반드시 Getter 로 가져와야 한다.
@MappedSuperclass   // Entiry 가 자동으로 컬럼으로 인식
@EntityListeners(AuditingEntityListener.class)  // Blog 클래스의 테이블 생성 및 변경이 있을 때 해당 시간을 자동으로 업데이트
public abstract class Timestamped {

    @CreatedDate
    private LocalDateTime createAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public abstract void view(BlogRequestDto requestDto);
}
