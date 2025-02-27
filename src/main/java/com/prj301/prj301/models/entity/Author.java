package com.prj301.prj301.models.entity;

import javax.persistence.*;

@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    private String name;

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
}
