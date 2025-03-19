import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Flag,
    MessageSquare,
    MoreHorizontal,
    Send,
    ThumbsUp,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { NavLink, useNavigate } from 'react-router';
import { useQueries, useQuery } from '@tanstack/react-query';
import * as api from '@/api';
import { toast } from 'sonner';
import { Comment as CommentEntity } from '@/api/book';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ReportDialog } from './report-dialog';

const Comment = (comment: CommentEntity) => {
    const {
        data: user,
        status,
        error,
    } = useQuery({
        queryKey: ['user', comment.username],
        queryFn: () => api.user.find(comment.username),
    });
    const [reportOpen, setReportOpen] = useState(false);

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return (
        <>
            <div
                key={comment.id}
                className="group relative bg-background rounded-2xl p-5 shadow-sm border border-muted/50 hover:border-primary/20 transition-colors"
            >
                <Button
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute top-2 right-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-destructive"
                    onClick={() => setReportOpen(true)}
                    title="Report comment"
                >
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                </Button>
                <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage
                            src={user.avatarPath}
                            alt={comment.username}
                        />
                        <AvatarFallback>
                            {comment.username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <NavLink
                                    to={`/user/${comment.username}`}
                                    className="hover:underline"
                                >
                                    <h4 className="font-medium text-foreground">
                                        {comment.username}
                                    </h4>
                                </NavLink>
                                <span className="text-xs text-muted-foreground">
                                    {comment.createdAt}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {comment.content}
                        </p>
                    </div>
                </div>
            </div>
            <ReportDialog
                title='Report comment'
                open={reportOpen}
                setOpen={setReportOpen}
                report={(reason) => api.comment.report(comment.id, reason)}
            />
        </>
    );
};

export const CommentSection = ({ bookId }: { bookId: string }) => {
    const {
        data: comments,
        status,
        error,
    } = useQuery({
        queryKey: ['book', bookId, 'comment'],
        queryFn: () => api.book.getComment(bookId),
    });

    const navigate = useNavigate();

    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            api.book.comment(bookId, newComment);
            toast.info('Your comment has been successfully posted.');
            navigate(0);
        } catch (error) {
            toast.error('Failed to post your comment. Please try again.');
        }
    };

    if (status === 'pending') {
        return <span>Loading...</span>;
    }

    if (status === 'error') {
        toast.error(error.toString());
        return <div></div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Discussion
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                        ({comments.length})
                    </span>
                </h2>
            </div>

            <Separator className="my-6" />

            <div className="bg-background rounded-2xl p-6 shadow-sm border border-muted/50">
                <div className="flex gap-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage
                            src="/placeholder.svg?height=40&width=40"
                            alt="Your avatar"
                        />
                        <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <Textarea
                            placeholder="Share your thoughts about this book..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[100px] resize-none bg-muted/30 border-muted focus-visible:ring-primary/30 rounded-xl"
                        />
                        <div className="flex justify-end">
                            <Button
                                onClick={handleSubmitComment}
                                className="gap-2 rounded-full px-6 shadow-sm hover:shadow-md transition-all"
                            >
                                <Send className="h-4 w-4" />
                                Post Comment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6 pt-4">
                {comments.length === 0 ? (
                    <div className="text-center py-16 bg-background rounded-2xl shadow-sm border border-muted/50">
                        <MessageSquare className="h-12 w-12 mx-auto text-primary/40 mb-3" />
                        <p className="text-muted-foreground">
                            No comments yet. Be the first to share your
                            thoughts!
                        </p>
                    </div>
                ) : (
                    comments.map((comment) => <Comment {...comment} />)
                )}
            </div>
        </div>
    );
};
