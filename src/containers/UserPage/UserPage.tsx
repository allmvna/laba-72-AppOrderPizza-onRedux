import Loader from "../../UI/Loader/Loader.tsx";
import {Alert, Box, Button, Card, CardContent, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchDishes, IDish} from "../../slices/sliceDish/sliceDish.tsx";
import {addToOrder, toggleModal} from "../../slices/orderModalSlice/orderModalSlice.tsx";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal.tsx";


const UserPage = () => {
    const { dishes, error, isLoading } = useAppSelector((state) => state.menu);
    const { orders, total, isModalOpen } = useAppSelector((state) => state.orderModal);
    const dispatch = useAppDispatch();


    useEffect(() => {
        dispatch(fetchDishes());
    }, [dispatch]);

    const handleAddToCart = (dish: IDish) => {
        dispatch(addToOrder(dish));
    };

    const handleCheckout = () => {
        dispatch(toggleModal(true));
    };

    const getQuantity = (dishId: string) => {
        const order = orders.find((orderDish) => orderDish.id === dishId);
        return order ? order.quantity : 0;
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">No data. Try again!</Alert>
            ) : (
                <Container>
                    <Grid container  spacing={2} sx ={{mt: 3}}>
                        {dishes.map((dish) => (
                            <Grid size={12} key={dish.id}>
                                <Card
                                    sx={{
                                        minWidth: 275,
                                        margin: 'auto',
                                        border:"3px solid #1e012b",
                                        borderRadius: "15px",
                                        overflow: "hidden",
                                        cursor: 'pointer',
                                        position: 'relative',
                                        "&:hover": {
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                                            borderColor: 'gray'
                                        }
                                    }}
                                    onClick={() => handleAddToCart(dish)}
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
                                    </CardContent>
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            backgroundColor: 'green',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            fontWeight: 'bold',
                                        }}
                                    >

                                        + {getQuantity(dish.id)}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Order Total: {total} KGS
                        </Typography>
                        <Button
                            size="large"
                            variant="contained"
                            sx={{ mr: 2,
                                backgroundColor: '#1e012b',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                            onClick={handleCheckout}
                        >
                         Checkout
                        </Button>
                    </Box>
                </Container>
            )}

            {isModalOpen && <CheckoutModal />}
        </>
    );
};

export default UserPage;