package com.prj301.admin.models.entity;

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
@Table(name = "reported_users")
public class ReportedUser {
    @EmbeddedId
    private ReportedUserId id;

    @Column(nullable = false)
    private String reason;
}