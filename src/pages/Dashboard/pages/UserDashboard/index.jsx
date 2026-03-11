// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuthContext } from "../../../../contexts/Auth/AuthContext";

// import {
//     AreaChart,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     Area,
// } from "recharts";

// import {
//     TrendingDown,
//     TrendingUp,
//     Calendar,
//     Scale,
//     Activity,
//     Calculator,
//     User,
//     LogOut,
//     UploadCloud,
//     Edit,
// } from "lucide-react";
// import { message } from "antd";

// /* ---------- SIMPLE UI COMPONENTS ---------- */
// const Card = ({ children, className = "" }) => (
//     <div className={`bg-white rounded-xl border ${className}`}>{children}</div>
// );

// const CardHeader = ({ children }) => (
//     <div className="p-6 border-b font-semibold text-lg">{children}</div>
// );

// const CardContent = ({ children, className = "" }) => (
//     <div className={`p-6 ${className}`}>{children}</div>
// );

// const CardTitle = ({ children }) => (
//     <h3 className="text-xl font-semibold">{children}</h3>
// );

// const Button = ({ children, className = "", variant, ...props }) => (
//     <button
//         className={`px-4 py-2 rounded-lg font-medium transition 
//       ${variant === "outline"
//                 ? "border border-gray-300 hover:bg-gray-100"
//                 : "bg-emerald-600 text-white hover:bg-emerald-700"} ${className}`}
//         {...props}
//     >
//         {children}
//     </button>
// );

// const Badge = ({ children, className }) => (
//     <span className={`text-white text-xs px-3 py-1 rounded-full ${className}`}>
//         {children}
//     </span>
// );

// /* ---------- DASHBOARD ---------- */
// function UserDashboard() {
//     const { user, handleLogout, getBMIHistory, isAuth, fetchUser, updateProfile } =
//         useAuthContext();
//     const navigate = useNavigate();
//     const [history, setHistory] = useState([]);

//     /* -------- PROFILE UPDATE STATES -------- */
//     const [isEditing, setIsEditing] = useState(false);
//     const [newName, setNewName] = useState(user?.name || "");
//     const [newImage, setNewImage] = useState(null);
//     const [preview, setPreview] = useState(user?.image || null);
//     const [loading, setLoading] = useState(false);

//     // Redirect if not authenticated
//     useEffect(() => {
//         if (!isAuth) navigate("/login");
//     }, [isAuth, navigate]);

//     // Fetch BMI history
//     useEffect(() => {
//         async function fetchHistory() {
//             const data = await getBMIHistory();
//             setHistory(data.reverse()); // latest first
//         }
//         fetchHistory();
//     }, [getBMIHistory]);

//     // Fetch latest user profile info
//     const fetchProfileData = async () => {
//         const data = await fetchUser();
//         setHistory(data.bmiHistory || []);
//         setNewName(data.name);
//         setPreview(data.image);
//     };

//     useEffect(() => {
//         fetchProfileData();
//     }, []);

//     if (!user) return null;

//     const handleUserLogout = () => {
//         handleLogout();
//         navigate("/");
//     };

//     /* -------- PROFILE IMAGE HANDLER -------- */
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setNewImage(file);
//             setPreview(URL.createObjectURL(file));
//         }
//     };

//     /* -------- PROFILE UPDATE SUBMIT -------- */
//     const handleProfileUpdate = async () => {
//         if (!newName && !newImage) return;
//         setLoading(true);

//         try {
//             const formData = new FormData();
//             formData.append("name", newName);
//             if (newImage) formData.append("image", newImage);

//             // AuthContext function
//             await updateProfile(formData);

//             message.success("Profile updated successfully!");
//             fetchUser(); // Refresh context
//             setIsEditing(false);
//         } catch (err) {
//             console.error(err);
//             message.error("Failed to update profile");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const chartData = history
//         .slice(-10)
//         .map((record) => ({
//             date: new Date(record.date).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//             }),
//             bmi: record.bmi,
//         }));

//     const latestBMI = history[0];
//     const previousBMI = history[1];
//     const bmiTrend =
//         latestBMI && previousBMI ? latestBMI.bmi - previousBMI.bmi : 0;

