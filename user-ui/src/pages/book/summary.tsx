import { CommentSection } from '@/components/comment-section';
import { toast } from 'sonner';
import { BookCover } from '@/components/book-cover';
import { BookInfo } from '@/components/book-info';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { ReportDialog } from '@/components/report-dialog';
import { useState } from 'react';

export const BookSummary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reportOpen, setReportOpen] = useState(false);

    const {
        data: book,
        status,
        error,
    } = useQuery({
        queryKey: ['book', id],
        queryFn: () => api.book.get(id!),
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    const onRead = () => {
        navigate('read');
    };

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

    const onDownload = () => {
        window.location.replace(book.pdfPath);
    };

    const onReport = () => {
        setReportOpen(true);
    };

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
                            report={(reason) => api.book.report(id!, reason)}
                            onRead={onRead}
                            onDownload={onDownload}
                        />
                    </div>
                </div>
            </div>
            <div className="container max-w-5xl mx-auto px-4 py-12">
                <CommentSection bookId={id!} />
            </div>
        </main>
    );
};
