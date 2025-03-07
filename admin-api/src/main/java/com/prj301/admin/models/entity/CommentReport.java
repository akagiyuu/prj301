package com.prj301.admin.models.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
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

    @CreationTimestamp
    private LocalDate createdAt;
}
