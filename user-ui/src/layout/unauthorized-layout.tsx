import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

export const UnauthorizedLayout = () => {
    return (
        <div>
            <Outlet />
            <Toaster richColors />
        </div>
    );
}
