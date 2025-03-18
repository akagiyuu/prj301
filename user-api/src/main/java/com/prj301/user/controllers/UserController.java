package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.report.UserReportRequest;
import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.dto.user.UserUpdate;
import com.prj301.user.models.entity.User;
import com.prj301.user.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping("/find")
    public UserResponse find(@RequestParam("username") String username) {
        return service.findByUsername(username);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @GetMapping("/self")
    public UserResponse self(@RequestAttribute("user-id") UUID id) {
        return service
            .findById(id)
            .map(service::toUserResponse)
            .orElse(null);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @JWTProtected
    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestAttribute("user-id") UUID id, @RequestBody UserUpdate data) {
        if (service.update(id, data)) {
            return ResponseEntity
                .ok()
                .build();
        }

        return ResponseEntity
            .badRequest()
            .body("Failed to update");
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/report")
    public ResponseEntity<?> report(
            @PathVariable UUID id,
            @RequestBody UserReportRequest reason,
            @RequestAttribute("user-id") UUID reportingUserId
    ){

        if (service.report(reason, id, reportingUserId)) {
            return ResponseEntity
                    .ok()
                    .build();
        }

        return ResponseEntity
                .badRequest()
                .body("Failed to report");
    }
}