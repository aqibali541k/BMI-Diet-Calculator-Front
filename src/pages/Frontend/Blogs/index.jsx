import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {

                const res = await axios.get(
                    "http://localhost:8000/blogs/all-blogs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = res.data;

                setBlogs(Array.isArray(data) ? data : []);

            } catch (err) {
                message.error("Failed to fetch blogs");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* HERO */}
                <div className="text-center mb-12">
                    <div className="text-emerald-600 text-6xl mb-4">📖</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Health & Fitness Blog</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Expert advice, tips, and insights to help you achieve your health goals
                    </p>
                </div>

                {/* BLOGS */}
                {loading ? (
                    <p className="text-center text-gray-600 text-lg">Loading blogs...</p>
                ) : blogs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition">
                                {blog.image && (
                                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                                        <span>👤 {blog.author}</span>
                                        <span>
                                            📅 {new Date(blog.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 line-clamp-3">{blog.content}</p>
                                    <span className="inline-block mt-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        Health Tips
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white max-w-2xl mx-auto rounded-xl shadow-lg p-12 text-center">
                        <div className="text-slate-300 text-6xl mb-4">📖</div>
                        <h3 className="text-2xl font-bold mb-2">No Blogs Yet</h3>
                        <p className="text-slate-600">Check back soon for expert health and fitness content!</p>
                    </div>
                )}
            </div>
        </div>
    );
}