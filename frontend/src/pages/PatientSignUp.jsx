import React from "react";

const PatientSignUp = () => {
  return (
    <div className="bg-background-light text-slate-900 antialiased min-h-screen font-manrope">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        {/* Navigation Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 bg-white px-6 py-4 md:px-20 lg:px-40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
              <span className="material-symbols-outlined">
                health_and_safety
              </span>
            </div>
            <h2 className="text-slate-900 text-xl font-extrabold tracking-tight">
              CareConnect
            </h2>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            <nav className="hidden md:flex items-center gap-8">
              <a
                className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Home
              </a>
              <a
                className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Find Doctors
              </a>
              <a
                className="text-slate-600 text-sm font-semibold hover:text-primary transition-colors"
                href="#"
              >
                Services
              </a>
            </nav>
            <div className="flex gap-3">
              <button className="flex min-w-[84px] items-center justify-center rounded-lg h-10 px-4 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-all">
                Login
              </button>
            </div>
          </div>
        </header>

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

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
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
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        verified_user
                      </span>
                      Confirm
                    </label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      placeholder="••••••••"
                      type="password"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    className="mt-1 size-4 rounded border-slate-300 text-primary focus:ring-primary bg-white"
                    id="terms"
                    type="checkbox"
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
                  className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                  type="submit"
                >
                  Create Account
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
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
                    href="#"
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
