import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { AuthorizedLayout } from './layout/authorized-layout';
import { UnauthorizedLayout } from './layout/unauthorized-layout';
import { Login } from './pages/auth/login';
import { Signup } from './pages/auth/signup';
import { BookSearch } from './pages/book/search';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthorizedLayout />}>
                    <Route index element={<Home />} />
                    <Route path="book" element={<BookSearch />} />
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
