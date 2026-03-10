import React from "react";
import HeroImg from "../../../assets/Images/hero.jpg";
import { LuCalculator } from "react-icons/lu";
import { BiSolidArrowFromLeft } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate()
    return (
        <section
            className="min-h-screen bg-cover bg-center flex items-center justify-center text-white relative px-4"
            style={{ backgroundImage: `url(${HeroImg})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative text-center max-w-4xl mx-auto py-20">

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Your Journey to a{" "}
                    <span className="text-green-600">Healthier You</span>
                </h1>

                {/* Paragraph */}
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                    Calculate your BMI, discover personalized diet plans, and achieve
                    your fitness goals with FitLife.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">

                    {/* Button 1 */}
                    <button
                        onClick={() => navigate("/bmi")}
                        className="flex items-center gap-3 font-bold text-lg px-6 py-3 rounded-xl cursor-pointer
            bg-linear-to-r from-green-700 to-green-500 
            text-white shadow-lg shadow-green-900/40
            hover:from-green-600 hover:to-green-400 
            hover:scale-105 hover:shadow-xl
            transition-all duration-300"
                    >
                        <LuCalculator className="text-xl" />
                        Calculate BMI
                    </button>

                    {/* Button 2 */}
                    <button
                        onClick={() => navigate("/diet")}
                        className="flex items-center gap-3 bg-yellow-600 text-white cursor-pointer
            font-bold text-lg px-6 py-3 rounded-xl 
            shadow-lg shadow-yellow-700/40 
            hover:bg-yellow-500 hover:scale-105 hover:shadow-yellow-700/70 
            transition-all duration-300"
                    >
                        View Diet Plan
                        <BiSolidArrowFromLeft className="text-xl" />
                    </button>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;