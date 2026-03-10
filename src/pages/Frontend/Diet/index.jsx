import React, { useState } from "react";
import Img from "../../../assets/Images/health.jpg"

const dietPlans = [{
    id: 'weight-loss',
    title: 'Weight Loss Plan',
    description: 'Designed for those looking to reduce weight and achieve a healthy BMI',
    targetBMI: 'For BMI > 25',
    calories: '1500-1800 kcal/day',
    meals: {
        breakfast: [
            'Oatmeal with berries and almonds',
            'Greek yogurt with honey and walnuts',
            'Scrambled eggs with spinach and whole wheat toast',
            'Smoothie bowl with protein powder and fruits'
        ],
        lunch: [
            'Grilled chicken salad with olive oil dressing',
            'Quinoa bowl with roasted vegetables',
            'Turkey wrap with lettuce and tomatoes',
            'Lentil soup with mixed greens'
        ],
        dinner: [
            'Baked salmon with steamed broccoli',
            'Grilled chicken breast with sweet potato',
            'Stir-fried tofu with vegetables',
            'Lean beef with cauliflower rice'
        ],
        snacks: [
            'Apple slices with almond butter',
            'Carrot sticks with hummus',
            'Mixed nuts (small portion)',
            'Low-fat cottage cheese'
        ]
    },
    benefits: [
        'Calorie-controlled portions',
        'High in protein to preserve muscle',
        'Low in processed foods',
        'Rich in fiber for satiety',
        'Balanced macronutrients'
    ]
},
{
    id: 'balanced',
    title: 'Balanced Maintenance Plan',
    description: 'Perfect for maintaining a healthy weight and overall wellness',
    targetBMI: 'For BMI 18.5-25',
    calories: '2000-2300 kcal/day',
    meals: {
        breakfast: [
            'Whole grain toast with avocado and eggs',
            'Protein pancakes with fresh berries',
            'Overnight oats with chia seeds and fruits',
            'Vegetable omelet with whole grain bread'
        ],
        lunch: [
            'Brown rice with grilled chicken and vegetables',
            'Whole wheat pasta with marinara and lean meat',
            'Buddha bowl with chickpeas and tahini',
            'Fish tacos with corn tortillas and cabbage slaw'
        ],
        dinner: [
            'Grilled steak with roasted vegetables and quinoa',
            'Baked cod with brown rice and asparagus',
            'Chicken stir-fry with noodles',
            'Mediterranean-style lamb with Greek salad'
        ],
        snacks: [
            'Greek yogurt with granola',
            'Fruit smoothie',
            'Whole grain crackers with cheese',
            'Trail mix with dried fruits'
        ]
    },
    benefits: [
        'Balanced macronutrient distribution',
        'Variety of food groups',
        'Sustainable long-term',
        'Adequate energy for daily activities',
        'Supports overall health'
    ]
},
{
    id: 'weight-gain',
    title: 'Healthy Weight Gain Plan',
    description: 'Nutrient-dense meals to help gain weight in a healthy way',
    targetBMI: 'For BMI < 18.5',
    calories: '2500-3000 kcal/day',
    meals: {
        breakfast: [
            'French toast with peanut butter and banana',
            'Large bowl of oatmeal with nuts, seeds, and dried fruits',
            'Bagel with cream cheese, eggs, and avocado',
            'Protein shake with oats, banana, and nut butter'
        ],
        lunch: [
            'Large chicken breast with pasta and cream sauce',
            'Beef burrito with rice, beans, and cheese',
            'Salmon with quinoa and roasted vegetables',
            'Lasagna with garlic bread'
        ],
        dinner: [
            'Steak with baked potato and butter',
            'Grilled chicken thighs with rice pilaf',
            'Pork chops with mashed potatoes and gravy',
            'Beef stew with bread'
        ],
        snacks: [
            'Protein bars',
            'Smoothies with protein powder',
            'Nuts and dried fruits',
            'Cheese and whole grain crackers',
            'Peanut butter sandwiches'
        ]
    },
    benefits: [
        'Higher calorie density',
        'Protein-rich for muscle building',
        'Healthy fats included',
        'Frequent eating opportunities',
        'Nutrient-dense choices'
    ]
},
{
    id: 'vegetarian',
    title: 'Vegetarian Balanced Plan',
    description: 'Plant-based nutrition for optimal health and wellness',
    targetBMI: 'For all BMI ranges',
    calories: '1800-2200 kcal/day',
    meals: {
        breakfast: [
            'Tofu scramble with vegetables and whole wheat toast',
            'Smoothie bowl with plant protein and seeds',
            'Overnight oats with almond milk and berries',
            'Whole grain waffles with nut butter and fruit'
        ],
        lunch: [
            'Chickpea curry with brown rice',
            'Lentil burger with sweet potato fries',
            'Quinoa salad with roasted vegetables and tahini',
            'Black bean tacos with guacamole'
        ],
        dinner: [
            'Vegetable stir-fry with tofu and rice',
            'Eggplant parmesan with whole wheat pasta',
            'Stuffed bell peppers with quinoa and beans',
            'Thai green curry with vegetables and coconut milk'
        ],
        snacks: [
            'Hummus with vegetable sticks',
            'Fruit with nut butter',
            'Roasted chickpeas',
            'Energy balls with dates and nuts'
        ]
    },
    benefits: [
        'High in fiber and nutrients',
        'Plant-based protein sources',
        'Rich in antioxidants',
        'Heart-healthy options',
        'Environmentally sustainable'
    ]
}
];

