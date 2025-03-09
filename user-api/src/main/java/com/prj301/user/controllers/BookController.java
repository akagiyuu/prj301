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
@RequiredArgsConstructor
@RequestMapping("/book")
public class BookController {
    @Autowired
    private final BookService bookService;
    private final int startingPage = 0;
    private final int sizeOfPage = 8;

    @GetMapping
    public Page<BookResponse> getBooks(
        @RequestParam(required = false) String query,
        @RequestParam(required = false) List<String> genres,
        @RequestParam(defaultValue = "title") String sort_by,
        @RequestParam(defaultValue = "asc") String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sort_by).ascending()
                : Sort.by(sort_by).descending();


        Pageable pageable = PageRequest.of(startingPage,sizeOfPage, sort);
        return bookService.searchBook(query, genres, pageable);
    }
}
