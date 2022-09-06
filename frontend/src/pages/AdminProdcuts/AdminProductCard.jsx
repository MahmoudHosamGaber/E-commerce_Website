import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    CardActions,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminProductCard = ({ product }) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <CardActionArea
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
            </CardActionArea>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="info"
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};
export default AdminProductCard;
