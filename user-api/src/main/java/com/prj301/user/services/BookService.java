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
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private GenreService genreService;

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

    public BookResponse getBookById(UUID id) {
        return bookRepository
            .findById(id)
            .map(this::toResponse)
            .orElseThrow(() -> new RuntimeException("Book Not Found!"));
    }

    public Specification<Book> findCriteria(String searchTerm, Collection<String> genreNames) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchTerm != null && !searchTerm.isEmpty()) {
                Join<Book, Author> authorJoin = root.join("authors", JoinType.LEFT);
                Predicate titlePredicate = cb.like(cb.lower(root.get("title")), "%" + searchTerm.toLowerCase() + "%");
                Predicate authorPredicate = cb.like(cb.lower(authorJoin.get("name")),
                                                    "%" + searchTerm.toLowerCase() + "%"
                );
                predicates.add(cb.or(titlePredicate, authorPredicate));
            }

            if (genreNames != null && !genreNames.isEmpty()) {
                Join<Book, Genre> genreJoin = root.join("genres", JoinType.LEFT);
                List<String> lowerGenreNames = genreNames
                    .stream()
                    .map(String::toLowerCase)
                    .collect(Collectors.toList());
                predicates.add(
                    cb
                        .lower(genreJoin.get("name"))
                        .in(lowerGenreNames)
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }


    public Page<BookResponse> findAll(String query, List<String> genres, Pageable pageable) {
        return bookRepository
            .findAll(findCriteria(query, genres), pageable)
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