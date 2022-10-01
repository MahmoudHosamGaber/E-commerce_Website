import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, FormControlLabel, Slide, TextField } from "@mui/material";
import { updateProduct } from "../../features/products/productsSlice";
import { useDispatch } from "react-redux";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { FormLabel } from "react-bootstrap";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    width: "clamp(20rem,60%,30rem)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const RestoreProductModal = ({ id, name }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [quantityInStock, setQuantityInStock] = useState(1);
    const onRestore = () => {
        dispatch(updateProduct({ _id: id, quantityInStock: quantityInStock }));
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<ChangeCircleIcon />}
                onClick={handleOpen}
            >
                Restore
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Restore Product
                        </Typography>
                        <FormControl>
                            <FormLabel
                                id="transition-modal-description"
                                sx={{ mt: 2 }}
                            >
                                Pleas Set the quantity in stock for {name}
                            </FormLabel>
                            <TextField
                                label="Quantity in stock"
                                type="number"
                                defaultValue={quantityInStock}
                                onChange={(e) =>
                                    setQuantityInStock(e.target.value)
                                }
                            />
                        </FormControl>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                gap: 1,
                                marginTop: 2,
                            }}
                        >
                            <Button variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={onRestore}
                                color="primary"
                            >
                                Restore
                            </Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </>
    );
};

export default RestoreProductModal;
