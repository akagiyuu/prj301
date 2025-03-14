package com.prj301.user.services;

import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.repositories.BookRepository;
import lombok.AllArgsConstructor;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public BookResponse getBookById(UUID id){
        return bookRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Book Not Found!"));
    }

    private BookResponse toResponse(Book book) {
        val postedUser = book.getPostedUser();

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
            book.getIsbn(),
            postedUser.getUsername(),
            book.getTitle(),
            book.getCoverPath(),
            authors,
            genres,
            book.getPublicationDate(),
            book.getSummary(),
            book.getPdfPath(),
            book.getView(),
            (float) book.getTotalRate() / (float) book.getRateCount()
        );
    }

    // search by genres and pagination
    public Page<BookResponse> findAll(List<String> genres, Pageable pageable) {
        return bookRepository
                .findByGenres_NameInIgnoreCase(genres, pageable)
                .map(this::toResponse);
    }

    // default: sort_by title and direction asc
    public Page<BookResponse> findAll(Pageable pageable) {
        return bookRepository
                .findAll(pageable)
                .map(this::toResponse);
    }

    // search by query and pagination
    public Page<BookResponse> findAll(String title, String author, Pageable pageable) {
        return bookRepository
                .findByTitleContainingIgnoreCaseOrAuthors_NameContainingIgnoreCase(title, author, pageable)
                .map(this::toResponse);
    }

    // search by both query, genres and pagination
    public Page<BookResponse> findAll(String title, String author, List<String> genres, Pageable pageable) {
        return bookRepository
                .searchByGenresAndTitleOrAuthor(title, author, genres, pageable)
                .map(this::toResponse);
    }
}