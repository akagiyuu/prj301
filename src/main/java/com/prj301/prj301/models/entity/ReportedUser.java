package com.prj301.prj301.models.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Accessors(fluent = true)
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