//     const getBMICategory = (bmi) => {
//         if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-500" };
//         if (bmi < 25) return { text: "Normal", color: "bg-emerald-500" };
//         if (bmi < 30) return { text: "Overweight", color: "bg-orange-500" };
//         return { text: "Obese", color: "bg-red-500" };
//     };

//     const averageBMI =
//         history.length > 0
//             ? (history.reduce((sum, record) => sum + record.bmi, 0) / history.length).toFixed(1)
//             : 0;

//     return (
//         <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-8">
//             <div className="container mx-auto px-4">
//                 {/* HEADER */}
//                 <div className="flex justify-between items-center mb-10">
//                     <div className="flex items-center gap-4">
//                         {/* Profile Picture */}
//                         <div
//                             className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-600 to-blue-600 flex items-center justify-center overflow-hidden cursor-pointer"
//                             onClick={() => setIsEditing(true)}
//                         >
//                             {preview ? (
//                                 <img
//                                     src={preview}
//                                     alt={user.name}
//                                     className="w-full h-full  object-cover"
//                                 />
//                             ) : (
//                                 <User className="size-8 text-white" />
//                             )}
//                         </div>

//                         {/* Welcome Text */}
//                         <div>
//                             <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
//                             <p className="text-slate-500">
//                                 Track your health journey and progress
//                             </p>

//                             {/* ✅ Edit Profile Button */}
//                             <Button
//                                 className="mt-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
//                                 onClick={() => setIsEditing(true)}
//                             >
//                                 <User className="size-4" />
//                                 Edit Profile
//                             </Button>
//                         </div>
//                     </div>

//                     {/* Right Buttons */}
//                     <div className="flex gap-3">
//                         <Link to="/bmi">
//                             <Button>
//                                 <Calculator className="size-4 mr-2 inline" />
//                                 New BMI Entry
//                             </Button>
//                         </Link>
//                         <Button variant="outline" onClick={handleUserLogout}>
//                             <LogOut className="size-4 mr-2 inline" />
//                             Logout
//                         </Button>
//                     </div>
//                 </div>

//                 {/* STATS */}
//                 <div className="grid md:grid-cols-4 gap-6 mb-10">
//                     <Card>
//                         <CardContent>
//                             <div className="flex justify-between mb-2">
//                                 <span className="text-sm text-slate-500">Current BMI</span>
//                                 <Activity className="size-5 text-emerald-600" />
//                             </div>
//                             {latestBMI ? (
//                                 <>
//                                     <div className="text-3xl font-bold mb-1">{latestBMI.bmi}</div>
//                                     <Badge className={getBMICategory(latestBMI.bmi).color}>
//                                         {getBMICategory(latestBMI.bmi).text}
//                                     </Badge>
//                                 </>
//                             ) : (
//                                 <div className="text-slate-400">No data yet</div>
//                             )}
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent>
//                             <div className="flex justify-between mb-2">
//                                 <span className="text-sm text-slate-500">BMI Trend</span>
//                                 {bmiTrend < 0 ? (
//                                     <TrendingDown className="size-5 text-emerald-600" />
//                                 ) : (
//                                     <TrendingUp className="size-5 text-orange-500" />
//                                 )}
//                             </div>
//                             <div className="text-3xl font-bold">
//                                 {bmiTrend !== 0
//                                     ? (bmiTrend > 0 ? "+" : "") + bmiTrend.toFixed(1)
//                                     : "--"}
//                             </div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent>
//                             <div className="flex justify-between mb-2">
//                                 <span className="text-sm text-slate-500">Average BMI</span>
//                                 <Scale className="size-5 text-blue-500" />
//                             </div>
//                             <div className="text-3xl font-bold">{averageBMI}</div>
//                         </CardContent>
//                     </Card>

//                     <Card>
//                         <CardContent>
//                             <div className="flex justify-between mb-2">
//                                 <span className="text-sm text-slate-500">Total Entries</span>
//                                 <Calendar className="size-5 text-purple-500" />
//                             </div>
//                             <div className="text-3xl font-bold">{history.length}</div>
//                         </CardContent>
//                     </Card>
//                 </div>

