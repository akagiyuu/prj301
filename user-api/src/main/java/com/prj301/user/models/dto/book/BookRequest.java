package com.prj301.user.models.dto.book;


import com.prj301.user.models.entity.Author;
import com.prj301.user.models.entity.Genre;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@RequiredArgsConstructor
public class BookRequest {
    private String isbn;
    private String title;
    private Set<AuthorRequest> authors;
    private Set<GenreRequest> genres;
    private LocalDate publicationDate;
    private String pdfPath;
    private String coverPath;
    private String summary;

}
