package com.prj301.prj301.controllers;

import com.prj301.prj301.models.dto.auth.LoginRequest;
import com.prj301.prj301.models.entity.User;
import com.prj301.prj301.repositories.UserRepository;
import com.prj301.prj301.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String ERROR_MESSAGE = "Invalid email or password";
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        final Optional<User> userOptional = userRepository.findByEmail(loginRequest.email());
        if (!userOptional.isPresent()) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ERROR_MESSAGE);
        }

        final User user = userOptional.get();
        if (!passwordEncoder.matches(loginRequest.password(), user.password())) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ERROR_MESSAGE);
        }

        final String token = jwtUtil.generateToken(user.id());

        return ResponseEntity.ok(token);
    }
}