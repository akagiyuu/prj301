import { BookCardFull, BookCardProps as Book } from '@/components/book-card';
import { UserInfo } from '@/components/user-info';
import { UserProfileHeader } from '@/components/user-profile-header';
import {
    Play,
    Heart,
    Calendar,
    Upload,
    MessageSquare,
    Users,
    Tag,
    ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export type User = {
    username: string;
    avatarPath: string;
    fullName: string;
    hobbies: string;
    dob: string;
    bio: string;
    createdAt: string;
};

export type Stats = {
    user: User;
    books: Book[];
    comment: number;
};

const stats: Stats = {
    user: {
        username: 'yuu',
        avatarPath: '/placeholder.svg',
        fullName: 'akagi yuu',
        hobbies: 'programming',
        dob: '2005-04-02',
        bio: 'Rust developer',
        createdAt: '2025-01-01',
    },
    books: Array.from({ length: 6 }).map((_, index) => {
        return {
            id: '1',
            title: 'introduction to algorithms',
            authors: [
                'thomas h. cormen',
                'charles e. leiserson',
                'ronald l. rivest',
                'clifford stein',
            ],
            publicationDate: '2025-03-16',
            rate: 4.8,
            genres: ['computer science', 'programming', 'mathematics'],
            view: 12453,
            cover: 'https://m.media-amazon.com/images/i/61o6k0ypmzl._ac_uf1000,1000_ql80_.jpg',
        };
    }),
    comment: 100,
};

export default function UserProfile() {
    const user = stats.user;
    const books = stats.books;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="relative h-64 md:h-80 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0"></div>
                </div>
            </div>

            <UserProfileHeader user={user} />

            <div className="container mx-auto px-4 pb-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <UserInfo user={user} comment={stats.comment} />

                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-black text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl shadow-md">
                                            {books.length}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Posted Books
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {books.map((book) => (
                                        <BookCardFull {...book} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
