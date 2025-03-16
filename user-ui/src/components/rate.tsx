import { Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    rate: number;
    rateCount: number;
};

export const Rate = (props: Props) => {
    const [rate, setRate] = useState(props.rate);
    const [rateCount, setRateCount] = useState(props.rateCount);
    const [hoverRate, setHoverRate] = useState(0);
    const [userRate, setUserRate] = useState<number | undefined>(undefined);

    const onRate = (rating: number) => {
        const newTotalScore = rate * rateCount - (userRate || 0) + rating;
        const newCount = userRate ? rateCount : rateCount + 1;
        const newRating = newTotalScore / newCount;

        setUserRate(rating);
        setRate(newRating);
        setRateCount(newCount);

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
                            onMouseEnter={() => setHoverRate(starValue)}
                            onMouseLeave={() => setHoverRate(0)}
                        >
                            <Star
                                className={`h-5 w-5 transition-colors ${
                                    hoverRate || userRate
                                        ? hoverRate
                                            ? starValue <= hoverRate
                                                ? 'text-amber-500 fill-amber-500'
                                                : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                            : starValue <= (userRate || 0)
                                              ? 'text-amber-500 fill-amber-500'
                                              : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                        : starValue <= Math.floor(rate)
                                          ? 'text-amber-500 fill-amber-500'
                                          : starValue === Math.ceil(rate) &&
                                              rate % 1 >= 0.5
                                            ? 'text-amber-500 fill-amber-500/50'
                                            : 'text-muted-foreground/30 stroke-muted-foreground/30'
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
            <span className="ml-2 font-medium">{rate.toFixed(1)}</span>
            <span className="ml-1 text-xs text-muted-foreground">({rateCount})</span>
        </div>
    );
};
