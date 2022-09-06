import { Box } from "@mui/material";
import AdminProductCard from "./AdminProductCard";

const AdminProductList = () => {
    const products = [];
    for (let i = 0; i < 10; i++) {
        products.push({
            id: i + 1,
            name: `Product ${i + 1}`,
            description:
                "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
            price: (17 * (i + 1)) % 99,
            mainImage: "https://unsplash.it/200/300",
            quantityInStock: (i + 1) * 10,
        });
    }
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                gap: 2,
            }}
        >
            {products.map((product) => (
                <AdminProductCard key={product.id} product={product} />
            ))}
        </Box>
    );
};

export default AdminProductList;
