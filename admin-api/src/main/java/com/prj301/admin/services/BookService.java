package com.prj301.admin.services;

import com.prj301.admin.models.dto.book.BookReportResponse;
import com.prj301.admin.models.dto.book.BookResponse;
import com.prj301.admin.models.entity.Author;
import com.prj301.admin.models.entity.Book;
import com.prj301.admin.models.entity.BookReport;
import com.prj301.admin.models.entity.BookReportId;
import com.prj301.admin.repositories.BookReportRepository;
import com.prj301.admin.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookReportRepository bookReportRepository;

    private final ElasticsearchOperations elasticsearchOperations;

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

    private BookReportResponse toResponse(BookReport report) {
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

        return new BookReportResponse(
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
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(QueryBuilders
                           .multiMatchQuery(query, "title", "summary", "authors.name")
                           .fuzziness(Fuzziness.AUTO))
            .withPageable(pageable)
            .build();

        SearchHits<Book> searchHits = elasticsearchOperations.search(searchQuery, Book.class);

        List<BookResponse> books = searchHits
            .getSearchHits()
            .stream()
            .map(SearchHit::getContent)
            .map(this::toResponse)
            .collect(Collectors.toList());

        return new PageImpl<>(books, pageable, searchHits.getTotalHits());
    }

    public Page<BookReportResponse> findAllReport(Pageable pageable) {
        return bookReportRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<BookReportResponse> findAllReport(String query, Pageable pageable) {
        NativeSearchQuery searchQuery = new NativeSearchQueryBuilder()
            .withQuery(QueryBuilders
                           .multiMatchQuery(query, "title", "summary", "authors.name")
                           .fuzziness(Fuzziness.AUTO))
            .withPageable(pageable)
            .build();

        SearchHits<BookReport> searchHits = elasticsearchOperations.search(searchQuery, BookReport.class);

        List<BookReportResponse> books = searchHits
            .getSearchHits()
            .stream()
            .map(SearchHit::getContent)
            .map(this::toResponse)
            .collect(Collectors.toList());

        return new PageImpl<>(books, pageable, searchHits.getTotalHits());
    }

    public long count() {
        return bookRepository.count();
    }

    public List<Long> countByMonth() {
        return bookRepository.countByMonth();
    }

    public long countReport() {
        return bookReportRepository.count();
    }

    public void delete(UUID id) {
        bookRepository.deleteById(id);
    }

    public void deleteReport(BookReportId id) {
        bookReportRepository.deleteById(id);
    }
}