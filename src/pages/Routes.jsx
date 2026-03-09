import React from "react";
import { Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import AuthRoutes from "../components/AuthRouting";
import DashboardRouting from "../components/DashboardRouting";
const Index = () => {
  return (
    <Routes>
      <Route path="/*" element={<Frontend />} />
      <Route path="/auth/*" element={<AuthRoutes Component={Auth} />} />
      <Route
        path="/dashboard/*"
        element={<DashboardRouting Component={Dashboard} />}
      />
    </Routes>
  );
};

export default Index;
