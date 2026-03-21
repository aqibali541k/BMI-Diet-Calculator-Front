import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import ResetPassword from "./ResetPassword";
function Auth() {
  const { isAuth } = useAuthContext();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
}

export default Auth;
