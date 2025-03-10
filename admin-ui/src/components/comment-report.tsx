import { DataTable } from './data-table';

export const CommentReport = () => {
    return (
        <DataTable
            dataApi="http://localhost:3000/api/v1/comment/report"
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
            action={{}}
        />
    );
};
