package com.prj301.admin.services;

import com.prj301.admin.models.dto.book.BookResponse;
import com.prj301.admin.models.dto.book.ReportedBookResponse;
import com.prj301.admin.models.entity.Author;
import com.prj301.admin.models.entity.Book;
import com.prj301.admin.models.entity.ReportedBook;
import com.prj301.admin.models.entity.ReportedBookId;
import com.prj301.admin.repositories.BookRepository;
import com.prj301.admin.repositories.ReportedBookRepository;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReportedBookRepository reportedBookRepository;

    @PersistenceContext
    private EntityManager entityManager;

    private BookResponse toResponse(Book book) {
        val authors = book
            .getAuthors()
            .stream()
            .map(Author::getName)
            .collect(Collectors.toList());

        return new BookResponse(
            book.getId(),
            book.getTitle(),
            authors,
            book.getCreatedAt()
        );
    }

    private ReportedBookResponse toResponse(ReportedBook report) {
        val book = report
            .getId()
            .getBook();
        val reportingUser = report
            .getId()
            .getReportingUser();

        val authors = book
            .getAuthors()
            .stream()
            .map(Author::getName)
            .collect(Collectors.toList());

        return new ReportedBookResponse(
            book.getId(),
            book.getTitle(),
            authors,
            book.getCreatedAt(),
            reportingUser.getUsername(),
            report.getReason()
        );
    }

    public Page<BookResponse> findAll(Pageable pageable) {
        return bookRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<BookResponse> findAll(String query, Pageable pageable) {
        SearchSession searchSession = Search.session(entityManager);

        int offset = (int) pageable.getOffset();
        int limit = pageable.getPageSize();

        SearchResult<Book> result = searchSession
            .search(Book.class)
            .where(f -> f
                .match()
                .fields("title", "summary", "authors.name")
                .matching(query)
                .fuzzy(1))
            .fetch(offset, limit);

        List<BookResponse> bookResponses = result
            .hits()
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());

        return new PageImpl<>(bookResponses, pageable, result
            .total()
            .hitCount()
        );
    }

    public Page<ReportedBookResponse> findAllReport(Pageable pageable) {
        return reportedBookRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<ReportedBookResponse> findAllReport(String query, Pageable pageable) {
        SearchSession searchSession = Search.session(entityManager);

        int offset = (int) pageable.getOffset();
        int limit = pageable.getPageSize();

        SearchResult<ReportedBook> result = searchSession
            .search(ReportedBook.class)
            .where(f -> f
                .match()
                .fields("id.book.title", "id.book.summary", "id.book.authors.name")
                .matching(query)
                .fuzzy(1))
            .fetch(offset, limit);

        List<ReportedBookResponse> bookResponses = result
            .hits()
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());

        return new PageImpl<>(bookResponses, pageable, result
            .total()
            .hitCount()
        );
    }

    public long count() {
        return bookRepository.count();
    }

    public List<Long> countByMonth() {
        return bookRepository.countByMonth();
    }

    public long countReport() {
        return reportedBookRepository.count();
    }

    public void delete(UUID id) {
        bookRepository.deleteById(id);
    }

    public void deleteReport(ReportedBookId id) {
        reportedBookRepository.deleteById(id);
    }
}