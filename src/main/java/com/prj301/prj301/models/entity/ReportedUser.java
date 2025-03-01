package com.prj301.prj301.models.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "reported_users")
public class ReportedUser {
    @EmbeddedId
    private ReportedUserId id;

    @Column(nullable = false)
    private String reason;

    public ReportedUserId id() {
        return id;
    }

    public ReportedUser setId(ReportedUserId id) {
        this.id = id;
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