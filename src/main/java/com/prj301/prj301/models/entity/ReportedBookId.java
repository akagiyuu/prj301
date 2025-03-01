package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class ReportedBookId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    public Book book() {
        return book;
    }

    public ReportedBookId setBook(Book book) {
        this.book = book;
        return this;
    }

    public User reportingUser() {
        return reportingUser;
    }

    public ReportedBookId setReportingUser(User reportingUser) {
        this.reportingUser = reportingUser;
        return this;
    }
}