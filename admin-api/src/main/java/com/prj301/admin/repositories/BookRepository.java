package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
    @Query("SELECT COUNT(*) FROM Book WHERE date_part('year', createdAt) = date_part('year', CURRENT_DATE) GROUP BY MONTH(createdAt)")
    public List<Long> countByMonth();
}