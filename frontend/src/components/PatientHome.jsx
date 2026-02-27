import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";
import axios from "axios";
import { serverUrl } from "../App";

const StatCard = ({ icon, label, value, subtext, colorClass, bgClass }) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-primary/10 flex items-center gap-4 group hover:border-primary/30 transition-all shadow-sm">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${bgClass} ${colorClass}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-extrabold">{value}</p>
        <span className={`text-[10px] font-bold uppercase ${colorClass}`}>
          {subtext}
        </span>
      </div>
    </div>
  </div>
);

const AppointmentItem = ({
  doctor,
  specialty,
  time,
  image,
  isCall = false,
}) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-md transition-all gap-4">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-primary/10">
        <img className="h-full w-full object-cover" src={image} alt={doctor} />
      </div>
      <div>
        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
          {doctor}
        </h4>
        <p className="text-xs text-slate-500 font-medium">
          {specialty} • {time}
        </p>
      </div>
    </div>
    <div className="flex gap-2 w-full sm:w-auto">
      {isCall ? (
        <button className="flex-1 sm:flex-none px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          Join Call
        </button>
      ) : (
        <button className="flex-1 sm:flex-none px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-xs font-bold transition-colors">
          Reschedule
        </button>
      )}
    </div>
  </div>
);

const HealthStat = ({ label, value, percentage, colorClass }) => (
  <div>
    <div className="flex justify-between text-[10px] font-bold mb-1.5 uppercase tracking-wider text-slate-500">
      <span>{label}</span>
      <span className={colorClass}>{value}</span>
    </div>
    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`${colorClass.replace("text-", "bg-")} h-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const PatientHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    { label: "AI Predictor", path: "#", icon: "neurology" },
    { label: "Hospitals", path: "#", icon: "local_hospital" },
    { label: "Appointments", path: "#", icon: "calendar_month" },
  ];

  const stats = [
    {
      icon: "event_available",
      label: "Upcoming Visits",
      value: "2",
      subtext: "Next: Oct 12",
      colorClass: "text-blue-600",
      bgClass: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: "warning",
      label: "Health Alerts",
      value: "0",
      subtext: "Updated 2h ago",
      colorClass: "text-amber-600",
      bgClass: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: "description",
      label: "Recent Reports",
      value: "5",
      subtext: "New available",
      colorClass: "text-emerald-600",
      bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  const appointments = [
    {
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiology",
      time: "Oct 12, 10:30 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtNbx2d8fr7aSC-CXeqD2CQjf2YUBE3n2Q91VsBRhD3k9dJT5YocNUKFJre4I94Ke_sL5uqz5IVca8tY1jn09I8eHqb86GtQ9myuuJKpX49z2PW_rS_LmQKxwxSLx5sgmBQZGx8r-11WR2jJ1M_TEj4skixYwQR5LreA4ZkzBudGJF3ohgXKC6vsT9disFSir_F33VJJlJg_yKQltOX_bFX4yaxrfA6ZKHUA8ipXlsSWC5zEWL4EATZeS21sh8UcwT_QJ3DpwhVM",
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "General",
      time: "Oct 15, 02:15 PM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEaa33VXijHCDx86ka-dMJgQqQm6iDQEL3f3vaqHsGOd0efMKRd-71oW9MzNWqOns3JsoQwHZllRMG-QGymwfVTIvfnlWnn8P1LYNaiuSzveuvjXIrIJ9hBs_5dGJrlp8-UyLxQB5hWo65BoVSpn628bPaHwbfX-GPr7Wxf4_F6XW6GJirYxGL_ZYwZ-M6jw_HIELPQhwVxMD8gHXjr9GcJgQj4SwXBcXoiSezMcFE3WuKLlgxgtC2gRnBKsZ_G29GNjy2sDFvCE",
      isCall: true,
    },
  ];

  const healthStats = [
    {
      label: "Blood Pressure",
      value: "120/80",
      percentage: 80,
      colorClass: "text-emerald-500",
    },
    {
      label: "Heart Rate",
      value: "72 BPM",
      percentage: 65,
      colorClass: "text-blue-500",
    },
    {
      label: "Blood Glucose",
      value: "95 mg/dL",
      percentage: 45,
      colorClass: "text-amber-500",
    },
  ];

  const userInitial = userData?.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col overflow-x-hidden font-display">
      {/* Refactored Header */}
      <header className="sticky top-0 z-[60] w-full border-b border-primary/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
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
                <a
                  key={idx}
                  href={link.path}
                  className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-all py-1.5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <div className="text-right hidden sm:flex flex-col justify-center border-l border-primary/10 pl-4 lg:pl-6">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {userData?.fullName || "User"}
                </p>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">
                  `#`{userData?._id?.slice(-4) || "0000"}
                </p>
              </div>

              {/* User Initial Avatar with Dropdown Trigger */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="size-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all outline-none border-2 border-white dark:border-slate-800"
              >
                {userInitial}
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-primary/10 py-2 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    to="#"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      person
                    </span>
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              )}
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
                <a
                  key={idx}
                  href={link.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary transition-all font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
              {/* Add Profile and Logout to Mobile Menu too for consistency */}
              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-primary/5 hover:text-primary font-bold"
              >
                <span className="material-symbols-outlined text-xl">
                  person
                </span>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-left"
              >
                <span className="material-symbols-outlined text-xl">
                  logout
                </span>
                Logout
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area - Full Width */}
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl text-white relative overflow-hidden p-8 sm:p-10 shadow-xl shadow-primary/10">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-[2px] mb-4 backdrop-blur-sm">
                AI Diagnostics
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                AI Symptom Checker
              </h1>
              <p className="text-lg opacity-90 mb-8 font-medium leading-relaxed max-w-md">
                Not feeling well? Use our AI-powered predictor to check your
                symptoms instantly and get verified health insights.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <button className="w-full sm:w-auto bg-white text-primary px-10 py-4 rounded-xl text-base font-black hover:bg-slate-50 hover:scale-[1.02] shadow-2xl transition-all active:scale-[0.98]">
                  Start Assessment
                </button>
                <div className="flex items-center gap-3">
                  <div className="size-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-white/90">
                    Welcome back,{" "}
                    <span className="text-white underline decoration-white/30 underline-offset-4">
                      {userData?.fullName || "User"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="shrink-0 hidden lg:block">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-3 border border-white/20 transition-all hover:translate-y-[-2px]">
                <span className="material-symbols-outlined size-6 flex items-center justify-center bg-white text-primary rounded-full text-sm">
                  add
                </span>
                Book New Appointment
              </button>
            </div>
          </div>
          <span className="material-symbols-outlined text-[200px] md:text-[240px] absolute -right-8 md:-right-16 -bottom-8 md:-bottom-16 opacity-10 pointer-events-none select-none rotate-12">
            psychology
          </span>
        </section>

        {/* Quick Stats Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </section>

        {/* Core Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Appointment Column */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  calendar_clock
                </span>
                Upcoming Appointments
              </h2>
              <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline decoration-2">
                View History
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {appointments.map((apt, idx) => (
                <AppointmentItem key={idx} {...apt} />
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 dark:text-slate-600 font-bold hover:border-primary/40 hover:text-primary transition-all text-sm flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                  add_circle
                </span>
                Schedule another visit
              </button>
            </div>
          </div>

          {/* Health Stats Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                analytics
              </span>
              Health Vital Stats
            </h2>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-primary/10 shadow-sm flex flex-col gap-8 h-fit">
              {healthStats.map((stat, idx) => (
                <HealthStat key={idx} {...stat} />
              ))}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
                  Last updated: Today, 2:30 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Status Area */}
      <footer className="mt-auto py-8 text-center px-6 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500 font-bold">
          © 2024 CareConnect • Secure Patient Portal •{" "}
          <span className="text-primary">Help Center</span>
        </p>
      </footer>
    </div>
  );
};

export default PatientHome;
