import { BookOpen, Download, Share } from 'lucide-react';
import { Button } from './ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui/tooltip';
import { MouseEventHandler } from 'react';

type Props = {
    coverPath: string;
    coverAlt?: string;
    onRead?: MouseEventHandler<HTMLButtonElement>;
    onShare?: MouseEventHandler<HTMLButtonElement>;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
};

export const BookCover = ({
    coverPath,
    coverAlt,
    onRead,
    onShare,
    onDownload,
}: Props) => {
    return (
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <div className="relative w-64 md:w-56 lg:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] group">
                <img
                    src={coverPath || '/placeholder.svg'}
                    alt={coverAlt}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    onClick={onRead}
                                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white text-black hover:bg-white/90"
                                >
                                    <BookOpen className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Read PDF</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    onClick={onShare}
                                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                >
                                    <Share className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Share</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    onClick={onDownload}
                                    className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                                >
                                    <Download className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};