//                 {/* CHART */}
//                 {chartData.length > 0 ? (
//                     <Card className="mb-8">
//                         <CardHeader>
//                             <CardTitle>BMI Progress Chart</CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             <div className="h-[300px]">
//                                 <ResponsiveContainer width="100%" height="100%">
//                                     <AreaChart data={chartData}>
//                                         <CartesianGrid strokeDasharray="3 3" />
//                                         <XAxis dataKey="date" />
//                                         <YAxis domain={[15, 35]} />
//                                         <Tooltip />
//                                         <Area
//                                             type="monotone"
//                                             dataKey="bmi"
//                                             stroke="#10b981"
//                                             fill="#10b98133"
//                                             strokeWidth={3}
//                                         />
//                                     </AreaChart>
//                                 </ResponsiveContainer>
//                             </div>
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <Card className="mb-8">
//                         <CardContent className="text-center py-16">
//                             <Calculator className="size-16 text-gray-300 mx-auto mb-4" />
//                             <h3 className="text-xl font-semibold mb-2">No BMI Records Yet</h3>
//                             <p className="text-slate-500 mb-6">
//                                 Start tracking your health by calculating your first BMI
//                             </p>
//                             <Link to="/calculator">
//                                 <Button>Calculate BMI Now</Button>
//                             </Link>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* FULL BMI HISTORY TABLE */}
//                 {history.length > 0 && (
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Full BMI History</CardTitle>
//                         </CardHeader>
//                         <CardContent className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-100">
//                                         <th className="px-4 py-2 border">Date</th>
//                                         <th className="px-4 py-2 border">Height (cm)</th>
//                                         <th className="px-4 py-2 border">Weight (kg)</th>
//                                         <th className="px-4 py-2 border">BMI</th>
//                                         <th className="px-4 py-2 border">Category</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {history.map((record, index) => (
//                                         <tr key={index} className="hover:bg-gray-50">
//                                             <td className="px-4 py-2 border">
//                                                 {new Date(record.date).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-4 py-2 border">{record.height}</td>
//                                             <td className="px-4 py-2 border">{record.weight}</td>
//                                             <td className="px-4 py-2 border">{record.bmi}</td>
//                                             <td className="px-4 py-2 border">
//                                                 <span
//                                                     className={`px-2 py-1 rounded-full text-white text-xs ${record.bmi < 18.5
//                                                         ? "bg-blue-500"
//                                                         : record.bmi < 25
//                                                             ? "bg-emerald-500"
//                                                             : record.bmi < 30
//                                                                 ? "bg-orange-500"
//                                                                 : "bg-red-500"
//                                                         }`}
//                                                 >
//                                                     {record.category}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </CardContent>
//                     </Card>
//                 )}

//                 {/* ---------- PROFILE UPDATE MODAL ---------- */}
//                 {isEditing && (
//                     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-xl w-96 relative">
//                             <h2 className="text-xl font-bold mb-4">Update Profile</h2>

//                             {/* Profile Image with Edit Icon */}
//                             <div className="flex flex-col items-center mb-4 relative">
//                                 <div
//                                     className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer relative"
//                                     onClick={() => document.getElementById("profileFile").click()}
//                                 >
//                                     {preview ? (
//                                         <img
//                                             src={preview}
//                                             alt="Preview"
//                                             className="w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         <span className="text-gray-500 flex items-center justify-center h-full w-full">
//                                             Upload
//                                         </span>
//                                     )}
//                                     {/* ✅ Edit Icon Overlay */}
//                                     <div className="absolute bottom-9 right-9 bg-white rounded-full p-1 border shadow-md">
//                                         <Edit className="size-4 text-blue-600" />
//                                     </div>
//                                 </div>
//                                 <input
//                                     type="file"
//                                     id="profileFile"
//                                     accept="image/*"
//                                     className="hidden"
//                                     onChange={handleImageChange}
//                                 />
//                             </div>

//                             <input
//                                 type="text"
//                                 className="w-full px-4 py-2 border rounded mb-4"
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                             />

