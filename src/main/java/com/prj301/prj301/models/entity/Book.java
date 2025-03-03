package com.prj301.prj301.models.entity;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.ColumnDefault;

import javax.annotation.Generated;
import javax.persistence.*;
import javax.validation.Constraint;
import javax.validation.*;
import java.lang.annotation.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Documented
@Constraint(validatedBy = EmptyOrValidISBNValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@interface EmptyOrValidISBN {
    String message() default "Invalid ISBN";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

class EmptyOrValidISBNValidator implements ConstraintValidator<EmptyOrValidISBN, String> {
    @Override
    public void initialize(EmptyOrValidISBN constraintAnnotation) {
    }

    @Override
    public boolean isValid(String isbn, ConstraintValidatorContext context) {
        return isbn.matches("^\\d{9}[\\dXx]$") || isbn.matches("^\\d{13}$");
    }
}

@Accessors(fluent = true)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue
    private long id;

    @Column(length = 13, unique = true, nullable = false)
    @EmptyOrValidISBN
    private String isbn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User postedUser;

    @Column(nullable = false)
    private String title;

    private String coverPath;

    @ManyToMany
    @JoinTable(
        name = "book_author",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "book_genre",
        joinColumns = @JoinColumn(name = "book_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();

    private LocalDate publicationDate;

    private String summary;

    @Column(nullable = false)
    private String pdfPath;

    @ColumnDefault("0")
    private int view;

    @ColumnDefault("0")
    private int totalRate;

    @ColumnDefault("0")
    private int rateCount;
}