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
    Area
} from "recharts";

import {
    TrendingDown,
    TrendingUp,
    Calendar,
    Scale,
    Activity,
    Calculator,
    User,
    LogOut
} from "lucide-react";

/* ---------- SIMPLE UI COMPONENTS ---------- */

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl border ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
    <div className="p-6 border-b font-semibold text-lg">{children}</div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>{children}</div>
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

/* ---------- DASHBOARD ---------- */

function UserDashboard() {
    const { user, handleLogout, getBMIHistory, isAuth } = useAuthContext();
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);

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

    if (!user) return null;

    const handleUserLogout = () => {
        handleLogout();
        navigate("/");
    };

    const chartData = history.slice(-10).map((record) => ({
        date: new Date(record.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        }),
        bmi: record.bmi
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
            ? (history.reduce((sum, record) => sum + record.bmi, 0) / history.length).toFixed(1)
            : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <div className="size-16 rounded-full bg-linear-to-br from-emerald-600 to-blue-600 flex items-center justify-center">
                            <User className="size-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">Welcome back, {user.name}!</h1>
                            <p className="text-slate-500">Track your health journey and progress</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/calculator">
                            <Button>
                                <Calculator className="size-4 mr-2 inline" />
                                New BMI Entry
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleUserLogout}>
                            <LogOut className="size-4 mr-2 inline" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    <Card>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-500">Current BMI</span>
                                <Activity className="size-5 text-emerald-600" />
                            </div>
                            {latestBMI ? (
                                <>
                                    <div className="text-3xl font-bold mb-1">{latestBMI.bmi}</div>
                                    <Badge className={getBMICategory(latestBMI.bmi).color}>
                                        {getBMICategory(latestBMI.bmi).text}
                                    </Badge>
                                </>
                            ) : (
                                <div className="text-slate-400">No data yet</div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-500">BMI Trend</span>
                                {bmiTrend < 0 ? (
                                    <TrendingDown className="size-5 text-emerald-600" />
                                ) : (
                                    <TrendingUp className="size-5 text-orange-500" />
                                )}
                            </div>
                            <div className="text-3xl font-bold">
                                {bmiTrend !== 0 ? (bmiTrend > 0 ? "+" : "") + bmiTrend.toFixed(1) : "--"}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-500">Average BMI</span>
                                <Scale className="size-5 text-blue-500" />
                            </div>
                            <div className="text-3xl font-bold">{averageBMI}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-slate-500">Total Entries</span>
                                <Calendar className="size-5 text-purple-500" />
                            </div>
                            <div className="text-3xl font-bold">{history.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* CHART */}
                {chartData.length > 0 ? (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>BMI Progress Chart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
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
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="mb-8">
                        <CardContent className="text-center py-16">
                            <Calculator className="size-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No BMI Records Yet</h3>
                            <p className="text-slate-500 mb-6">Start tracking your health by calculating your first BMI</p>
                            <Link to="/calculator">
                                <Button>Calculate BMI Now</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default UserDashboard;