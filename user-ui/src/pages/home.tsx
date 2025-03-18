import { BookCarousel } from '@/components/book-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookGrid } from '@/components/book-grid';
import { useQuery } from '@tanstack/react-query';
import { fetchWrapper } from '@/lib/utils';
import { toast } from 'sonner';
import { BookCardProps as Book } from '@/components/book-card';

const NewBooks = () => {
    const {
        data: books,
        status,
        error,
    } = useQuery({
        queryKey: ['news-book'],
        queryFn: async () => {
            const response = await fetchWrapper(
                'book?page=0&size=20&sort=createdAt,desc',
            );
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();

            return data.content as Book[];
        },
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return <BookGrid books={books} />;
};

const MostRatedBooks = () => {
    const {
        data: books,
        status,
        error,
    } = useQuery({
        queryKey: ['most-rated-books'],
        queryFn: async () => {
            const response = await fetchWrapper(
                'book?page=0&size=10&sort=totalRate,desc',
            );
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();

            return data.content as Book[];
        },
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return <BookCarousel books={books} />;
};

const MostViewedBooks = () => {
    const {
        data: books,
        status,
        error,
    } = useQuery({
        queryKey: ['most-viewed-books'],
        queryFn: async () => {
            const response = await fetchWrapper(
                'book?page=0&size=10&sort=view,desc',
            );
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();

            return data.content as Book[];
        },
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return <BookCarousel books={books} />;
};

export const Home = () => {
    return (
        <main className="container mx-auto px-4 py-8">
            <Tabs defaultValue="recommended" className="mb-16">
                <TabsList className="mb-6 bg-muted/30 p-1">
                    <TabsTrigger
                        value="recommended"
                        className="data-[state=active]:bg-gray-700 data-[state=active]:text-white p-4"
                    >
                        Recommended
                    </TabsTrigger>
                    <TabsTrigger className="p-4" value="most-viewed">
                        Most Viewed
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="recommended">
                    <MostRatedBooks />
                </TabsContent>

                <TabsContent value="most-viewed">
                    <MostViewedBooks />
                </TabsContent>
            </Tabs>

            <section className="mb-16">
                <div className="mb-10 flex items-center gap-2">
                    <div className="h-8 w-2 rounded-full bg-primary" />
                    <h2 className="text-lg font-bold tracking-tight">
                        New Books
                    </h2>
                </div>
                <NewBooks />
            </section>
        </main>
    );
};
