import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Flag, MessageSquare, MoreHorizontal, Send } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { NavLink } from 'react-router';

const SAMPLE_COMMENTS = [
    {
        id: '1',
        user: {
            name: 'Alice Johnson',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
            'This book completely changed my perspective on AI. The authors present complex ideas in an accessible way without oversimplifying the technical aspects.',
        createdAt: '2025-03-15T14:30:00Z',
    },
    {
        id: '2',
        user: {
            name: 'Michael Chen',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
            'Chapter 4 on ethical considerations was particularly thought-provoking. I appreciate how the authors addressed both the technical and philosophical dimensions of AI development.',
        createdAt: '2025-03-14T09:15:00Z',
    },
    {
        id: '3',
        user: {
            name: 'Sarah Williams',
            avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
            'The case studies they included really helped illustrate the ethical dilemmas. I found the examples from healthcare and autonomous vehicles especially relevant.',
        createdAt: '2025-03-14T10:45:00Z',
    },
    {
        id: '4',
        user: {
            name: 'David Lee',
            avatarPath: '/placeholder.svg?height=40&width=40',
        },
        content:
            'A must-read for anyone interested in the future of technology. The case studies were especially illuminating.',
        createdAt: '2025-03-12T16:45:00Z',
    },
];

type Comment = {
    id: string;
    user: {
        name: string;
        avatarPath?: string;
    };
    content: string;
    createdAt: string;
};

export function CommentSection({ bookId }: { bookId: string }) {
    const [comments, setComments] = useState<Comment[]>(SAMPLE_COMMENTS);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const report = () => {};

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));

            const newCommentObj: Comment = {
                id: `temp-${Date.now()}`,
                user: {
                    name: 'Current User',
                    avatarPath: '/placeholder.svg?height=40&width=40',
                },
                content: newComment,
                createdAt: new Date().toISOString(),
            };

            setComments([newCommentObj, ...comments]);
            setNewComment('');
            toast.info('Your comment has been successfully posted.');
        } catch (error) {
            toast.error('Failed to post your comment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                                disabled={isSubmitting || !newComment.trim()}
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
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-background rounded-2xl p-6 shadow-sm border border-muted/50 hover:border-primary/20 transition-colors"
                        >
                            <div className="flex gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage
                                        src={comment.user.avatarPath}
                                        alt={comment.user.name}
                                    />
                                    <AvatarFallback>
                                        {comment.user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <NavLink to={`/user/${comment.user.name}`}>
                                                <h4 className="font-medium text-foreground">
                                                    {comment.user.name}
                                                </h4>
                                            </NavLink>
                                            <span className="text-xs text-muted-foreground">
                                                {comment.createdAt}
                                            </span>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-full hover:bg-muted/50"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        More options
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="rounded-xl"
                                            >
                                                <DropdownMenuItem
                                                    onClick={report}
                                                >
                                                    Report
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Copy Link
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
