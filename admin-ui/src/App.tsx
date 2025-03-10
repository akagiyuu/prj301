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
import { type RootState, type AppDispatch, store } from './store';
import { Overview } from './components/overview';
import { BreadcrumbHeader } from './components/breadcrum-header';
import { Book } from './components/book';
import { BookReport } from './components/book-report';
import { User } from './components/user';
import { UserReport } from './components/user-report';
import { CommentReport } from './components/comment-report';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Content = () => {
    const state = useAppSelector((state) => state.state.value);

    switch (state) {
        case 'overview':
            return <Overview />;
        case 'book.all':
            return <Book />;
        case 'book.report':
            return <BookReport />;
        case 'user.all':
            return <User />;
        case 'user.report':
            return <UserReport />;
        case 'comment.report':
            return <CommentReport />;
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
