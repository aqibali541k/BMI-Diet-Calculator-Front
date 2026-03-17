import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message, Button, } from "antd";
import Users from "./pages/Users";
import { Calculator, LogOut, User, Edit, ShieldCheck } from "lucide-react";

import { useAuthContext } from "../../../contexts/Auth/AuthContext";

import ProfileModal from "./ProfileModel";
import { LuLayoutDashboard } from "react-icons/lu";
import AllUsers from "./AllUsers";
import BlogsDiet from "./BlogsDiet";

function AdminDashboard() {

    const { user, handleLogout, isAuth, fetchUser, updateProfile } = useAuthContext();

    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    /* ---------------- AUTH CHECK ---------------- */

    useEffect(() => {
        if (!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    /* ---------------- FETCH USER PROFILE ---------------- */

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await fetchUser();
                setPreview(data?.image || null);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);
    /* ---------------- LOGOUT ---------------- */

    const handleUserLogout = () => {
        handleLogout();
        navigate("/");
    };

    /* ---------------- PROFILE UPDATE ---------------- */

    const handleProfileUpdate = async (formData) => {

        setLoading(true);

        try {
            await updateProfile(formData);

            message.success("Profile updated successfully");

            const updatedUser = await fetchUser();
            setPreview(updatedUser?.image);

            setIsEditing(false);

        } catch (error) {

            console.error(error);
            message.error("Profile update failed");

        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50 py-8">
            <div className="container mx-auto px-4">
                {/* ---------------- HEADER ---------------- */}

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

                    {/* PROFILE */}

                    <div className="flex items-center gap-4">

                        <div
                            onClick={() => setIsEditing(true)}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-emerald-600 to-blue-600 flex items-center justify-center overflow-hidden cursor-pointer"
                        >

                            {preview || user?.image ? (

                                <img
                                    src={preview || user.image}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />

                            ) : (

                                <User className="text-white w-8 h-8" />

                            )}

                        </div>

                        <div>

                            <h1 className="text-xl sm:text-2xl font-bold">
                                Welcome back, {user.name}
                            </h1>

                            <Button
                                onClick={() => setIsEditing(true)}
                                className="mt-2! flex! items-center! gap-2! bg-blue-600! text-white! hover:bg-blue-700!"
                            >
                                <Edit size={16} />
                                Edit Profile
                            </Button>

                        </div>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

                        <Link to="/dashboard/user" className="w-full sm:w-auto">

                            <Button className="flex! items-center! justify-center! gap-2! border-none! bg-yellow-400! hover:bg-yellow-700! text-white! w-full!">
                                <LuLayoutDashboard size={16} />
                                My Dashboard
                            </Button>

                        </Link>

                        <Button
                            onClick={handleUserLogout}
                            className="flex! items-center! justify-center! gap-2! bg-red-600! hover:bg-red-700! text-white! w-full! sm:w-auto!"
                        >
                            <LogOut size={16} />
                            Logout
                        </Button>

                    </div>

                </div>
                <div className="mb-8 bg-purple-50 w-full py-2 ">
                    <p className="text-purple-600 text-md flex border-purple-200 border rounded-lg p-2 items-center gap-2">
                        <ShieldCheck size={20} className="text-black!" /> You are logged in as an administrator. You have full access to manage all system data.

                    </p>
                </div>

                {/* ---------------- Admin STATS ---------------- */}

                <AllUsers />


                {/* ---------------- Blogs & Diet Plans ---------------- */}

                <BlogsDiet />

                {/* ---------------- TABLE ---------------- */}

                <Users />

                {/* ---------------- PROFILE MODAL ---------------- */}

                <ProfileModal
                    user={user}
                    isOpen={isEditing}
                    onClose={() => setIsEditing(false)}
                    onUpdate={handleProfileUpdate}
                    loading={loading}
                />

            </div>

        </div>
    );
}

export default AdminDashboard;