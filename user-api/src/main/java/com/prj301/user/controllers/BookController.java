package com.prj301.user.controllers;

import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {
    @Autowired
    private final BookService bookService;
    private final int startingPage = 0;
    private final int sizeOfPage = 8;

    @GetMapping("/")
    public ResponseEntity<Page<BookResponse>> getAllBooks() {

        Pageable pageable = PageRequest.of(startingPage,sizeOfPage);
        Page<BookResponse> bookPage = bookService.findAll(pageable);
        return ResponseEntity.ok(bookPage);
    }
}
