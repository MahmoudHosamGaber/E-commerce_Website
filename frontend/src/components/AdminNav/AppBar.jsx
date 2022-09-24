import { Typography, IconButton, Toolbar, Button, Box } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

const AppBar = ({ open, setOpen, title }) => {
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <MuiAppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h6" noWrap component="div">
                            {title}
                        </Typography>
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </>
    );
};

export default AppBar;
