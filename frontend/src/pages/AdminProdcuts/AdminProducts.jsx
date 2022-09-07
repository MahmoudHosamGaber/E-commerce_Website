import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { Container } from "@mui/material";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";
import Spinner from "../../components/Spinner";

const AdminProducts = () => {
    let { allProducts } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const productIsLoading = useSelector((state) => state.products.isLoading);
    const categoryIsLoading = useSelector(
        (state) => state.categories.isLoading
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(getCategories());
    }, [dispatch]);

    if (productIsLoading || categoryIsLoading) return <Spinner />;

    const categoryMap = categories.reduce((acc, category) => {
        return { ...acc, [category._id]: category.name };
    }, {});
    allProducts = allProducts.map((product) => {
        const productCategory = categoryMap[product.category];
        return { ...product, category: productCategory };
    });

    return (
        <Container maxWidth="lg">
            <AdminProductList products={allProducts} categories={categories} />
        </Container>
    );
};

export default AdminProducts;
