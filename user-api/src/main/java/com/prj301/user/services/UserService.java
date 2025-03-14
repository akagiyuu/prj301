package com.prj301.user.services;

import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<User> findAll(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setFullName(updatedUser.getFullName());
            user.setHobbies(updatedUser.getHobbies());
            user.setDob(updatedUser.getDob());
            user.setBio(updatedUser.getBio());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Mapping method from User to UserResponse DTO
    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .username(user.getUsername())
                .avatarPath(user.getAvatarPath())
                .fullName(user.getFullName())
                .hobbies(user.getHobbies())
                .bio(user.getBio())
                .build();
    }

    public Optional<UserResponse> toUserResponse(Optional<User> userOptional){
        if(userOptional.isPresent()){
            return Optional.of(toUserResponse(userOptional.get()));
        }
        return Optional.empty();
    }
}
