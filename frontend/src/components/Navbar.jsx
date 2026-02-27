import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ role = "guest" }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center size-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined font-bold">
              medical_services
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            CareConnect
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
          >
            Home
          </Link>
          {role === "guest" && (
            <>
              <a
                href="#solutions"
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                Solutions
              </a>
              <a
                href="#about"
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                About Us
              </a>
            </>
          )}
          {role === "auth" && (
            <Link
              to="/about"
              className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
            >
              Support
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {role === "guest" || role === "auth" ? (
            <>
              <button
                onClick={() => navigate("/signin")}
                className="hidden sm:flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all font-manrope"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/patient-signup")}
                className="flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl transition-all font-manrope"
              >
                Get Started
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                // Logout logic here in future
                navigate("/signin");
              }}
              className="flex items-center justify-center rounded-lg border-2 border-slate-200 px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all font-manrope"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
