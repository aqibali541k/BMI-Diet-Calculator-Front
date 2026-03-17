import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { FaBook, FaHeartbeat } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/Auth/AuthContext";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuCalculator, LuLayoutDashboard } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { BookAlertIcon } from "lucide-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { isAuth, handleLogout, user } = useAuthContext();
  const location = useLocation();


  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-green-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
      : "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-100 transition";

  return (
    <header className="bg-white shadow  fixed-top z-50 top-0  ">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <div onClick={() => navigate("/")} className="text-2xl font-bold flex items-center gap-2 text-green-600 cursor-pointer!">
          <FaHeartbeat />
          FitLife
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-sm items-center gap-6 font-semibold">

          <li>
            <NavLink to="/" className={navLinkStyle}>
              <IoHomeOutline />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/bmi" className={navLinkStyle}>
              <LuCalculator />
              BMI Calculator
            </NavLink>
          </li>

          <li>
            <NavLink to="/diet" className={navLinkStyle}>
              <GiForkKnifeSpoon />
              Diet Plans
            </NavLink>
          </li>
          <li>
            <NavLink to="/blogs" className={navLinkStyle}>
              <FaBook />
              Blogs
            </NavLink>
          </li>
          {isAuth && (
            <li>
              <NavLink to="/dashboard/user" className={navLinkStyle}>
                <LuLayoutDashboard />
                Dashboard
              </NavLink>
            </li>
          )}
          {isAuth && user.role === "admin" && (
            <li>
              <NavLink to="/dashboard/admin" className={navLinkStyle}>
                <LuLayoutDashboard />
                Admin
              </NavLink>
            </li>
          )}
          {location.pathname !== "/dashboard/user" && location.pathname !== "/dashboard/admin" && <div className="">
            {isAuth ? (
              <li>
                <NavLink to="/auth/login" onClick={handleLogout} className={navLinkStyle}>
                  <MdOutlineLogout />
                  Logout
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/auth/login" className={navLinkStyle}>
                  <MdOutlineLogin />
                  Login
                </NavLink>
              </li>
            )}
          </div>
          }
        </ul>

        {/* Mobile Icon */}
        <div className="text-2xl md:hidden">
          <MenuOutlined
            onClick={() => setShowMenu(!showMenu)}
            className={`cursor-pointer transition ${showMenu && "rotate-90"}`}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow transition-all duration-300 ${showMenu ? "max-h-110 p-4" : "max-h-0 overflow-hidden"
          }`}
      >
        <ul className="flex flex-col gap-4 font-semibold">

          <NavLink to="/" className={navLinkStyle}>
            <IoHomeOutline />
            Home
          </NavLink>

          <NavLink to="/bmi" className={navLinkStyle}>
            <LuCalculator className="font-semibold! text-md!" />
            BMI Calculator
          </NavLink>

          <NavLink to="/diet" className={navLinkStyle}>
            <GiForkKnifeSpoon />
            Diet Plans
          </NavLink>

          <NavLink to="/blogs" className={navLinkStyle}>
            <FaBook />
            Blogs
          </NavLink>

          {isAuth && (
            <NavLink to="/dashboard/user" className={navLinkStyle}>
              <LuLayoutDashboard />
              Dashboard
            </NavLink>
          )}

          {isAuth && user.role === "admin" && (
            <NavLink to="/dashboard/admin" className={navLinkStyle}>
              <LuLayoutDashboard />
              Admin
            </NavLink>
          )}
          {isAuth ? location.pathname !== "/dashboard/admin" && location.pathname !== "/dashboard/user" && (
            <NavLink to="/auth/login" className={navLinkStyle}>
              <MdOutlineLogout />
              Logout
            </NavLink>
          ) : (
            <NavLink to="/auth/login" className={navLinkStyle}>
              <MdOutlineLogin />
              Login
            </NavLink>
          )}

        </ul>
      </div>
    </header>
  );
};

export default Navbar;