import React, { useEffect, useState } from "react";
import axios from "axios";
import { message, Spin } from "antd";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    const { token } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:8000/blogs/all-blogs", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBlogs(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                message.error("Failed to fetch blogs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (token) fetchBlogs();
    }, [token]);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">Latest Blogs</h1>
                    <p className="text-slate-500">
                        Insights, tips and guides for better health & lifestyle
                    </p>
                </div>

                {/* LOADING */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Spin size="large" />
                    </div>
                ) : blogs.length > 0 ? (
                    <div className="flex flex-col gap-8">
                        {blogs.map((blog) => {
                            const isLong = blog.content.length > 180;
                            const isExpanded = expandedId === blog._id;

                            return (
                                <div
                                    key={blog._id}
                                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden w-full"
                                >
                                    {/* IMAGE TOP */}
                                    {blog.image && (
                                        <div className="w-full h-64 overflow-hidden">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* CONTENT */}
                                    <div className="p-8 flex flex-col gap-4 flex-1">
                                        <h2 className="text-2xl font-semibold text-slate-800 line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span>👤 {blog.author}</span>
                                            <span>📅 {new Date(blog.date).toLocaleDateString()}</span>
                                        </div>

                                        <div className="text-slate-600 max-h-40 overflow-y-auto p-2 border border-gray-100 rounded">
                                            {isExpanded || !isLong
                                                ? blog.content
                                                : blog.content.slice(0, 180) + "..."}
                                        </div>

                                        {isLong && (
                                            <button
                                                onClick={() =>
                                                    setExpandedId(isExpanded ? null : blog._id)
                                                }
                                                className="text-emerald-600 font-medium hover:underline mt-2 self-start"
                                            >
                                                {isExpanded ? "Collapse" : "Read More"}
                                            </button>
                                        )}

                                        <span className="inline-block mt-2 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            Health Tips
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-slate-700 mb-2">No Blogs Found</h2>
                        <p className="text-slate-500">Start adding blogs to see them here</p>
                    </div>
                )}
            </div>
        </div>
    );
}