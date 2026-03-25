import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import ResetPassword from "./ResetPassword";
import NewPassword from "./NewPassword";
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
      <Route path="new-password/:token" element={<NewPassword />} />
    </Routes>
  );
}

export default Auth;
