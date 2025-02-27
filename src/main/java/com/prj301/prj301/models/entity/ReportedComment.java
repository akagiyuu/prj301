package com.prj301.prj301.models.entity;

import javax.persistence.*;

class ReportedCommentId {
    private Comment comment;
    private User reportingUser;
}

@Entity
@Table(name = "reported_comment")
@IdClass(ReportedCommentId.class)
public class ReportedComment {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private Comment comment;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    @Column(nullable = false)
    private String reason;
}
