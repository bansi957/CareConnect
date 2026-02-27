import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../components/AuthHeader";

// Defined OUTSIDE the parent component so React never treats it as a new
// component type on re-renders — that would cause inputs to lose focus after
// every single keystroke.
const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  minLength,
  value,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      minLength={minLength}
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm text-gray-900"
      placeholder={placeholder}
    />
  </div>
);

const HospitalSignUp = () => {
  const navigate = useNavigate();

  // Toggle between Sign Up and Sign In
  const [isSignIn, setIsSignIn] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    hospitalCategory: "",
    registrationNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clear messages + reset fields when toggling mode
  const handleToggleMode = () => {
    setIsSignIn((prev) => !prev);
    setError("");
    setSuccess("");
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      hospitalCategory: "",
      registrationNumber: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isSignIn) {
        // Sign In: send only registrationNumber, email, password
        const { registrationNumber, email, password } = formData;
        const response = await axios.post(
          "http://localhost:3000/api/hospital/hospital-signin",
          { registrationNumber, email, password },
          { withCredentials: true },
        );
        if (response.status === 200) {
          setSuccess("Signed in successfully! Redirecting...");
          setTimeout(() => navigate("/hospital-dashboard"), 1500);
        }
      } else {
        // Sign Up: send full form
        const response = await axios.post(
          "http://localhost:3000/api/hospital/hospital-signup",
          formData,
          { withCredentials: true },
        );
        if (response.status === 201) {
          setSuccess("Hospital account created successfully!");
          setTimeout(() => navigate("/hospital-dashboard"), 1500);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `An error occurred during ${isSignIn ? "sign in" : "sign up"}.`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col font-sans">
      <AuthHeader />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Branding */}
          <div className="md:w-5/12 bg-blue-600 p-8 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                CareConnect
              </h1>
              <p className="text-blue-200 text-lg">
                {isSignIn
                  ? "Welcome back! Sign in to manage your facility."
                  : "Partner with us to provide better healthcare access."}
              </p>
            </div>

            <div className="relative z-10 mt-12 md:max-h-full max-h-48 overflow-hidden rounded-xl shadow-lg border border-blue-400">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hospital Building"
                className="w-full h-full object-cover opacity-90 transition duration-500 hover:scale-105 hover:opacity-100"
              />
            </div>

            <div className="relative z-10 mt-8">
              <h3 className="text-xl font-bold mb-2">Why join us?</h3>
              <ul className="space-y-3 text-blue-100 text-sm">
                {[
                  "Streamline Patient Referrals",
                  "Enhance Community Reach",
                  "Secure Data Management",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500 opacity-50 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500 opacity-50 blur-3xl" />
          </div>

          {/* Right Side: Form */}
          <div className="md:w-7/12 p-8 sm:p-12 overflow-y-auto">
            {/* Mode heading + animated underline indicator */}
            <div className="mb-8">
              <div className="flex gap-6 mb-1">
                <button
                  type="button"
                  onClick={() => !isSignIn || handleToggleMode()}
                  className={`text-2xl font-bold pb-1 border-b-2 transition-colors ${
                    !isSignIn
                      ? "border-blue-600 text-gray-800"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => isSignIn || handleToggleMode()}
                  className={`text-2xl font-bold pb-1 border-b-2 transition-colors ${
                    isSignIn
                      ? "border-blue-600 text-gray-800"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  Sign In
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                {isSignIn
                  ? "Enter your credentials to access your hospital dashboard."
                  : "Fill in the details below to register your facility."}
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm font-medium">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md text-sm font-medium">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignIn ? (
                /* ---- SIGN IN FIELDS ---- */
                <>
                  <Field
                    label="Registration Number"
                    name="registrationNumber"
                    placeholder="REG-123456"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="contact@hospital.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </>
              ) : (
                /* ---- SIGN UP FIELDS ---- */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field
                    label="Hospital Name"
                    name="name"
                    placeholder="City General Hospital"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="Registration No."
                    name="registrationNumber"
                    placeholder="REG-123456"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                  />
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="contact@hospital.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Field
                    label="Mobile / Phone"
                    name="mobile"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.mobile}
                    onChange={handleChange}
                  />

                  <div className="md:col-span-2">
                    <Field
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Hospital Category */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hospital Category
                    </label>
                    <select
                      name="hospitalCategory"
                      value={formData.hospitalCategory}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm text-gray-900 appearance-none"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="General">General</option>
                      <option value="Specialized">Specialized</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Diagnostic Center">
                        Diagnostic Center
                      </option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="2"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm text-gray-900 resize-none"
                      placeholder="123 Health Ave, Suite 100"
                    />
                  </div>

                  <Field
                    label="City"
                    name="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <Field
                    label="State / Province"
                    name="state"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={handleChange}
                  />

                  <div>
                    <Field
                      label="Pincode / Zip Code"
                      name="pincode"
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      {isSignIn ? "Signing In..." : "Registering Facility..."}
                    </span>
                  ) : isSignIn ? (
                    "Sign In"
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>

              {/* Toggle link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {isSignIn
                    ? "Don't have an account? "
                    : "Already registered? "}
                  <button
                    type="button"
                    onClick={handleToggleMode}
                    className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    {isSignIn ? "Register your hospital" : "Sign in instead"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalSignUp;
