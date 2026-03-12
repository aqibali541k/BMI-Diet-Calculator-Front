import React from "react";
import {
    TrendingDown,
    TrendingUp,
    Calendar,
    Scale,
    Activity,
} from "lucide-react";

// Reusable UI components
const Card = ({ children, className = "" }) => (
    <div
        className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
        {children}
    </div>
);

const Badge = ({ children, className }) => (
    <span className={`text-white text-xs px-3 py-1 rounded-full ${className}`}>
        {children}
    </span>
);

const BmiCard = ({ history }) => {
    // Latest and previous BMI
    const latestBMI = history[0];
    const previousBMI = history[1];

    // Calculate BMI trend safely
    const bmiTrend =
        latestBMI && previousBMI && typeof latestBMI.bmi === "number" && typeof previousBMI.bmi === "number"
            ? latestBMI.bmi - previousBMI.bmi
            : null;

    // Calculate average BMI safely
    const averageBMI =
        history.length > 0
            ? (history.reduce((sum, record) => sum + (record.bmi || 0), 0) / history.length).toFixed(1)
            : null;

    // Function to get BMI category
    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return { text: "Underweight", color: "bg-blue-500" };
        if (bmi < 25) return { text: "Normal", color: "bg-emerald-500" };
        if (bmi < 30) return { text: "Overweight", color: "bg-orange-500" };
        return { text: "Obese", color: "bg-red-500" };
    };

    return (
        <>
            {/* BMI Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
                <Card>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Current BMI</p>
                            {latestBMI && typeof latestBMI.bmi === "number" ? (
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
                                {typeof bmiTrend === "number" ? (bmiTrend > 0 ? "+" : "") + bmiTrend.toFixed(1) : "--"}
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
                            <h2 className="text-3xl font-bold">{averageBMI || "--"}</h2>
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
        </>
    );
};

export default BmiCard;