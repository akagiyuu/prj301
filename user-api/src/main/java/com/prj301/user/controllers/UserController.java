package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.dto.user.UserUpdate;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.User;
import com.prj301.user.services.BookService;
import com.prj301.user.services.CommentService;
import com.prj301.user.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Autowired
    private BookService bookService;

    @Autowired
    private CommentService commentService;

    @GetMapping("/find")
    public UserResponse find(@RequestParam("username") String username) {
        return service.findByUsername(username);
    }

    @GetMapping("/postedBook")
    public Page<BookResponse> postedBook(@RequestParam("username") String username, Pageable pageable) {
        return bookService.findByUsername(username, pageable);
    }

    @GetMapping("/countComment")
    public long countComment(@RequestParam("username") String username) {
        return commentService.countByUsername(username);
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
}