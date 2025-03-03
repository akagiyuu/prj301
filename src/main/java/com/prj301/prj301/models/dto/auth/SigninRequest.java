package com.prj301.prj301.models.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
@Schema
public class SigninRequest {
    @Schema(
        description = "Username of the user",
        example = "john_doe",
        nullable = false
    )
    private String username;

    @Schema(
        description = "Password of the user",
        example = "P@ssw0rd",
        nullable = false
    )
    private String password;

    @Schema(
        description = "Full name of the user",
        example = "John Doe",
        nullable = false
    )
    private String fullName;
}
