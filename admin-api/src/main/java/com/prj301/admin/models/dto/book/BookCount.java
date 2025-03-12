package com.prj301.admin.models.dto.book;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class BookCount {
    private final int month;
    private final long count;
}
