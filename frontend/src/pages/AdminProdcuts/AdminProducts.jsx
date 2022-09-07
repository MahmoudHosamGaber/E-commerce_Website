import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { Container } from "@mui/material";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";
const AdminProducts = () => {
    let { allProducts } = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(getCategories());
    }, [dispatch]);
    return (
        <Container maxWidth="lg">
            <AdminProductList products={allProducts} categories={categories} />
        </Container>
    );
};

export default AdminProducts;
