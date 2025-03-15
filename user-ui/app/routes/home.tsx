import { Button } from '~/components/ui/button';
import type { Route } from './+types/home';
import { BookCarousel } from '~/components/book-carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { BookGrid } from '~/components/book-grid';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export default function Home() {
    const sampleBooks = Array.from({ length: 16 }).map((_, index) => {
        return {
            title: `Book ${index}`,
            coverSrc: 'https://m.media-amazon.com/images/I/61O6K0yPmzL._AC_UF1000,1000_QL80_.jpg',
        };
    });

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
                    <TabsTrigger className="p-4" value="top">
                        Top Of The Month
                    </TabsTrigger>
                    <TabsTrigger className="p-4" value="best">
                        Best Of All Time
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="recommended">
                    <BookCarousel books={sampleBooks} />
                </TabsContent>

                <TabsContent value="top">
                    <BookCarousel books={sampleBooks} />
                </TabsContent>

                <TabsContent value="best">
                    <BookCarousel books={sampleBooks} />
                </TabsContent>
            </Tabs>

            <section className="mb-16">
                <div className="mb-10 flex items-center gap-2">
                    <div className="h-8 w-2 rounded-full bg-primary" />
                    <h2 className="text-lg font-bold tracking-tight">
                        New Books
                    </h2>
                </div>
                <BookGrid books={sampleBooks} />
            </section>
        </main>
    );
}
