package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.BookReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReportRepository extends JpaRepository<BookReport, BookReportId> {
    public Page<BookReport> findByIdBookTitleContaining(String title, Pageable pageable);
}
