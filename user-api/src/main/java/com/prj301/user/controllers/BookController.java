package com.prj301.user.controllers;

import com.prj301.user.interceptors.JWTProtected;
import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.comment.CommentRequest;
import com.prj301.user.models.dto.comment.CommentResponse;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import com.prj301.user.services.BookService;
import com.prj301.user.services.CommentService;
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
    private UserRepository userRepository;

    @GetMapping
    public Page<BookResponse> getBooks(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) List<String> genres,
        @RequestParam(defaultValue = "title") String sort_by,
        @RequestParam(defaultValue = "asc") String direction,
        Pageable pageable
    ) {
        final int startingPage = 1; // starting page
        final int sizeOfPage = 8; // number of books in one page
        // query include both book's title and authors
        String queryTitle = query;
        String queryAuthor = query;
        // Sort by title and direction
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sort_by).ascending()
                : Sort.by(sort_by).descending();

        // Default: Sort_by title and direction asc
        // query = null && genres == null
        // Just sort_by and direction asc
        if(query == null && (genres == null || genres.isEmpty())) {
            pageable = PageRequest.of(startingPage,sizeOfPage, sort);
            return bookService.findAll(pageable);
        }
        // query = null && genres != null
        // Search by genres, sort_by and direction
        else if (query == null || query.isEmpty()) {
            pageable = PageRequest.of(startingPage,sizeOfPage, sort);
            return bookService.findAll(genres, pageable);
        }
        // genres = null && query != null
        // Search book's title, author by query with sort_by and direction
        else if(genres == null || genres.isEmpty()) {
            pageable = PageRequest.of(startingPage, sizeOfPage, sort);
            return bookService.findAll(queryTitle, queryAuthor, pageable);
        }
        // Use both search by title, author and genres
        else if(!genres.isEmpty() && query != null) {
            pageable = PageRequest.of(startingPage, sizeOfPage,sort);
            return bookService.findAll(queryTitle, queryAuthor, genres, pageable);
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
    ){
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found!"));
        CommentResponse response = commentService.addComment(id, commentRequest, currentUser);
        return ResponseEntity.ok(response);
    }
}
