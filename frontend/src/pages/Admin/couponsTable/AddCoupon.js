import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import {
    Button,
    Box,
    TextField,
    Slide,
    Modal,
    Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { createCoupon } from "../../../features/admin/adminAuthSlice";

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

const AddCoupon = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createCoupon({
                ...formValues,
            })
        );
    };

    const [formValues, handleInputChange] = useForm({
        code: "",
        description: "",
        expiresAt: "",
        discount: 0,
        max_redemptions: 0,
    });
    

    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Add coupon
            </Button>
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
                                    name="code"
                                    label="Code"
                                    variant="outlined"
                                    value={formValues.code}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="expiresAt"
                                    label="Expires At"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={formValues.expiresAt}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="discount"
                                    label="Discount"
                                    variant="outlined"
                                    type="number"
                                    value={formValues.discount}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="max_redemptions"
                                    label="Max_redemptions"
                                    variant="outlined"
                                    value={formValues.max_redemptions}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                               
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
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

export default AddCoupon;