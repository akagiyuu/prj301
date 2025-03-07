package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserRepository repository;

    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @GetMapping("/user")
    public Optional<User> get(@RequestAttribute("user-id") UUID id) {
        if (id == null) {
            return Optional.empty();
        }

        log.info(repository.toString());

        return repository.findById(id);
    }
}
