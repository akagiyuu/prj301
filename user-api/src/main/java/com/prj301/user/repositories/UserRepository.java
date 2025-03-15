package com.prj301.user.repositories;

import com.prj301.user.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsernameContainsIgnoreCase(String username);

    @Transactional
    @Modifying
    @Query("update User u set u.avatarPath = ?1, u.fullName = ?2, u.hobbies = ?3, u.dob = ?4, u.bio = ?5 where u.id = ?6")
    void updateAvatarPathAndFullNameAndHobbiesAndDobAndBioById(
        @Nullable String avatarPath,
        @Nullable String fullName,
        @Nullable String hobbies,
        @Nullable LocalDate dob,
        @Nullable String bio,
        UUID id
    );
}
