import React, { useState } from "react";
import weight from "../../../assets/Images/weight.jpg";
import { message } from "antd";
import axios from "axios";
import { LuCalculator } from "react-icons/lu";

const initialState = {
    height: "",
    weightKg: "",
    bmi: null,
    category: "",
};

const Calculator = () => {
    const [state, setState] = useState(initialState);
    const { height, weightKg, bmi, category } = state;

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!height || !weightKg) {
            message.error("Please enter height and weight");
            return;
        }

        if (height <= 0 || weightKg <= 0) {
            message.warning("Height and Weight must be greater than 0");
            return;
        }

        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                message.warning("Please login first to calculate BMI");
                return;
            }

            // Correct payload: backend expects 'weight'
            const res = await axios.post(
                "http://localhost:8000/bmi/create",
                {
                    height,
                    weight: weightKg, // map weightKg → weight
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setState({
                height,
                weightKg,
                bmi: res.data.bmi,
                category: res.data.category,
            });

            message.success("BMI calculated successfully");
        } catch (err) {
            console.error(err);
            message.error(err.response?.data?.message || "Failed to calculate BMI");
        }
    };

    const getProgress = () => {
        if (!bmi) return 0;
        return ((Number(bmi) - 15) / 25) * 100;
    };

    const getCat = () => {
        if (!bmi) return "";
        if (bmi < 18.5) return "Underweight";
        else if (bmi < 25) return "Normal Weight";
        else if (bmi < 30) return "Overweight";
        else return "Obese";
    };

    return (
        <section className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <LuCalculator className="text-emerald-600" /> Enter Your Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Measurement */}
                            <div>
                                <p className="font-medium mb-2">Measurement System</p>

                                <div className="space-y-1 text-sm">
                                    <label className="flex items-center gap-2">
                                        <input type="radio" checked readOnly />
                                        Metric (cm, kg)
                                    </label>

                                    <label className="flex items-center gap-2 text-gray-500 cursor-not-allowed">
                                        <input type="radio" disabled />
                                        Imperial (inches, lbs)
                                    </label>
                                </div>
                            </div>

                            {/* Height */}
                            <div>
                                <label className="block mb-2">Height (cm)</label>

                                <input
                                    type="number"
                                    name="height"
                                    value={height}
                                    onChange={handleChange}
                                    placeholder="e.g.,170"
                                    className="w-full bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-sm focus:shadow-gray-700 focus:transition-all duration-400 ease-in-out"
                                />
                            </div>

                            {/* Weight */}
                            <div>
                                <label className="block mb-2">Weight (kg)</label>

                                <input
                                    type="number"
                                    name="weightKg"
                                    value={weightKg}
                                    onChange={handleChange}
                                    placeholder="e.g.,70"
                                    className="w-full bg-gray-100 p-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-500 focus:shadow-sm focus:shadow-gray-700 focus:transition-all duration-400 ease-in-out"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 text-white py-2 cursor-pointer rounded-lg font-semibold hover:bg-emerald-700 transition"
                            >
                                Calculate BMI
                            </button>

                        </form>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">

                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            💓 Your Results
                        </h2>

                        {bmi ? (
                            <div>

                                {/* BMI VALUE */}
                                <h3 className="text-6xl font-bold text-red-600 text-center">
                                    {bmi}
                                </h3>

                                <p className="text-center text-xl text-red-600 mt-2">
                                    {category || getCat()}
                                </p>

                                {/* SCALE */}
                                <div className="mt-6">
                                    <p className="font-medium mb-2">BMI Scale</p>

                                    <div className="relative h-3 rounded-full overflow-hidden bg-linear-to-r from-blue-500 via-orange-400 to-red-500">

                                        <div
                                            className="absolute top-0 h-full w-1 bg-black"
                                            style={{ left: `${getProgress()}%` }}
                                        ></div>

                                    </div>

                                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                                        <span>15</span>
                                        <span>18.5</span>
                                        <span>25</span>
                                        <span>30</span>
                                        <span>40</span>
                                    </div>
                                </div>

                                {/* INFO BOX */}
                                <div className="mt-6 bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
                                    <p className="font-medium mb-1">
                                        Your BMI indicates {category || getCat().toLowerCase()}.
                                    </p>

                                    <p>
                                        Consult with healthcare professionals for a comprehensive weight
                                        management plan tailored to your needs.
                                    </p>
                                </div>

                                {/* CATEGORIES */}
                                <div className="mt-6">

                                    <p className="font-medium mb-2">BMI Categories</p>

                                    <div className="text-sm space-y-1">

                                        <div className="flex justify-between text-blue-500">
                                            <span>Underweight</span>
                                            <span>{"< 18.5"}</span>
                                        </div>

                                        <div className="flex justify-between text-emerald-600">
                                            <span>Normal weight</span>
                                            <span>18.5 - 24.9</span>
                                        </div>

                                        <div className="flex justify-between text-orange-500">
                                            <span>Overweight</span>
                                            <span>25 - 29.9</span>
                                        </div>

                                        <div className="flex justify-between text-red-600">
                                            <span>Obese</span>
                                            <span>{"≥ 30"}</span>
                                        </div>

                                    </div>
                                </div>

                                {/* SUCCESS MESSAGE */}
                                <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg text-sm">
                                    ✓ This result has been saved to your dashboard
                                </div>

                            </div>
                        ) : (
                            <>
                                <p className="text-gray-500 mt-12 text-6xl lg:text-8xl flex justify-center">
                                    <LuCalculator />
                                </p>
                                <p className="text-gray-500 text-center mt-20">
                                    Enter your height and weight to calculate your BMI
                                </p>
                            </>
                        )}

                    </div>
                </div>

                {/* IMAGE SECTION */}
                <div className="mt-16">
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={weight}
                            alt="Fitness"
                            className="w-full h-[400px] object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40"></div>

                        <div className="absolute bottom-6 left-6 text-white max-w-md">
                            <h3 className="text-2xl font-bold mb-2">
                                Understanding Your BMI
                            </h3>

                            <p className="text-md">
                                BMI helps determine whether your weight is in a healthy range based on your height.
                                Maintaining a healthy BMI can reduce the risk of many diseases and improve overall wellbeing.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Calculator;