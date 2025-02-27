package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue
    private long id;

    @OneToMany
    @JoinColumn(nullable = false)
    private User user;

    @OneToMany
    @JoinColumn(nullable = false)
    private Book book;

    @Column(nullable = false)
    private LocalDate createdAt;

    @Lob
    @Column(nullable = false)
    private String content;
}
