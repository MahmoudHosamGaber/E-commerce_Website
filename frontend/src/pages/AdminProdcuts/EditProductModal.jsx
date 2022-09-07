import { useForm } from "../../hooks/useForm";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Autocomplete, Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
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

const EditProductModal = ({ product, categories }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onSubmit = (e) => {
        e.preventDefault();
    };
    const [formValues, handleInputChange] = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        category: product.category,
    });
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
                keepMounted
            >
                <Slide in={open} direction="down">
                    <Box sx={modalStyle}>
                        <form onSubmit={onSubmit}>
                            <Box sx={formStyle}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <TextField
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    value={formValues.price}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <Autocomplete
                                    disablePortal
                                    variant="filled"
                                    options={categories.map(
                                        (category) => category.name
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Category"
                                        />
                                    )}
                                    value={formValues.category}
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
