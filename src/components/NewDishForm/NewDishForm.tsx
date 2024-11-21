import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useState} from "react";
import {addDish} from "../../slices/sliceDish/sliceDish.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";

const initialDish = {
    id:'',
    title: '',
    price: 0,
    image: '',
};

const NewDishForm = () => {
    const [formData, setFormData] = useState(initialDish);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'price' ? +value : value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(addDish(formData));
        navigate('/admin/dishes');
        setFormData(initialDish);
    };

    return (
        <>
            <Typography sx={{ mb: 2, textAlign: "center", color: "#112735" }} variant="h4">
                Add new dish
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
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </>
    );
};

export default NewDishForm;