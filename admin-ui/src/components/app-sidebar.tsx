import { NavMain, Props as NavMainProps } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar';
import { State } from '@/state';
import { SquareTerminal } from 'lucide-react';
import { useState } from 'react';

const user = {
    name: 'admin',
    avatar: '/avatars/admin.jpg',
};

const items: NavMainProps['items'] = [
    {
        title: 'Book',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: 'All',
                state: 'book.all',
            },
            {
                title: 'Report',
                state: 'book.report',
            },
        ],
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavUser user={user} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={items} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
