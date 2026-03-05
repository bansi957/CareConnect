import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import { useSelector } from "react-redux";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hospitalData = location.state || {
    hospital: "City General Hospital",
    location: "123 Health St, Downtown",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6j2_YrltDQIeE6jktg3dZSBZmr4xK_t00lXkZpxdIpvxK-ErDNecrCi3BudCiHCqK-E0Rl8KkDv-Jkn2snLUwdJhB4ttSCiJQl_ET_UD1n3gJiAnKWZEwLv94H1_6LexbtWeJmAehQHktO923f8ukH2UShKJ5ECfvcGkujTpj_LnLonb4rDpohNbUFS8hS6H1dmhYxRg7sTayKUgIIlW70ytzA71wkMYxQ0YROTLzbp_r82Z-kCjV8tlqMY4da6ONTnp9_apScxE",
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    age: "",
    gender: "Male",
    problem: "",
  });
  const [step, setStep] = useState(1); // 1: Select Slot, 2: Confirmation

  const doctors = [
    {
      name: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      rating: "4.9",
      experience: "12 years",
    },
    {
      name: "Dr. James Miller",
      specialty: "Neurologist",
      rating: "4.8",
      experience: "15 years",
    },
    {
      name: "Dr. Elena Rodriguez",
      specialty: "General Physician",
      rating: "4.7",
      experience: "8 years",
    },
  ];

  const timeSlots = [
    "09:00 AM",
    "10:30 AM",
    "11:45 AM",
    "01:15 PM",
    "02:30 PM",
    "04:00 PM",
    "05:15 PM",
  ];

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      fullDate: d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };
  });

  const handleConfirm = () => {
    if (
      selectedDate &&
      selectedTime &&
      patientDetails.age &&
      patientDetails.problem
    ) {
      setStep(2);
    }
  };
  const { userData } = useSelector((state) => state.user);  
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased">
      <PatientNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Doctor & Hospital Info */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-primary/10 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                  <div className="h-40 w-40 rounded-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl shadow-primary/10">
                    <img
                      className="h-full w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNbx2d8fr7aSC-CXeqD2CQjf2YUBE3n2Q91VsBRhD3k9dJT5YocNUKFJre4I94Ke_sL5uqz5IVca8tY1jn09I8eHqb86GtQ9myuuJKpX49z2PW_rS_LmQKxwxSLx5sgmBQZGx8r-11WR2jJ1M_TEj4skixYwQR5LreA4ZkzBudGJF3ohgXKC6vsT9disFSir_F33VJJlJg_yKQltOX_bFX4yaxrfA6ZKHUA8ipXlsSWC5zEWL4EATZeS21sh8UcwT_QJ3DpwhVM"
                      alt="Doctor"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <h1 className="text-3xl font-black tracking-tight italic text-slate-900 dark:text-slate-100">
                        Dr. Sarah Wilson
                      </h1>
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                        Available
                      </div>
                    </div>
                    <p className="text-lg text-primary font-bold mb-4 italic">
                      Senior Cardiologist • MBBS, MD
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-bold text-slate-500">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          local_hospital
                        </span>
                        {hospitalData.hospital}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          star
                        </span>
                        4.9 (120+ Reviews)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">
                          work
                        </span>
                        12+ Years Exp.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <span className="material-symbols-outlined text-[120px] rotate-12">
                    medical_services
                  </span>
                </div>
              </section>

              {/* Patient Details Form - NEW */}
              <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-primary/10 space-y-6">
                <h3 className="text-xl font-extrabold flex items-center gap-2 italic">
                  <span className="material-symbols-outlined text-primary">
                    person_edit
                  </span>
                  Patient Information (OP Details)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Patient Age
                    </label>
                    <input
                      type="number"
                      placeholder="Enter age"
                      value={patientDetails.age}
                      onChange={(e) =>
                        setPatientDetails({
                          ...patientDetails,
                          age: e.target.value,
                        })
                      }
                      className="w-full bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl py-3 px-4 text-sm font-bold focus:border-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Gender
                    </label>
                    <div className="flex gap-2">
                      {["Male", "Female", "Other"].map((g) => (
                        <button
                          key={g}
                          onClick={() =>
                            setPatientDetails({ ...patientDetails, gender: g })
                          }
                          className={`flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                            patientDetails.gender === g
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/10"
                              : "bg-white dark:bg-slate-900 border-primary/10 text-slate-400 hover:border-primary/30"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Reason for Visit / Problem Description
                  </label>
                  <textarea
                    placeholder="Describe your health concern in detail..."
                    rows="3"
                    value={patientDetails.problem}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        problem: e.target.value,
                      })
                    }
                    className="w-full bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl py-4 px-4 text-sm font-bold focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </section>

              {/* Date Selection */}
              <section className="space-y-4">
                <h3 className="text-xl font-extrabold flex items-center gap-2 italic">
                  <span className="material-symbols-outlined text-primary">
                    calendar_month
                  </span>
                  Select Appointment Date
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {dates.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`min-w-[100px] flex flex-col items-center p-4 rounded-2xl border transition-all shrink-0 ${
                        selectedDate?.date === d.date
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                          : "bg-white dark:bg-slate-900 border-primary/10 text-slate-600 dark:text-slate-400 hover:border-primary/30"
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-widest mb-1">
                        {d.day}
                      </span>
                      <span className="text-2xl font-black">{d.date}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Time Selection */}
              <section className="space-y-4">
                <h3 className="text-xl font-extrabold flex items-center gap-2 italic">
                  <span className="material-symbols-outlined text-primary">
                    schedule
                  </span>
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {timeSlots.map((time, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                        selectedTime === time
                          ? "bg-primary border-primary text-white shadow-lg"
                          : "bg-white dark:bg-slate-900 border-primary/10 text-slate-600 dark:text-slate-400 hover:border-primary/30"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: Sticky Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 text-white p-8 rounded-[40px] sticky top-28 shadow-2xl border border-white/5 space-y-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400 mb-6">
                    Appointment Summary
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">
                          person
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-0.5 tracking-wider">
                          Patient Details
                        </p>
                        <p className="font-bold">
                          {userData?.fullName || "John Doe"}
                        </p>
                        {patientDetails.age && (
                          <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">
                            Age: {patientDetails.age} • {patientDetails.gender}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">
                          calendar_today
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-0.5 tracking-wider">
                          Date & Time
                        </p>
                        <p className="font-bold">
                          {selectedDate
                            ? `${selectedDate.fullDate}`
                            : "Select Date"}
                        </p>
                        <p className="text-primary font-black uppercase tracking-widest text-[10px] mt-1">
                          {selectedTime || "Select Time"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">
                          location_on
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-500 mb-0.5 tracking-wider">
                          Visit Location
                        </p>
                        <p className="font-bold text-sm leading-relaxed">
                          {hospitalData.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-bold">
                      Consultation Fee
                    </span>
                    <span className="font-black">$120.00</span>
                  </div>
                  <button
                    disabled={
                      !selectedDate ||
                      !selectedTime ||
                      !patientDetails.age ||
                      !patientDetails.problem
                    }
                    onClick={handleConfirm}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:pointer-events-none"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-20 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="size-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 text-white mb-6">
              <span className="material-symbols-outlined text-6xl font-bold">
                check
              </span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black italic">
                Appointment Confirmed!
              </h2>
              <p className="text-slate-500 font-bold text-lg max-w-md mx-auto">
                Your physical visit with{" "}
                <span className="text-primary">Dr. Sarah Wilson</span> has been
                successfully scheduled.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-3xl p-8 space-y-6 text-left shadow-sm">
              <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Appointment ID
                </span>
                <span className="font-bold text-sm">
                  #CC-{"3498".toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    Date
                  </p>
                  <p className="font-bold">{selectedDate.fullDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    Time
                  </p>
                  <p className="font-bold">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    Patient Details
                  </p>
                  <p className="font-bold">
                    {patientDetails.age} yrs • {patientDetails.gender}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    OP Status
                  </p>
                  <p className="font-bold text-emerald-500">Registered</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    Medical Concern
                  </p>
                  <p className="font-bold leading-relaxed italic text-slate-600 dark:text-slate-400">
                    "{patientDetails.problem}"
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-black uppercase text-slate-500 mb-1">
                    Location
                  </p>
                  <p className="font-bold leading-relaxed text-sm">
                    {hospitalData.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-10">
              <button
                onClick={() => navigate("/patients-appointments")}
                className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
              >
                View My Appointments
              </button>
              <button
                onClick={() => navigate("/home")}
                className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookAppointment;