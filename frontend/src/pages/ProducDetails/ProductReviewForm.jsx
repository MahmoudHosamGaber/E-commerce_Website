import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating, Slide, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) !important",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ProductReviewForm = ({ productId, review, setReview }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const token = useSelector((state) => state.auth.user.token);
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            `/api/product/${productId}/review`,
            {
                stars: rating,
                comment: comment,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setReview((review) => ({
            ...review,
            reviewsList: [...review.reviewsList, response.data],
        }));
        setOpen(false);
        setRating(0);
        setComment("");
    };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                Review Product
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open}>
                    <Box sx={style}>
                        <form onSubmit={onSubmit}>
                            <Box>
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Rating:
                                </Typography>
                                <Rating
                                    name="half-rating"
                                    size="large"
                                    value={rating}
                                    precision={0.5}
                                    sx={{ marginTop: "1rem" }}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                            </Box>

                            <TextField
                                id="standard-basic"
                                label="Comment"
                                variant="standard"
                                value={comment}
                                onChange={(event) => {
                                    setComment(event.target.value);
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{ marginTop: "1rem" }}
                                type="submit"
                            >
                                Submit Review
                            </Button>
                        </form>
                    </Box>
                </Slide>
            </Modal>
        </div>
    );
};

export default ProductReviewForm;
