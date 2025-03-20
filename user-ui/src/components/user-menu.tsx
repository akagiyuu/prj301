import {
    BadgeCheck,
    ChevronDown,
    LogOut,
    User,
    UserCogIcon,
    UserPenIcon,
    UserXIcon,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router';
import { User as UserEntity } from '@/api/user';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { toast } from 'sonner';

export const UserMenu = () => {
    const navigate = useNavigate();
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['self'],
        queryFn: () => api.user.self(),
    });

    const logout = () => {
        localStorage.removeItem('token');

        navigate('/auth/login');
    };

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                >
                    <Avatar className="h-10 w-10 border border-border/20">
                        <AvatarImage
                            src={user.avatarPath}
                            alt={user.username}
                        />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {user.username
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-56 animate-in slide-in-from-top-5 duration-300 border border-primary/20"
            >
                <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                            src={user.avatarPath}
                            alt={user.username}
                        />
                        <AvatarFallback className="rounded-lg">
                            {user.fullName}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.fullName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.username}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary">
                    <Link
                        to={`/user/${user.username}`}
                        className="flex w-full items-center"
                    >
                        <User /> &nbsp;Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary">
                    <Link
                        to="/user/update"
                        className="flex w-full items-center"
                    >
                        <UserPenIcon /> &nbsp;Update Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary"
                    onClick={logout}
                >
                    <button className="flex w-full text-left items-center">
                        <LogOut /> &nbsp;Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
