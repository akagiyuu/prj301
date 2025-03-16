import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { AuthorizedLayout } from './layout/authorized-layout';
import { UnauthorizedLayout } from './layout/unauthorized-layout';
import { Login } from './pages/auth/login';
import { Signup } from './pages/auth/signup';
import { BookSearch } from './pages/book/search';
import { BookSummary } from './pages/book/summary';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthorizedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="book">
                        <Route index element={<BookSearch />} />
                        <Route path=':id' element={<BookSummary />} />
                    </Route>
                </Route>

                <Route element={<UnauthorizedLayout />}>
                    <Route path="auth/login" element={<Login />} />
                    <Route path="auth/signup" element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
