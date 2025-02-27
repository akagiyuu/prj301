package com.prj301.prj301.models.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Genre {
    @Id
    @GeneratedValue
    private long id;

    @Column(unique = true, nullable = false)
    private String name;

    public String name() {
        return name;
    }

    public Genre setName(String name) {
        this.name = name;
        return this;
    }

    public long id() {
        return id;
    }

    public Genre setId(long id) {
        this.id = id;
        return this;
    }
}