import { DataTable } from './data-table';

export const BookReport = () => {
    return (
        <DataTable
            dataApi="book/report"
            queryKey="title"
            columns={[
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'title',
                    header: 'Title',
                },
                {
                    accessorKey: 'authors',
                    header: 'Authors',
                    cell: ({ row }) => {
                        const authors: string[] = row.getValue('authors');
                        const formatted = authors.join(', ');
                        return <div>{formatted}</div>;
                    },
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
