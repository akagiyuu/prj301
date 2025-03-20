import { BadgeCheck, ChevronDown, LogOut, User, UserCogIcon, UserPenIcon, UserXIcon } from 'lucide-react';
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

export const UserMenu = ({ user }: { user: UserEntity }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');

        navigate('/auth/login');
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-12 gap-2 px-2 font-normal">
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
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={user.avatarPath}
                                alt={user.username}
                            />
                            <AvatarFallback className="rounded-lg">
                                {user.fullName}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                {user.fullName}
                            </span>
                            <span className="truncate text-xs">
                                {user.username}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to={`/user/${user.username}`}>
                        <DropdownMenuItem>
                            <User />
                            Profile
                        </DropdownMenuItem>
                    </Link>
                    <Link to={`/user/update`}>
                        <DropdownMenuItem>
                            <UserPenIcon />
                            Update Profile
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
