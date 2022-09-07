import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
} from "@mui/material";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
const AdminProductCard = ({ product, categories }) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 2,
                }}
            >
                <CardMedia
                    component="img"
                    display="inline-block"
                    image={product.mainImage}
                    alt={product.name}
                    sx={{
                        aspectRatio: "16 / 9",
                        borderRadius: 2,
                    }}
                />
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>Price: {product.price}</Typography>
                        <Typography>
                            In Stock: {product.quantityInStock}
                        </Typography>
                    </Box>
                </CardContent>
            </div>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <EditProductModal product={product} categories={categories} />
                <DeleteProductModal id={product.id} name={product.name} />
            </CardActions>
        </Card>
    );
};
export default AdminProductCard;
