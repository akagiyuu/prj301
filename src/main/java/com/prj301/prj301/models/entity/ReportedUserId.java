package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

public class ReportedUserId implements Serializable {
    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User reportingUser;

    public User user() {
        return user;
    }

    public ReportedUserId setUser(User user) {
        this.user = user;
        return this;
    }

    public User reportingUser() {
        return reportingUser;
    }

    public ReportedUserId setReportingUser(User reportingUser) {
        this.reportingUser = reportingUser;
        return this;
    }
}

