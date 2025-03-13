package com.prj301.user.models.dto.user;

import lombok.*;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String username;
    private String avatarPath;
    private String fullName;
    private String hobbies;
    private String bio;
}
