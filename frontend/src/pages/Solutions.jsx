import React from "react";
import Navbar from "../components/Navbar";

const Solutions = () => {
  const solutions = [
    {
      title: "AI Symptom Checker",
      description:
        "Harness the power of AI to perform preliminary symptom analysis and guide patients to the right specialists.",
      icon: "psychology",
      color: "bg-blue-500",
    },
    {
      title: "Hospital Management",
      description:
        "Unified dashboard for hospital administrators to manage beds, staff, and overall operations in real-time.",
      icon: "domain",
      color: "bg-emerald-500",
    },
    {
      title: "Patient Portal",
      description:
        "Secure access for patients to view medical records, book appointments, and track their healthcare journey.",
      icon: "person",
      color: "bg-indigo-500",
    },
    {
      title: "Appointment Scheduling",
      description:
        "Streamlined booking system that reduces wait times and optimizes doctor-patient scheduling.",
      icon: "calendar_month",
      color: "bg-amber-500",
    },
    {
      title: "Secure Data Management",
      description:
        "Enterprise-grade encryption for all medical records and communication, ensuring absolute privacy.",
      icon: "lock",
      color: "bg-rose-500",
    },
    {
      title: "Integrated Pharmacy",
      description:
        "Direct connection between prescriptions and pharmaceutical services for faster medication delivery.",
      icon: "medical_information",
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="bg-background-light font-manrope text-slate-900 min-h-screen">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar role="guest" />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative px-6 py-16 lg:px-10 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <span className="w-fit rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-6 block">
                  How We Help
                </span>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl mb-6">
                  Intelligent Solutions for <br />
                  <span className="text-primary">Modern Healthcare</span>
                </h1>
                <p className="text-xl leading-relaxed text-slate-600">
                  We provide a comprehensive ecosystem of tools designed to
                  optimize the healthcare experience for hospitals, doctors, and
                  patients.
                </p>
              </div>
            </div>
          </section>

          {/* Solutions Grid */}
          <section className="py-20 px-6 lg:px-10 bg-white">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((item, index) => (
                  <div
                    key={index}
                    className="group p-8 rounded-3xl border border-slate-100 bg-background-light hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div
                      className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform`}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-20 px-6 lg:px-10">
            <div className="mx-auto max-w-7xl bg-primary rounded-[3rem] p-12 lg:p-20 text-white flex flex-col items-center text-center">
              <h2 className="text-3xl font-bold mb-12 sm:text-4xl">
                Proven impact in numbers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full">
                <div>
                  <p className="text-4xl font-extrabold mb-2">99%</p>
                  <p className="text-sm opacity-80">Uptime Reliability</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold mb-2">50k+</p>
                  <p className="text-sm opacity-80">Daily Consultations</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold mb-2">200+</p>
                  <p className="text-sm opacity-80">Partner Hospitals</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold mb-2">4.9/5</p>
                  <p className="text-sm opacity-80">User Rating</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-24 px-6 lg:px-10">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-extrabold mb-6">
                  Need a custom solution for your facility?
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  Our expert team is ready to help you customize CareConnect to
                  fit your specific hospital workflow and requirements.
                </p>
                <div className="flex gap-4">
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Book a Demo
                  </button>
                </div>
              </div>
              <div className="bg-white p-2 rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000"
                  alt="Medical Tech"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">
                  medical_services
                </span>
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                  CareConnect
                </h1>
              </div>
              <p className="text-sm text-slate-500">
                © 2024 CareConnect Systems Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Solutions;
