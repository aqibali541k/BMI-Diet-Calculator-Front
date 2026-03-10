import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuth: false,
    user: null,
    role: "",
    token: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Login
  const handleLogin = (user, token) => {
    localStorage.setItem("authToken", token);
    setState({
      isAuth: true,
      user,
      role: user.role,
      token,
    });
  };

  // ✅ Register (same as login)
  const handleRegister = (user, token) => {
    localStorage.setItem("authToken", token);
    setState({
      isAuth: true,
      user,
      role: user.role,
      token,
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setState({ isAuth: false, user: null, role: "", token: "" });
  };

  // Fetch user profile from backend
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const res = await axios.get(
        "http://localhost:8000/users/profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setState({
        isAuth: true,
        user: res.data.user,
        role: res.data.user.role,
        token,
      });
    } catch (error) {
      console.log("User not authenticated");
      setState({ isAuth: false, user: null, role: "", token: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) fetchUser();
    else setLoading(false);
  }, []);

  // Update profile
  const updateProfile = async (formData) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        "http://localhost:8000/users/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.log("Failed to update profile:", error);
      throw error;
    }
  };

  // Fetch BMI history
  const getBMIHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        "http://localhost:8000/bmi/history",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data || [];
    } catch (error) {
      console.log("Failed to fetch BMI history:", error);
      return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <div className="text-5xl flex flex-col items-center">
          <h1 className="mb-5">Loading...</h1>
          <Loading3QuartersOutlined className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchUser,
        getBMIHistory,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;