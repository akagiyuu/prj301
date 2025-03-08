package com.prj301.admin.models.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class UserResponse {
    private UUID id;
    private String username;
    private String fullName;
    private LocalDate createdAt;
}