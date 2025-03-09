import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Book, BookHeart, LucideIcon, User } from 'lucide-react';

const Section = (item: {
    title: string;
    icon: LucideIcon;
    data: string | number;
    detail?: string;
}) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {item.title}
                </CardTitle>
                <item.icon />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{item.data}</div>
                {item.detail ?? (
                    <p className="text-xs text-muted-foreground">
                        {item.detail}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

export const Overview = () => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Section
                title="Total Users"
                icon={User}
                data={Math.floor(Math.random() * 100)}
            />
            <Section
                title="Total Reports"
                icon={AlertTriangle}
                data={Math.floor(Math.random() * 100)}
            />
            <Section
                title="Total Books"
                icon={Book}
                data={Math.floor(Math.random() * 100)}
            />
            <Section
                title="Most Viewed Books"
                icon={BookHeart}
                data={Math.floor(Math.random() * 100)}
                detail={'Introduction to algorithm'}
            />
        </div>
    );
};
