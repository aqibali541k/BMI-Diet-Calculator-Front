import { BsGraphUpArrow } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { LuCalculator } from "react-icons/lu";
import { MdTrackChanges } from "react-icons/md";
import { SiMealie } from "react-icons/si";

const About = () => {
    return (
        <section className="py-20 bg-gray-100">

            <div className="max-w-6xl mx-auto px-2 text-center">

                <h2 className="text-4xl font-bold mb-4">
                    Why Choose <span className="text-green-600">FitLife?</span>
                </h2>

                <p className="text-gray-600 mb-12">
                    Everything you need to track your health and achieve your fitness goals
                </p>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Card 1 */}
                    <div className="p-8 bg-white rounded-xl shadow hover:shadow-xl transition">

                        <div className="bg-green-200  00 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                            <LuCalculator className="text-green-600 text-3xl" />
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Accurate BMI Calculator
                        </h3>

                        <p className="text-gray-600">
                            Get instant and accurate BMI calculations with detailed health insights and recommendations
                        </p>

                    </div>

                    {/* Card 2 */}
                    <div className="p-8 bg-white rounded-xl shadow hover:shadow-xl transition">

                        <div className="bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                            <SiMealie className="text-blue-600 text-3xl" />
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Personalized Diet Plans
                        </h3>

                        <p className="text-gray-600">
                            Receive customized meal plans tailored to your BMI, goals, and dietary preferences
                        </p>

                    </div>

                    {/* Card 3 */}
                    <div className="p-8 bg-white rounded-xl shadow hover:shadow-xl transition">

                        <div className="bg-purple-400/15 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                            <BsGraphUpArrow className="text-purple-600 text-3xl" />
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                            Track Your Progress
                        </h3>

                        <p className="text-gray-600">
                            Monitor your health journey and see real results with our intuitive tracking system
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default About;