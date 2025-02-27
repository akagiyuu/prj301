package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "genres")
public class Genre {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToMany(mappedBy = "genres")
    private Set<Book> books = new HashSet<>();

    public long id() {
        return id;
    }

    public Genre setId(long id) {
        this.id = id;
        return this;
    }

    public String name() {
        return name;
    }

    public Genre setName(String name) {
        this.name = name;
        return this;
    }

    public Set<Book> books() {
        return books;
    }

    public Genre setBooks(Set<Book> books) {
        this.books = books;
        return this;
    }
}