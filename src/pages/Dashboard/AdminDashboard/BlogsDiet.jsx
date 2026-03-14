import { Button, Card, message } from "antd";
import { BookOpen, Plus, Edit, Trash2, UtensilsCrossed } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

const BlogsDiet = () => {
    const [dietPlans, setDietPlans] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [editLoading, setEditLoading] = useState(null);

    const { token } = useAuthContext();
    const navigate = useNavigate();

    // fetch blogs function
    const fetchBlogs = async () => {
        try {
            const blogsRes = await axios.get(
                "http://localhost:8000/blogs/all-blogs",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Fetched blogs:", blogsRes.data);
            setBlogs(blogsRes.data || []);
        } catch (error) {
            message.error("Error fetching blogs");
            console.error(error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchBlogs();
        }
    }, [token]);

    // delete blog
    const handleDelete = async (id) => {
        try {
            setDeleteLoading(id);

            await axios.delete(
                `http://localhost:8000/blogs/delete-blog/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success("Blog deleted successfully");

            // refetch blogs
            fetchBlogs();
        } catch (error) {
            message.error("Error deleting blog");
            console.error(error);
        } finally {
            setDeleteLoading(null);
        }
    };

    // edit blog
    const handleEdit = (id) => {
        setEditLoading(id);
        navigate(`/admin/blogs-new/${id}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Blog Card */}
            <Card className="shadow-lg rounded-2xl">
                <div className="flex flex-col gap-4">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen className="opacity-80" />
                            <p className="text-lg font-semibold">
                                Blog Management
                            </p>
                        </div>

                        <Link to="/admin/blogs-new">
                            <Button className="flex! items-center! gap-1! bg-purple-600! text-white!">
                                <Plus size={16} />
                                Add Blog
                            </Button>
                        </Link>
                    </div>

                    <div>
                        {blogs?.length > 0 ? (
                            <ul className="space-y-2 max-h-60 overflow-y-auto">

                                {blogs.map((blog) => (
                                    <li
                                        key={blog._id}
                                        className="flex justify-between items-center p-2 border border-gray-200 rounded hover:bg-gray-50"
                                    >
                                        <div>
                                            <h3 className="font-semibold">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                {new Date(blog.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="flex gap-2">

                                            {/* Edit Button */}
                                            <Button
                                                size="small"
                                                type="default"
                                                icon={<Edit size={14} />}
                                                loading={editLoading === blog._id}
                                                onClick={() => handleEdit(blog._id)}
                                                className="bg-blue-600! text-white!"
                                            />

                                            {/* Delete Button */}
                                            <Button
                                                size="small"
                                                danger
                                                icon={<Trash2 size={14} />}
                                                loading={deleteLoading === blog._id}
                                                onClick={() => handleDelete(blog._id)}
                                                className="bg-red-600! text-white!"
                                            />
                                        </div>
                                    </li>
                                ))}

                            </ul>
                        ) : (
                            <p className="text-gray-500 text-sm py-8">
                                No blogs yet. Create your first blog post!
                            </p>
                        )}
                    </div>

                </div>
            </Card>

            {/* Diet Plan Card */}
            <Card className="shadow-lg rounded-2xl">
                <div className="flex flex-col gap-4">

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <UtensilsCrossed className="opacity-80" />
                            <p className="text-lg font-semibold">
                                Diet Plan Management
                            </p>
                        </div>

                        <Link to="/admin/diet-new">
                            <Button className="flex! items-center! gap-1! bg-emerald-600! text-white!">
                                <Plus size={16} />
                                Add Diet
                            </Button>
                        </Link>
                    </div>

                    <div>
                        {dietPlans?.length > 0 ? (
                            <h2 className="text-4xl font-bold">
                                {dietPlans.length}
                            </h2>
                        ) : (
                            <p className="text-gray-500 text-sm py-8">
                                No Diet Plans yet. Create your first Diet Plan!
                            </p>
                        )}
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default BlogsDiet;