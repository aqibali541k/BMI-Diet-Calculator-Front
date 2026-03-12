import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { message, Button } from "antd";
import { Calculator, LogOut, User, Edit } from "lucide-react";

import { useAuthContext } from "../../../contexts/Auth/AuthContext";

import BmiCard from "./BmiCard";
import Graph from "./Graph";
import BmiHistoryTable from "./BmiHistoryTable";
import ProfileModal from "./ProfileModel";

function UserDashboard() {

    const { user, handleLogout, getBMIHistory, isAuth, fetchUser, updateProfile } = useAuthContext();

    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    /* ---------------- AUTH CHECK ---------------- */

    useEffect(() => {
        if (!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    /* ---------------- FETCH HISTORY ---------------- */

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getBMIHistory();
                setHistory([...data].reverse());
            } catch (err) {
                console.error(err);
            }
        };

        fetchHistory();
    }, [getBMIHistory]);

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

    if (!user) return null;

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

    /* ---------------- BMI CALCULATIONS ---------------- */

    const latestBMI = history?.[0];
    const previousBMI = history?.[1];

    const bmiTrend =
        latestBMI && previousBMI
            ? latestBMI.bmi - previousBMI.bmi
            : 0;

    const averageBMI =
        history.length > 0
            ? (
                history.reduce((sum, r) => sum + r.bmi, 0) /
                history.length
            ).toFixed(1)
            : 0;

    const getBMICategory = (bmi) => {

        if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-500" };
        if (bmi < 25) return { text: "Normal", color: "bg-emerald-500" };
        if (bmi < 30) return { text: "Overweight", color: "bg-orange-500" };

        return { text: "Obese", color: "bg-red-500" };
    };

    /* ---------------- CHART DATA ---------------- */

    const chartData =
        history?.slice(-10).map((record) => ({
            date: new Date(record.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            }),
            bmi: record.bmi,
        })) || [];

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-6 sm:py-8">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

                        <Link to="/bmi" className="w-full sm:w-auto">

                            <Button className="flex! items-center! justify-center! gap-2! bg-green-600! hover:bg-green-700! text-white! w-full!">
                                <Calculator size={16} />
                                New BMI
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

                {/* ---------------- BMI STATS ---------------- */}

                <div className="mb-10">
                    <BmiCard
                        history={history}
                        latestBMI={latestBMI}
                        previousBMI={previousBMI}
                        bmiTrend={bmiTrend}
                        averageBMI={averageBMI}
                        getBMICategory={getBMICategory}
                    />
                </div>
                {/* ---------------- GRAPH ---------------- */}

                <div className="mb-4">

                    {chartData.length > 0 ? (

                        <Graph chartData={chartData} />

                    ) : (

                        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">

                            <h3 className="text-xl font-semibold mb-2">
                                No BMI Records Yet
                            </h3>

                            <p className="text-gray-500 mb-6">
                                Start tracking your health by calculating your first BMI
                            </p>

                            <Link to="/bmi">
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition">
                                    Calculate BMI Now
                                </button>
                            </Link>

                        </div>

                    )}

                </div>
                {/* ---------------- TABLE ---------------- */}

                <div className="mb-10">
                    <BmiHistoryTable history={history} />
                </div>

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

export default UserDashboard;