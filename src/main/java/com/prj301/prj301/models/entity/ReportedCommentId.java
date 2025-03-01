package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

public class ReportedCommentId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private Comment comment;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    public Comment comment() {
        return comment;
    }

    public ReportedCommentId setComment(Comment comment) {
        this.comment = comment;
        return this;
    }

    public User reportingUser() {
        return reportingUser;
    }

    public ReportedCommentId setReportingUser(User reportingUser) {
        this.reportingUser = reportingUser;
        return this;
    }
}

