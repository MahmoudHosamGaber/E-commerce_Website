import { Box, Card, CardContent, CardActions, Typography } from "@mui/material";
import EditProductModal from "./EditProductModal";
import EditImagesModal from "./EditImagesModal";
import RestoreProductModal from "./RestoreProductModal";
const ArchivedProductCard = ({ product, categories, brands }) => {
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
                <EditImagesModal product={product} />
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
                <EditProductModal
                    product={product}
                    categories={categories}
                    brands={brands}
                />
                <RestoreProductModal id={product._id} name={product.name} />
            </CardActions>
        </Card>
    );
};
export default ArchivedProductCard;
