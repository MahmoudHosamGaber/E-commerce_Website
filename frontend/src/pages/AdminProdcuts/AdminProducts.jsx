import AdminProductCard from "./AdminProductCard";
import { Container, Box } from "@mui/material";
const AdminProducts = () => {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                    gap: 2,
                }}
            >
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
                <AdminProductCard />
            </Box>
        </Container>
    );
};

export default AdminProducts;
