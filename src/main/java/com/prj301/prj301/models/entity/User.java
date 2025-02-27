package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String avatarPath;

    private String name;

    private String hobbies;

    private LocalDate dob;

    private String bio;

    private LocalDate createdAt;
}
