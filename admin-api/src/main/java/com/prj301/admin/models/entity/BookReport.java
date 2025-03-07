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
@Table(name = "book_reports")
public class BookReport {
    @EmbeddedId
    private BookReportId id;

    @Column(nullable = false)
    private String reason;
}