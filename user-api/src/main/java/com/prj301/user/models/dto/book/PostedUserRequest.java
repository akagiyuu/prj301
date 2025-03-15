package com.prj301.user.models.dto.book;

import lombok.*;
import java.time.LocalDate;
import java.util.UUID;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostedUserRequest {
    private UUID id;
    private String username;
    private String password;
    private String avatarPath;
    private String fullName;
    private String hobbies;
    private LocalDate dob;
    private String bio;
    private LocalDate createdAt;
}




