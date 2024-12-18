import Layout from "../../UI/Layout/Layout.tsx";
import {Alert} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Orders from "../Orders/Orders.tsx";
import Dishes from "../Dishes/Dishes.tsx";
import NewDishForm from "../../components/NewDishForm/NewDishForm.tsx";
import UserPage from "../UserPage/UserPage.tsx";
import AdminPage from "../AdminPage/AdminPage.tsx";


const OrderApp = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<UserPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/orders" element={<Orders />} />
                    <Route path="/admin/dishes" element={<Dishes />} />
                    <Route path="/admin/new_dish" element={<NewDishForm />} />
                    <Route path="/admin/:id/edit" element={<NewDishForm />} />
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