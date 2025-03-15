package com.prj301.user.services;

import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.book.UploadBookRequest;
import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.BookRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private GenreService genreService;

    public BookResponse getBookById(UUID id) {
        return bookRepository
            .findById(id)
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

    public Page<BookResponse> findAll(String query, List<String> genres, Pageable pageable) {
        return bookRepository
            .findTopByTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCaseTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCase(
                query,
                query,
                genres,
                pageable
            )
            .map(this::toResponse);
    }

    public Book createBook(
        UploadBookRequest uploadBookRequest,
        User postedUser
    ) {
        Set<Author> authors = uploadBookRequest
            .getAuthors()
            .stream()
            .map(authorService::findOrCreate)
            .collect(Collectors.toSet());

        Set<Genre> genres = uploadBookRequest
            .getGenres()
            .stream()
            .map(genreService::findOrCreate)
            .collect(Collectors.toSet());

        val book = new Book();
        book.setIsbn(uploadBookRequest.getIsbn());
        book.setPostedUser(postedUser);
        book.setTitle(uploadBookRequest.getTitle());
        book.setCoverPath(uploadBookRequest.getCoverPath());
        book.setAuthors(authors);
        book.setGenres(genres);
        book.setPublicationDate(uploadBookRequest.getPublicationDate());
        book.setSummary(book.getSummary());
        book.setPdfPath(uploadBookRequest.getPdfPath());

        return bookRepository.save(book);
    }
}