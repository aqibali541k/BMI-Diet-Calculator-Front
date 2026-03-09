import { BsGraphUpArrow } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { LuCalculator } from "react-icons/lu";
import { MdTrackChanges } from "react-icons/md";
import { SiMealie } from "react-icons/si";

const Works = () => {
    return (
        <section className="py-20 bg-white">

            <div className="max-w-6xl mx-auto px-2 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    How It  <span className="text-green-600">Works</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="p-8">

                        <div className="bg-green-700  00 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4">
                            <p className="text-white font-bold text-3xl">1</p>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Calculae Your BMI
                        </h3>

                        <p className="text-gray-600">

                            Enter your height and weight to instantly calculate your Body Mass Index                        </p>

                    </div>

                    <div className="p-8">

                        <div className="bg-green-700  00 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4">
                            <p className="text-white font-bold text-3xl">2</p>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Get Your Analysis
                        </h3>

                        <p className="text-gray-600">

                            Receive detailed insights about your health status and recommendations
                        </p>
                    </div>
                    <div className="p-8">

                        <div className="bg-green-700  00 w-20 h-20 flex items-center justify-center rounded-full mx-auto mb-4">
                            <p className="text-white font-bold text-3xl">3</p>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Follow Your Plan
                        </h3>

                        <p className="text-gray-600">

                            Access personalized diet plans and start your journey to better health
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Works;