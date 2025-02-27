package com.prj301.prj301.models.entity;

import javax.persistence.*;

class ReportedBookId {
    private Book book;
    private User reportingUser;
}

@Entity
@Table(name = "reported_books")
@IdClass(ReportedBookId.class)
public class ReportedBook {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    @Column(nullable = false)
    private String reason;

    public Book book() {
        return book;
    }

    public ReportedBook setBook(Book book) {
        this.book = book;
        return this;
    }

    public User reportingUser() {
        return reportingUser;
    }

    public ReportedBook setReportingUser(User reportingUser) {
        this.reportingUser = reportingUser;
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