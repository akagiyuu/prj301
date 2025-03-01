package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "reported_books")
public class ReportedBook {
    @EmbeddedId
    private ReportedBookId id;

    @Column(nullable = false)
    private String reason;

    public ReportedBookId id() {
        return id;
    }

    public ReportedBook setId(ReportedBookId id) {
        this.id = id;
        return this;
    }

    public String reason() {
        return reason;
    }

    public ReportedBook setReason(String reason) {
        this.reason = reason;
        return this;
    }
}