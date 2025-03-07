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
@Table(name = "reported_books")
public class ReportedBook {
    @EmbeddedId
    private ReportedBookId id;

    @Column(nullable = false)
    private String reason;
}