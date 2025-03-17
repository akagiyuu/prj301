import { UserProfileUpdateForm } from "@/components/user-profile-update-form";

export const UserProfileUpdate = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-2xl">
                <UserProfileUpdateForm/>
            </div>
        </div>
    );
};
