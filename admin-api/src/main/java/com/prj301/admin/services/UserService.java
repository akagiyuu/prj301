package com.prj301.admin.services;

import com.prj301.admin.models.dto.user.UserReportResponse;
import com.prj301.admin.models.dto.user.UserResponse;
import com.prj301.admin.models.entity.User;
import com.prj301.admin.models.entity.UserReport;
import com.prj301.admin.repositories.UserReportRepository;
import com.prj301.admin.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserReportRepository userReportRepository;

    private UserResponse toResponse(User user) {
        return null;
    }

    private UserReportResponse toResponse(UserReport report) {
        return null;
    }

    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<UserResponse> findAll(String username, Pageable pageable) {
        return userRepository
            .findByUsernameContainingIgnoreCase(username, pageable)
            .map(this::toResponse);
    }

    public Page<UserReportResponse> findAllReport(Pageable pageable) {
        return userReportRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<UserReportResponse> findAllReport(String title, Pageable pageable) {
        return userReportRepository
            .findByUserUsernameContainingIgnoreCase(title, pageable)
            .map(this::toResponse);
    }

    public long count() {
        return userRepository.count();
    }

    public List<Long> countByMonth() {
        return userRepository.countByMonth();
    }

    public long countReport() {
        return userReportRepository.count();
    }

    public void delete(UUID id) {
        userRepository.deleteById(id);
    }

    public void deleteReport(UUID id) {
        userReportRepository.deleteById(id);
    }
}