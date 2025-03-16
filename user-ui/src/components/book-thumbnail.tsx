import { Eye, Star, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export type BookThumbnailProps = {
    id: string;
    title: string;
    authors: string[];
    genres: string[];
    publicationDate: string;
    view: number;
    rate: number;
    cover?: string;
};

export const BookThumbnail = (book: BookThumbnailProps) => {
    return (
        <div
            key={book.id}
            className="group relative bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-gray-200"
        >
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-50">
                <img
                    src={book.cover || '/placeholder.svg'}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg?height=300&width=200';
                    }}
                />

                {/* Rating badge - always visible */}
                <div className="absolute top-0 right-0 m-2">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        {book.rate.toFixed(1)}
                    </div>
                </div>

                {/* Hover overlay with "View Details" button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="w-full bg-white/90 hover:bg-white text-xs py-1 h-8 font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out"
                    >
                        View Details
                    </Button>
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 min-h-[2.5rem] text-sm group-hover:text-primary transition-colors duration-300">
                    {book.title}
                </h3>

                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span className="font-medium text-gray-700">
                            {book.publicationDate}
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="h-3 w-3" />
                        <span>{book.view.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 mb-3 text-xs text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {book.authors.length > 1 && (
                        <Users className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                    )}
                    <span className="line-clamp-1">
                        {book.authors.length > 1
                            ? `${book.authors[0]} +${book.authors.length - 1}`
                            : book.authors[0]}
                    </span>
                </div>

                <div className="flex flex-wrap gap-1">
                    {book.genres.slice(0, 2).map((genre, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary/90"
                        >
                            {genre}
                        </Badge>
                    ))}
                    {book.genres.length > 2 && (
                        <Badge
                            variant="outline"
                            className="text-xs px-2 py-0.5 border-gray-200 text-gray-500 group-hover:border-primary/30 group-hover:text-primary/70 transition-all duration-300"
                        >
                            +{book.genres.length - 2}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-lg pointer-events-none transition-all duration-300"></div>
        </div>
    );
};
