package com.prj301.user.services;

import com.prj301.user.models.dto.user.UserResponse;
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

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // Mapping method from User to UserResponse DTO
    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .avatarPath(user.getAvatarPath())
                .fullName(user.getFullName())
                .hobbies(user.getHobbies())
                .bio(user.getBio())
                .build();
    }
}
