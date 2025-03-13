package com.prj301.admin.controllers;

import com.prj301.admin.interceptors.JWSProtected;
import com.prj301.admin.repositories.BookReportRepository;
import com.prj301.admin.repositories.UserReportRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
@SecurityRequirement(name = "Bearer Authentication")
@JWSProtected
public class ReportController {
    @Autowired
    private BookReportRepository bookReportRepository;

    @Autowired
    private UserReportRepository userReportRepository;

    @GetMapping("/count")
    public long count() {
        return bookReportRepository.count() + userReportRepository.count();
    }
}
