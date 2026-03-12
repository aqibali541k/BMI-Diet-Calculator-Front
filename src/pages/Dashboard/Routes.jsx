import React from "react";
// import Pages from "./pages";
// import Navbar from "../../components/Header/Navbar";
import DashboardPages from "./index";
import Navbar from "../../components/Header/Navbar";
const Index = () => {
  return <div className="pt-20">
    <Navbar />
    <DashboardPages />
  </div>;
};

export default Index;
