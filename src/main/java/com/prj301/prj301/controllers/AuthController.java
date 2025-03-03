package com.prj301.prj301.controllers;

import com.prj301.prj301.models.dto.auth.LoginRequest;
import com.prj301.prj301.models.dto.auth.SigninRequest;
import com.prj301.prj301.models.entity.User;
import com.prj301.prj301.repositories.UserRepository;
import com.prj301.prj301.utils.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        summary = "User Sign In",
        description = "Creates a new user sign in and returns a JWT token upon successful registration."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Token generated successfully",
            content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Username already existed",
            content = @Content(mediaType = "text/plain")
        )
    })
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest) {
        User user = User
            .builder()
            .username(signinRequest.getUsername())
            .password(passwordEncoder.encode(signinRequest.getPassword()))
            .fullName(signinRequest.getFullName())
            .build();

        try {
            user = userRepository.save(user);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Username already existed");
        }

        final String token = jwtUtil.generateToken(user.id());

        return ResponseEntity.ok(token);
    }

    @Operation(
        summary = "User login",
        description = "Authenticates a user and returns a JWT token if the credentials are valid."
    )
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login successful - returns JWT token",
            content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Invalid username or password",
            content = @Content(mediaType = "text/plain", schema = @Schema(implementation = String.class))
        )
    })
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