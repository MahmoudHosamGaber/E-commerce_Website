import login from "../../../assets/opacity2.png";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { adminLogin, reset } from "../../../features/admin/adminAuthSlice";
const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch();
    // error here in the first line make the page go blank 
  const {admin, isError, isSuccess, message} = useSelector((state) => state.admin)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
        //Change that when any of the admin pages are done
      navigate("/admin/products")
      toast.success("you are successfully logged in")
    }

    dispatch(reset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])
 
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const adminData = {
            email,
            password,
        };

        dispatch(adminLogin(adminData));
    };
    return (
        <Card
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url(${login})`,
                backgroundSize: "cover",
                width: "500px",
                height: "400px",
                margin: "auto",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    spacing: 3,
                }}
            >
                <CardContent
                    sx={{
                        flex: "1 0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <PersonOutlineOutlinedIcon
                        sx={{
                            color: "white",
                            height: "4ch",
                            width: "180ch",
                            alignItems: "center",
                        }}
                    />
                    <FormControl
                        variant="standard"
                        
                        sx={{ m: 1, mt: 3, alignItems: "center" }}
                    >
                        <TextField
                            sx={{
                                mb: 3,
                                width: "45ch",
                            }}
                            id="outlined-basic"
                            label="E-mail"
                            variant="outlined"
                            value={email}
                            name="email"
                            onChange={onChange}
                            required
                        />

                        <TextField
                            sx={{
                                mb: 3,
                                width: "45ch",
                            }}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            name="password"
                            onChange={onChange}
                            required
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            sx={{ mb: 3, width: "20ch" }}
                        >
                            Sign In
                        </Button>
                    </FormControl>
                </CardContent>
            </Box>
        </Card>
    );
};

export default AdminLogin;
