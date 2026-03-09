import React, { useState } from "react";
import weight from "../../../assets/Images/weight.jpg";
import { message } from "antd";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!height || !weightKg) {
            message.error("Please enter height and weight");
            return;
        }

        if (height <= 0 || weightKg <= 0) {
            message.warning("Height and Weight must be greater than 0");
            return;
        }

        const h = height / 100;
        const result = weightKg / (h * h);
        const final = result.toFixed(1);

        let cat = "";

        if (result < 18.5) cat = "Underweight";
        else if (result < 25) cat = "Normal Weight";
        else if (result < 30) cat = "Overweight";
        else cat = "Obese";

        setState({
            height,
            weightKg,
            bmi: final,
            category: cat,
        });

        message.success("BMI calculated successfully");
    };

    const getProgress = () => {
        if (!bmi) return 0;
        return ((Number(bmi) - 15) / 25) * 100;
    };

    return (
        <section className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-16">
            <div className="max-w-6xl mx-auto px-4">

                <div className="grid lg:grid-cols-2 gap-8">

                    {/* LEFT CARD */}
                    <div className="bg-white rounded-2xl shadow p-8">

                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            📟 Enter Your Details
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <p className="font-medium mb-2">Measurement System</p>

                                <label className="flex gap-2">
                                    <input type="radio" defaultChecked />
                                    Metric (cm, kg)
                                </label>

                                <label className="flex gap-2 mt-1">
                                    <input type="radio" />
                                    Imperial (inches, lbs)
                                </label>
                            </div>

                            <div>
                                <label className="block mb-2">Height (cm)</label>

                                <input
                                    type="number"
                                    name="height"
                                    value={height}
                                    onChange={handleChange}
                                    placeholder="e.g., 170"
                                    className="w-full bg-gray-100 p-3 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block mb-2">Weight (kg)</label>

                                <input
                                    type="number"
                                    name="weightKg"
                                    value={weightKg}
                                    onChange={handleChange}
                                    placeholder="e.g., 70"
                                    className="w-full bg-gray-100 p-3 rounded-lg"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
                            >
                                Calculate BMI
                            </button>

                        </form>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-8">

                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            💓 Your Results
                        </h2>

                        {bmi ? (

                            <div>

                                <h3 className="text-6xl font-bold text-emerald-600 text-center">
                                    {bmi}
                                </h3>

                                <p className="text-center text-2xl text-emerald-600 mt-2">
                                    {category}
                                </p>

                                {/* BMI SCALE */}

                                <div className="mt-6">

                                    <p className="font-medium mb-2">BMI Scale</p>

                                    <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-orange-400 to-red-500">

                                        <div
                                            className="absolute top-0 h-full w-1 bg-black"
                                            style={{ left: `${getProgress()}%` }}
                                        ></div>

                                    </div>

                                    <div className="flex justify-between text-xs mt-2">
                                        <span>15</span>
                                        <span>18.5</span>
                                        <span>25</span>
                                        <span>30</span>
                                        <span>40</span>
                                    </div>

                                </div>

                                {/* ADVICE BOX */}

                                <div className="mt-6 border rounded-xl p-4 bg-gray-50">

                                    <p className="font-medium">
                                        Your BMI is in the healthy range.
                                    </p>

                                    <p className="text-gray-600 text-sm mt-1">
                                        Great job! Maintain your healthy weight with balanced nutrition and regular physical activity.
                                    </p>

                                </div>

                                {/* BMI CATEGORY */}

                                <div className="mt-6">

                                    <p className="font-semibold mb-2">BMI Categories</p>

                                    <div className="flex justify-between text-blue-600">
                                        <span>Underweight</span>
                                        <span>&lt; 18.5</span>
                                    </div>

                                    <div className="flex justify-between text-green-600">
                                        <span>Normal weight</span>
                                        <span>18.5 - 24.9</span>
                                    </div>

                                    <div className="flex justify-between text-orange-500">
                                        <span>Overweight</span>
                                        <span>25 - 29.9</span>
                                    </div>

                                    <div className="flex justify-between text-red-500">
                                        <span>Obese</span>
                                        <span>≥ 30</span>
                                    </div>

                                </div>

                            </div>

                        ) : (

                            <p className="text-gray-500 text-center mt-20">
                                Enter your height and weight to calculate your BMI
                            </p>

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

                            <p className="text-md text-white">
                                BMI helps determine whether your weight is in a healthy range based on your height.
                                Maintaining a healthy BMI can reduce the risk of many diseases and improve overall wellbeing.
                            </p>

                        </div>

                        {/* </div> */}

                    </div>
                </div>
            </div>
        </section >
    );

};

export default Calculator;      