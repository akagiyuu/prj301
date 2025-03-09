import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from './components/ui/sidebar';
import { AppSidebar } from './components/app-sidebar';
import { Separator } from './components/ui/separator';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './components/ui/breadcrumb';
import {
    Provider,
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
} from 'react-redux';
import { type RootState, type AppDispatch, store } from './store';
import { Overview } from './components/overview';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const Content = () => {
    const state = useAppSelector((state) => state.state.value);

    switch (state) {
        case 'overview':
            return <Overview className="p-4 pt-0" />;
        default:
            return <div></div>;
    }
};

const Main = () => {
    const state = useAppSelector((state) => state.state.value);

    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                            </BreadcrumbItem>
                            {state.split('.').map((part, i) => (
                                <>
                                    <BreadcrumbSeparator
                                        className={
                                            i == 0 ? 'hidden md:block' : ''
                                        }
                                    />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{part}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <Content />
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
