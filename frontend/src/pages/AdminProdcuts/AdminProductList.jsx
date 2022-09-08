import { Box } from "@mui/material";
import AdminProductCard from "./AdminProductCard";

const AdminProductList = ({ products, categories, brands }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                gap: 2,
            }}
        >
            {products.map((product) => (
                <AdminProductCard
                    key={product.id}
                    product={product}
                    categories={categories}
                    brands={brands}
                />
            ))}
        </Box>
    );
};

export default AdminProductList;
