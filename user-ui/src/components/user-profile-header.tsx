import { User } from '@/pages/user-profile';

export const UserProfileHeader = ({ user }: { user: User }) => {
    return (
        <div className="relative container mx-auto px-4 -mt-24">
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-black rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                        <div className="relative">
                            <img
                                src={user.avatarPath}
                                alt="Profile picture"
                                width={160}
                                height={160}
                                className="rounded-full border-4 border-white bg-white object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full justify-between">
                        <div className="text-center md:text-left">
                            <div className="inline-block bg-black text-white rounded-full px-6 py-2 font-medium text-lg shadow-md mb-2">
                                {user.fullName}
                            </div>
                            <div className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-2">
                                <p>{user.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
