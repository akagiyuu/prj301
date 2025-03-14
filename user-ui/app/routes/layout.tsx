import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Navbar } from '~/components/navbar';
import { Toaster } from '~/components/ui/sonner';

const Layout = () => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Navbar
                    logo={{
                        title: 'virtualbookarchive.com',
                    }}
                    menu={[
                        {
                            title: 'Home',
                            url: '/',
                        },
                        {
                            title: 'Book',
                            url: 'book',
                        },
                        {
                            title: 'Upload',
                            url: 'book/upload',
                        },
                    ]}
                    auth={{
                        login: 'auth/login',
                        signup: 'auth/signup',
                    }}
                />
                <Outlet />
                <Toaster richColors />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

export default Layout;
