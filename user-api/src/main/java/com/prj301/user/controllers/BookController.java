package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.comment.CommentRequest;
import com.prj301.user.models.dto.comment.CommentResponse;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import com.prj301.user.services.BookService;
import com.prj301.user.services.CommentService;
import com.prj301.user.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;

    @GetMapping
    public Page<BookResponse> getBooks(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) List<String> genres,
        Pageable pageable
    ) {
        if (query == null || query.isEmpty()) {
            return bookService.findAll(genres, pageable);
        }

        throw new UnsupportedOperationException("Not implement, yet");
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable UUID id){
        BookResponse bookResponse = bookService.getBookById(id);
        return ResponseEntity.ok(bookResponse);
    }

    @GetMapping("/{id}/comment")
    public ResponseEntity<List<CommentResponse>> getCommentsByBookId(@PathVariable UUID id){
        List<CommentResponse> comments = commentService.getCommentsById(id);
        return ResponseEntity.ok(comments);
    }

    @JWTProtected
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/{id}/comment")
    public ResponseEntity<CommentResponse> postComment(
            @PathVariable UUID id,
            @RequestBody CommentRequest commentRequest,
            @RequestAttribute("user-id") UUID userId
    ) {
        User currentUser = userService.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found!"));
        CommentResponse response = commentService.addComment(id, commentRequest, currentUser);
        return ResponseEntity.ok(response);
    }
}
