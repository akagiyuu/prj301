package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.entity.User;
import com.prj301.user.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final int startingPage = 1;
    private final int sizeOfPage = 10;

    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable UUID id) {
        return userService.toUserResponse(userService.findById(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @PostMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestAttribute("user-id") UUID userId, @RequestBody User updatedUser) {
        if (userId == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userService.toUserResponse(userService.updateUser(userId, updatedUser)));
    }
    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @GetMapping("/")
    public ResponseEntity<List<UserResponse>> getAllUsers(@RequestParam(defaultValue = "title") String sort_by, @RequestParam(defaultValue = "asc") String direction) {
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sort_by).ascending()
                : Sort.by(sort_by).descending();
        Pageable pageable = PageRequest.of(startingPage, sizeOfPage, sort);
        Page<User> userPage = userService.findAll(pageable);

        if (userPage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<UserResponse> userResponseList = userPage.getContent().stream()
                .map(userService::toUserResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(userResponseList);
    }
}