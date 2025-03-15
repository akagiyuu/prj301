package com.prj301.user.services;

import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.dto.user.UserUpdate;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse toUserResponse(User user) {
        return UserResponse
            .builder()
            .username(user.getUsername())
            .avatarPath(user.getAvatarPath())
            .fullName(user.getFullName())
            .hobbies(user.getHobbies())
            .bio(user.getBio())
            .build();
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
}