import React from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaLinkedinIn, FaPhone, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Copyright = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 px-6">

      {/* 1️⃣ Top CTA Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="mb-6">
          Join thousands of people who have transformed their lives with FitLife
        </p>
        <button onClick={() => navigate("/bmi")} className="px-8 py-3 cursor-pointer! bg-green-600! text-white! font-bold! rounded-xl! shadow-lg! hover:bg-green-500! transition-all! duration-300!">
          Get Started Now
        </button>
      </div>

      {/* 2️⃣ Middle Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

        {/* FitLife Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">FitLife</h3>
          <p className="text-gray-300 text-sm">
            Your journey to a healthier lifestyle starts here. Track your BMI and get personalized diet plans.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a onClick={() => navigate("/")} className="hover:text-green-500 cursor-pointer! transition-colors">Home</a></li>
            <li><a onClick={() => navigate("/bmi")} className="hover:text-green-500 cursor-pointer! transition-colors">BMI Calculator</a></li>
            <li><a onClick={() => navigate("/diet")} className="hover:text-green-500 cursor-pointer! transition-colors">Diet Plans</a></li>
            <li><a onClick={() => navigate("/blogs")} className="hover:text-green-500 cursor-pointer! transition-colors">Blogs</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a className="hover:text-green-500 transition-colors">Health Tips</a></li>
            <li><a className="hover:text-green-500 transition-colors">Workout Plans</a></li>
            <li><a className="hover:text-green-500 transition-colors">Nutrition Guide</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Follow Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="https://www.instagram.com/aqibshabbir876" className="hover:text-green-500 flex items-center gap-2 transition-colors"><FaInstagram />Instagram</a></li>
            <li><a href="https://twitter.com/" className="hover:text-green-500 flex items-center gap-2 transition-colors"><FaTwitter />Twitter</a></li>
            <li><a href="https://www.linkedin.com/in/aqib-shabbir-62a16a345/" className="hover:text-green-500 flex items-center gap-2 transition-colors"><FaLinkedinIn />LinkedIn</a></li>
            <li><a href="https://github.com/aqibali541k" className="hover:text-green-500 flex items-center gap-2 transition-colors"><FaGithub />GitHub</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 ">
            <li><FaEnvelope /> <a href="mailto:aqibali541k@gmail.com" className="hover:text-green-500 transition-colors">aqibali541k@gmail.com</a></li>
            <li><FaPhone /> <a href="tel:+923078244507" className="hover:text-green-500 transition-colors">+92 307 8244507</a></li>
          </ul>
        </div>
      </div>

      {/* 3️⃣ Bottom Copyright */}
      <div className="border-t border-gray-700 pt-6 pb-4 text-center text-gray-400 text-sm">
        © 2026 FitLife. All rights reserved. For educational purposes only.
      </div>

    </footer>
  );
};

export default Copyright;