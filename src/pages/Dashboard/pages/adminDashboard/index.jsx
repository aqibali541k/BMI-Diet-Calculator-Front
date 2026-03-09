import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/Auth/AuthContext";
import axios from "axios";
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area
} from "recharts";
import { User, LogOut, Calculator, Trash2, PlusCircle } from "lucide-react";

/* ---------- SIMPLE UI COMPONENTS ---------- */

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border shadow p-4 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children }) => (
    <h3 className="text-xl font-semibold">{children}</h3>
);

const Button = ({ children, className = "", variant, ...props }) => (
    <button
        className={`px-4 py-2 rounded-lg font-medium transition
      ${variant === "outline"
                ? "border border-gray-300 hover:bg-gray-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            } ${className}`}
        {...props}
    >
        {children}
    </button>
);

const Badge = ({ children, className }) => (
    <span className={`text-white text-xs px-3 py-1 rounded-full ${className}`}>
        {children}
    </span>
);

/* ---------- ADMIN DASHBOARD ---------- */

export default function AdminDashboard() {
    const { user, handleLogout, getBMIHistory, isAuth } = useAuthContext();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [history, setHistory] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    /* Redirect if not authenticated */
    useEffect(() => {
        if (!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    /* Fetch BMI history */
    useEffect(() => {
        async function fetchHistory() {
            const data = await getBMIHistory();
            setHistory(data.reverse());
        }
        fetchHistory();
    }, [getBMIHistory]);

    /* Fetch Users */
    useEffect(() => {
        async function fetchUsers() {
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingUsers(false);
            }
        }
        fetchUsers();
    }, []);

    /* Fetch Blogs */
    useEffect(() => {
        async function fetchBlogs() {
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingBlogs(false);
            }
        }
        fetchBlogs();
    }, []);

    if (!user) return null;

    /* Logout */
    const handleUserLogout = () => {
        handleLogout();
        navigate("/");
    };

    /* Delete Blog */
    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBlogs((prev) => prev.filter((b) => b._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    /* BMI Stats */
    const chartData = history.slice(-10).map((record) => ({
        date: new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        bmi: record.bmi,
    }));

    const latestBMI = history[0];
    const previousBMI = history[1];
    const bmiTrend = latestBMI && previousBMI ? latestBMI.bmi - previousBMI.bmi : 0;

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-500" };
        if (bmi < 25) return { text: "Normal", color: "bg-emerald-500" };
        if (bmi < 30) return { text: "Overweight", color: "bg-orange-500" };
        return { text: "Obese", color: "bg-red-500" };
    };

    const averageBMI =
        history.length > 0
            ? (history.reduce((sum, record) => sum + record.bmi, 0) / history.length).toFixed(1)
            : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-8 px-4">
            <div className="container mx-auto">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <div className="size-16 rounded-full bg-linear-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                            <User className="size-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
                            <p className="text-slate-500">Manage users, blogs, and BMI stats</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/calculator">
                            <Button>
                                <Calculator className="size-4 mr-2 inline" /> New BMI Entry
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleUserLogout}>
                            <LogOut className="size-4 mr-2 inline" /> Logout
                        </Button>
                    </div>
                </div>

                {/* STATS CARDS */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    <Card>
                        <CardTitle>Total Users</CardTitle>
                        <div className="text-3xl font-bold">{users.length}</div>
                    </Card>
                    <Card>
                        <CardTitle>Total BMI Entries</CardTitle>
                        <div className="text-3xl font-bold">{history.length}</div>
                    </Card>
                    <Card>
                        <CardTitle>Average BMI</CardTitle>
                        <div className="text-3xl font-bold">{averageBMI}</div>
                    </Card>
                    <Card>
                        <CardTitle>Total Blogs</CardTitle>
                        <div className="text-3xl font-bold">{blogs.length}</div>
                    </Card>
                </div>

                {/* USERS TABLE */}
                <div className="mb-10">
                    <Card>
                        <CardTitle>Users</CardTitle>
                        {loadingUsers ? (
                            <p className="text-center py-4">Loading users...</p>
                        ) : (
                            <div className="overflow-x-auto mt-4">
                                <table className="w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-2 border">Name</th>
                                            <th className="p-2 border">Email</th>
                                            <th className="p-2 border">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((u) => (
                                            <tr key={u._id}>
                                                <td className="p-2 border">{u.name}</td>
                                                <td className="p-2 border">{u.email}</td>
                                                <td className="p-2 border">{u.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>
                </div>

                {/* BLOGS MANAGEMENT */}
                <div className="mb-10">
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <CardTitle>Blogs</CardTitle>
                            <Link to="/admin/create-blog">
                                <Button>
                                    <PlusCircle className="inline mr-2 size-4" /> Add Blog
                                </Button>
                            </Link>
                        </div>
                        {loadingBlogs ? (
                            <p className="text-center py-4">Loading blogs...</p>
                        ) : blogs.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {blogs.map((blog) => (
                                    <div key={blog._id} className="bg-white p-4 rounded-xl shadow relative">
                                        <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                                        <p className="text-sm text-slate-600 mb-2">{blog.author}</p>
                                        <p className="text-sm text-slate-500 line-clamp-3">{blog.content}</p>
                                        <Button
                                            variant="outline"
                                            className="absolute top-4 right-4 text-red-500"
                                            onClick={() => deleteBlog(blog._id)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-4">No blogs yet</p>
                        )}
                    </Card>
                </div>

                {/* BMI CHART */}
                {chartData.length > 0 && (
                    <Card>
                        <CardTitle>BMI Progress Chart</CardTitle>
                        <div className="h-[300px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis domain={[15, 35]} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="bmi" stroke="#10b981" fill="#10b98133" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}