package com.prj301.admin.models.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class UserReportResponse {
    private final UUID id;
    private final String username;
    private final String fullName;
    private final LocalDate createdAt;
    private final String reportingUser;
    private final String reason;
}
