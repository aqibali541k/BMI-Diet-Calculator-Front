import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/Auth/AuthContext";

const AuthRoutes = ({ Component }) => {

  const { isAuth } = useAuthContext();

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default AuthRoutes;