package com.prj301.prj301.models.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

@RequiredArgsConstructor
@Data
@Schema
public class LoginRequest {
    @Schema(
        description = "User's login username",
        example = "john.doe",
        nullable = false
    )
    private String username;

    @Schema(
        description = "User's password",
        example = "P@ssw0rd!",
        nullable = false
    )
    private String password;
}
