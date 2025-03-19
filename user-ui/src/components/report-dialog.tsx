import { useState } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    report: (reason: string) => Promise<void>;
};

export const ReportDialog = ({ title, open, setOpen, report }: Props) => {
    const [reason, setReason] = useState('');

    const mutation = useMutation({
        mutationFn: async (reason: string) => {
            try {
                await report(reason);
                toast.info('Report submitted');
            } catch (error) {
                toast.error(error.toString());
            }
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-right">
                            Reason
                        </Label>
                        <Input
                            id="name"
                            required
                            className="col-span-3"
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={() => mutation.mutate(reason)}
                        disabled={mutation.isPending}
                        className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                    >
                        {mutation.isPending ? 'Submitting...' : 'Report'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
