import { Button } from './ui/button';
import { Flag } from 'lucide-react';
import { ReportDialog } from './report-dialog';
import * as api from '@/api';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User } from '@/api/user';

export const UserProfileHeader = ({ user }: { user: User }) => {
    return (
        <div className="relative container mx-auto px-4 -mt-24">
            <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-black rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                        <div className="relative">
                            <Avatar className="h-25 w-25 border border-border/20">
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
                    <ReportDialog
                        title="Report User"
                        report={(reason) =>
                            api.user.report(user.username, reason)
                        }
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
                        >
                            <Flag className="h-4 w-4 mr-1" />
                            <span className="text-sm">Report</span>
                        </Button>
                    </ReportDialog>
                </div>
            </div>
        </div>
    );
};
