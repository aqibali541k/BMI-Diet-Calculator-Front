import { FaHeart, FaHeartbeat } from "react-icons/fa";
import healthImg from "../../../assets/Images/health.jpg"; // apni image ka path
import { IoIosHeartEmpty } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { SlEnergy } from "react-icons/sl";
import { IoNutritionOutline } from "react-icons/io5";

const TransformHealth = () => {
    return (
        <section className="py-20 bg-green-200/30">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

                {/* Left Side Content */}
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold mb-6">
                        Transform Your Health
                    </h2>

                    <p className="text-gray-600 mb-8">
                        Maintaining a healthy BMI and following a balanced diet can dramatically improve your quality of life.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <h3 className="flex items-center text-xl bg-yellow-400 rounded-full px-2 py-1 text-white  font-semibold"> <CiHeart className="text-white! text-sm! mr-2! w-6! h-6! flex! items-center! justify-center!" /> Better Heart Health</h3>
                            <p className="text-gray-600">
                                Reduce risk of cardiovascular diseases and improve circulation
                            </p>
                        </div>

                        <div>
                            <h3 className="flex items-center text-xl bg-yellow-400 rounded-full px-2 py-1 text-white font-semibold"> <SlEnergy className="text-white! text-sm! mr-2! w-6! h-6! flex! items-center! justify-center!" /> Increased Energy</h3>
                            <p className="text-gray-600">
                                Feel more energized and ready to tackle your day
                            </p>
                        </div>

                        <div>
                            <h3 className="flex items-center text-xl bg-yellow-400 rounded-full px-2 py-1 text-white font-semibold"> <IoNutritionOutline className="text-white! text-sm! mr-2! w-6! h-6! flex! items-center! justify-center!" /> Better Nutrition</h3>
                            <p className="text-gray-600">
                                Develop healthy eating habits that last a lifetime
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side Image */}
                <div className="md:w-1/2">
                    <img
                        src={healthImg}
                        alt="Healthy lifestyle"
                        className="w-full h-auto max-h-[400px] rounded-xl shadow-lg object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default TransformHealth;