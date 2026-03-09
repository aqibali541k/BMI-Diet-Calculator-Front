import React from "react";
import Header from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Footer from "../../components/Footer";
import Calculator from "./Calculator";
import Diet from "./Diet";
import Blogs from "./Blogs";

const Frontend = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<Calculator />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default Frontend;
