import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Slide } from "@mui/material";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import EditIcon from "@mui/icons-material/Edit";
import { changeOrderStatus } from "../../../features/admin/adminAuthSlice";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    bgcolor: "background.paper",
    width: "50%",
    minWidth: "20rem",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "100%",
};

const options = [
    { option : "pending" },
    { option : "rejected" },
    { option : "on the way" },
    { option : "delivered" },
];

const EditOrder = ({ order , id }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    
    
    const [status, setStatus] = useState(options.option);
    const onStatusChange = (e, newValue) => {
        setStatus(newValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            changeOrderStatus({
                id,
                status,
            })
        );
        handleClose();
    };

    return (
        <>
            <EditIcon
                sx={{ color: "#5800FF", cursor: "pointer" }}
                onClick={handleOpen}
            />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                keepMounted
            >
                <Slide in={open} direction="down">
                    <Box sx={modalStyle}>
                        <form onSubmit={onSubmit}>
                            <Box sx={formStyle}>
                            <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="status"
                                    options={options.map((option) => option.option)}
                                    fullWidth
                                    renderInput={(params) => (
                                    <TextField {...params} label="Status"/>
                                    )}
                                    value={status}
                                    onChange={onStatusChange}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<SaveIcon />}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Slide>
            </Modal>
        </>
    );
}

export default EditOrder
