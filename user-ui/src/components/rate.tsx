import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    rating: number;
    rateCount: number;
};

export const Rating = (props: Props) => {
    const [rating, setRating] = useState(props.rating);
    const [ratingCount, setRatingCount] = useState(props.rateCount);
    const [hoverRating, setHoverRating] = useState(0);
    const [userRating, setUserRating] = useState<number | undefined>(undefined);

    const onRate = (rating: number) => {
        const newTotalScore = rating * ratingCount - (userRating || 0) + rating;
        const newCount = userRating ? ratingCount : ratingCount + 1;
        const newRating = newTotalScore / newCount;

        setUserRating(rating);
        setRating(newRating);
        setRatingCount(newCount);

        toast.info(`You rated this book ${rating} stars.`);
    };

    return (
        <div className="flex items-center">
            <div className="flex">
                {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                        <button
                            key={i}
                            type="button"
                            className="p-0 bg-transparent border-none cursor-pointer transition-transform hover:scale-110"
                            onClick={() => onRate(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                className={`h-5 w-5 transition-colors ${
                                    hoverRating || userRating
                                        ? hoverRating
                                            ? starValue <= hoverRating
                                                ? 'text-amber-500 fill-amber-500'
                                                : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                            : starValue <= (userRating || 0)
                                              ? 'text-amber-500 fill-amber-500'
                                              : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                        : starValue <= Math.floor(rating)
                                          ? 'text-amber-500 fill-amber-500'
                                          : starValue === Math.ceil(rating) &&
                                              rating % 1 >= 0.5
                                            ? 'text-amber-500 fill-amber-500/50'
                                            : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            <span className="ml-2 font-medium">
                {isNaN(rating) ? 'Not rated' : rating.toFixed(1)}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
                ({ratingCount})
            </span>
        </div>
    );
};
