package com.prj301.user.services;

import com.prj301.user.models.dto.report.UserReportRequest;
import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.dto.user.UserUpdate;
import com.prj301.user.models.entity.User;
import com.prj301.user.models.entity.UserReport;
import com.prj301.user.repositories.UserReportRepository;
import com.prj301.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestAttribute;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private final UserReportRepository userReportRepository;

    public UserResponse toUserResponse(User user) {
        return new UserResponse(
            user.getUsername(),
            user.getAvatarPath(),
            user.getFullName(),
            user.getHobbies(),
            user.getDob(),
            user.getBio()
        );
    }

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public UserResponse findByUsername(String username) {
        return userRepository
            .findByUsernameContainsIgnoreCase(username)
            .map(this::toUserResponse)
            .orElse(null);
    }

    public boolean update(UUID id, UserUpdate data) {
        try {
            userRepository.updateAvatarPathAndFullNameAndHobbiesAndDobAndBioById(
                data.getAvatarPath(),
                data.getFullName(),
                data.getHobbies(),
                data.getDob(),
                data.getBio(),
                id
            );

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean reportUser(UserReportRequest reason, UUID userId, UUID reportUserId) {
        try {
            createAndSaveReportUser(reason, userId, reportUserId);
            return true;
        } catch (EntityNotFoundException e) {
            System.out.printf("Failed to report user: %s%n", e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void createAndSaveReportUser(
            @Nullable UserReportRequest reason,
            UUID userId,
            @RequestAttribute("user-id") UUID reportUserId
    ) {
        String reportReason = (reason != null && !reason.getReason().isEmpty()) ? reason.getReason() : "No reason provided";

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        User reportUser = userRepository.findById(reportUserId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserReport userReport = UserReport.builder()
                .user(user)
                .reportingUser(reportUser)
                .reason(reportReason)
                .build();

        userReportRepository.save(userReport);
    }
}