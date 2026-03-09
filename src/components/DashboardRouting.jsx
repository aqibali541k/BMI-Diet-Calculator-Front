import React from "react";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardRouting = ({ Component }) => {
  const { isAuth } = useAuthContext();
  if (isAuth) return <Component />;
  return <Navigate to="/auth/login" />;
};

export default DashboardRouting;
