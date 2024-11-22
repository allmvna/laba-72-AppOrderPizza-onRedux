import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NavbarForUser = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 5 }}>
                <AppBar
                    position="static"
                    sx={{
                        padding: "10px",
                        borderBottom: "1px solid",
                        backgroundColor: '#1e012b',
                    }}
                >
                    <Toolbar>
                        <Container
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                to="/admin"
                                variant="h5"
                                component={NavLink}
                                sx={{
                                    flexGrow: 1,
                                    textDecoration: "none",
                                    color: "#ffff",
                                }}
                            >
                                Turtle Pizza
                            </Typography>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default NavbarForUser;