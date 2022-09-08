import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { Container } from "@mui/material";
import { fetchAllProducts } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getBrands } from "../../features/brands/brandsSlice";
import Spinner from "../../components/Spinner";

const AdminProducts = () => {
    let { allProducts } = useSelector((state) => state.products);
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
        dispatch(getCategories());
        dispatch(getBrands());
    }, [dispatch]);
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

    return (
        <Container maxWidth="lg">
            <AdminProductList
                products={allProducts}
                categories={categories}
                brands={brands}
            />
        </Container>
    );
};

export default AdminProducts;
