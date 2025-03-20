import { DeleteIcon, Trash2Icon, TrashIcon } from 'lucide-react';
import { DataTable } from './data-table';
import { fetchWrapper } from '@/lib/utils';

export const CommentReport = () => {
    return (
        <DataTable
            dataApi="comment/report"
            queryKey="title"
            columns={[
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'content',
                    header: 'Content',
                },
                {
                    accessorKey: 'user',
                    header: 'User',
                },
                {
                    accessorKey: 'book',
                    header: 'Book',
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Created At',
                },
                {
                    accessorKey: 'reportingUser',
                    header: 'Reporting User',
                },
                {
                    accessorKey: 'reason',
                    header: 'Reason',
                },
            ]}
            action={{
                dismiss: {
                    icon: Trash2Icon,
                    fn: async (data) => {
                        const response = await fetchWrapper('comment/report', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.id,
                            }),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok)
                            throw new Error('Failed to dismiss report');
                    },
                },
                delete: {
                    icon: TrashIcon,
                    fn: async (data) => {
                        const response = await fetchWrapper('comment', {
                            method: 'DELETE',
                            body: JSON.stringify({
                                id: data.commentId,
                            }),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!response.ok)
                            throw new Error('Failed to delete comment');
                    },
                },
            }}
        />
    );
};
