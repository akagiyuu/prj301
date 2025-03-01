package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "reported_comment")
public class ReportedComment {
    @EmbeddedId
    private ReportedCommentId id;

    @Column(nullable = false)
    private String reason;

    public ReportedCommentId id() {
        return id;
    }

    public ReportedComment setId(ReportedCommentId id) {
        this.id = id;
        return this;
    }

    public String reason() {
        return reason;
    }

    public ReportedComment setReason(String reason) {
        this.reason = reason;
        return this;
    }
}
