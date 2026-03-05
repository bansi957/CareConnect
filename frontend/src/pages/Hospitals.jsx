import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PatientNavbar from "../components/PatientNavbar";
import { serverUrl } from "../App";

// All hospital categories from the signup form
const ALL_CATEGORIES = [
  "All",
  "General",
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Oncology",
  "Gynecology",
  "Dermatology",
  "Dental",
  "Ophthalmology",
  "Psychiatry",
  "ENT",
  "Gastroenterology",
];

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();
  const {
    name,
    address,
    city,
    state,
    hospitalCategory,
    image,
    noOfDoctors,
    availableBeds,
    workingHours,
    _id,
  } = hospital;

  const handleBook = () => {
    navigate("/book-appointment", {
      state: {
        hospital: name,
        location: `${address}, ${city}`,
        image,
        hospitalId: _id,
      },
    });
  };

  const fallbackImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=137fec&color=fff&size=400&font-size=0.33&bold=true`;

  return (
    <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={name}
          src={image || fallbackImg}
          onError={(e) => {
            e.target.src = fallbackImg;
          }}
        />
        {workingHours && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {workingHours}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h4 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">
            {name}
          </h4>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">
              location_on
            </span>
            {address}, {city}, {state}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-bold rounded-full">
            {hospitalCategory}
          </span>
        </div>

        <div className="flex items-center justify-between py-3 border-y border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
              Doctors
            </span>
            <span className="text-slate-900 dark:text-slate-100 font-bold">
              {noOfDoctors ?? "—"}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-100 dark:bg-slate-800"></div>
          <div className="flex flex-col items-center">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
              Avail. Beds
            </span>
            <span className="text-primary font-bold">
              {availableBeds ?? "—"}
            </span>
          </div>
        </div>

        <button
          onClick={handleBook}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchState, setSearchState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (searchName.trim()) params.name = searchName.trim();
      if (searchLocation.trim()) params.city = searchLocation.trim();
      if (searchState.trim()) params.state = searchState.trim();
      if (selectedCategory && selectedCategory !== "All")
        params.hospitalCategory = selectedCategory;

      const res = await axios.get(
        `${serverUrl}/api/hospital/get-all-hospitals`,
        {
          params,
          withCredentials: true,
        },
      );
      let data = res.data.hospitals || [];

      // Client-side sort
      if (sortBy === "beds-asc")
        data = [...data].sort(
          (a, b) => (a.availableBeds ?? 0) - (b.availableBeds ?? 0),
        );
      if (sortBy === "beds-desc")
        data = [...data].sort(
          (a, b) => (b.availableBeds ?? 0) - (a.availableBeds ?? 0),
        );
      if (sortBy === "doctors")
        data = [...data].sort(
          (a, b) => (b.noOfDoctors ?? 0) - (a.noOfDoctors ?? 0),
        );
      if (sortBy === "name-az")
        data = [...data].sort((a, b) => a.name.localeCompare(b.name));

      setHospitals(data);
    } catch (err) {
      setError("Failed to load hospitals. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchName, searchLocation,searchState, selectedCategory, sortBy]);

  // Debounce: only fetch 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHospitals();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchHospitals]);

  return (
    <div className="bg-background-light font-manrope text-slate-900 min-h-screen flex flex-col overflow-x-hidden">
      <PatientNavbar />

      <main className="flex-1 px-4 md:px-10 lg:px-20 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <section className="flex flex-col gap-2">
            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">
              Find &amp; Book Hospitals
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Search by location, specialization, or hospital name to connect
              with top-rated facilities.
            </p>
          </section>

          {/* Search & Filters */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-primary/5 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3">
              {/* Name Search */}
              <label className="flex flex-1 items-center rounded-xl h-12 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/40 transition-all bg-slate-50">
                <div className="text-slate-400 flex items-center justify-center px-4">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="w-full border-none bg-transparent text-slate-900 focus:outline-none px-2 text-sm font-medium placeholder:text-slate-400"
                  placeholder="Search by hospital name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                {searchName && (
                  <button
                    onClick={() => setSearchName("")}
                    className="px-3 text-slate-400 hover:text-slate-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </label>

              {/* City Search */}
              <label className="flex items-center rounded-xl h-12 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/40 transition-all bg-slate-50 min-w-[180px]">
                <div className="text-slate-400 flex items-center justify-center px-4">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <input
                  className="w-full border-none bg-transparent text-slate-900 focus:outline-none px-2 text-sm font-medium placeholder:text-slate-400"
                  placeholder="Filter by city..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                {searchLocation && (
                  <button
                    onClick={() => setSearchLocation("")}
                    className="px-3 text-slate-400 hover:text-slate-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </label>

              {/* State Search */}
              <label className="flex items-center rounded-xl h-12 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/40 transition-all bg-slate-50 min-w-[180px]">
                <div className="text-slate-400 flex items-center justify-center px-4">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <input
                  className="w-full border-none bg-transparent text-slate-900 focus:outline-none px-2 text-sm font-medium placeholder:text-slate-400"
                  placeholder="Filter by state..."
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                />
                {searchState && (
                  <button
                    onClick={() => setSearchState("")}
                    className="px-3 text-slate-400 hover:text-slate-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </label>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* Results Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-slate-900 text-xl font-bold">
              {loading
                ? "Searching..."
                : `${hospitals.length} Hospital${hospitals.length !== 1 ? "s" : ""} found`}
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-semibold text-primary bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="default">Recommended</option>
                <option value="name-az">Name (A–Z)</option>
                <option value="doctors">Most Doctors</option>
                <option value="beds-desc">Most Available Beds</option>
                <option value="beds-asc">Fewest Available Beds</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-slate-200"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    <div className="h-10 bg-slate-100 rounded-xl mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col items-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">
                error
              </span>
              <p className="text-slate-500 mt-4 font-medium">{error}</p>
              <button
                onClick={fetchHospitals}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm"
              >
                Retry
              </button>
            </div>
          ) : hospitals.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">
                search_off
              </span>
              <p className="text-slate-500 mt-4 font-medium">
                No hospitals match your search.
              </p>
              <button
                onClick={() => {
                  setSearchName("");
                  setSearchLocation("");
                  setSearchState("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-sm"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital) => (
                <HospitalCard key={hospital._id} hospital={hospital} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary/5 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined">local_hospital</span>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                CareConnect
              </span>
            </div>
            <p className="text-slate-400 text-xs">
              © 2024 CareConnect Health Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hospitals;
