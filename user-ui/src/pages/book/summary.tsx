import { useState } from 'react';
import { BookOpen, Calendar, Download, Eye, Share, Star } from 'lucide-react';
import { CommentSection } from '@/components/comment-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { BookCover } from '@/components/book-cover';
import { BookInfo } from '@/components/book-info';

type BookData = {
    isbn: string;
    postedUser: string;
    title: string;
    coverPath: string;
    authors: string[];
    genres: string[];
    publicationDate: string;
    summary: string;
    pdfPath: string;
    view: number;
    rate: number;
    ratingCount: number;
};

const book = {
    isbn: '9781234567890',
    postedUser: 'john_doe',
    title: 'The Future of AI: Promises and Perils',
    coverPath: '/placeholder.svg?height=600&width=400',
    authors: ['Dr. Jane Smith', 'Prof. Robert Johnson'],
    genres: ['Technology', 'Science', 'Philosophy'],
    publicationDate: '2025-03-16',
    summary:
        "An in-depth exploration of artificial intelligence's potential impact on society, examining both the tremendous opportunities and significant challenges that lie ahead. The book draws on research from leading experts in the field to present a balanced view of how AI might transform our world in the coming decades.",
    pdfPath: '/sample.pdf',
    view: 1243,
    rate: 4.7,
    rateCount: 128,
};

export const BookSummary = () => {
    const onRead = () => {};

    const onShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: book.title,
                    text: `Check out this book: ${book.title}`,
                    url: window.location.href,
                })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.info('Book link copied to clipboard');
        }
    };

    const onDownload = () => {};

    return (
        <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
            <div className="bg-gradient-to-b from-primary/5 to-background pt-24 pb-16">
                <div className="container max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                        <BookCover
                            coverPath={book.coverPath}
                            coverAlt={`Cover for ${book.title}`}
                            onRead={onRead}
                            onShare={onShare}
                            onDownload={onDownload}
                        />

                        <BookInfo
                            book={book}
                            onRead={onRead}
                            onShare={onShare}
                            onDownload={onDownload}
                        />
                    </div>
                </div>
            </div>

            <div className="container max-w-5xl mx-auto px-4 py-12">
                <CommentSection bookId={'1111111111'} />
            </div>
        </main>
    );
};
