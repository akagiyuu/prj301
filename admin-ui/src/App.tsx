import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Separator } from './components/ui/separator';
import {
    Provider,
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux';
import { type RootState, type AppDispatch, store } from '@/store';
import { Overview } from '@/components/overview';
import { DataTable } from '@/components/data-table';
import { BreadcrumbHeader } from '@/components/breadcrum-header';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Content = () => {
    const state = useAppSelector((state) => state.state.value);

    switch (state) {
        case 'overview':
            return <Overview />;
        case 'book.all':
            return (
                <DataTable
                    dataApi="http://localhost:3000/api/v1/book/"
                    queryKey="title"
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'Id',
                        },
                        {
                            accessorKey: 'title',
                            header: 'Title',
                        },
                        {
                            accessorKey: 'authors',
                            header: 'Authors',
                            cell: ({ row }) => {
                                const authors: string[] =
                                    row.getValue('authors');
                                const formatted = authors.join(', ');
                                return <div>{formatted}</div>;
                            },
                        },
                        {
                            accessorKey: 'createdAt',
                            header: 'Created At',
                        },
                    ]}
                    action={{}}
                />
            );
        case 'book.report':
            return (
                <DataTable
                    dataApi="http://localhost:3000/api/v1/book/report"
                    queryKey="title"
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'Id',
                        },
                        {
                            accessorKey: 'title',
                            header: 'Title',
                        },
                        {
                            accessorKey: 'authors',
                            header: 'Authors',
                            cell: ({ row }) => {
                                const authors: string[] =
                                    row.getValue('authors');
                                const formatted = authors.join(', ');
                                return <div>{formatted}</div>;
                            },
                        },
                        {
                            accessorKey: 'createdAt',
                            header: 'Created At',
                        },
                        {
                            accessorKey: 'reportingUser',
                            header: 'Reporting User',
                        },
                        {
                            accessorKey: 'reason',
                            header: 'Reason',
                        },
                    ]}
                    action={{}}
                />
            );
        case 'user.all':
            return (
                <DataTable
                    dataApi="http://localhost:3000/api/v1/user/"
                    queryKey="title"
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'Id',
                        },
                        {
                            accessorKey: 'username',
                            header: 'Username',
                        },
                        {
                            accessorKey: 'fullName',
                            header: 'Full Name',
                        },
                        {
                            accessorKey: 'createdAt',
                            header: 'Created At',
                        },
                    ]}
                    action={{}}
                />
            );
        case 'user.report':
            return (
                <DataTable
                    dataApi="http://localhost:3000/api/v1/user/report"
                    queryKey="title"
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'Id',
                        },
                        {
                            accessorKey: 'username',
                            header: 'Username',
                        },
                        {
                            accessorKey: 'fullName',
                            header: 'Full Name',
                        },
                        {
                            accessorKey: 'createdAt',
                            header: 'Created At',
                        },
                        {
                            accessorKey: 'reportingUser',
                            header: 'Reporting User',
                        },
                        {
                            accessorKey: 'reason',
                            header: 'Reason',
                        },
                    ]}
                    action={{}}
                />
            );
        case 'comment.report':
            return (
                <DataTable
                    dataApi="http://localhost:3000/api/v1/comment/report"
                    queryKey="title"
                    columns={[
                        {
                            accessorKey: 'id',
                            header: 'Id',
                        },
                        {
                            accessorKey: 'content',
                            header: 'Content',
                        },
                        {
                            accessorKey: 'user',
                            header: 'User',
                        },
                        {
                            accessorKey: 'book',
                            header: 'Book',
                        },
                        {
                            accessorKey: 'createdAt',
                            header: 'Created At',
                        },
                        {
                            accessorKey: 'reportingUser',
                            header: 'Reporting User',
                        },
                        {
                            accessorKey: 'reason',
                            header: 'Reason',
                        },
                    ]}
                    action={{}}
                />
            );
    }
};

const Main = () => {
    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <BreadcrumbHeader />
                </div>
            </header>
            <div className="p-4 pt-0">
                <Content />
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <Main />
                </SidebarInset>
            </SidebarProvider>
        </Provider>
    );
};

export default App;
