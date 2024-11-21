import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useEffect, useState} from "react";
import {addDish, updateDish} from "../../slices/sliceDish/sliceDish.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const initialDish = {
    id:'',
    title: '',
    price: 0,
    image: '',
};

const NewDishForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState(initialDish);
    const { isLoading } = useAppSelector((state) => state.menu);
    const dishes = useAppSelector(state => state.menu.dishes);
    const dish = dishes.find(d => d.id === id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id && dish) {
            setFormData(dish);
        }
    }, [id, dish]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? +value : value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await dispatch(updateDish(formData));
        } else {
            await dispatch(addDish(formData));
        }
        navigate('/admin/dishes');
        setFormData(initialDish);
    };

    return (
        <>
            <Typography sx={{ mb: 2, textAlign: "center", color: "black", fontWeight: "bold" }} variant="h4">
                {id ? "Edit Dish" : "Add New Dish"}
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid  #052f46",
                        borderRadius: "10px",
                        p: 4,
                    }}
                >
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="title"
                            label="Title"
                            type="text"
                            variant="outlined"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="price"
                            label="Price"
                            type="number"
                            variant="outlined"
                            name="price"
                            value={formData.price}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            id="image"
                            label="URL"
                            type="url"
                            variant="outlined"
                            name="image"
                            value={formData.image}
                            onChange={onChange}
                            required
                        />
                    </Grid>
                    <Grid size={12} sx={{ textAlign: "center" }}>
                        <Button
                            size="large"
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                backgroundColor: '#1e012b',
                            }}
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : 'Save'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default NewDishForm;