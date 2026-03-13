import { Button, Card } from "antd";
import { BookOpen, Plus, UtensilsCrossed } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
import axios from "axios";

const BlogsDiet = () => {
    const [dietPlans, setDietPlans] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch blogs
                const blogsRes = await axios.get(
                    "http://localhost:8000/blogs/all-blogs",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBlogs(blogsRes.data.blogs || []);

                // Fetch diet plans
                const dietRes = await axios.get(
                    "http://localhost:8000/diet-plans/all",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDietPlans(dietRes.data.dietPlans || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Blog Card */}
            <Card className="shadow-lg! rounded-2xl! ">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen className="opacity-80" />
                            <p className="text-lg font-semibold">Blog Management</p>
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
                            <h2 className="text-4xl font-bold">{blogs.length}</h2>
                        ) : (
                            <p className="text-gray-500 text-sm py-8">
                                No blogs yet. Create your first blog post!
                            </p>
                        )}
                    </div>
                </div>
            </Card>
            <Card className="shadow-lg rounded-2xl">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <UtensilsCrossed className="opacity-80" />
                            <p className="text-lg font-semibold">Diet Plan Management</p>
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
                            <h2 className="text-4xl font-bold">{dietPlans.length}</h2>
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