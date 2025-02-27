package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
class ReportedBookId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private Book book;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;
}

@Entity
@Table(name = "reported_books")
public class ReportedBook {
    @EmbeddedId
    private ReportedUserId id;

    @Column(nullable = false)
    private String reason;
}