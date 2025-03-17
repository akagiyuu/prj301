package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.report.CommentReportRequest;
import com.prj301.user.services.CommentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/report")
    public ResponseEntity<?> postReportComment(
            @PathVariable UUID id,
            @RequestBody CommentReportRequest reason,
            @RequestAttribute("user-id") UUID reportUserId
    ){

        if (commentService.reportComment(reason, id, reportUserId)) {
            return ResponseEntity
                    .ok()
                    .build();
        }

        return ResponseEntity
                .badRequest()
                .body("Failed to report");
    }
}