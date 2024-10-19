import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Tooltip,
    TextField,
    TablePagination,
} from '@mui/material';

const Leaderboard = ({ data }) => {
    const columns = React.useMemo(
        () => [
            { Header: 'User', accessor: 'user' },
            { Header: 'Speed', accessor: 'speed' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setPageSize,
        state: { pageIndex, pageSize },
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        page,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }, // Set default page size
        },
        useSortBy, // Add sorting capabilities
        usePagination // Add pagination capabilities
    );

    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredRows = rows.filter(row =>
        row.values.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <TextField
                variant="outlined"
                label="Search Users"
                className="mb-4"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper}>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {filteredRows.length > 0 ? (
                            filteredRows.map(row => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()} hover>
                                        {row.cells.map(cell => (
                                            <TableCell {...cell.getCellProps()}>
                                                <Tooltip title="User's speed">
                                                    <span>{cell.render('Cell')}</span>
                                                </Tooltip>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2}>No results found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={(_, newPage) => gotoPage(newPage)}
                onRowsPerPageChange={e => {
                    setPageSize(Number(e.target.value));
                    gotoPage(0);
                }}
            />
        </div>
    );
};

export default Leaderboard;
