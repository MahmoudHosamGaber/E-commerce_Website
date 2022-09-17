import { useState } from "react";
import {
    Button,
    Autocomplete,
    Box,
    TextField,
    Slide,
    Modal,
    Backdrop,
    CardMedia,
    CardActionArea,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { updateProduct } from "../../features/products/productsSlice";
import { useDispatch } from "react-redux";

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
    display: "flex",
    flexDirection: "column",
    gap: 2,
};
const editImageHover = {
    position: "relative",
    "&:hover": {
        "&::after": {
            content: '"Edit Images"',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
        },
    },
};
const EditProductModal = ({ product }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(product.mainImage);
    const onMainImageChange = (e) => {
        setMainImage(e.target.value);
    };

    const [images, setImages] = useState(product.images);
    const [image, setImage] = useState("");
    const onImagesChange = (e) => {
        setImage(e.target.value);
    };
    const onAddImage = () => {
        if (image) {
            setImages([...images, image]);
            setImage("");
        }
    };
    const onRemoveImage = (image) => {
        const imageIndex = images.indexOf(image);
        const newImages = [...images];
        newImages.splice(imageIndex, 1);
        setImages(newImages);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onAddImage();
    };
    const onImageSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: product._id,
                images,
                mainImage: mainImage || product.mainImage,
            })
        );
    };

    return (
        <>
            <CardActionArea onClick={handleOpen} sx={editImageHover}>
                <CardMedia
                    component="img"
                    display="inline-block"
                    image={product.mainImage}
                    alt={product.name}
                    sx={{
                        aspectRatio: "16 / 9",
                    }}
                />
            </CardActionArea>
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
                        <TextField
                            name="mainImage"
                            label="Main Image"
                            variant="outlined"
                            value={mainImage}
                            onChange={onMainImageChange}
                        />
                        <form onSubmit={onSubmit}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr max-content",
                                }}
                            >
                                <TextField
                                    name="images"
                                    label="Images"
                                    variant="outlined"
                                    value={image}
                                    onChange={onImagesChange}
                                />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={onAddImage}
                                    type="submit"
                                >
                                    Add Image
                                </Button>
                            </Box>
                        </form>
                        <Box>
                            {images.map((image) => (
                                <Button
                                    endIcon={<CloseIcon />}
                                    onClick={() => onRemoveImage(image)}
                                >
                                    {image}
                                </Button>
                            ))}
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={onImageSubmit}
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Slide>
            </Modal>
        </>
    );
};

export default EditProductModal;
