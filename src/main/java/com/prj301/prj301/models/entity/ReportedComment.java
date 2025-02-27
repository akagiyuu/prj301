package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
class ReportedCommentId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private Comment comment;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;
}

@Entity
@Table(name = "reported_comment")
public class ReportedComment {
    @EmbeddedId
    private ReportedCommentId id;

    @Column(nullable = false)
    private String reason;
}
