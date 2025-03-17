package com.prj301.user.services;

import com.prj301.user.models.entity.Book;
import com.prj301.user.models.entity.Rating;
import com.prj301.user.models.entity.User;
import com.prj301.user.repositories.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;

    public Rating rateBook(Book book, User user, int ratingValue) {
        Optional<Rating> optionalRating = ratingRepository.findByUserAndBook(user, book);
        Rating rating;
        if (optionalRating.isPresent()) {
            rating = optionalRating.get();
            int previousRating = rating.getRating();
            rating.setRating(ratingValue);
            book.setTotalRate(book.getTotalRate() - previousRating + ratingValue);
        } else {
            rating = Rating.builder()
                    .book(book)
                    .user(user)
                    .rating(ratingValue)
                    .build();
            book.setTotalRate(book.getTotalRate() + ratingValue);
            book.setRateCount(book.getRateCount() + 1);
        }
        return ratingRepository.save(rating);
    }
}
