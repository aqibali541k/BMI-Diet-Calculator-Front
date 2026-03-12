import React from "react";

// Reusable Card Component
const Card = ({ children, className = "" }) => (
    <div
        className={`bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm 
    hover:shadow-lg transition-all duration-300 ${className}`}
    >
        {children}
    </div>
);

const BmiHistoryTable = ({ history = [] }) => {
    if (history.length === 0) {
        return (
            <Card>
                <p className="text-center text-gray-400 py-20">
                    No BMI history available
                </p>
            </Card>
        );
    }

    const getCategoryColor = (bmi) => {
        if (bmi < 18.5) return "bg-blue-500";
        if (bmi < 25) return "bg-emerald-500";
        if (bmi < 30) return "bg-orange-500";
        return "bg-red-500";
    };

    return (
        <Card>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                BMI History
            </h3>

            {/* TABLE WRAPPER */}
            <div className="overflow-x-auto">

                <table className="min-w-[600px] w-full text-left">

                    {/* HEADER */}

                    <thead className="bg-gray-50 sticky top-0">
                        <tr className="text-gray-500 text-xs sm:text-sm border-b">
                            <th className="py-3 px-3 sm:px-4 font-medium">Date</th>
                            <th className="py-3 px-3 sm:px-4 font-medium">Height</th>
                            <th className="py-3 px-3 sm:px-4 font-medium">Weight</th>
                            <th className="py-3 px-3 sm:px-4 font-medium">BMI</th>
                            <th className="py-3 px-3 sm:px-4 font-medium">Category</th>
                        </tr>
                    </thead>

                    {/* BODY */}

                    <tbody className="text-gray-700 text-sm">

                        {history.map((record, index) => {

                            const categoryColor = getCategoryColor(record.bmi);

                            return (
                                <tr
                                    key={index}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >

                                    <td className="py-3 sm:py-4 px-3 sm:px-4">
                                        {new Date(record.date).toLocaleDateString()}
                                    </td>

                                    <td className="py-3 sm:py-4 px-3 sm:px-4">
                                        {record.height} cm
                                    </td>

                                    <td className="py-3 sm:py-4 px-3 sm:px-4">
                                        {record.weight} kg
                                    </td>

                                    <td className="py-3 sm:py-4 px-3 sm:px-4 font-semibold">
                                        {record.bmi}
                                    </td>

                                    <td className="py-3 sm:py-4 px-3 sm:px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-white text-xs ${categoryColor}`}
                                        >
                                            {record.category}
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}

                    </tbody>

                </table>

            </div>
        </Card>
    );
};

export default BmiHistoryTable;