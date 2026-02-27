import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import AuthHeader from "../components/AuthHeader";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";

const PatientDoctorsignin = () => {
  const dispatch = useDispatch(); 
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || "patient"); // 'patient' or 'doctor'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      role === "patient"
        ? `${serverUrl}/api/auth/patient-signin`
        : `${serverUrl}/api/auth/doctor-signin`;

    try {
      const result = await axios.post(endpoint, formData, {
        withCredentials: true,
      });
      console.log(`${role} login successful:`, result.data);
      dispatch(setUserData(result.data.user));
      // Redirect logic here
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light text-slate-900 antialiased min-h-screen font-manrope">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <AuthHeader />

        {/* Main Content Section */}
        <main className="flex-1 flex flex-col md:flex-row">
          {/* Left Side: Illustration & Branding */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 overflow-hidden items-center justify-center p-12">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            <div className="relative z-10 w-full max-w-lg space-y-8 text-center lg:text-left">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-2 transform rotate-2">
                <img
                  alt="Secure Healthcare Access"
                  className="rounded-xl w-full h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADP5ZByXpAJa8tmLOVZk-FClOYvju4RQI-ZkeKTgvj4hbGhQJSq2PlSXRGB9tJ1NlGweuXZPwuWauxpkMiLC1R0nu1lDOs2UDtoYici4jkp2qgfyjIT_QZU8XonNn0fUgGOUZRmlDuBjVeImePjfxij2julCf6e-fdlHVs5TLE0SAjchD9l58ar5-U3CmbZk3xkYbob_ogoc5YJDeNAkFrHw8k5dNlKLzM0C466eMQEPmAv5x9FYxVh3fnlxrQbaGlFicnj-b2nOE"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  Welcome Back to <br />
                  <span className="text-primary">CareConnect Portal</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Access your health records and medical schedule securely from
                  anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Sign-in Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-background-light">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  Account Sign In
                </h1>
                <p className="text-slate-500">
                  Choose your role and enter your credentials to continue.
                </p>
              </div>

              {/* Role Switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setRole("patient")}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                    role === "patient"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  I'm a Patient
                </button>
                <button
                  onClick={() => setRole("doctor")}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                    role === "doctor"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  I'm a Doctor
                </button>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      mail
                    </span>
                    Email Address
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="example@careconnect.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        lock
                      </span>
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  className={`w-full h-12 flex items-center justify-center gap-2 font-bold rounded-lg shadow-lg transition-all transform ${
                    loading
                      ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                      : "bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      Sign In to Account
                      <span className="material-symbols-outlined whitespace-nowrap">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>

                {/* Conditional Signup Link for Patient */}
                {role === "patient" && (
                  <p className="text-center text-sm text-slate-500 mt-6 animate-in fade-in slide-in-from-bottom-1">
                    If you don't have an account, please{" "}
                    <Link
                      to="/patient-signup"
                      className="text-primary font-bold hover:underline"
                    >
                      Signup
                    </Link>
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-6 px-10 text-center">
          <p className="text-slate-500 text-xs">
            © 2024 CareConnect Health Systems. All rights reserved.
            <span className="mx-2">|</span>
            Secure encrypted connection
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PatientDoctorsignin;
