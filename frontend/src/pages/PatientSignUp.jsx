import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import AuthHeader from "../components/AuthHeader";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/UserSlice";
const PatientSignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add API call logic here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/patient-signup`,
        formData,
        { withCredentials: true },
      );
      console.log(result);
      dispatch(setUserData(result.data.user));
      // Optionally redirect user here
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Sign up failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light text-slate-900 antialiased min-h-screen font-manrope">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <AuthHeader />

        {/* Main Content Section: Split Screen */}
        <main className="flex-1 flex flex-col md:flex-row">
          {/* Left Side: Calming Image & Branding */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 overflow-hidden items-center justify-center p-12">
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
            <div className="relative z-10 w-full max-w-lg space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-2 transform -rotate-2">
                <img
                  alt="Professional healthcare consultation"
                  className="rounded-xl w-full h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADP5ZByXpAJa8tmLOVZk-FClOYvju4RQI-ZkeKTgvj4hbGhQJSq2PlSXRGB9tJ1NlGweuXZPwuWauxpkMiLC1R0nu1lDOs2UDtoYici4jkp2qgfyjIT_QZU8XonNn0fUgGOUZRmlDuBjVeImePjfxij2julCf6e-fdlHVs5TLE0SAjchD9l58ar5-U3CmbZk3xkYbob_ogoc5YJDeNAkFrHw8k5dNlKLzM0C466eMQEPmAv5x9FYxVh3fnlxrQbaGlFicnj-b2nOE"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  Your Health, <br />
                  <span className="text-primary">Our Priority.</span>
                </h3>
                <p className="text-slate-600 text-lg">
                  Join thousands of patients who trust CareConnect for seamless
                  medical appointments and digital health records.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-sm">
                      verified
                    </span>
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Top Rated Doctors
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-primary text-sm">
                      security
                    </span>
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Secure Data
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-20 bg-background-light">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <div className="lg:hidden flex items-center gap-2 mb-6">
                  <div className="size-8 rounded bg-primary text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">
                      health_and_safety
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">CareConnect</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                  Create your account
                </h1>
                <p className="text-slate-500">
                  Join the healthcare revolution. It's quick and easy.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      person
                    </span>
                    Full Name
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                    placeholder="john@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      phone
                    </span>
                    Phone Number
                  </label>
                  <input
                    className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="+91 00000 00000"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      home
                    </span>
                    Residential Address
                  </label>
                  <textarea
                    className="w-full h-24 p-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Enter your full address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* City, State, Pincode Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        location_city
                      </span>
                      City
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        map
                      </span>
                      State
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="State"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        pin_drop
                      </span>
                      Pincode
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="123456"
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Password Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        lock
                      </span>
                      Password
                    </label>
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
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        verified_user
                      </span>
                      Confirm
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors focus:outline-none"
                      >
                        <span className="material-symbols-outlined text-xl">
                          {showConfirmPassword
                            ? "visibility_off"
                            : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary bg-white"
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label className="text-sm text-slate-500" htmlFor="terms">
                    I agree to the{" "}
                    <a
                      className="text-primary hover:underline font-medium"
                      href="#"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      className="text-primary hover:underline font-medium"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className={`w-full h-12 flex items-center justify-center gap-2 font-bold rounded-lg shadow-lg transition-all transform ${
                    loading || !termsAccepted
                      ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                      : "bg-primary hover:bg-primary/90 text-white shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                  type="submit"
                  disabled={loading || !termsAccepted}
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
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      Create Account
                      <span className="material-symbols-outlined">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background-light text-slate-400">
                      Or sign up with
                    </span>
                  </div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors"
                    type="button"
                  >
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-bold text-slate-700">
                      Google
                    </span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors"
                    type="button"
                  >
                    <svg
                      className="size-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-bold text-slate-700">
                      Facebook
                    </span>
                  </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                  Already have an account?{" "}
                  <a
                    className="text-primary font-bold hover:underline"
                    href="/signin"
                  >
                    Log in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 px-10 text-center">
          <p className="text-slate-500 text-xs">
            © 2024 CareConnect Health Systems. All rights reserved.
            <span className="mx-2">|</span>
            Emergency Line:{" "}
            <span className="text-primary font-bold">1-800-CARE</span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PatientSignUp;
