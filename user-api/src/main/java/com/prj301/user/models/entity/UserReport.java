package com.prj301.user.models.entity;

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
@Table(name = "user_reports")
public class UserReport {
    @EmbeddedId
    private UserReportId id;

    @Column(nullable = false)
    private String reason;
}