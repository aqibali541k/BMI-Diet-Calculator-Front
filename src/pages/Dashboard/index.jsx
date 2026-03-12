import React from "react";

import UserDashboard from "./UserDashboard";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
// import AdminDashboard from "./AdminDashboard";

const DashboardPages = () => {
    const { user, isAuth } = useAuthContext();

    // if (isAuth && user.role === "admin") {
    //     return <AdminDashboard />;
    // }
    if (isAuth && user.role === "user") {
        return <UserDashboard />;
    }

};

export default DashboardPages;