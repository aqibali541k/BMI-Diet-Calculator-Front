import React from "react";
import UserDashboard from "./UserDashboard";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
// import AdminDashboard from "./adminDashboard";

const Dashboard = () => {
    const { user, isAuth } = useAuthContext();

    if (isAuth) {
        // return <AdminDashboard />;
        return <UserDashboard />;
    }

};

export default Dashboard;