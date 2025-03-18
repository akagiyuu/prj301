import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

export const AuthorizedLayout = () => {
    return (
        <div>
            <Navbar
                logo={{
                    title: 'virtualbookarchive',
                }}
                menu={[
                    {
                        title: 'Home',
                        url: '/',
                    },
                    {
                        title: 'Book',
                        url: '/book',
                    },
                    {
                        title: 'Upload',
                        url: '/book/upload',
                    },
                ]}
                auth={{
                    login: '/auth/login',
                    signup: '/auth/signup',
                }}
            />
            <Outlet />
            <Toaster richColors />
        </div>
    );
};
