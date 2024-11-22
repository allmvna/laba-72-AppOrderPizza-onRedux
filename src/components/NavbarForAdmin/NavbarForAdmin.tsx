import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const NavbarForAdmin = () => {
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
                Turtle Pizza Admin
              </Typography>
              <Box>
                <Button
                  to="/admin/dishes"
                  variant="outlined"
                  component={NavLink}
                  sx={{
                      borderColor: 'white',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                          borderColor: '#df04f1',
                          boxShadow: '0 0 10px #FFC107',
                      },
                  }}
                >
                  Dishes
                </Button>
              </Box>
                <Button
                    to="/admin/orders"
                    variant="outlined"
                    component={NavLink}
                    sx={{
                        ml: 2,
                        borderColor: 'white',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: '#df04f1',
                            boxShadow: '0 0 10px #FFC107',
                        },
                    }}
                >
                    Orders
                </Button>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavbarForAdmin;
