import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuth: false,
    user: null,
    role: "",
  });
  const [loading, setLoading] = useState(true);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setState({ isAuth: false, user: null, role: "" });
  };

  // Fetch user profile from backend
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setState({
        isAuth: true,
        user: res.data.user,
        role: res.data.user.role,
      });
    } catch (error) {
      console.log("User not authenticated");
      setState({ isAuth: false, user: null, role: "" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch BMI history
  const getBMIHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bmi/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data || [];
    } catch (error) {
      console.log("Failed to fetch BMI history:", error);
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) fetchUser();
    else setLoading(false);
  }, []);

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
        handleLogout,
        fetchUser,
        getBMIHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;