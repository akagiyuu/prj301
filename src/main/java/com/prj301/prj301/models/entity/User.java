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
    private String email;

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

    public long id() {
        return id;
    }

    public User setId(long id) {
        this.id = id;
        return this;
    }

    public String username() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String password() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public String avatarPath() {
        return avatarPath;
    }

    public User setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
        return this;
    }

    public String email() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String name() {
        return name;
    }

    public User setName(String name) {
        this.name = name;
        return this;
    }

    public String hobbies() {
        return hobbies;
    }

    public User setHobbies(String hobbies) {
        this.hobbies = hobbies;
        return this;
    }

    public LocalDate dob() {
        return dob;
    }

    public User setDob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public String bio() {
        return bio;
    }

    public User setBio(String bio) {
        this.bio = bio;
        return this;
    }

    public LocalDate createdAt() {
        return createdAt;
    }

    public User setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}