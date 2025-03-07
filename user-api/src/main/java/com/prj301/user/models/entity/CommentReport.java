package com.prj301.user.models.entity;

import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comment_reports")
public class CommentReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Comment comment;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    @Column(nullable = false)
    private String reason;
}
