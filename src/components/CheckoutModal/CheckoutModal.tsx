import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {removeFromOrder, toggleModal} from "../../slices/orderModalSlice/orderModalSlice.tsx";
import {Box, Button, Modal, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from '@mui/icons-material/Clear';

const CheckoutModal = ()=> {
    const dispatch = useAppDispatch();
    const { orders, total, isModalOpen } = useAppSelector((state) => state.orderModal);

    const handleClose = () => {
        dispatch(toggleModal(false));
    };

    const handleDelete = (id: string) => {
        dispatch(removeFromOrder(id));
    };

    return (
        <Modal
            open={isModalOpen}
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
                <Button
                    aria-label="Close Modal"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'black'
                    }}
                >
                    <ClearIcon/>
                </Button>
                <Box>
                    {orders.map((dish) => (
                        <Box key={dish.id} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '10px'
                        }}>
                            <Typography>{dish.title}</Typography>
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
                <Box sx={{ marginTop: '25px' }}>
                    <Typography variant="h6" fontWeight='bold'>Total: {total} KGS</Typography>
                    <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1e012b',
                            }}
                        >
                            Order
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default CheckoutModal;
