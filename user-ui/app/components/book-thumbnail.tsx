import { BookOpen } from 'lucide-react';
import { cn } from '~/lib/utils';

export type BookThumbnailProps = {
    className?: string;
    title: string;
    coverSrc?: string;
};

export const BookThumbnail = ({
    className,
    title,
    coverSrc,
}: BookThumbnailProps) => {
    return (
        <div className={cn('group flex flex-col', className)}>
            <div className="flex relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img src={coverSrc} alt={title} className="w-full bg-muted text-center inline" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                    <BookOpen className="h-4 w-4" />
                </div>
            </div>
            <p className="mt-3 text-center font-medium">{title}</p>
        </div>
    );
};
