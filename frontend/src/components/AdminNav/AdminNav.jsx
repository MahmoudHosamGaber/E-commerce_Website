import { useState } from "react";
import AppBar from "./AppBar";
import Drawer from "./Drawer";
import Container from "@mui/material/Container";

const AdminNav = ({ children, title }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <AppBar open={open} setOpen={setOpen} title={title} />
            <Drawer open={open} setOpen={setOpen} />
            <Container size="lg" sx={{ mt: "6rem", mb: "3rem" }}>
                {children}
            </Container>
        </>
    );
};

export default AdminNav;
