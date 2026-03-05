import React from "react";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";

const HospitalCard = ({
  name,
  address,
  rating,
  image,
  specialties,
  doctorsCount,
  nextAvailable,
  status,
}) => {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/book-appointment", {
      state: {
        hospital: name,
        location: address,
        image: image,
      },
    });
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
      <div className="relative w-full aspect-video bg-slate-200 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={name}
          src={image}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-yellow-500 text-xs fill-1">
            star
          </span>
          <span className="text-xs font-bold text-slate-800">{rating}</span>
        </div>
        <div
          className={`absolute bottom-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
            status === "Open 24/7"
              ? "bg-green-500"
              : status === "Top Rated"
                ? "bg-blue-500"
                : "bg-slate-500"
          }`}
        >
          {status}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h4 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">
            {name}
          </h4>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              location_on
            </span>
            {address}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {specialties.map((spec, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between py-2 border-y border-slate-100 dark:border-slate-800 my-1">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
              Available Doctors
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-bold">
              {doctorsCount}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
              Next Available
            </span>
            <span className="text-primary font-bold">{nextAvailable}</span>
          </div>
        </div>
        <button
          onClick={handleBook}
          className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const Hospitals = () => {
  const hospitalsData = [
    {
      name: "City General Hospital",
      address: "123 Health St, Downtown",
      rating: "4.8",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6j2_YrltDQIeE6jktg3dZSBZmr4xK_t00lXkZpxdIpvxK-ErDNecrCi3BudCiHCqK-E0Rl8KkDv-Jkn2snLUwdJhB4ttSCiJQl_ET_UD1n3gJiAnKWZEwLv94H1_6LexbtWeJmAehQHktO923f8ukH2UShKJ5ECfvcGkujTpj_LnLonb4rDpohNbUFS8hS6H1dmhYxRg7sTayKUgIIlW70ytzA71wkMYxQ0YROTLzbp_r82Z-kCjV8tlqMY4da6ONTnp9_apScxE",
      specialties: ["Cardiology", "Neurology", "+4 more"],
      doctorsCount: "45+ Specialists",
      nextAvailable: "Today, 2:00 PM",
      status: "Open 24/7",
    },
    {
      name: "St. Mary's Specialist Center",
      address: "456 Wellness Ave, Uptown",
      rating: "4.9",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmmhYBEB3rMfcW3IorBf8h-Vmjxj94vADJwCC0fram8c3Cv0K7kyDlgsLQdNFSSLmZjmSLaU-I8F4GAu5U3rS4KICk_YTvtZMbF-3TPpxKGxRSn4FAXmbIFDdz9qbwQ2E7hJeL08InYo7hEDJa88TeoNnBFYkrQjAf3k4TCta6ZkQMh2QpG7UJKMSBihlsZELRPlgZNrz7lRH9Bdhe2wKk7kP1y9COS9ECSsV4lvFAwgco6hYuQQDnQT7u86e9iNbIy9dT0M9KwlA",
      specialties: ["Pediatrics", "Oncology", "+2 more"],
      doctorsCount: "20+ Specialists",
      nextAvailable: "Tomorrow, 9:00 AM",
      status: "Top Rated",
    },
    {
      name: "Green Valley Medical",
      address: "789 Care Rd, Suburbs",
      rating: "4.5",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC6e3JgAHMhp68MDL9WR-3cE48_x5BOg4HxVjSvxhBX2bioBD_oveeBysVQxbfPSvJS9oBVYIuROws1B2_7Goo9qYG3am_fJIoHN0DBEFhA6rWe0RBK_MG0xfKyLwUV3p2XoCmcir1o54NR4fYW-rS2hpnhOYW4IK0p07jOgoZDtFoOtBOJv6JpVT2XpZ5kI8u-Z9N1Lrvd2baN04GARV7no0m0dXZegJ-0Ed0kRZ6mT0Eo6ZADZ9T8tK_Lompsp4nKmlHH6cya4xM",
      specialties: ["Gastroenterology", "Dental Care"],
      doctorsCount: "15+ Specialists",
      nextAvailable: "Mon, 10:30 AM",
      status: "Closes at 8 PM",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden">
      <PatientNavbar />

      <main className="flex-1 px-4 md:px-10 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <section className="flex flex-col gap-2">
            <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-tight">
              Find and Book Hospitals
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-normal max-w-2xl">
              Search by location, specialization, or hospital name to receive
              immediate medical assistance from top-rated facilities.
            </p>
          </section>

          <section className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-primary/5 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="flex items-stretch rounded-lg h-12 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                  <div className="text-slate-400 flex items-center justify-center px-4">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="w-full border-none bg-transparent text-slate-900 dark:text-slate-100 focus:ring-0 px-2 text-base font-medium placeholder:text-slate-400"
                    placeholder="Search hospitals, clinics or doctors..."
                  />
                </label>
              </div>
              <div className="flex flex-wrap md:flex-nowrap gap-3">
                <button className="flex h-12 items-center justify-between gap-x-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 min-w-[160px] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                    <span className="text-sm font-semibold">San Francisco</span>
                  </div>
                  <span className="material-symbols-outlined text-lg">
                    expand_more
                  </span>
                </button>
                <button className="flex h-12 items-center justify-between gap-x-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 min-w-[180px] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      stethoscope
                    </span>
                    <span className="text-sm font-semibold">
                      Specialization
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-lg">
                    expand_more
                  </span>
                </button>
                <button className="flex h-12 w-12 md:w-auto md:px-6 items-center justify-center gap-x-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all">
                  <span className="material-symbols-outlined">tune</span>
                  <span className="hidden md:inline text-sm font-bold">
                    Filters
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold">
                12 Hospitals found in San Francisco
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Sort by:</span>
                <button className="font-semibold text-primary flex items-center">
                  Recommended{" "}
                  <span className="material-symbols-outlined text-sm ml-1">
                    expand_more
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitalsData.map((hospital, idx) => (
                <HospitalCard key={idx} {...hospital} />
              ))}
            </div>

            <div className="flex items-center justify-center pt-8">
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors">
                <span className="material-symbols-outlined text-lg">sync</span>
                Load More Hospitals
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-primary/5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">
                  local_hospital
                </span>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                  CareConnect
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                Connecting patients with the best healthcare facilities and
                specialists around the globe for a healthier tomorrow.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase text-xs tracking-widest">
                Support
              </h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a className="hover:text-primary" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Emergency Services
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase text-xs tracking-widest">
                Company
              </h5>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a className="hover:text-primary" href="#">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs">
              © 2024 CareConnect Health Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">
                public
              </span>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">
                mail
              </span>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary">
                share
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hospitals;