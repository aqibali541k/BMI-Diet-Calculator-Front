import React, { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

function ResetPassword() {


  // Single state object
  const [state, setState] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const { email } = state;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return message.error("Please enter your email");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, {
        email,
      });

      if (res.data.message) {
        message.success(res.data.message);
      } else {
        message.error("Failed to send reset link");
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
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-slate-600">Enter your email to reset your password</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-2 text-center">Reset Password</h2>
          <p className="text-slate-500 text-center mb-6">Enter your email to reset your password</p>

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


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white py-2 rounded-lg font-semibold transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Register link */}
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
export default ResetPassword;