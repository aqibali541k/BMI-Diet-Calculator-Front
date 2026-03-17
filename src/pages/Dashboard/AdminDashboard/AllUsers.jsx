import React, { useEffect, useState } from "react";
import { Users, UserCog, UtensilsCrossed, BookOpen } from "lucide-react";
import axios from "axios";
import { Card } from "antd";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

const AllUsers = () => {
    const { user, token } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                "http://localhost:8000/users/all",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUsers(res.data.users); // FIX

        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                "http://localhost:8000/blogs/all-blogs",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBlogs(res.data); // 

        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="grid md:grid-cols-4 gap-4 mb-10 lg:px-8 sm:px-4">

            {/* Total Users */}
            <Card className="bg-blue-600! rounded-2xl!">
                <div className="flex justify-between items-start ">
                    <div>
                        <p className="text-sm text-white mb-2">Total Users</p>
                        <h2 className="text-3xl font-bold text-white">{users.length}</h2>
                    </div>
                    <Users className="text-white size-7!" />
                </div>
            </Card>

            {/* total diet plans */}
            <Card className="bg-purple-600! rounded-2xl!">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-white mb-2">Diet plans</p>
                        <h2 className="text-3xl font-bold text-white">{"4"}</h2>
                    </div>
                    <UtensilsCrossed className="text-white size-7!" />
                </div>
            </Card>

            {/* total blog posts */}
            <Card className="shadow-lg! bg-linear-to-br! rounded-2xl! from-emerald-500! to-emerald-600! text-white!">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-white mb-2">Blog Posts</p>
                        <h2 className="text-4xl font-bold text-white">{blogs.length}</h2>
                    </div>
                    <BookOpen className="text-white size-7!" />
                </div>
            </Card>
            <Card className="shadow-lg! bg-linear-to-br! rounded-2xl! from-orange-500! to-orange-600! text-white!">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm text-white mb-2">Admin Users</p>
                        <h2 className="text-4xl font-bold text-white">{users.filter(user => user.role === "admin").length}</h2>
                    </div>
                    <UserCog className="text-white size-7!" />
                </div>
            </Card>

        </div>
    );
};

export default AllUsers;