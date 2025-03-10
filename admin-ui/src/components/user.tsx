import { DataTable } from './data-table';

export const User = () => {
    return (
        <DataTable
            dataApi="http://localhost:3000/api/v1/user/"
            queryKey="title"
            columns={[
                {
                    accessorKey: 'id',
                    header: 'Id',
                },
                {
                    accessorKey: 'username',
                    header: 'Username',
                },
                {
                    accessorKey: 'fullName',
                    header: 'Full Name',
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
