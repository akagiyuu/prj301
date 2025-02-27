package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

class ReportedUserId implements Serializable {
    private User user;
    private User reportingUser;
}

@Entity
@Table(name = "reported_users")
@IdClass(ReportedUserId.class)
public class ReportedUser {
    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    @Column(nullable = false)
    private String reason;

    public User user() {
        return user;
    }

    public ReportedUser setUser(User user) {
        this.user = user;
        return this;
    }

    public User reportingUser() {
        return reportingUser;
    }

    public ReportedUser setReportingUser(User reportingUser) {
        this.reportingUser = reportingUser;
        return this;
    }

    public String reason() {
        return reason;
    }

    public ReportedUser setReason(String reason) {
        this.reason = reason;
        return this;
    }
}