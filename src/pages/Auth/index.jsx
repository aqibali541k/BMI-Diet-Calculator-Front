import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
function Auth() {
  const { isAuth } = useAuthContext();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default Auth;
