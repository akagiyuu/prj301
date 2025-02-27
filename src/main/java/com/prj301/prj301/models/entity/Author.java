package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    private String name;

    @ManyToMany(mappedBy = "authors")
    private Set<Book> books = new HashSet<>();

    public long id() {
        return id;
    }

    public Author setId(long id) {
        this.id = id;
        return this;
    }

    public String name() {
        return name;
    }

    public Author setName(String name) {
        this.name = name;
        return this;
    }

    public Set<Book> books() {
        return books;
    }

    public Author setBooks(Set<Book> books) {
        this.books = books;
        return this;
    }
}
