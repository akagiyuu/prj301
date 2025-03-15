package com.prj301.user.services;

import com.prj301.user.models.dto.book.BookRequest;
import com.prj301.user.models.dto.book.BookResponse;
import com.prj301.user.models.dto.book.PostedUserRequest;
import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Genre;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.AuthorRepository;
import com.prj301.user.repositories.BookRepository;
import com.prj301.user.repositories.GenreRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
    private AuthorRepository authorRepository;
    @Autowired
    private GenreRepository genreRepository;

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
            .findByTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCase(
                query,
                query,
                genres,
                pageable
            )
            .map(this::toResponse);
    }

    public User convertPostedUserRequestToUser(PostedUserRequest postedUserRequest) {
        return User.builder()
                .username(postedUserRequest.getUsername())
                .password(postedUserRequest.getPassword())
                .avatarPath(postedUserRequest.getAvatarPath())
                .fullName(postedUserRequest.getFullName())
                .hobbies(postedUserRequest.getHobbies())
                .dob(postedUserRequest.getDob())
                .bio(postedUserRequest.getBio())
                .build();
    }




    // upload new book
    public Book createBook(BookRequest bookRequest, PostedUserRequest postedUser) {
        Set<Author> authorEntities = bookRequest.getAuthors().stream()
                .map(authorRequest -> {

                    if (authorRequest.getId() != null) {
                        return authorRepository.findById(authorRequest.getId())
                                .map(existingAuthor -> {
                                    existingAuthor.setName(authorRequest.getName());
                                    return existingAuthor;
                                })
                                .orElseGet(() -> {
                                    Author newAuthor = new Author();
                                    newAuthor.setName(authorRequest.getName());
                                    return newAuthor;
                                });
                    } else {
                        Author newAuthor = new Author();
                        newAuthor.setName(authorRequest.getName());
                        return newAuthor;
                    }
                })
                .collect(Collectors.toSet());


        Set<Genre> genreEntities = bookRequest.getGenres().stream()
                .map(genreRequest -> {
                    if (genreRequest.getId() != null) {
                        return genreRepository.findById(genreRequest.getId())
                                .map(existingGenre -> {
                                    existingGenre.setName(genreRequest.getName());
                                    return existingGenre;
                                })
                                .orElseGet(() -> {
                                    Genre newGenre = new Genre();
                                    newGenre.setName(genreRequest.getName());
                                    return newGenre;
                                });
                    } else {
                        Genre newGenre = new Genre();
                        newGenre.setName(genreRequest.getName());
                        return newGenre;
                    }
                })
                .collect(Collectors.toSet());
        Book book = new Book();
        book.setPostedUser(convertPostedUserRequestToUser(postedUser));
        book.setIsbn(bookRequest.getIsbn());
        book.setTitle(bookRequest.getTitle());
        book.setAuthors(authorEntities);
        book.setGenres(genreEntities);
        book.setPublicationDate(bookRequest.getPublicationDate());
        book.setPdfPath(bookRequest.getPdfPath());
        book.setCoverPath(bookRequest.getCoverPath());
        book.setSummary(book.getSummary());
        return bookRepository.save(book);
    }
}