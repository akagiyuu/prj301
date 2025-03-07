package com.prj301.admin.controllers;

import com.prj301.admin.interceptors.JWSProtected;
import com.prj301.admin.models.dto.book.BookResponse;
import com.prj301.admin.models.dto.book.BookReportResponse;
import com.prj301.admin.services.BookService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/book")
@SecurityRequirement(name = "Bearer Authentication")
@JWSProtected
public class BookController {
    @Autowired
    private BookService service;

    @GetMapping("/")
    public Page<BookResponse> findAll(
        @RequestParam(value = "title", required = false) String title, Pageable pageable) {
        if (title == null || title.isEmpty()) {
            return service.findAll(pageable);
        }

        return service.findAll(title, pageable);
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @GetMapping("/count/month")
    public List<Long> countByMonth() {
        return service.countByMonth();
    }

    @DeleteMapping("/")
    public void delete(@RequestBody UUID id) {
        service.delete(id);
    }

    @GetMapping("/report")
    public Page<BookReportResponse> findAllReport(
        @RequestParam(value = "title", required = false) String title, Pageable pageable) {
        if (title == null || title.isEmpty()) {
            return service.findAllReport(pageable);
        }

        return service.findAllReport(title, pageable);
    }

    @GetMapping("/report/count")
    public long countReport() {
        return service.countReport();
    }

    @DeleteMapping("/report")
    public void deleteReport(@RequestBody UUID id) {
        service.deleteReport(id);
    }
}