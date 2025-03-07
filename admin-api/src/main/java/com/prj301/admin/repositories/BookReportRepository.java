package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.BookReport;
import com.prj301.admin.models.entity.BookReportId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReportRepository extends JpaRepository<BookReport, BookReportId> {
}
