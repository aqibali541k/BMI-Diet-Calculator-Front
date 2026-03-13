import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import Navbar from "./Header/Navbar";

const DashboardRouting = ({ Component }) => {

  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default DashboardRouting;