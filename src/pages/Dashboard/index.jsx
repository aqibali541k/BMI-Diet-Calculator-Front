import React from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const DashboardPages = () => {

    const { user, isAuth } = useAuthContext();

    if (!isAuth) return null;

    if (user.role === "admin") {
        return <AdminDashboard />;
    }

    return <UserDashboard />;
};

export default DashboardPages;