import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import { getOrders } from "../../../features/admin/adminAuthSlice";
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
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import EditOrder from "./EditOrder";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { reset } from "../../../features/admin/adminAuthSlice";
import { AdminNav } from "../../../components";

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

const AdminOrders = () => {
    const { orders, isSuccess, isError, message } = useSelector(
        (state) => state.admin
    );
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        dispatch(getOrders());
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
        <AdminNav title="Orders">
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
                            Order Details
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{ color: "white", fontWeight: "bold" }}
                        >
                            Created At
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
                        ? orders.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                          )
                        : orders
                    ).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {row.orderDetails.map((item) => (
                                            <Grid
                                                item
                                                lg={10}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                                key={item._id}
                                            >
                                                <Typography>
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {item.quantity}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </TableCell>
                            <TableCell align="right">{row.createdAt}</TableCell>
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
                                            (row.status === "delivered" &&
                                                "green") ||
                                            (row.status === "rejected" &&
                                                "red") ||
                                            (row.status === "pending" &&
                                                "blue") ||
                                            (row.status === "on the way" &&
                                                "orange"),
                                    }}
                                >
                                    {row.status}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <EditOrder order={row}  id={row._id}/>
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
                    count={orders.length}
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
        </AdminNav>
    );
};

export default AdminOrders;
