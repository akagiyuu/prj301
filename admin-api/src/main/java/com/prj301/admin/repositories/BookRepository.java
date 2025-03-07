package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    @Query("SELECT COUNT(*) FROM books GROUP BY MONTH(createdAt) WHERE date_part('year', createdAt) = date_part('year', CURRENT_DATE);")
    public List<Long> countByMonth();
}