package com.prj301.prj301.controllers;

import com.prj301.prj301.models.dto.auth.LoginRequest;
import com.prj301.prj301.models.entity.User;
import com.prj301.prj301.repositories.UserRepository;
import com.prj301.prj301.utils.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String ERROR_MESSAGE = "Invalid username or password";
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Operation(
        summary = "User login",
        description = "Authenticates a user and returns a JWT token if the credentials are valid."
    )
    @ApiResponse(
        responseCode = "200",
        description = "Login successful - returns JWT token",
        content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))
    )
    @ApiResponse(
        responseCode = "401",
        description = "Invalid username or password",
        content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        final Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (!userOptional.isPresent()) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ERROR_MESSAGE);
        }

        final User user = userOptional.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.password())) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ERROR_MESSAGE);
        }

        final String token = jwtUtil.generateToken(user.id());

        return ResponseEntity.ok(token);
    }
}