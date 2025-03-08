package com.prj301.user.services;

import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.repositories.BookRepository;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    private BookResponse toResponse(Book book) {
        val authors = book
                .getAuthors()
                .stream()
                .map(Author::getName)
                .collect(Collectors.toList());

        val genres = book
                .getGenres()
                .stream()
                .map(Genre::getName)
                .collect(Collectors.toList());
        return new BookResponse(
            book.getId(),
            book.getTitle(),
            book.getCoverPath(),
            authors,
            genres,
            book.getTotalRate(),
            book.getPublicationDate()
        );
    }
    public Page<BookResponse> findAll(Pageable pageable) {
        return bookRepository
                .findAll(pageable)
                .map(this::toResponse);
    }
}
