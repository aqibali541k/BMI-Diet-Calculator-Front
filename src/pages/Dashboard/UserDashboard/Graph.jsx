import { Link } from "react-router-dom";
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";

function Graph({ chartData }) {

    /* ---------- EMPTY STATE ---------- */

    if (!chartData || chartData.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">

                <h3 className="text-xl font-semibold mb-2">
                    No BMI Records Yet
                </h3>

                <p className="text-gray-500 mb-6">
                    Start tracking your health by calculating your first BMI
                </p>

                <Link to="/bmi">
                    <button className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white px-6 py-2 rounded-lg transition">
                        Calculate BMI Now
                    </button>
                </Link>

            </div>
        );
    }

    /* ---------- CHART ---------- */

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">

            <h3 className="text-lg font-semibold mb-4">
                BMI Progress Chart
            </h3>

            <div className="h-[300px] sm:h-[320px]">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="date" />

                        <YAxis domain={[15, 40]} />

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

        </div>
    );
}

export default Graph;