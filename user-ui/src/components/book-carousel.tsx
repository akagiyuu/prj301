import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';
import { BookCard, type BookCardProps } from './book-card';

export const BookCarousel = ({ books }: { books: BookCardProps[] }) => {
    return (
        <div className="relative">
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-6">
                    {books.map((book, index) => (
                        <CarouselItem
                            key={index}
                            className="pl-6 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                        >
                            <BookCard {...book} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-background/80 shadow-md hover:bg-background" />
                <CarouselNext className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-background/80 shadow-md hover:bg-background" />
            </Carousel>
        </div>
    );
};
