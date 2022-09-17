import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Autocomplete, Slide } from "@mui/material";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import EditIcon from "@mui/icons-material/Edit";
import {
    changeUserStatus,
    changeUserPassword,
} from "../../../features/admin/adminAuthSlice";

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
     { option : "ACTIVE" },
     { option : "DEACTIVATED" },
     { option : "SUSPENDED" },
];

const EditUser = ({ user }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    
    const [formValues, handleInputChange] = useForm({
        email: user.email,
        password: "",
    });
    const [status, setStatus] = useState(options.option);
    const onStatusChange = (e, newValue) => {
        setStatus(newValue);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            changeUserStatus({
                ...formValues,
                status,
            })
        );
        dispatch(
            changeUserPassword({
                ...formValues,
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
                                <TextField
                                    name="email"
                                    label="E-mail"
                                    variant="outlined"
                                    value={formValues.email}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
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
                                <TextField
                                    name="password"
                                    label="New Password"
                                    variant="outlined"
                                    value={formValues.password}
                                    onChange={handleInputChange}
                                    fullWidth
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
};

export default EditUser;
