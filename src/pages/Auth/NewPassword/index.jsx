import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

function NewPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const { password, confirmPassword } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return message.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return message.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/reset-password/${token}`,
        { password }
      );

      message.success(res.data.message || "Password updated");

      // redirect to login
      navigate("/auth/login");

    } catch (err) {
      console.error(err);
      message.error(
        err.response?.data?.message || "Error resetting password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Set New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-200 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;