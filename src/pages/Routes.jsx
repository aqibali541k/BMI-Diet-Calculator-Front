import React from "react";
import { Route, Routes } from "react-router-dom";

import Frontend from "./Frontend";
import Auth from "./Auth";

import UserDashboard from "./Dashboard/UserDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";

import DashboardRouting from "../components/DashboardRouting";
import Admin from "./Dashboard/AdminDashboard/pages";

function Index() {
  return (
    <Routes>

      {/* Frontend */}
      <Route path="/*" element={<Frontend />} />

      {/* Auth */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Admin */}
      <Route path="/admin/*" element={<Admin />} />

      {/* User Dashboard */}
      <Route
        path="/dashboard/user"
        element={<DashboardRouting Component={UserDashboard} />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={<DashboardRouting Component={AdminDashboard} />}
      />

    </Routes>
  );
}

export default Index;