import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Button, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getProductsThunk } from '../store/thunks/productThunk';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/types';
import axios from 'axios';

type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    { id: 'image', numeric: false, disablePadding: true, label: '' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
];

interface EnhancedTableProps {
    order: Order;
    orderBy: string;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator<Key extends keyof any>(order: Order, orderBy: Key) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead: React.FC<EnhancedTableProps> = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.label === "Actions" ? 'right' : 'left'}
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const EnhancedTableToolbar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" id="tableTitle" component="div">
                Products
            </Typography>
            <Button variant="contained" color="success" onClick={() => navigate(`/create`)}>
                New Product
            </Button>
        </Toolbar>
    );
};

const ProductsTable: React.FC = () => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Product>('price');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const products = useTypedSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [dispatch]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Product) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = stableSort(products, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const handleDelete = async (productId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
            if (response.status === 204) {
                console.log('Product deleted successfully');
            }
            dispatch(getProductsThunk());
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    console.error('Product not found');
                } else {
                    console.error('Server Error');
                }
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                        <TableBody>
                            {visibleRows.map((row) => (
                                <TableRow hover tabIndex={-1} key={row._id}>
                                    <TableCell align="left">
                                        <Avatar alt="image" src={row.image} />
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <EditIcon onClick={() => navigate(`/edit/${row._id}`)} cursor={"pointer"}/>
                                        <DeleteIcon onClick = {() => handleDelete(row._id)} cursor={"pointer"}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default ProductsTable;
