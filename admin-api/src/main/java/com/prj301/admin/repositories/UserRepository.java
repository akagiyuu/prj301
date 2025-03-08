package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.Book;
import com.prj301.admin.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    public Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    @Query("SELECT COUNT(*) FROM User WHERE date_part('year', createdAt) = date_part('year', CURRENT_DATE) GROUP BY date_part('month', createdAt)")
    public List<Long> countByMonth();
}
