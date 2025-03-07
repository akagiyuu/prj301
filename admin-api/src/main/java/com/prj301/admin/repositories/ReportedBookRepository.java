package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.ReportedBook;
import com.prj301.admin.models.entity.ReportedBookId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportedBookRepository extends JpaRepository<ReportedBook, ReportedBookId> {
}
