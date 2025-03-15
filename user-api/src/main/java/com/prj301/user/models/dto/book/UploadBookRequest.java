package com.prj301.user.models.dto.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@RequiredArgsConstructor
public class UploadBookRequest {
    private BookRequest bookRequest;
    private PostedUserRequest postedUser;
}