function DietPlans() {
    const [selectedPlan, setSelectedPlan] = useState(dietPlans[0]);
    const [activeTab, setActiveTab] = useState("meals");

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 to-blue-50 py-12 px-4">
            <div className="max-w-8xl lg:max-w-7xl md:max-w-6xl sm:max-w-5xl max-w-4xl mx-auto">

                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Personalized Diet Plans</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Choose a diet plan that matches your goals and BMI category
                    </p>
                </div>

                {/* Diet Plan Cards */}
                <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {dietPlans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => { setSelectedPlan(plan); setActiveTab("meals"); }}
                            className={`cursor-pointer p-6 rounded-xl bg-white shadow hover:shadow-xl transition ${selectedPlan.id === plan.id ? 'ring-2 ring-emerald-600' : ''}`}
                        >
                            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full mb-2 inline-block">{plan.targetBMI}</span>
                            <p className="text-gray-600 mb-3 text-sm">{plan.description}</p>
                            <p className="text-sm font-semibold text-emerald-600">{plan.calories}</p>
                        </div>
                    ))}
                </div>

                {/* Selected Plan Details */}
                <div className="max-w-8xl lg:max-w-7xl md:max-w-6xl sm:max-w-5xl max-w-4xl mx-auto bg-white p-8 rounded-xl shadow mb-12">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-semibold mb-2">{selectedPlan.title}</h2>
                            <p className="text-gray-600">{selectedPlan.description}</p>
                        </div>
                        <span className="bg-emerald-600 text-white px-4 py-2 rounded-xl">{selectedPlan.calories}</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-6 gap-4 bg-gray-100 rounded-2xl p-0.5  ">
                        <button
                            onClick={() => setActiveTab("meals")}
                            className={`flex-1 text-center py-1 rounded-2xl ${activeTab === "meals" ? "bg-white " : ""}`}
                        >
                            Daily Meals
                        </button>
                        <button
                            onClick={() => setActiveTab("benefits")}
                            className={`flex-1 text-center py-1 rounded-2xl ${activeTab === "benefits" ? "bg-white" : ""}`}
                        >
                            Benefits
                        </button>
                    </div>

                    {/* Meals */}
                    {activeTab === "meals" && (
                        <div className="space-y-6">
                            {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
                                <div key={mealType}>
                                    <h3 className="text-2xl font-semibold capitalize mb-2">{mealType}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedPlan.meals[mealType].map((meal, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                                <span className="text-green-600 font-bold mt-0.5">✔</span>
                                                <span>{meal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Benefits */}
                    {activeTab === "benefits" && (
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left: Benefits List */}
                            <div className="md:w-1/2 space-y-4">
                                <h3 className="text-2xl font-semibold mb-4">Key Benefits</h3>
                                {selectedPlan.benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-green-600 font-bold mt-0.5">✔</span>
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Right: Image */}
                            <div className="md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden">
                                <img
                                    src={Img}
                                    alt="Healthy meal"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Nutrition Tips */}
                <div className="max-w-8xl lg:max-w-7xl md:max-w-6xl sm:max-w-5xl max-w-4xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-center mb-6">Essential Nutrition Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">🥛</div>
                            <h3 className="font-semibold text-lg mb-2">Stay Hydrated</h3>
                            <p className="text-gray-600 text-center">Drink at least 8 glasses of water daily to support metabolism and overall health.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">🥕</div>
                            <h3 className="font-semibold text-lg mb-2">Eat More Vegetables</h3>
                            <p className="text-gray-600 text-center">Fill half your plate with colorful vegetables for essential nutrients and fiber.</p>
                        </div>
                        <div className="p-6 bg-white shadow rounded-xl flex flex-col items-center">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">🌾</div>
                            <h3 className="font-semibold text-lg mb-2">Choose Whole Grains</h3>
                            <p className="text-gray-600 text-center">Opt for whole grains over refined grains for better nutrition and energy.</p>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="max-w-8xl lg:max-w-7xl md:max-w-6xl sm:max-w-5xl max-w-4xl mx-auto bg-amber-50 border border-amber-200 p-6 rounded-lg text-sm text-gray-700">
                    <strong>Important:</strong> These diet plans are general recommendations. Please consult a healthcare professional before making changes to your diet, especially if you have health conditions or dietary restrictions.
                </div>

            </div>
        </div>
    );
}
export default DietPlans;