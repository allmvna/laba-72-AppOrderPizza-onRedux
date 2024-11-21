import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useState} from "react";

const initialContact = {
    title: '',
    price: 0,
    image: '',
};

const NewDishForm = () => {
    const [formData, setFormData] = useState(initialContact);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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