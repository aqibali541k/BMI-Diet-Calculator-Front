import { ImageIcon } from "lucide-react";
import { message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profileImage: null,
  imagePreview: "",
};

function Signup() {
  const [state, setState] = useState(initialState);
  const { handleRegister } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { name, email, password, confirmPassword, profileImage, imagePreview } = state;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files) {
      const file = files[0];
      if (!file.type.startsWith("image/")) return message.error("Please upload an image file");
      if (file.size > 2 * 1024 * 1024) return message.error("Image must be < 2MB");
      setState((prev) => ({
        ...prev,
        profileImage: file,
        imagePreview: URL.createObjectURL(file),
      }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return message.error("All fields are required");
    if (password !== confirmPassword) return message.error("Passwords do not match");
    if (password.length < 6) return message.error("Password must be at least 6 chars");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) formData.append("image", profileImage);

      const res = await axios.post(
        "http://localhost:8000/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.token) {
        handleRegister(res.data.user, res.data.token);
        message.success("Registration successful");
        navigate("/dashboard");
      } else {
        message.error(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-emerald-600 text-4xl font-bold mb-4">FitLife</div>
          <h1 className="text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-slate-600">Start your health journey today</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-2 text-center text-emerald-600">Sign Up</h2>
          <p className="text-slate-500 text-center mb-6">Create a new account to track your BMI</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Profile Picture (Optional)</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-18 h-16 rounded-full object-cover border-2 border-emerald-600"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                      <span className="text-slate-400 text-2xl"><ImageIcon /></span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-1 py-2 cursor-pointer bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <p className="text-xs text-slate-500">Max size: 2MB</p>
            </div>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
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
            <div className="space-y-1 relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] cursor-pointer select-none"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-emerald-600 cursor-pointer font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;