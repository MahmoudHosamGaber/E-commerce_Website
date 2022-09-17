import { Box, Typography } from "@mui/material";
import AdminProductCard from "./AdminProductCard";
import ArchivedProductCard from "./ArchivedProductCard";

const headingStyle = {
    position: "relative",
    marginBlock: "1rem",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        height: "1px",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
};

const AdminProductList = ({ products, categories, brands }) => {
    console.log(products);
    return (
        <>
            <Typography
                variant={{ xs: "h4", md: "h3" }}
                component="h2"
                sx={headingStyle}
                id="active-products"
            >
                Active Products
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                    gap: 2,
                }}
            >
                {products.activeProducts.map((product) => (
                    <AdminProductCard
                        key={product.id}
                        product={product}
                        categories={categories}
                        brands={brands}
                    />
                ))}
            </Box>
            <Typography
                variant={{ xs: "h4", md: "h3" }}
                component="h2"
                sx={headingStyle}
                id="archived-products"
            >
                Archived Products
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                    gap: 2,
                }}
            >
                {products.archivedProducts.map((product) => (
                    <ArchivedProductCard
                        key={product.id}
                        product={product}
                        categories={categories}
                        brands={brands}
                    />
                ))}
            </Box>
        </>
    );
};

export default AdminProductList;
