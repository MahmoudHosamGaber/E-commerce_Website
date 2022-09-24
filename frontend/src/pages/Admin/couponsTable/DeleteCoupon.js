import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Slide } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCoupon } from "../../../features/admin/adminAuthSlice";
import { useDispatch} from "react-redux";

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

const DeleteCoupon = ({code}) => {
    
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onDelete = () => {
        dispatch(deleteCoupon(code));
        handleClose();
    };

    return (
        <>
            <DeleteIcon
                sx={{ color: "red", cursor: "pointer" }}
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
            >
                <Slide in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Delete Product
                        </Typography>
                        <Typography
                            id="transition-modal-description"
                            sx={{ mt: 2 }}
                        >
                            Are you sure you want to delete {code}?
                        </Typography>
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
                                onClick={onDelete}
                                color="error"
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>
        </>
    );
}

export default DeleteCoupon
