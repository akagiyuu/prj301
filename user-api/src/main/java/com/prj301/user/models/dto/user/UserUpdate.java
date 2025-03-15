package com.prj301.user.models.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
public class UserUpdate {
    private final String avatarPath;
    private final String fullName;
    private final String hobbies;
    private final LocalDate dob;
    private final String bio;
}
