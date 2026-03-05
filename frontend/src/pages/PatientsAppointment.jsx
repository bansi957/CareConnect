import React from "react";
import PatientNavbar from "../components/PatientNavbar";
import { useNavigate } from "react-router-dom";

const AppointmentCard = ({
  doctor,
  specialty,
  date,
  time,
  image,
  status,
  location,
}) => (
  <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-lg hover:border-primary/30 transition-all gap-6 group">
    <div className="flex items-center gap-5">
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border-2 border-primary/5 group-hover:border-primary/20 transition-all">
          <img
            className="h-full w-full object-cover"
            src={image}
            alt={doctor}
          />
        </div>
        <div
          className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white dark:border-slate-900 ${
            status === "Upcoming"
              ? "bg-emerald-500"
              : status === "Completed"
                ? "bg-blue-500"
                : "bg-slate-400"
          }`}
        ></div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-extrabold text-slate-900 dark:text-slate-100 italic">
            {doctor}
          </h4>
          <span className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest">
            Physical Visit
          </span>
        </div>
        <p className="text-sm text-slate-500 font-bold mb-2">{specialty}</p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                calendar_today
              </span>
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              {time}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-primary italic">
            <span className="material-symbols-outlined text-sm">
              location_on
            </span>
            {location}
          </div>
        </div>
      </div>
    </div>
    <div className="flex gap-3 w-full sm:w-auto">
      {status === "Upcoming" ? (
        <>
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
            Get Directions
          </button>
          <button className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95">
            Reschedule
          </button>
        </>
      ) : (
        <button className="w-full sm:w-auto px-6 py-2.5 bg-primary/5 text-primary rounded-xl text-xs font-black hover:bg-primary/10 transition-all">
          View Visit Summary
        </button>
      )}
    </div>
  </div>
);

const PatientsAppointment = () => {
  const appointments = [
    {
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiology Specialist",
      date: "Oct 12, 2024",
      time: "10:30 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtNbx2d8fr7aSC-CXeqD2CQjf2YUBE3n2Q91VsBRhD3k9dJT5YocNUKFJre4I94Ke_sL5uqz5IVca8tY1jn09I8eHqb86GtQ9myuuJKpX49z2PW_rS_LmQKxwxSLx5sgmBQZGx8r-11WR2jJ1M_TEj4skixYwQR5LreA4ZkzBudGJF3ohgXKC6vsT9disFSir_F33VJJlJg_yKQltOX_bFX4yaxrfA6ZKHUA8ipXlsSWC5zEWL4EATZeS21sh8UcwT_QJ3DpwhVM",
      status: "Upcoming",
      location: "City General Hospital, Wing A",
    },
    {
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "Oct 15, 2024",
      time: "02:15 PM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDhEaa33VXijHCDx86ka-dMJgQqQm6iDQEL3f3vaqHsGOd0efMKRd-71oW9MzNWqOns3JsoQwHZllRMG-QGymwfVTIvfnlWnn8P1LYNaiuSzveuvjXIrIJ9hBs_5dGJrlp8-UyLxQB5hWo65BoVSpn628bPaHwbfX-GPr7Wxf4_F6XW6GJirYxGL_ZYwZ-M6jw_HIELPQhwVxMD8gHXjr9GcJgQj4SwXBcXoiSezMcFE3WuKLlgxgtC2gRnBKsZ_G29GNjy2sDFvCE",
      status: "Upcoming",
      location: "St. Mary's Center, 4th Floor",
    },
    {
      doctor: "Dr. Emily Brooks",
      specialty: "Dermatologist",
      date: "Sep 28, 2024",
      time: "11:00 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtNbx2d8fr7aSC-CXeqD2CQjf2YUBE3n2Q91VsBRhD3k9dJT5YocNUKFJre4I94Ke_sL5uqz5IVca8tY1jn09I8eHqb86GtQ9myuuJKpX49z2PW_rS_LmQKxwxSLx5sgmBQZGx8r-11WR2jJ1M_TEj4skixYwQR5LreA4ZkzBudGJF3ohgXKC6vsT9disFSir_F33VJJlJg_yKQltOX_bFX4yaxrfA6ZKHUA8ipXlsSWC5zEWL4EATZeS21sh8UcwT_QJ3DpwhVM",
      status: "Completed",
      location: "City General Hospital, Dermatology Clinic",
    },
  ];
  const navigate=useNavigate()
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased min-h-screen flex flex-col overflow-x-hidden font-display">
      <PatientNavbar />
      <main className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-10 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 italic">
              My Appointments
            </h1>
            <p className="text-slate-500 font-bold text-lg">
              Manage your healthcare schedule for in-person doctor visits.
            </p>
          </div>
          <button onClick={()=>{navigate("/hospitals")}} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined font-bold">add</span>
            New Appointment
          </button>
        </div>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Upcoming",
              count: "2",
              icon: "event_upcoming",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10",
            },
            {
              label: "Completed",
              count: "14",
              icon: "check_circle",
              color: "text-blue-500",
              bg: "bg-blue-500/10",
            },
            {
              label: "Canceled",
              count: "1",
              icon: "cancel",
              color: "text-rose-500",
              bg: "bg-rose-500/10",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-primary/10 flex items-center gap-5"
            >
              <div
                className={`size-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
              >
                <span className="material-symbols-outlined font-bold">
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[2px] text-slate-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {stat.count}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* List Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-primary/5 flex items-center justify-between bg-primary/5">
            <h2 className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                format_list_bulleted
              </span>
              Appointment Schedule
            </h2>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-white dark:bg-slate-900 rounded-lg text-xs font-black text-primary shadow-sm">
                List View
              </button>
              <button className="px-4 py-1.5 text-xs font-black text-slate-400 hover:text-slate-600">
                Calendar
              </button>
            </div>
          </div>
          <div className="p-8 space-y-4">
            {appointments.map((apt, idx) => (
              <AppointmentCard key={idx} {...apt} />
            ))}
          </div>
        </div>

        {/* Informational Banner */}
        <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-black mb-3 italic">
              Not feeling well today?
            </h3>
            <p className="text-slate-400 font-bold mb-6">
              Our AI Predictor is available 24/7 to assess your symptoms and
              guide you to the right specialist for your next physical visit.
            </p>
            <button onClick={()=>navigate("/ai-symptom-checker")} className="bg-white text-slate-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-slate-100 transition-all active:scale-95">
              Launch AI Predictor
            </button>
          </div>
          <span className="material-symbols-outlined text-[150px] absolute -right-4 -bottom-4 opacity-10 rotate-12 pointer-events-none">
            psychology
          </span>
        </div>
      </main>

      <footer className="mt-auto py-10 text-center px-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[3px] mb-2">
          CareConnect Medical Services
        </p>
        <p className="text-xs text-slate-500 font-bold">
          © 2024 Secure Patient Portal •{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>{" "}
          •{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Terms of Service
          </span>
        </p>
      </footer>
    </div>
  );
};

export default PatientsAppointment;