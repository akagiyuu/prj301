import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowDownUp,
    ArrowDownWideNarrow,
    ArrowUpDown,
    ArrowUpNarrowWide,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    MoreHorizontal,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useEffect, useMemo, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import { fetchWithAuth } from '@/lib/utils';

type Action = {
    [name: string]: (
        id: string,
        fetchData: () => Promise<void>,
    ) => Promise<void>;
};

type DataTableProps<TData extends { id: string }, TValue> = {
    dataApi: string;
    queryKey: string;
    columns: ColumnDef<TData, TValue>[];
    action?: Action;
};

export function DataTable<TData extends { id: string }, TValue = unknown>({
    dataApi,
    queryKey,
    columns: columnsRaw,
    action,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 15,
    });
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState<TData[]>([]);
    const [query, setQuery] = useState('');
    const fetchData = useMemo(() => {
        return async () => {
            const sortQuery = sorting
                .map(
                    (s) =>
                        `&sort=${encodeURIComponent(s.id)},${s.desc ? 'desc' : 'asc'}`,
                )
                .join('');
            const response = await fetchWithAuth(
                `${dataApi}?page=${pagination.pageIndex}&size=${pagination.pageSize}${sortQuery}&${queryKey}=${query}`,
            );
            const json = await response.json();
            setData(json.content);
            setPageCount(json.totalPages);
        };
    }, [query, dataApi, sorting, pagination]);
    const defaultAction: Action = useMemo(() => {
        return {
            delete: async (id, fetchData) => {
                const response = await fetchWithAuth(dataApi, {
                    method: 'DELETE',
                    body: JSON.stringify({ id }),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    return;
                }

                await fetchData();
            },
        };
    }, [dataApi, fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columns = useMemo(() => {
        const actionColumn: ColumnDef<TData, TValue> = {
            id: 'actions',
            cell: ({ row, table }) => {
                const record = row.original;
                const action = table.options.meta as Action | undefined;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            {Object.entries(
                                Object.assign(defaultAction, action),
                            ).map(([name, func]) => (
                                <DropdownMenuItem
                                    className="capitalize"
                                    onClick={() => func(record.id, fetchData)}
                                >
                                    {name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        };

        return [...columnsRaw, actionColumn];
    }, [columnsRaw]);

    const table = useReactTable({
        data,
        columns,
        pageCount,
        manualPagination: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
            columnFilters,
        },
        meta: action,
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Filter by title"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div className="flex items-center">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {header.column.getCanSort() && (
                                                    <Button
                                                        variant="ghost"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {header.column.getIsSorted() ? (
                                                            header.column.getIsSorted() ===
                                                            'desc' ? (
                                                                <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
                                                            ) : (
                                                                <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
                                                            )
                                                        ) : (
                                                            <ArrowDownUp className="ml-2 h-4 w-4" />
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className="whitespace-normal break-words"
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 px-4 py-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <span>Rows per page:</span>
                        <Select
                            value={pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger className="h-8 w-[60px] border-0 bg-transparent p-0 focus:ring-0 focus:ring-offset-0">
                                <SelectValue>{pagination.pageSize}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {[15, 20, 30, 50, 100].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={pageSize.toString()}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-sm">
                        {pagination.pageIndex * pagination.pageSize + 1}-
                        {Math.min(
                            (pagination.pageIndex + 1) * pagination.pageSize,
                            table.getFilteredRowModel().rows.length,
                        )}{' '}
                        of {table.getFilteredRowModel().rows.length} rows
                    </div>
                </div>

                <div className="flex items-center mt-3 sm:mt-0">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center mx-2">
                            {Array.from(
                                { length: Math.min(5, pageCount) },
                                (_, i) => {
                                    let pageNumber;
                                    if (pageCount <= 5) {
                                        pageNumber = i;
                                    } else {
                                        const middlePoint = Math.min(
                                            Math.max(2, pagination.pageIndex),
                                            pageCount - 3,
                                        );
                                        pageNumber =
                                            i + Math.max(0, middlePoint - 2);
                                    }

                                    const isActive =
                                        pageNumber === pagination.pageIndex;

                                    return (
                                        <Button
                                            key={pageNumber}
                                            variant="ghost"
                                            size="sm"
                                            className={`h-8 min-w-[32px] rounded-md px-3 text-sm font-medium ${
                                                isActive
                                                    ? 'bg-gray-100 text-gray-900'
                                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                            onClick={() =>
                                                table.setPageIndex(pageNumber)
                                            }
                                        >
                                            {pageNumber + 1}
                                        </Button>
                                    );
                                },
                            )}
                            {pageCount > 5 && (
                                <>
                                    <span className="mx-1 text-gray-400">
                                        ...
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 min-w-[32px] rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        onClick={() =>
                                            table.setPageIndex(pageCount - 1)
                                        }
                                    >
                                        {pageCount}
                                    </Button>
                                </>
                            )}
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            onClick={() => table.setPageIndex(pageCount - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
