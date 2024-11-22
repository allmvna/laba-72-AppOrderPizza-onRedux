import {useAppDispatch} from "../../app/hooks.ts";
import {OrderDish, removeFromOrder, toggleModal} from "../../slices/orderModalSlice/orderModalSlice.tsx";
import {Box, Button, Modal, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface CheckoutModalProps {
    orders: OrderDish[];
    total: number;
}

const CheckoutModal = ({ orders, total }: CheckoutModalProps) => {
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleModal(false));
    };

    const handleDelete = (id: string) => {
        dispatch(removeFromOrder(id));
    };

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: 24,
                width: '500px',
                height: 'auto',
                overflowY: 'auto',
            }}>
                <Typography id="modal-title" variant="h6" marginBottom='10px' fontWeight='bold'>
                    Your Order
                </Typography>
                <Box>
                    {orders.map((dish) => (
                        <Box key={dish.id} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px'
                        }}>
                            <Typography sx={{ml: 1, borderRight: '1px solid #000', pr: 3}}>{dish.title}</Typography>
                            <Typography  fontWeight='bold' color="green">{dish.price} KGS</Typography>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    minWidth: '40px',
                                    padding: '5px',
                                }}
                                onClick={() => handleDelete(dish.orderId)}
                            >
                                <DeleteIcon />
                            </Button>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight='bold'>Total: {total} KGS</Typography>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            backgroundColor: '#1e012b',
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CheckoutModal;
