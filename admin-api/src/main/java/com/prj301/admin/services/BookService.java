package com.prj301.admin.services;

import com.prj301.admin.models.dto.book.BookResponse;
import com.prj301.admin.models.dto.book.ReportedBookResponse;
import com.prj301.admin.models.entity.Author;
import com.prj301.admin.models.entity.ReportedBookId;
import com.prj301.admin.repositories.BookRepository;
import com.prj301.admin.repositories.ReportedBookRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ReportedBookRepository reportedBookRepository;

    public Page<BookResponse> findAll(Pageable pageable) {
        return bookRepository
            .findAll(pageable)
            .map(book -> {
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
            });
    }

    public Page<ReportedBookResponse> findAllReported(Pageable pageable) {
        return reportedBookRepository
            .findAll(pageable)
            .map(report -> {
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
            });
    }

    public long count() {
        return bookRepository.count();
    }

    public List<Long> countByMonth() {
        return bookRepository.countByMonth();
    }

    public long countReported() {
        return reportedBookRepository.count();
    }

    public void delete(UUID id) {
        bookRepository.deleteById(id);
    }

    public void dismissReport(ReportedBookId id) {
        reportedBookRepository.deleteById(id);
    }
}