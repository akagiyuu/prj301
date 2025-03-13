import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    AlertTriangle,
    Book,
    BookHeart,
    LucideIcon,
    TrendingUp,
    User,
} from 'lucide-react';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from './ui/chart';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { fetchWrapper, months } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const Section = (item: {
    title: string;
    dataApi: string;
    icon: LucideIcon;
    data: string | number;
    detail?: string;
}) => {
    const { isPending, error, data } = useQuery({
        queryKey: [item.dataApi],
        queryFn: () =>
            fetchWrapper(item.dataApi)
                .then((res) => res.text())
                .then((res) => Number(res)),
    });

    if (error)
        toast.error(`Failed to fetch data for ${title}`, {
            description: error,
        });

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {item.title}
                </CardTitle>
                <item.icon />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{data}</div>
                {item.detail ?? (
                    <p className="text-xs text-muted-foreground">
                        {item.detail}
                    </p>
                )}
            </CardContent>
        </Card>
    );
};

type RawData = {
    month: number;
    count: number;
};

const Chart = ({
    title,
    label,
    dataApi,
}: {
    title: string;
    label: string;
    dataApi: string;
}) => {
    const { isPending, error, data } = useQuery({
        queryKey: [dataApi],
        queryFn: () =>
            fetchWrapper(dataApi)
                .then((res) => res.json())
                .then((res) => res as RawData[])
                .then((data) =>
                    months.map((month, i) => {
                        const item = data.find((d) => d.month == i + 1);
                        return { month, count: item?.count ?? 0 };
                    }),
                ),
    });

    if (isPending) return null;

    if (error)
        toast.error(`Failed to fetch chart data for ${title}`, {
            description: error,
        });

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        count: {
                            label: label,
                            color: '#3b82f6',
                        },
                    }}
                >
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                background: '#fff',
                                border: '1px solid #e5e7eb',
                            }}
                            itemStyle={{ color: '#000' }}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--color-count)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export const Overview = () => {
    return (
        <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Section
                    title="Total Users"
                    dataApi='user/count'
                    icon={User}
                    data={Math.floor(Math.random() * 100)}
                />
                <Section
                    title="Total Reports"
                    dataApi='report/count'
                    icon={AlertTriangle}
                    data={Math.floor(Math.random() * 100)}
                />
                <Section
                    title="Total Books"
                    dataApi='book/count'
                    icon={Book}
                    data={Math.floor(Math.random() * 100)}
                />
                <Section
                    title="Most Viewed Books"
                    dataApi='book/count'
                    icon={BookHeart}
                    data={Math.floor(Math.random() * 100)}
                />
            </div>
            <div className="grid gap-4 grid-cols-2 my-4">
                <Chart title="Book" label="Book" dataApi="book/count/month" />
                <Chart title="User" label="User" dataApi="user/count/month" />
            </div>
        </div>
    );
};
