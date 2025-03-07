package com.prj301.admin.models.dto.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class BookReportResponse {
    private final UUID id;
    private final String title;
    private final List<String> authors;
    private final LocalDate createdAt;
    private final String reportingUser;
    private final String reason;
}
