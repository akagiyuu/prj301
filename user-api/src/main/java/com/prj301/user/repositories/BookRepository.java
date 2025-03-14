package com.prj301.user.repositories;

import com.prj301.user.models.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.Nullable;

import java.util.Collection;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {
    Page<Book> findByTitleContainsIgnoreCaseOrAuthors_NameContainsIgnoreCaseAndGenres_NameInIgnoreCase(
        @Nullable String title, @Nullable String name, @Nullable Collection<String> names, Pageable pageable);
}
