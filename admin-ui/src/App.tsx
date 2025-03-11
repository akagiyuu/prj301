import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type RootState, type AppDispatch } from './store';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Toaster } from './components/ui/sonner';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App = () => {
    const token = localStorage.getItem('token');

    return (
        <div>
            {token === null ? <Login /> : <Main />}
            <Toaster />
        </div>
    );
};

export default App;
