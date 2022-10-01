import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DiscountIcon from '@mui/icons-material/Discount';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoutIcon from "@mui/icons-material/Logout";
import { adminLogout } from "../../features/admin/adminAuthSlice";
import { useEffect } from "react";

const Drawer = ({ open, setOpen }) => {
    const admin = useSelector((state) => state.admin.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!admin) navigate("/adminLogin");
    }, [admin, navigate]);

    const handleLogout = () => {
        dispatch(adminLogout());
    };
    const listItems = [
        { text: "Dashboard", icon: <DashboardIcon />, href: "/admin" },
        { text: "Users", icon: <GroupIcon />, href: "/admin/users" },
        { text: "Orders", icon: <ReceiptLongIcon />, href: "/admin/orders" },
        {
            text: "Products",
            icon: <ShoppingCartIcon />,
            href: "/admin/products",
        },
        { text: "Queries", icon: <QuestionAnswerIcon />, href: "/admin/customer" },
        { text: "Coupons", icon: <DiscountIcon />, href: "/admin/coupons" },
    ];
    const list = () => (
        <Box
            role="presentation"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
        >
            <List
                sx={{
                    minHeight: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    {listItems.map((item, index) => (
                        <Link
                            to={item.href}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItem key={index} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>{item?.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
                </Box>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor={"left"}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                sx={{
                    "& .MuiDrawer-paper": {
                        minWidth: 240,
                    },
                }}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
};

export default Drawer;