//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                                     onClick={() => setIsEditing(false)}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
//                                     onClick={handleProfileUpdate}
//                                     disabled={loading}
//                                 >
//                                     <UploadCloud className="size-4" />
//                                     {loading ? "Updating..." : "Update"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default UserDashboard;
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../../../contexts/Auth/AuthContext";

import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";

import {
    TrendingDown,
    TrendingUp,
    Calendar,
    Scale,
    Activity,
    Calculator,
    User,
    LogOut,
    UploadCloud,
    Edit,
} from "lucide-react";

import { message } from "antd";
import { FaEdit } from "react-icons/fa";

/* ---------- UI COMPONENTS ---------- */
const Card = ({ children, className = "" }) => (
    <div
        className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm 
    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
        {children}
    </div>
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

/* ---------- DASHBOARD ---------- */

function UserDashboard() {
    const { user, handleLogout, getBMIHistory, isAuth, fetchUser, updateProfile } =
        useAuthContext();

    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(user?.name || "");
    const [newImage, setNewImage] = useState(null);
    const [preview, setPreview] = useState(user?.image || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    useEffect(() => {
        async function fetchHistory() {
            const data = await getBMIHistory();
            setHistory(data.reverse());
        }
        fetchHistory();
    }, [getBMIHistory]);

    const fetchProfileData = async () => {
        const data = await fetchUser();
        setHistory(data.bmiHistory || []);
        setNewName(data.name);
        setPreview(data.image);
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    if (!user) return null;

    const handleUserLogout = () => {
        handleLogout();
        navigate("/");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = async () => {
        if (!newName && !newImage) return;

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", newName);
            if (newImage) formData.append("image", newImage);

            await updateProfile(formData);

            message.success("Profile updated successfully!");
            fetchUser();
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            message.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const chartData = history.slice(-10).map((record) => ({
        date: new Date(record.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
        bmi: record.bmi,
    }));

    const latestBMI = history[0];
    const previousBMI = history[1];

    const bmiTrend =
        latestBMI && previousBMI ? latestBMI.bmi - previousBMI.bmi : 0;

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-500" };
        if (bmi < 25) return { text: "Normal", color: "bg-emerald-500" };
        if (bmi < 30) return { text: "Overweight", color: "bg-orange-500" };
        return { text: "Obese", color: "bg-red-500" };
    };

    const averageBMI =
        history.length > 0
            ? (
                history.reduce((sum, record) => sum + record.bmi, 0) /
                history.length
            ).toFixed(1)
            : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">

                {/* HEADER (UNCHANGED) */}
                <div className="flex justify-between items-center my-10">

                    <div className="">
                        <div
                            onClick={() => setIsEditing(true)}
                            className="w-22 h-22 rounded-full bg-linear-to-br from-emerald-600 to-blue-600 flex items-center justify-center overflow-hidden cursor-pointer"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={user.name}
                                    className="w-full h-full mx-auto object-cover"
                                />
                            ) : (
                                <User className="size-8 text-white" />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold">
                            <span className=" md:text-2xl text-lg">
                                Welcome back, {" "}
                            </span>
                            <br className="md:hidden" />
                            {user.name}
                        </h1>
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="mt-2! text-md! flex! items-center! gap-2! bg-blue-600! hover:bg-blue-700!"
                        >
                            <Edit className="size-4" />
                            Edit Profile
                        </Button>
                    </div>
                    <div className="">
                        <div className="">
                            <Link to="/bmi">
                                <Button className="flex items-center gap-2 my-2">
                                    <Calculator className="size-4" />
                                    New BMI
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                onClick={handleUserLogout}
                                className="flex items-center gap-2"
                            >
                                <LogOut className="size-4" />
                                Logout
                            </Button>

                        </div>
                    </div>
                </div>

                {/* STATS */}

                <div className="grid md:grid-cols-4 gap-6 mb-10">

                    <Card>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Current BMI</p>

                                {latestBMI ? (
                                    <>
                                        <h2 className="text-3xl font-bold">{latestBMI.bmi}</h2>

                                        <Badge className={getBMICategory(latestBMI.bmi).color}>
                                            {getBMICategory(latestBMI.bmi).text}
                                        </Badge>
                                    </>
                                ) : (
                                    <p className="text-gray-400">No data</p>
                                )}
                            </div>

                            <Activity className="text-emerald-500 size-6" />
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">BMI Trend</p>

                                <h2 className="text-3xl font-bold">
                                    {bmiTrend !== 0
                                        ? (bmiTrend > 0 ? "+" : "") + bmiTrend.toFixed(1)
                                        : "--"}
                                </h2>

                                <p className="text-xs text-gray-400 mt-1">vs last entry</p>
                            </div>

                            {bmiTrend < 0 ? (
                                <TrendingDown className="text-emerald-500 size-6" />
                            ) : (
                                <TrendingUp className="text-orange-500 size-6" />
                            )}
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Average BMI</p>
                                <h2 className="text-3xl font-bold">{averageBMI}</h2>
                                <p className="text-xs text-gray-400 mt-1">All time</p>
                            </div>

                            <Scale className="text-blue-500 size-6" />
                        </div>
                    </Card>

                    <Card>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Total Entries</p>
                                <h2 className="text-3xl font-bold">{history.length}</h2>
                                <p className="text-xs text-gray-400 mt-1">Records saved</p>
                            </div>

                            <Calendar className="text-purple-500 size-6" />
                        </div>
                    </Card>

                </div>

                {/* CHART */}

                <Card className="mb-10">
                    <h3 className="text-lg font-semibold mb-4">BMI  ess Chart</h3>

                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[15, 300]} />
                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="bmi"
                                    stroke="#10b981"
                                    fill="#10b98133"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* TABLE */}
                {history.length > 0 && (
                    <Card>
                        <h3 className="text-lg font-semibold mb-6">BMI History</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">

                                {/* HEADER */}
                                <thead>
                                    <tr className="text-gray-500 text-sm border-b">
                                        <th className="py-3 px-4 font-medium">Date</th>
                                        <th className="py-3 px-4 font-medium">Height</th>
                                        <th className="py-3 px-4 font-medium">Weight</th>
                                        <th className="py-3 px-4 font-medium">BMI</th>
                                        <th className="py-3 px-4 font-medium">Category</th>
                                    </tr>
                                </thead>

                                {/* BODY */}
                                <tbody className="text-gray-700">

                                    {history.map((record, index) => (
                                        <tr
                                            key={index}
                                            className="border-b last:border-none hover:bg-gray-50 transition"
                                        >

                                            <td className="py-4 px-4 text-sm">
                                                {new Date(record.date).toLocaleDateString()}
                                            </td>

                                            <td className="py-4 px-4 text-sm">
                                                {record.height} cm
                                            </td>

                                            <td className="py-4 px-4 text-sm">
                                                {record.weight} kg
                                            </td>

                                            <td className="py-4 px-4 font-semibold">
                                                {record.bmi}
                                            </td>

                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-xs ${record.bmi < 18.5
                                                        ? "bg-blue-500"
                                                        : record.bmi < 25
                                                            ? "bg-emerald-500"
                                                            : record.bmi < 30
                                                                ? "bg-orange-500"
                                                                : "bg-red-500"
                                                        }`}
                                                >
                                                    {record.category}
                                                </span>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                        </div>
                    </Card>
                )}
                {isEditing && (

                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">

                        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative">

                            {/* TITLE */}

                            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
                                Update Profile
                            </h2>

                            {/* PROFILE IMAGE */}

                            <div className="flex justify-center mb-6">

                                <div className="relative w-28 h-28">

                                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">

                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <User className="size-10 text-gray-400" />
                                            </div>
                                        )}

                                    </div>

                                    {/* EDIT ICON */}

                                    <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition">

                                        <FaEdit className="text-xs sm:text-sm" />

                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                        />

                                    </label>

                                </div>

                            </div>

                            {/* NAME INPUT */}

                            <div className="mb-6">

                                <label className="text-sm text-gray-500 block mb-1">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />

                            </div>

                            {/* BUTTONS */}

                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">

                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="w-full sm:w-auto"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={handleProfileUpdate}
                                    disabled={loading}
                                    className="w-full sm:w-auto"
                                >
                                    {loading ? "Updating..." : "Save Changes"}
                                </Button>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </div>
    );
}

export default UserDashboard;