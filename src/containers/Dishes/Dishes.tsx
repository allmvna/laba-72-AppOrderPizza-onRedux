import {Button, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid2";


const Dishes = () => {
    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>
                <Grid size={6}>
                    <Typography variant="h4" color="black" textAlign='center' sx={{fontWeight: '600' }}>
                        Dishes
                    </Typography>
                </Grid>
                <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        size="large"
                        type="button"
                        variant="contained"
                        to="/new_dish"
                        component={NavLink}
                        sx={{
                            background: 'linear-gradient(45deg, #1e012b, #500556)',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '12px 24px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #500556, #1e012b)',
                                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Add new dish
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Dishes;