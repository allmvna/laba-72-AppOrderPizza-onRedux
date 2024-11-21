import Layout from "../../UI/Layout/Layout.tsx";
import {Alert} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Orders from "../Orders/Orders.tsx";
import Dishes from "../Dishes/Dishes.tsx";
import AdminPanel from "../AdminPanel/AdminPanel.tsx";
import NewDishForm from "../../components/NewDishForm/NewDishForm.tsx";


const OrderApp = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/dishes" element={<Dishes />} />
                    <Route path="/new_dish" element={<NewDishForm />} />
                    <Route path="/:id/edit" element={<NewDishForm />} />
                    <Route
                        path="*"
                        element={<Alert severity="error">Not found</Alert>}
                    />
                </Routes>
            </Layout>
        </>
    );
};

export default OrderApp;