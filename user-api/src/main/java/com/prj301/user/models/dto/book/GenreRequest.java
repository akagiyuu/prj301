package com.prj301.user.models.dto.book;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class GenreRequest {
    private UUID id;
    private String name;
}
