import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { getCoupons } from "../../../features/admin/adminAuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteCoupon from "./DeleteCoupon";
import AddCoupon from "./AddCoupon";
import { reset } from "../../../features/admin/adminAuthSlice";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const AdminCoupons = () => {
    const { coupons, isSuccess, isError, message } = useSelector(
        (state) => state.admin
    );
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - coupons.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(getCoupons());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success(message);
        }
        dispatch(reset());
    }, [isSuccess, isError, message, dispatch]);

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    marginTop: 2,
                    marginLeft: 8,
                    marginBottom: 2,
                }}
            >
                <AddCoupon />
            </Box>
        <TableContainer
            component={Paper}
            sx={{
                height: "fit-content",
                maxWidth: 950,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Table
                sx={{ minWidth: 650, maxWidth: 950 }}
                aria-label="custom pagination table"
            >
                <TableHead sx={{ backgroundColor: "#013A81" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            ID
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            code
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Expires At
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            description
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Delete
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? coupons.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : coupons
                    ).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">
                               {row.code}
                            </TableCell>
                            <TableCell align="right">{row.expiresAt}</TableCell>
                            <TableCell align="right">
                                {row.description}
                            </TableCell>
                            <TableCell align="right">
                               <DeleteCoupon code={row.code}/>
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={12} />
                        </TableRow>
                    )}
                </TableBody>
                <TablePagination
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                    ]}
                    colSpan={5}
                    count={coupons.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                        inputProps: {
                            "aria-label": "rows per page",
                        },
                        native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                />
            </Table>
        </TableContainer>
        </Container>
    );
};

export default AdminCoupons;
