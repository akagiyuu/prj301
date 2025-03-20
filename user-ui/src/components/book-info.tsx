import {
    BookOpen,
    Calendar,
    Download,
    Eye,
    Flag,
    Share,
} from 'lucide-react';
import { Rating } from './rate';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MouseEventHandler } from 'react';
import { Book } from '@/api/book';
import { ReportDialog } from './report-dialog';

type Props = {
    book: Book;
    report: (reason: string) => Promise<void>;
    onRead?: MouseEventHandler<HTMLButtonElement>;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
};

export const BookInfo = ({ book, report, onRead, onDownload }: Props) => {
    return (
        <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {book.genres.map((genre, index) => (
                        <Badge
                            key={index}
                            className="bg-primary/10 hover:bg-primary/20 text-primary border-0"
                        >
                            {genre}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                    {book.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start text-muted-foreground">
                    <div className="font-medium text-foreground">
                        By{' '}
                        {book.authors.map((author, index) => (
                            <span
                                key={index}
                                className="text-primary hover:underline cursor-pointer"
                            >
                                {author}
                                {index < book.authors.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                    <Rating
                        rating={book.totalRating / book.ratingCount}
                        rateCount={book.ratingCount}
                    />
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{book.view.toLocaleString()} views</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground justify-center md:justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                        Published{' '}
                        {new Date(book.publicationDate).toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            },
                        )}
                    </span>
                </div>
            </div>

            <p className="text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                {book.summary}
            </p>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                <Button
                    size="lg"
                    onClick={onRead}
                    className="gap-2 rounded-full px-6 shadow-md hover:shadow-lg transition-all"
                >
                    <BookOpen className="h-5 w-5" />
                    Read PDF
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    onClick={onDownload}
                    className="gap-2 rounded-full px-6 border-primary/20 hover:border-primary/50 transition-colors"
                >
                    <Download className="h-5 w-5" />
                    Download
                </Button>
                <Button
                    size="lg"
                    variant="ghost"
                    className="gap-2 rounded-full px-6 hover:bg-primary/5"
                >
                    <Share className="h-5 w-5" />
                    Share
                </Button>
                <ReportDialog title="Report Book" report={report}>
                    <Button
                        size="lg"
                        variant="destructive"
                        className="gap-2 rounded-full px-6 hover:bg-primary/5"
                    >
                        <Flag className="h-5 w-5" />
                        Report
                    </Button>
                </ReportDialog>
            </div>
        </div>
    );
};
