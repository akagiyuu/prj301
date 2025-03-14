package com.prj301.user.repositories;

import com.prj301.user.models.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
    Page<Book> findByGenres_NameInIgnoreCase(@Nullable Collection<String> names, Pageable pageable);

    Page<Book> findByTitleContainingIgnoreCaseOrAuthors_NameContainingIgnoreCase(String title, String author, Pageable pageable);

    @Query("SELECT DISTINCT b FROM Book b " +
            "JOIN b.genres g " +
            "LEFT JOIN b.authors a " +
            "WHERE LOWER(g.name) IN :genres " +
            "AND (LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')) " +
            "     OR LOWER(a.name) LIKE LOWER(CONCAT('%', :author, '%')))")
    Page<Book> searchByGenresAndTitleOrAuthor(String title, String author, Collection<String> genres, Pageable pageable);



}
