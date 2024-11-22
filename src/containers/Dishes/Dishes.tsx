import {Alert, Button, Card, CardActions, CardContent, Container, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteDish, fetchDishes} from "../../slices/sliceDish/sliceDish.tsx";
import {useEffect} from "react";
import Loader from "../../UI/Loader/Loader.tsx";


const Dishes = () => {
    const { dishes, error, isLoading } = useAppSelector((state) => state.menu);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const deleteThisDish = (id: string) => {
        dispatch(deleteDish(id));
    };

    return (
        <>
            <Container>
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
                            to="/admin/new_dish"
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
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Alert severity="error">No data. Try again!</Alert>
                ) : (
                    <Grid container spacing={2} sx ={{mt: 3}}>
                        {dishes.map((dish) => (
                            <Grid size={12} key={dish.id}>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        margin: 'auto',
                                        border: "3px solid #1e012b",
                                        borderRadius: "15px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        "&:hover": {
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            backgroundColor: "white",
                                            mb: 1,
                                            textAlign: "center",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Grid size={12}
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center"
                                              }}>
                                            {dish.image && (
                                                <img
                                                    src={dish.image}
                                                    alt={dish.title}
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                            )}
                                            <Typography sx={{fontSize: 20, fontWeight: 600, ml: 1, borderRight: '1px solid #000', pr: 2}}>
                                                {dish.title}
                                            </Typography>
                                            <Typography sx={{fontSize: 20, fontWeight: 600, ml: 3, color: "green"}}>
                                                {dish.price} KGS
                                            </Typography>
                                        </Grid>
                                        <CardActions sx={{ marginLeft: "auto" }}>
                                            <Button
                                                component={NavLink}
                                                to={`/admin/${dish.id}/edit`}
                                                variant="contained"
                                                sx={{ mr: 2,
                                                    backgroundColor: '#1e012b',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                    },
                                                }}
                                            >
                                                <DriveFileRenameOutlineIcon/>
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{ mr: 2,
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                                    '&:hover': {
                                                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                                        transform: 'scale(1.05)',
                                                    },
                                                }}
                                                onClick={() => deleteThisDish(dish.id)}

                                            >
                                                <DeleteIcon/>
                                            </Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

        </>
    );
};

export default Dishes;