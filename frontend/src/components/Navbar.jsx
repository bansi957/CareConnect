import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = ({ role = "guest" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-semibold transition-all duration-300 relative py-2 md:py-1 ${
      isActive(path)
        ? "text-primary md:after:content-[''] md:after:absolute md:after:bottom-0 md:after:left-0 md:after:w-full md:after:h-0.5 md:after:bg-primary"
        : "text-slate-600 hover:text-primary"
    }`;

  const mobileNavLinkClass = (path) =>
    `flex items-center gap-3 px-4 py-4 rounded-xl text-base font-bold transition-all ${
      isActive(path)
        ? "bg-primary/10 text-primary"
        : "text-slate-600 hover:bg-slate-50"
    }`;

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
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          {role === "guest" && (
            <>
              <Link to="/solutions" className={navLinkClass("/solutions")}>
                Solutions
              </Link>
              <Link to="/about-us" className={navLinkClass("/about-us")}>
                About Us
              </Link>
            </>
          )}
          {role === "auth" && (
            <Link to="/about" className={navLinkClass("/about")}>
              Support
            </Link>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {role === "guest" || role === "auth" ? (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="flex items-center justify-center rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all font-manrope"
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex md:hidden size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <span className="material-symbols-outlined">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[72px] z-40 md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white p-6 shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-2">
            <Link to="/" className={mobileNavLinkClass("/")}>
              <span className="material-symbols-outlined">home</span> Home
            </Link>
            {role === "guest" && (
              <>
                <Link
                  to="/solutions"
                  className={mobileNavLinkClass("/solutions")}
                >
                  <span className="material-symbols-outlined">lightbulb</span>{" "}
                  Solutions
                </Link>
                <Link
                  to="/about-us"
                  className={mobileNavLinkClass("/about-us")}
                >
                  <span className="material-symbols-outlined">info</span> About
                  Us
                </Link>
              </>
            )}
            {role === "auth" && (
              <Link to="/about" className={mobileNavLinkClass("/about")}>
                <span className="material-symbols-outlined">help</span> Support
              </Link>
            )}

            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="flex w-full items-center justify-center rounded-xl border-2 border-slate-100 py-3.5 font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/patient-signup")}
                className="flex w-full items-center justify-center rounded-xl bg-primary py-3.5 font-bold text-white shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
