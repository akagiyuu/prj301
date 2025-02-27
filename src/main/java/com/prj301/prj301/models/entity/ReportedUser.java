package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
class ReportedUserId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;
}

@Entity
@Table(name = "reported_users")
public class ReportedUser {
    @EmbeddedId
    private ReportedUserId id;

    @Column(nullable = false)
    private String reason;
}