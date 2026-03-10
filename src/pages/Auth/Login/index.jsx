import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { handleLogin } = useAuthContext();


  // Single state object
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = state;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return message.error("Please fill in all fields");
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/users/login", {
        email,
        password,
      });

      if (res.data.token) {
        handleLogin(res.data.user, res.data.token);
        message.success("Login successful");
        navigate("/dashboard");
      } else {
        message.error(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Hero / Header */}
        <div className="text-center mb-8">
          <div className="text-emerald-600 text-4xl font-bold mb-2">FitLife</div>
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-600">Login to track your health journey and manage your profile</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
          <p className="text-slate-500 text-center mb-6">Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 cursor-pointer select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register link */}
            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-emerald-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;