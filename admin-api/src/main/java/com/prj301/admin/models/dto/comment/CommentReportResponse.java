package com.prj301.admin.models.dto.comment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class CommentReportResponse {
    private final UUID id;
    private final String content;
    private final String user;
    private final String book;
    private final LocalDate createdAt;
    private final String reportingUser;
    private final String reason;
}