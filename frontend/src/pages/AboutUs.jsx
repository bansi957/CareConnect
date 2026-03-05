import React from "react";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  return (
    <div className="bg-background-light font-manrope text-slate-900 min-h-screen">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Navbar role="guest" />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative px-6 py-16 lg:px-10 lg:py-24 bg-white">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <span className="w-fit mx-auto rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-6 block">
                  Get to Know Us
                </span>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl mb-6">
                  Empowering Healthcare through{" "}
                  <span className="text-primary">Connection</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-600">
                  CareConnect is more than just a platform; it's a bridge
                  between technology and humanity, designed to streamline
                  medical services and improve patient outcomes globally.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-3xl">
                      flag
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-slate-600 leading-relaxed">
                    To revolutionize the way healthcare services are delivered
                    by providing a unified, intuitive platform that connects
                    hospitals, practitioners, and patients seamlessly. We strive
                    to eliminate technical barriers in medical management.
                  </p>
                </div>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow">
                  <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-3xl">
                      visibility
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-slate-600 leading-relaxed">
                    A world where every individual has instant access to quality
                    healthcare through intelligent digital solutions, making
                    medical care more efficient, transparent, and accessible to
                    everyone, everywhere.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-20 bg-slate-900 text-white px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-extrabold mb-8 sm:text-4xl">
                    Our Story
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    Founded in 2024, CareConnect emerged from a simple
                    observation: the digital gap in healthcare management was
                    hindering the quality of patient care. Our team of
                    healthcare professionals and tech enthusiasts came together
                    to build a solution that matters.
                  </p>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Today, we serve hundreds of hospitals and thousands of
                    patients, continuously innovating to meet the evolving needs
                    of the modern medical landscape.
                  </p>
                </div>
                <div className="relative">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000"
                      alt="Our Team Working"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-primary p-8 rounded-2xl shadow-xl hidden md:block">
                    <p className="text-3xl font-bold">100+</p>
                    <p className="text-sm opacity-80">Hospitals Connected</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Join Us CTA */}
          <section className="py-24 px-6 lg:px-10 text-center">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-extrabold mb-8">
                Ready to transform your practice?
              </h2>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] transition-transform">
                Get Started with CareConnect
              </button>
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

export default AboutUs;
