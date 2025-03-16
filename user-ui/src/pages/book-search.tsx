import { BookCard, BookCardFull } from '@/components/book-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Search, Star, Users } from 'lucide-react';

const books = Array.from({ length: 16 }).map((_, index) => {
    return {
        id: '1',
        title: 'Introduction to Algorithms',
        authors: [
            'Thomas H. Cormen',
            'Charles E. Leiserson',
            'Ronald L. Rivest',
            'Clifford Stein',
        ],
        publicationDate: '2025-03-16',
        rate: 4.8,
        genres: ['Computer Science', 'Programming', 'Mathematics'],
        view: 12453,
        cover: 'https://m.media-amazon.com/images/I/61O6K0yPmzL._AC_UF1000,1000_QL80_.jpg',
    };
});

export const BookSearch = () => {
    return (
        <main className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Discover Books</h1>
                <p className="text-gray-600">
                    Browse our collection of popular books across various genres
                </p>
            </div>

            <Tabs defaultValue="grid" className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="relative flex-1 w-full md:max-w-md">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            className="pl-10 h-10 border-gray-200"
                            placeholder="Search by title or author"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3 w-full md:w-auto">
                        <Select>
                            <SelectTrigger className="w-full my-auto md:w-[180px] h-10 border-gray-200">
                                <SelectValue placeholder="Select genres..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="fiction">Fiction</SelectItem>
                                <SelectItem value="non-fiction">
                                    Non-fiction
                                </SelectItem>
                                <SelectItem value="science-fiction">
                                    Science Fiction
                                </SelectItem>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                                <SelectItem value="computer-science">
                                    Computer Science
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-2">
                            <Select>
                                <SelectTrigger className="w-[120px] my-auto h-10 border-gray-200">
                                    <SelectValue placeholder="Sort by..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="author">
                                        Author
                                    </SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                    <SelectItem value="rating">
                                        Rating
                                    </SelectItem>
                                    <SelectItem value="views">Views</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-[120px] my-auto h-10 border-gray-200">
                                    <SelectValue placeholder="Ascending" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="asc">
                                        Ascending
                                    </SelectItem>
                                    <SelectItem value="desc">
                                        Descending
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <TabsList className="ml-auto h-10">
                            <TabsTrigger value="grid" className="px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        width="7"
                                        height="7"
                                        x="3"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="3"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="14"
                                        y="14"
                                        rx="1"
                                    />
                                    <rect
                                        width="7"
                                        height="7"
                                        x="3"
                                        y="14"
                                        rx="1"
                                    />
                                </svg>
                            </TabsTrigger>
                            <TabsTrigger value="list" className="px-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>

                <TabsContent value="grid" className="mt-0">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {books.map((book) => (
                            <BookCard {...book} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0">
                    <div className="space-y-3">
                        {books.map((book) => (
                            <BookCardFull {...book} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </main>
    );
};
