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
@Table(name = "reported_books")
public class ReportedBook {
    @EmbeddedId
    private ReportedBookId id;

    @Column(nullable = false)
    private String reason;
}