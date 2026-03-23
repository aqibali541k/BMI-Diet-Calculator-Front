import React, { useEffect, useState } from "react";
import axios from "axios";
import { message, Spin } from "antd";
import { useAuthContext } from "../../../../contexts/Auth/AuthContext";
import { Trash } from "lucide-react";

const Table = () => {
    const { user, token } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);

    const fetchUsers = async () => {
        setLoading(true); // ✅ FIX
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data.users || []);
        } catch (err) {
            message.error("Error fetching users");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchUsers();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            setDeleteLoading(id);
            await axios.delete(`${import.meta.env.VITE_API_URL}/users/delete-user/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            message.success("User deleted successfully");

            // ✅ Optimistic UI (fast feel)
            setUsers((prev) => prev.filter((u) => u._id !== id));
        } catch (err) {
            message.error("Error deleting user");
            console.error(err);
        } finally {
            setDeleteLoading(null);
        }
    };
    const filteredUsers = users.filter((u) => u.role !== "admin");

    return (
        <div className="bg-linear-to-br from-amber-50 to-emerald-100 py-8  px-4">
            <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-amber-200">
                    <h2 className="text-3xl font-bold text-amber-800">All Users</h2>
                    <p className="text-sm text-amber-600 mt-1">
                        Admin Dashboard - Manage and view all registered users
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex justify-center items-center p-12 ">
                        <Spin size="large" tip="Loading Users..." />
                    </div>
                ) : users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-amber-50">
                            <thead className="bg-amber-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-amber-900 font-semibold uppercase">
                                        Profile
                                    </th>
                                    <th className="px-6 py-3 text-left text-amber-900 font-semibold uppercase">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-amber-900 font-semibold uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-amber-900 font-semibold uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-amber-900 font-semibold uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-amber-200">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-amber-100 transition"
                                    >
                                        {/* Profile */}
                                        <td className="px-6 py-4">
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt={user.name}
                                                    className="w-12 h-12 rounded-full object-cover border border-amber-300"
                                                    onError={(e) => (e.target.src = "/default-avatar.png")}
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </td>

                                        {/* Data */}
                                        <td className="px-6 py-4 font-medium text-amber-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 text-amber-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-amber-900">
                                            {user.role}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <button
                                                disabled={deleteLoading === user._id}
                                                onClick={() => handleDelete(user._id)}
                                                className="px-3 py-2 bg-red-500 text-white cursor-pointer! rounded hover:bg-red-600 flex items-center justify-center disabled:opacity-50"
                                            >
                                                {deleteLoading === user._id ? (
                                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                ) : (
                                                    <Trash size={16} />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center text-amber-700 font-semibold">
                        No users found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;