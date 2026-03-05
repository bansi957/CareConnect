import React from "react";
import { useSelector } from "react-redux";
import PatientNavbar from "../components/PatientNavbar";

const AiSymnptomChecker = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="bg-white dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden antialiased bg-linear-to-r from-primary/5 via-white to-primary/5 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <PatientNavbar />

      <main className="flex flex-1 px-4 sm:px-6 lg:px-10 py-6 md:py-8 gap-8 max-w-7xl mx-auto w-full">
        {/* Main assessment area - No sidebar */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-primary/10 shadow-sm overflow-hidden relative">
            <div className="p-4 sm:p-6 md:p-8 border-b border-primary/5 bg-linear-to-r from-primary/5 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl">
                    psychology
                  </span>
                  Guided AI Assessment
                </h1>
                <p className="text-slate-500 mt-1 font-medium text-xs sm:text-sm">
                  Describe your symptoms below for an instant preliminary
                  diagnosis.
                </p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  AI Engine Active
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 chat-container space-y-6 max-h-[50vh] sm:max-h-[60vh]">
              <div className="flex gap-3 sm:gap-4 max-w-[90%] sm:max-w-2xl">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-lg sm:text-xl leading-none">
                    smart_toy
                  </span>
                </div>
                <div className="bg-primary/5 p-3 sm:p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Hello {userData?.fullName || "there"}! I'm your AI health
                  assistant. How are you feeling today? Please describe any
                  symptoms you're experiencing, even the minor ones.
                </div>
              </div>

              {/* Sample User Message */}
              <div className="flex gap-3 sm:gap-4 max-w-[90%] sm:max-w-2xl ml-auto flex-row-reverse">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border-2 border-primary/10 font-bold text-primary text-xs sm:text-sm">
                  {userData?.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="bg-primary p-3 sm:p-4 rounded-2xl rounded-tr-none text-xs sm:text-sm leading-relaxed text-white shadow-sm shadow-primary/10">
                  I've been having a persistent dry cough and some mild chest
                  tightness since yesterday morning. No fever though.
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 max-w-[90%] sm:max-w-2xl">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-lg sm:text-xl leading-none">
                    smart_toy
                  </span>
                </div>
                <div className="bg-primary/5 p-3 sm:p-4 rounded-2xl rounded-tl-none text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <p className="mb-3">
                    I understand. Have you also experienced any of the
                    following? (Select all that apply)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-primary text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
                      Shortness of breath
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-primary text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
                      Sore throat
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-primary text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
                      Fatigue
                    </button>
                    <button className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20 bg-white dark:bg-slate-800 text-primary text-[10px] sm:text-xs font-bold hover:bg-primary hover:text-white transition-all active:scale-95">
                      None of these
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 border-t border-primary/5 bg-slate-50/30 dark:bg-slate-800/10">
              <div className="relative max-w-4xl mx-auto">
                <textarea
                  className="w-full rounded-2xl border-2 border-primary/10 bg-white dark:bg-slate-800 p-3 sm:p-4 pr-12 sm:pr-16 text-xs sm:text-sm focus:border-primary focus:ring-0 transition-all resize-none shadow-sm"
                  placeholder="Type your symptoms here..."
                  rows="2"
                ></textarea>
                <button className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 bg-primary text-white h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-lg sm:text-xl">
                    send
                  </span>
                </button>
              </div>
              <p className="text-[9px] sm:text-[10px] text-center text-slate-400 mt-4 uppercase tracking-[0.2em] font-black leading-relaxed">
                AI-driven assessment for informational purposes only. Consult a
                doctor for medical emergencies.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center px-4 gap-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <span className="material-symbols-outlined text-lg">
                  calendar_today
                </span>
                Upcoming Visits (2)
              </button>
              <span className="hidden sm:inline text-slate-300">|</span>
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <span className="material-symbols-outlined text-lg">
                  description
                </span>
                Recent Reports (5)
              </button>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-primary/10 hover:text-primary px-5 py-2.5 rounded-xl text-slate-600 transition-all text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-sm border border-primary/5">
              <span className="material-symbols-outlined text-lg">
                dashboard
              </span>
              View Dashboard Summary
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-center px-6 border-t border-slate-100 dark:border-slate-800">
        <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-widest">
          © 2024 CareConnect • Secure Patient Portal •{" "}
          <span className="text-primary cursor-pointer hover:underline">
            Help Center
          </span>
        </p>
      </footer>
    </div>
  );
};

export default AiSymnptomChecker;