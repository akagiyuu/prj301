import { DataTable } from './data-table';

export const UserReport = () => {
    return (
        <DataTable
            dataApi="user/report"
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
