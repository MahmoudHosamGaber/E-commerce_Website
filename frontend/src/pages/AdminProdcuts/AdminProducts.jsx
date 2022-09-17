import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { Container, Button, ButtonGroup, Box } from "@mui/material";
import {
    fetchAllProducts,
    getArchivedProducts,
} from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getBrands } from "../../features/brands/brandsSlice";
import Spinner from "../../components/Spinner";
import AddProductModal from "./AddProductModal";
import { toast } from "react-toastify";
import { reset } from "../../features/products/productsSlice";

const AdminProducts = () => {
    let { allProducts, archivedProducts, isSuccess, isError, message } =
        useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const brands = useSelector((state) => state.brands.brands);
    const productIsLoading = useSelector((state) => state.products.isLoading);
    const categoryIsLoading = useSelector(
        (state) => state.categories.isLoading
    );
    const brandIsLoading = useSelector((state) => state.brands.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(getArchivedProducts());
        dispatch(getCategories());
        dispatch(getBrands());
    }, [dispatch]);
    useEffect(() => {
        if (isSuccess) toast.success(message);
        if (isError) toast.error(message);
        dispatch(reset());
    }, [dispatch, isSuccess, isError, message]);
    const isLoading = productIsLoading || categoryIsLoading || brandIsLoading;

    if (isLoading) return <Spinner />;

    const categoryMap = categories.reduce((acc, category) => {
        return { ...acc, [category._id]: category.name };
    }, {});
    const brandMap = brands.reduce((acc, brand) => {
        return { ...acc, [brand._id]: brand.name };
    }, {});
    allProducts = allProducts.map((product) => {
        const productCategory = categoryMap[product.category];
        const productBrand = brandMap[product.brand];
        return { ...product, category: productCategory, brand: productBrand };
    });
    archivedProducts = archivedProducts.map((product) => {
        const productCategory = categoryMap[product.category];
        const productBrand = brandMap[product.brand];
        return { ...product, category: productCategory, brand: productBrand };
    });
    const products = {
        activeProducts: allProducts,
        archivedProducts: archivedProducts,
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                }}
            >
                <AddProductModal categories={categories} brands={brands} />
                <ButtonGroup variant="contained">
                    <Button href="#active-products" sx={{marginRight : "2px"}}>Active Products</Button>
                    <Button href="#archived-products" sx={{marginLeft : "3px"}}>Archived Products</Button>
                </ButtonGroup>
            </Box>
            <AdminProductList
                products={products}
                categories={categories}
                brands={brands}
            />
        </Container>
    );
};

export default AdminProducts;
