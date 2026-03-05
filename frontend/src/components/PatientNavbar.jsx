import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";
import axios from "axios";
import { serverUrl } from "../App";

const PatientNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/auth/patient-logout`,
        {},
        { withCredentials: true },
      );
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback: clear state even if server logout fails
      dispatch(setUserData(null));
      navigate("/");
    }
  };

  const navLinks = [
    { label: "Dashboard", path: "/home", icon: "grid_view" },
    { label: "AI Predictor", path: "/ai-symptom-checker", icon: "neurology" },
    { label: "Hospitals", path: "/hospitals", icon: "local_hospital" },
    {
      label: "Appointments",
      path: "/patients-appointments",
      icon: "calendar_month",
    },
  ];

  const userInitial = userData?.fullName?.charAt(0).toUpperCase() || "U";

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-60 w-full border-b border-primary/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 py-3">
        <Link
          to="/"
          className="flex items-center gap-3 text-primary group shrink-0"
        >
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
            medical_services
          </span>
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-extrabold tracking-tight">
            CareConnect
          </h2>
        </Link>

        <div className="flex items-center gap-6 lg:gap-10">
          {/* Desktop Navigation Links - Now on the Right */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className={`text-sm font-bold transition-all py-1.5 border-b-2 ${
                  isActive(link.path)
                    ? "text-primary border-primary"
                    : "text-slate-600 dark:text-slate-400 border-transparent hover:text-primary hover:border-primary/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:flex flex-col justify-center border-l border-primary/10 pl-4 lg:pl-6">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {userData?.fullName || "User"}
              </p>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
                #{userData?._id?.slice(-4) || "0000"}
              </p>
            </div>

            <div className="relative" ref={dropdownRef}>
              {/* User Initial Avatar with Dropdown Trigger */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none border-2 border-white dark:border-slate-800"
              >
                {userInitial}
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-[calc(100vw-3rem)] sm:w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-70 origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Signed in as
                    </p>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100 truncate">
                      {userData?.fullName}
                    </p>
                  </div>
                  <div className="px-2 py-2">
                    <button
                      onClick={() => {
                        navigate("/patient-profile");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">
                        person
                      </span>
                      Profile Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        logout
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center size-10 rounded-lg hover:bg-primary/5 text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-primary/5 bg-white dark:bg-slate-900 py-4 px-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-xl">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary font-bold"
            >
              <span className="material-symbols-outlined text-xl">person</span>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-left"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PatientNavbar;