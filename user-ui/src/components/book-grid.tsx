import { BookThumbnail, type BookThumbnailProps } from './book-thumbnail';

export const BookGrid = ({ books }: { books: BookThumbnailProps[] }) => {
    return (
        <div className="grid grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-5">
            {books.map((book, index) => (
                <div key={index}>
                    <BookThumbnail {...book} />
                </div>
            ))}
        </div>
    );
};
