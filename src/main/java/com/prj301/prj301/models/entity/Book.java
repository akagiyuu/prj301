package com.prj301.prj301.models.entity;

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
    private int total_rate;

    @ColumnDefault("0")
    private int rate_count;

    public long id() {
        return id;
    }

    public Book setId(long id) {
        this.id = id;
        return this;
    }

    public String isbn() {
        return isbn;
    }

    public Book setIsbn(String isbn) {
        this.isbn = isbn;
        return this;
    }

    public User postedUser() {
        return postedUser;
    }

    public Book setPostedUser(User postedUser) {
        this.postedUser = postedUser;
        return this;
    }

    public String title() {
        return title;
    }

    public Book setTitle(String title) {
        this.title = title;
        return this;
    }

    public String coverPath() {
        return coverPath;
    }

    public Book setCoverPath(String coverPath) {
        this.coverPath = coverPath;
        return this;
    }

    public Set<Author> authors() {
        return authors;
    }

    public Book setAuthors(Set<Author> authors) {
        this.authors = authors;
        return this;
    }

    public Set<Genre> genres() {
        return genres;
    }

    public Book setGenres(Set<Genre> genres) {
        this.genres = genres;
        return this;
    }

    public LocalDate publicationDate() {
        return publicationDate;
    }

    public Book setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
        return this;
    }

    public String summary() {
        return summary;
    }

    public Book setSummary(String summary) {
        this.summary = summary;
        return this;
    }

    public String pdfPath() {
        return pdfPath;
    }

    public Book setPdfPath(String pdfPath) {
        this.pdfPath = pdfPath;
        return this;
    }

    public int view() {
        return view;
    }

    public Book setView(int view) {
        this.view = view;
        return this;
    }

    public int total_rate() {
        return total_rate;
    }

    public Book setTotal_rate(int total_rate) {
        this.total_rate = total_rate;
        return this;
    }

    public int rate_count() {
        return rate_count;
    }

    public Book setRate_count(int rate_count) {
        this.rate_count = rate_count;
        return this;
    }
}
