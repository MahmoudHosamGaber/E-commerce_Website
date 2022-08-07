import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Card, CardContent, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const ContactUs = () => {
    const initialState = {
        email: "",
        comment: "",
    };
    const [contactData, setContactData] = useState(initialState);
    const { email, comment } = contactData;

    const clearState = () => {
        setContactData({ ...initialState });
    };

    const onChange = (e) => {
        setContactData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post("/api/customer/", {
                email: email,
                comment: comment,
            })
            .then(clearState);
    };

    return (
        <div className="contactus mb-5 mt-2">
            <Typography gutterBottom variant="h3" align="center">
                Contact Us
            </Typography>
            <Grid>
                <Card
                    style={{
                        maxWidth: 450,
                        padding: "20px 5px",
                        margin: "0 auto",
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            gutterBottom
                        >
                            Fill up the form and we will get back to you within
                            48 hours of business hours.
                        </Typography>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        type="email"
                                        placeholder="Enter email"
                                        label="Email"
                                        value={email}
                                        name="email"
                                        onChange={onChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        multiline
                                        rows={4}
                                        placeholder="Enter your message"
                                        label="Comment"
                                        value={comment}
                                        name="comment"
                                        onChange={onChange}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ backgroundColor: "#d6c2a2" }}
                                        fullWidth
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    );
};

export default ContactUs;
