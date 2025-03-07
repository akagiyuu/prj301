package com.prj301.admin.controllers;

import com.prj301.admin.models.dto.auth.LoginRequest;
import com.prj301.admin.services.JWSService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String ERROR_MESSAGE = "Invalid username or password";

    private final JWSService jwsService;

    @Value("${server.admin.username}")
    private String ADMIN_USERNAME;

    @Value("${server.admin.password}")
    private String ADMIN_PASSWORD;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest
            .getUsername()
            .equals(ADMIN_USERNAME) && loginRequest
            .getPassword()
            .equals(ADMIN_PASSWORD)) {
            return ResponseEntity.ok(jwsService.generateToken());
        }

        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ERROR_MESSAGE);
    }
}