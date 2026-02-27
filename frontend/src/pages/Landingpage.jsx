import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Landingpage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light font-manrope text-slate-900 min-h-screen">
      {/* Main Wrapper */}
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar role="guest" />

        {/* Hero Section */}
        <main className="flex-1">
          <section className="relative px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                      Next-Gen Healthcare Management
                    </span>
                    <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                      Connecting You to Care,{" "}
                      <span className="text-primary">Instantly.</span>
                    </h2>
                    <p className="max-w-xl text-lg leading-relaxed text-slate-600">
                      Experience a seamless hospital management system designed
                      for admins, doctors, and patients. Modern healthcare
                      delivery optimized for the digital age.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() =>
                        document
                          .getElementById("portal-selection")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="flex h-12 min-w-[160px] items-center justify-center rounded-xl bg-primary px-6 font-bold text-white shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform"
                    >
                      Join Now
                    </button>
                  </div>
                </div>
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-3xl bg-primary/5 shadow-2xl">
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent"></div>
                    <div
                      className="h-full w-full bg-center bg-cover bg-no-repeat transition-transform hover:scale-105 duration-700"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYQC5KS_11cMdVMLhMMqZGbh4bOH3hDe8AlhmVF1jgdXSYfSXQVv_qsTbhUDnyPyoStUIeo0Ql2fVtnjYqJ1jnBgQksPpqgpRxI8AWwDlfEqpxviTJUDVwpqEtGw461UoyTTTg37uOAi4gRyyqki6SqbojMjUXhKah79OonA7EQu1XkSURMR3xDmK3c8TnNvyh5pccqjWAcuObgj4-yXAKXPaMsmwltJlbwwxrApnimJTAhuOKCtz7vWerJUiaNsgV1Y532kme47o')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portal Selection Section */}
          <section id="portal-selection" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
              <div className="mb-16">
                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Choose Your Portal
                </h2>
                <p className="mt-4 text-slate-600">
                  Tailored experiences for every user in the healthcare
                  ecosystem.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Admin Card */}
                <div className="group relative flex flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-4xl">
                      domain
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Register Hospital</h3>
                    <p className="text-sm text-slate-500">
                      Scale your medical facility operations with our
                      comprehensive management dashboard.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/hospital-signup")}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold text-primary group-hover:bg-primary/10 transition-colors"
                  >
                    Admin Access{" "}
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
                {/* Doctor Card */}
                <div className="group relative flex flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-4xl">
                      stethoscope
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Doctor Login</h3>
                    <p className="text-sm text-slate-500">
                      Access patient records, manage appointments, and
                      streamline your clinical workflow.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/signin", { state: { role: "doctor" } })
                    }
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold text-primary group-hover:bg-primary/10 transition-colors"
                  >
                    Practitioner Login{" "}
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
                {/* Patient Portal */}
                <div className="group relative flex flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-background-light p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-4xl">
                      person
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">Patient Portal</h3>
                    <p className="text-sm text-slate-500">
                      View lab results, book visits, and communicate with your
                      healthcare providers securely.
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/patient-signup")}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg py-3 font-bold text-primary group-hover:bg-primary/10 transition-colors"
                  >
                    Register / Login{" "}
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              <div className="col-span-2 lg:col-span-2">
                <div className="flex items-center gap-2 text-primary mb-6">
                  <span className="material-symbols-outlined text-2xl font-bold">
                    medical_services
                  </span>
                  <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                    CareConnect
                  </h1>
                </div>
                <p className="max-w-xs text-sm text-slate-500 leading-relaxed">
                  Connecting hospitals, doctors, and patients through a unified
                  digital platform for better outcomes.
                </p>
              </div>
              <div>
                <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">
                  Legal
                </h4>
                <ul className="flex flex-col gap-4 text-sm text-slate-500">
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover:text-primary transition-colors"
                      href="#"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-slate-500">
                © 2024 CareConnect Systems Inc. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  className="text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a
                  className="text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">share</span>
                </a>
                <a
                  className="text-slate-400 hover:text-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined">mail</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landingpage;
