package com.prj301.prj301.models.dto.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

@RequiredArgsConstructor
@Accessors(fluent = true)
@Getter
public class LoginRequest {
    private String email;
    private String password;
}
