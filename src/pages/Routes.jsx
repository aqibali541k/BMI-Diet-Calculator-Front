import React from "react";
import { Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import DashboardRouting from "../components/DashboardRouting";
import Auth from "./Auth";
import DashboardPages from "./Dashboard";
function Index() {
  return (
    <Routes>
      <Route path="/*" element={<Frontend />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route
        path="/dashboard"
        element={<DashboardRouting Component={DashboardPages} />}
      />
    </Routes>
  );
};

export default Index;
