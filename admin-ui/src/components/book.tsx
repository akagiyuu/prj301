import { DataTable } from '@/components/data-table';

export const Book = () => {
    return (
        <DataTable
            dataApi="book/"
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
            ]}
            action={{}}
        />
    );
};
