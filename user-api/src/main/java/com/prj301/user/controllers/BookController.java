package com.prj301.user.controllers;

import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookService bookService;

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
}
