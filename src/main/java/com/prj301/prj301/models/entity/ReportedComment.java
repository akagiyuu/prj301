package com.prj301.prj301.models.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reported_comment")
public class ReportedComment {
    @EmbeddedId
    private ReportedCommentId id;

    @Column(nullable = false)
    private String reason;
}
