import {Alert, Button, Card, CardContent, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {deleteOrder, fetchOrders} from "../../slices/orderModalSlice/orderModalSlice.tsx";
import Grid from "@mui/material/Grid2";
import Loader from "../../UI/Loader/Loader.tsx";
import {fetchDishes} from "../../slices/sliceDish/sliceDish.tsx";

const Orders = () => {
    const dispatch = useAppDispatch();
    const { orders, error, isLoading } = useAppSelector((state) => state.orderModal);


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchDishes());
            dispatch(fetchOrders());
        };

       void fetchData();
    }, [dispatch]);

    const handleDeleteOrder = (orderId: string) => {
        dispatch(deleteOrder(orderId));
    };

    return (
        <>
            <Typography variant="h4" color="black" textAlign="center" sx={{ fontWeight: '600', mb: 3 }}>
                Orders
            </Typography>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">No data. Try again!</Alert>
            ) : orders.length === 0 ? (
                <Typography textAlign="center">No orders available.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {orders.map((order) => (
                        <Grid size={12} key={order.orderId}>
                            <Card
                                sx={{
                                    minWidth: 275,
                                    margin: 'auto',
                                    border: "3px solid #1e012b",
                                    borderRadius: "15px",
                                    overflow: "hidden",
                                }}>
                                <CardContent>
                                    <Grid container spacing={12} sx={{ alignItems: "center" }}>
                                        <Grid size={8} sx={{ display: "flex", alignItems: "center" }}>
                                            {order.image && (
                                                <img
                                                    src={order.image}
                                                    alt={order.title}
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                            )}
                                            <Typography sx={{ fontSize: 18, fontWeight: 600, ml: 1, borderRight: '1px solid #000', pr: 2 }}>
                                                {order.title} x {order.quantity}
                                            </Typography>
                                            <Typography sx={{ fontSize: 18, fontWeight: 600, ml: 3, color: "green" }}>
                                                {order.price} KGS
                                            </Typography>
                                        </Grid>

                                        <Grid size={4} sx={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                            <Typography sx={{ fontWeight: 600 }}>
                                                Total: {order.price * order.quantity} KGS
                                            </Typography>
                                            <Button
                                                onClick={() => handleDeleteOrder(order.orderId)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#1e012b',
                                                    ml: 2,
                                                }}
                                            >
                                                Complete order
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Orders;