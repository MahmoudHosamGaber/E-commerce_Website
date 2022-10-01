import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import {
    Button,
    Autocomplete,
    Box,
    TextField,
    Slide,
    Modal,
    Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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

const AddProductModal = ({ categories, brands }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { isError, isSuccess, message } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const categoryId = categories.find((c) => c.name === category)._id;
        const brandId = brands.find((b) => b.name === brand)._id;
        dispatch(
            addProduct({
                ...formValues,
                category: categoryId,
                brand: brandId,
            })
        );
    };

    const [formValues, handleInputChange] = useForm({
        name: "",
        description: "",
        price: 0,
        quantityInStock: 0,
        mainImage: "",
        images: "",
    });
    const [category, setCategory] = useState(categories[0]?.name);
    const onCategoryChange = (e, newValue) => {
        setCategory(newValue);
    };
    const [brand, setBrand] = useState(brands[0]?.name);
    const onBrandChange = (e, newValue) => {
        setBrand(newValue);
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                Add Product
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
                                    name="price"
                                    label="Price"
                                    variant="outlined"
                                    type="number"
                                    value={formValues.price}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="quantityInStock"
                                    label="In Stock"
                                    variant="outlined"
                                    type="number"
                                    value={formValues.quantityInStock}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="mainImage"
                                    label="Main Image"
                                    variant="outlined"
                                    value={formValues.mainImage}
                                    onChange={handleInputChange}
                                    required
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
                                    onChange={onCategoryChange}
                                    value={category}
                                />
                                <Autocomplete
                                    disablePortal
                                    variant="filled"
                                    options={brands.map((brand) => brand.name)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Brand" />
                                    )}
                                    onChange={onBrandChange}
                                    value={brand}
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

export default AddProductModal;
