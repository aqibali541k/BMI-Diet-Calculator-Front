import React from "react";
import { useAuthContext } from "../contexts/Auth/AuthContext";
import { Navigate } from "react-router-dom";

const AuthRoutes = ({ Component }) => {
  const { isAuth } = useAuthContext();
  // return <Component />;
  // return <Navigate to="/dashboard" />;
  if (isAuth) {
    return <Component />;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default AuthRoutes;
