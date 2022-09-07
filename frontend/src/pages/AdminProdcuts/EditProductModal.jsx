import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, FormControl } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

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

const EditProductModal = ({}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Button
                variant="contained"
                color="info"
                startIcon={<EditIcon />}
                onClick={handleOpen}
            >
                Edit
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
            >
                <Slide in={open} direction="down">
                    <Box sx={modalStyle}>
                        <form onSubmit={onSubmit}>
                            <Box sx={formStyle}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="filled"
                                    fullWidth
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    variant="filled"
                                    fullWidth
                                />
                                <TextField
                                    name="price"
                                    label="Price"
                                    variant="filled"
                                    fullWidth
                                />
                                <TextField
                                    name="brand"
                                    label="Brand"
                                    variant="filled"
                                    fullWidth
                                />
                                <TextField
                                    name="category"
                                    label="Category"
                                    variant="filled"
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

export default EditProductModal;
