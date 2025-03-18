import { Book } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { Button } from './ui/button';
import {
    NavigationMenu,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { UserMenu } from './user-menu';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';

type Logo = {
    title: string;
};

type MenuItem = {
    title: string;
    url: string;
    description?: string;
};

type Auth = {
    login: string;
    signup: string;
};

type Props = {
    logo: Logo;
    menu: MenuItem[];
    auth: Auth;
};

export const Navbar = ({ logo, menu, auth }: Props) => {
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['self'],
        queryFn: () => api.user.self(),
    });

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return (
        <nav className="sticky top-0 z-50 grid grid-cols-3 items-center px-8 py-4 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] backdrop-blur-md bg-background/90 border-b border-border/10">
            <div className="flex items-center gap-2.5">
                <Book className="h-5 w-5 text-primary/80" strokeWidth={1.5} />
                <span className="font-medium text-base tracking-wide hidden sm:inline-block">
                    {logo.title}
                </span>
            </div>
            <div className="gap-6">
                <NavigationMenu className="size-fit m-auto">
                    <NavigationMenuList className="space-x-5">
                        {menu.map((item) => (
                            <Link
                                key={item.title}
                                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 py-2 font-normal text-foreground/80 transition-colors hover:bg-accent/30 hover:text-foreground"
                                to={item.url}
                            >
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="size-fit h-full mr-0 ml-auto">
                {user ? (
                    <UserMenu user={user} />
                ) : (
                    <div className="grid grid-cols-2 gap-6 ">
                        <Button
                            className="h-9 px-4 font-normal"
                            asChild
                            variant="ghost"
                        >
                            <NavLink to={auth.login}>Login</NavLink>
                        </Button>
                        <Button
                            className="h-9 px-5 font-normal rounded-full bg-primary/90 hover:bg-primary/95 transition-all duration-300"
                            asChild
                        >
                            <NavLink to={auth.signup}>Sign up</NavLink>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};
