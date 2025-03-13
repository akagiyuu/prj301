package com.prj301.user.models.dto.comment;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class CommentResponse {
    private final String username;
    private final String content;
    private final LocalDate createdAt;
}
