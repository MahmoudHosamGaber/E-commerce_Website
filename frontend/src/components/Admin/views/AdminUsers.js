import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { getUsers } from "../../../features/admin/adminAuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";

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

const AdminUsers = () => {
    const { users, isError, message } = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getUsers());
    }, [isError, message, dispatch]);

    return (
        <TableContainer
            sx={{
                maxWidth: 950,
                margin: "auto",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Table
                sx={{ minWidth: 650, maxWidth: 950, padding: "5px" }}
                aria-label="custom pagination table"
            >
                <TableHead sx={{ backgroundColor: "#013A81" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            E-mail
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Username
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Edit
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : users
                    ).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                            <TableCell align="right">
                                {row.username}
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "0.75rem",
                                        color: "white",
                                        borderRadius: 8,
                                        padding: "5px 10px",
                                        display: "inline-block",
                                        backgroundColor:
                                            (row.status === "ACTIVE" &&
                                                "green") ||
                                            (row.status === "DEACTIVATED" &&
                                                "orange") ||
                                            (row.status === "SUSPENDED" &&
                                                "red"),
                                    }}
                                >
                                    {row.status}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <EditIcon sx={{ color: "#5800FF" }} />
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
                    count={users.length}
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
    );
};

export default AdminUsers;