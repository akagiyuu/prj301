import { UserProfileUpdateForm } from '@/components/user-profile-update-form';
import { fetchWrapper } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { User } from './user-profile';
import { toast } from 'sonner';

export const UserProfileUpdate = () => {
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await fetchWrapper('user/self');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            return await response.json() as User;
        },
    });

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-2xl">
                <UserProfileUpdateForm defaultValues={user} />
            </div>
        </div>
    );
};
