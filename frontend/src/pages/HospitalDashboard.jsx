import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHospitalData } from "../redux/HospitalSlice";
import axios from "axios";

// ─── Static doctor data ─────────────────────────────────────────────────────────
const doctors = [
    { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", experience: "12+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVBK6wJSWWUbreddwnLRpMY_j61WfUYCcPZ2m-5N2DfDiyIdrCkYUm1Wj2eb4jArQKeDRv-QAzP0Co62icHfbbsb1OTrRB30IJLZsKsm7U-4UC9zqL5aTmAT_-Wzo_cyIE4YCPxhyroYL3QmyGgOJID1qKp6ku0bvFyT40AEuqHuLknxAHBznXg1JQitOHf0Z3Yg7Vlao2t9Qg2pdBIC4tHQgqmn24IgxCTTGoPiGJr5KNzP_7Hduug5CYedq6mPTgUcKXD25Pau8" },
    { id: 2, name: "Dr. Mark Sloan", specialty: "Pediatrics", experience: "8+ Years", active: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDy8KqTYMxythcnMxPnnldsjZRS6qWnK4rpGA1G5i_ap4qc6_EEs4S7ePsEumG3gka1bkpBgT9_JFneRnthOiI-vdWx3ErqQ546SAuYWjQ-a9mdAOKT-qptdLgdZlFZ8c1uhhgiOyw-UJofCkGSKoQ3tqJN7-_kDhx95qP6CaUTwk6XfUnZ0pMOb_NuO4e9FrRJBqrXBewONWqpT2CHSL_b8ZkdLaRDdbNfPOyzeA8QGrDR4EJvX9gdc-ZAyXbWgrQTTm55D5p7icU" },
    { id: 3, name: "Dr. Lisa Wong", specialty: "Neurology", experience: "15+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDxwBHxNwybqWY7D6zWmdDkiSG4pOS4J-JJJueE_WUvk1snzJIj6WL3RkZFVAG2J_4V5Mvo5ns1PUR7t0evxFvQ8Aqmy6wsW-Q8sqtLP0j5mKRvZKT-dwrd3bonhiKZywz1fC6jU3oEygp2eA3ylCVecKdt-rTUoy8qijq0pA9318OYRywq_FLvn4mLT4hGJBP1V-c3ITLeh1Q3NU2SOeTxvlf8otVMwmCT6BzcFku8pN41LqH9_0Lc6iXpMA71uoA3u3A79PojY0" },
    { id: 4, name: "Dr. James Wilson", specialty: "Oncology", experience: "10+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3IUTxtTbFLdOC7w9pF-s8FXrPQA18IQIe1zH9qp1OWjMvzdc9aq0RiEflw-DRFo8bYPiMm5s_YsWEPT8BIFQm-jnW7hefm-IaJSbFB0BAikAYKQfxDzkz34Nm_kB4xZkpLr9ZetDizoIV-_krAOXjPg3r3oR9p7b5BAdO9d0pal9ROU-7xqEaPQCsp5NCdI4nnEY98x7V9jsRwk-P0z6_8eIzP7L4rvpjWykwUHFEU6LNtGmGIodOTezAWSv5ckIvQHzkGdR24f4" },
    { id: 5, name: "Dr. Robert Fox", specialty: "Dermatology", experience: "6+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSd0IdXBqd8s7ta0QTopLEjSLFFJtbsOlgXgQrGgdbgvSvvtxWdwV0s8r9Ujao8ALrlTnrAtwS4qkn9BC7hfm3dqukkOEVIAN9Sk5wsn3buQgIa3OWE9ZTSURG90TYFeR91-71ukW1-FaqIdOV2Mq7zWnQWi3SQvpGD1_wby9ZccEi5MgPfiRQ17ns6qayUdCbTpk5Coeys8EgmgFtbmsM___glT51d_nBD06JYQGkjRDpvZHT_XzzS8rVi9qL8TMpQRWkrXsHRbI" },
    { id: 6, name: "Dr. Elena Fisher", specialty: "Gastroenterology", experience: "9+ Years", active: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0QmfPtCM-9TP1nhhDcTnTJfzBpeVGDKkl6nU5k4wN0_rE4LMMR6yKOEGgYh4PFm4RB_WHeyE5aIOivazm2v1CHmWKGISLnoZLVK9TqvI9L6-hFe_pk_U2_ASe8MkCB72CPx9xlouknTS-8oYM1SyMVMaAK9Au7sVTckworKZYYVLLpvhdewHGbKUAPr6ecRkCW0nq3nPUYsqoBHhm9YuZUCvziR_zleAVqcpdXIuvmDzkf0dhArf5lOqwRJSCMA1UY22W_oJDhgk" },
    { id: 7, name: "Dr. Michael Chen", specialty: "Orthopedics", experience: "11+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZa3hVDDlrDfdUtiV-JEQT5LkaqKTMHXF_eMc2LW83zrGEIKLwWNJ8mnQfjWHqrMD7gAJe0ARuVoBsgPZUkREoz7ACTm4w6Wns7aOxcrPXIkQ4ozSpVyBPkWvTToJEyNsaU-H03RzGVRLB87VCyu6Bgrmd4C8B26RFZl6sf__B8qWSzCRk-gGxrPKnIyDfD0oqu_URdhC_yVEIlK7SompUb2-V0D5C5PK_uqFS1okPzornBsLjztCQ0qW5ikIYwy8eP63C-NSY9JI" },
    { id: 8, name: "Dr. Sofia Rodriguez", specialty: "Gynecology", experience: "14+ Years", active: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiOAlbf_D4aXmNaGfuUtsF3JoQfbDgDLKG-qMS0XJ6JCLAvRyB4tH374k4jZK0KaWYHfIslP03HzFN52YVH5xE6XTHXAZpY1aUOJRMAqqn8hjQlU3crZRUt5TLIXiPPHYEFLnYlS6HYqAxNLDBFzYvsUhKykVsHKtDUpgg7A7soxitTjv85YMFSiLmOIy61vpqtFM5E0jq_ITstgEV33SinRlDG69JB-DQPn-SRCCWX0rtVsXztUx4S2EbtMq_B0hv6V6HpD-8ksY" },
];

const NAV = [
    { icon: "dashboard", label: "Dashboard" },
    { icon: "person_add", label: "Add Doctor" },
    { icon: "group", label: "View Doctors" },
    { icon: "calendar_month", label: "Appointments" },
];

// ─── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, badge, positive }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-[#0a66c2]/10 rounded-xl text-[#0a66c2]">
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${positive ? "text-teal-700 bg-teal-50" : "text-rose-600 bg-rose-50"}`}>
                    {badge}
                </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
            <h3 className="text-2xl font-black text-slate-900">{value ?? "—"}</h3>
        </div>
    );
}

// ─── Dashboard Analytics View ───────────────────────────────────────────────────
function DashboardView({ hospital }) {
    const stats = [
        { icon: "medical_services", label: "Total Doctors", value: hospital?.noOfDoctors ?? 0, badge: "Staff", positive: true },
        { icon: "patient_list", label: "Total Patients", value: hospital?.totalPatients ?? 0, badge: "Registered", positive: true },
        { icon: "bed", label: "Total Beds", value: hospital?.totalBeds ?? 0, badge: "Capacity", positive: true },
        { icon: "airline_seat_flat", label: "Available Beds", value: hospital?.availableBeds ?? 0, badge: "Open", positive: (hospital?.availableBeds ?? 0) > 0 },
    ];

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hospital Analytics</h1>
                <p className="text-slate-500 mt-1">Live overview of your hospital's operational metrics.</p>
            </header>

            {/* ── Hero Banner ────────────────────────────────────────────── */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 60%, #0a1628 100%)" }}>
                {/* background image */}
                {hospital?.image && (
                    <img
                        src={hospital.image}
                        alt={hospital?.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                )}
                {/* gradient overlay */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,15,30,0.95) 40%, rgba(10,15,30,0.4))" }} />
                {/* top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0a66c2, #38bdf8, #0a66c2)" }} />

                <div className="relative flex items-center gap-6 p-7">
                    {/* Logo / Image circle */}
                    <div className="size-20 rounded-2xl flex-shrink-0 overflow-hidden border-2 border-white/10 shadow-xl bg-white/5 flex items-center justify-center">
                        {hospital?.image ? (
                            <img src={hospital.image} alt={hospital?.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                        ) : (
                            <span className="material-symbols-outlined text-[36px] text-white/30">local_hospital</span>
                        )}
                    </div>

                    {/* Name & details */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h2 className="text-2xl font-black text-white truncate">
                                {hospital?.name ?? <span className="text-white/30 italic font-normal">Hospital Name</span>}
                            </h2>
                            {hospital?.status && (
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${hospital.status.toLowerCase() === "active" ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-slate-600/30 text-slate-400 border border-slate-500/30"}`}>
                                    <span className={`size-1.5 rounded-full inline-block ${hospital.status.toLowerCase() === "active" ? "bg-teal-400" : "bg-slate-400"}`} />
                                    {hospital.status}
                                </span>
                            )}
                        </div>
                        <p className="text-[#38bdf8] text-sm font-semibold mb-3">
                            {hospital?.hospitalCategory ?? <span className="text-white/30 italic font-normal text-xs">Category not set</span>}
                        </p>
                        <div className="flex items-center gap-5 flex-wrap">
                            {hospital?.city && (
                                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {hospital.city}{hospital.state ? `, ${hospital.state}` : ""}
                                </span>
                            )}
                            {hospital?.workingHours && (
                                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {hospital.workingHours}
                                </span>
                            )}
                            {hospital?.mobile && (
                                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">phone</span>
                                    {hospital.mobile}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Reg number badge */}
                    {hospital?.registrationNumber && (
                        <div className="flex-shrink-0 hidden md:flex flex-col items-end">
                            <span className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Reg. No.</span>
                            <span className="text-white font-bold text-sm">{hospital.registrationNumber}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Stats Grid ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
            </div>
        </div>
    );
}

// ─── View Doctors View ──────────────────────────────────────────────────────────
function ViewDoctorsView() {
    const [isGridView, setIsGridView] = useState(true);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Doctor Management</h1>
                <p className="text-slate-500 mt-1">Manage your medical staff and their specializations.</p>
            </header>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900">Active Staff Lineup</h2>
                    <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
                        <button onClick={() => setIsGridView(true)} className={`p-1.5 rounded-md transition-colors ${isGridView ? "bg-slate-100 text-[#0a66c2]" : "text-slate-400 hover:bg-slate-50"}`}>
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </button>
                        <button onClick={() => setIsGridView(false)} className={`p-1.5 rounded-md transition-colors ${!isGridView ? "bg-slate-100 text-[#0a66c2]" : "text-slate-400 hover:bg-slate-50"}`}>
                            <span className="material-symbols-outlined text-[20px]">list</span>
                        </button>
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-[#0a66c2] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#0a66c2]/90 transition-all shadow-md shadow-[#0a66c2]/20">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add New Doctor
                </button>
            </div>

            <div className={`mb-8 ${isGridView ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-3"}`}>
                {doctors.map((doctor) =>
                    isGridView ? (
                        <div key={doctor.id} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center border border-transparent hover:border-[#0a66c2]/30 hover:shadow-lg transition-all duration-300">
                            <div className="relative mb-4">
                                <div className="size-24 rounded-full border-4 border-slate-50 shadow-inner overflow-hidden">
                                    <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={`absolute bottom-1 right-1 size-5 border-2 border-white rounded-full ${doctor.active ? "bg-teal-500" : "bg-slate-300"}`} />
                            </div>
                            <h3 className="text-base font-semibold text-slate-900">{doctor.name}</h3>
                            <p className="text-[#0a66c2] text-sm font-medium mb-1">{doctor.specialty}</p>
                            <div className="flex items-center gap-1 text-slate-400 text-xs mb-5">
                                <span className="material-symbols-outlined text-sm">work_history</span>
                                <span>{doctor.experience}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                <button className="py-2 px-3 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Edit</button>
                                <button className="py-2 px-3 bg-[#0a66c2]/10 text-[#0a66c2] rounded-lg text-xs font-bold hover:bg-[#0a66c2]/20 transition-colors">View</button>
                            </div>
                        </div>
                    ) : (
                        <div key={doctor.id} className="bg-white px-5 py-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5 hover:border-[#0a66c2]/30 hover:shadow-md transition-all">
                            <div className="relative flex-shrink-0">
                                <div className="size-12 rounded-full border-2 border-slate-100 overflow-hidden">
                                    <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={`absolute -bottom-0.5 -right-0.5 size-3.5 border-2 border-white rounded-full ${doctor.active ? "bg-teal-500" : "bg-slate-300"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-slate-900 text-sm">{doctor.name}</h3>
                                <p className="text-[#0a66c2] text-xs font-medium">{doctor.specialty}</p>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-xs">
                                <span className="material-symbols-outlined text-sm">work_history</span>
                                <span>{doctor.experience}</span>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                                <button className="py-1.5 px-3 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Edit</button>
                                <button className="py-1.5 px-3 bg-[#0a66c2]/10 text-[#0a66c2] rounded-lg text-xs font-bold hover:bg-[#0a66c2]/20 transition-colors">View</button>
                            </div>
                        </div>
                    )
                )}
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <p className="text-xs text-slate-500">Showing 1–8 of 124 doctors</p>
                <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#0a66c2] transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                    <button className="px-3 py-1 rounded-lg bg-[#0a66c2] text-white text-xs font-bold">1</button>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">2</button>
                    <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">3</button>
                    <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#0a66c2] transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
            </div>
        </div>
    );
}

// ─── Live Hospital Preview Card (dark) ─────────────────────────────────────────
function HospitalPreviewCard({ name, mobile, address, city, state, pincode, hospitalCategory, registrationNumber, noOfDoctors, totalBeds, availableBeds, totalPatients, workingHours, status, image }) {
    const isActive = status?.toLowerCase() === "active";

    return (
        <div className="sticky top-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">preview</span>
                Live Preview
            </p>

            <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 50%, #0a1628 100%)" }}>
                <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0a66c2, #38bdf8, #0a66c2)" }} />

                <div className="relative h-36 overflow-hidden">
                    {image ? (
                        <img src={image} alt="Hospital" className="w-full h-full object-cover opacity-40" onError={(e) => { e.target.style.display = "none"; }} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-[64px] text-white/10">local_hospital</span>
                        </div>
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0f1e 30%, transparent)" }} />
                    <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${isActive ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-slate-600/30 text-slate-400 border border-slate-500/30"}`}>
                            <span className={`size-1.5 rounded-full inline-block ${isActive ? "bg-teal-400" : "bg-slate-400"}`} />
                            {status || "Unknown"}
                        </span>
                    </div>
                </div>

                <div className="px-6 pt-2 pb-6">
                    <h3 className="text-xl font-black text-white leading-tight mb-1 truncate">
                        {name || <span className="text-white/30 italic font-normal text-base">Hospital Name</span>}
                    </h3>
                    <p className="text-[#38bdf8] text-xs font-semibold mb-4 truncate">
                        {hospitalCategory || <span className="text-white/20 italic font-normal">Category</span>}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-5">
                        {[
                            { icon: "medical_services", label: "Doctors", val: noOfDoctors },
                            { icon: "bed", label: "Beds", val: totalBeds },
                            { icon: "patient_list", label: "Patients", val: totalPatients },
                        ].map(({ icon, label, val }) => (
                            <div key={label} className="flex flex-col items-center bg-white/5 rounded-xl py-3 border border-white/10">
                                <span className="material-symbols-outlined text-[#38bdf8] text-base mb-1">{icon}</span>
                                <span className="text-white font-black text-lg leading-none">{val || "0"}</span>
                                <span className="text-white/40 text-[10px] mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-5">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-white/50 text-xs">Available Beds</span>
                            <span className="text-white/80 text-xs font-bold">{availableBeds || 0} / {totalBeds || 0}</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: totalBeds > 0 ? `${Math.min(100, ((availableBeds || 0) / totalBeds) * 100)}%` : "0%",
                                    background: "linear-gradient(90deg, #0a66c2, #38bdf8)",
                                }}
                            />
                        </div>
                    </div>

                    <div className="h-px bg-white/10 mb-4" />

                    <div className="space-y-2.5">
                        <DetailRow icon="location_on" text={[address, city, state, pincode].filter(Boolean).join(", ") || "Address not set"} />
                        <DetailRow icon="schedule" text={workingHours || "Working hours not set"} />
                        <DetailRow icon="phone" text={mobile || "Mobile not set"} />
                        <DetailRow icon="badge" text={registrationNumber ? `Reg. No: ${registrationNumber}` : "Registration number not set"} />
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-slate-400 mt-3">Card updates as you type ✨</p>
        </div>
    );
}

function DetailRow({ icon, text }) {
    return (
        <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#38bdf8]/70 text-sm mt-0.5 flex-shrink-0">{icon}</span>
            <span className="text-white/50 text-xs leading-relaxed truncate">{text}</span>
        </div>
    );
}

// ─── Form Field ─────────────────────────────────────────────────────────────────
function FormField({ label, id, type = "text", value, onChange, placeholder, icon }) {
    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {icon && <span className="material-symbols-outlined text-[14px] text-slate-400">{icon}</span>}
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm hover:border-slate-300"
            />
        </div>
    );
}

// ─── Hospital Profile View ──────────────────────────────────────────────────────
function HospitalProfileView({ hospital, dispatch }) {
    // separate state variable for each hospital model field
    const [name, setName] = useState(hospital?.name ?? "");
    const [mobile, setMobile] = useState(hospital?.mobile ?? "");
    const [address, setAddress] = useState(hospital?.address ?? "");
    const [city, setCity] = useState(hospital?.city ?? "");
    const [state, setState] = useState(hospital?.state ?? "");
    const [pincode, setPincode] = useState(hospital?.pincode ?? "");
    const [hospitalCategory, setHospitalCategory] = useState(hospital?.hospitalCategory ?? "");
    const [registrationNumber, setRegistrationNumber] = useState(hospital?.registrationNumber ?? "");
    const [noOfDoctors, setNoOfDoctors] = useState(hospital?.noOfDoctors ?? "");
    const [totalBeds, setTotalBeds] = useState(hospital?.totalBeds ?? "");
    const [availableBeds, setAvailableBeds] = useState(hospital?.availableBeds ?? "");
    const [totalPatients, setTotalPatients] = useState(hospital?.totalPatients ?? "");
    const [availablePatients, setAvailablePatients] = useState(hospital?.availablePatients ?? "");
    const [workingHours, setWorkingHours] = useState(hospital?.workingHours ?? "");
    const [status, setStatus] = useState(hospital?.status ?? "");
    const [image, setImage] = useState(hospital?.image ?? "");

    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setToast(null);
        try {
            const res = await axios.put(
                "http://localhost:3000/api/hospital/hospital-update",
                { name, mobile, address, city, state, pincode, hospitalCategory, registrationNumber, noOfDoctors, totalBeds, availableBeds, totalPatients, availablePatients, workingHours, status, image },
                { withCredentials: true }
            );
            dispatch(setHospitalData(res.data.data));
            setToast({ type: "success", msg: "Profile saved successfully!" });
        } catch (err) {
            setToast({ type: "error", msg: err?.response?.data?.message ?? "Update failed. Try again." });
        } finally {
            setSaving(false);
            setTimeout(() => setToast(null), 4000);
        }
    };

    const handleReset = () => {
        setName(hospital?.name ?? "");
        setMobile(hospital?.mobile ?? "");
        setAddress(hospital?.address ?? "");
        setCity(hospital?.city ?? "");
        setState(hospital?.state ?? "");
        setPincode(hospital?.pincode ?? "");
        setHospitalCategory(hospital?.hospitalCategory ?? "");
        setRegistrationNumber(hospital?.registrationNumber ?? "");
        setNoOfDoctors(hospital?.noOfDoctors ?? "");
        setTotalBeds(hospital?.totalBeds ?? "");
        setAvailableBeds(hospital?.availableBeds ?? "");
        setTotalPatients(hospital?.totalPatients ?? "");
        setAvailablePatients(hospital?.availablePatients ?? "");
        setWorkingHours(hospital?.workingHours ?? "");
        setStatus(hospital?.status ?? "");
        setImage(hospital?.image ?? "");
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hospital Profile</h1>
                <p className="text-slate-500 mt-1">Update your hospital's information. The preview card reflects every change live.</p>
            </header>

            {toast && (
                <div className={`mb-6 flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-semibold shadow-sm ${toast.type === "success" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                    <span className="material-symbols-outlined text-base">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.msg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex gap-8 items-start">

                    {/* LEFT: Form */}
                    <div className="flex-1 space-y-6 min-w-0">

                        {/* Basic Info */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#0a66c2] text-base">business</span>
                                </div>
                                <h2 className="text-sm font-bold text-slate-800">Basic Information</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormField label="Hospital Name" id="name" value={name} onChange={(e) => setName(e.target.value)} icon="local_hospital" />
                                <FormField label="Mobile Number" id="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} icon="phone" />
                                <FormField label="Hospital Category" id="hospitalCategory" value={hospitalCategory} onChange={(e) => setHospitalCategory(e.target.value)} placeholder="e.g. General / Multi-specialty" icon="category" />
                                <FormField label="Registration Number" id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} icon="badge" />
                                <FormField label="Working Hours" id="workingHours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} placeholder="e.g. 24/7 or 8am – 8pm" icon="schedule" />
                                <div>
                                    <label htmlFor="status" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                        <span className="material-symbols-outlined text-[14px] text-slate-400">circle</span>
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm"
                                    >
                                        <option value="">Select status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Under Maintenance">Under Maintenance</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#0a66c2] text-base">location_on</span>
                                </div>
                                <h2 className="text-sm font-bold text-slate-800">Address</h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <FormField label="Street Address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} icon="signpost" />
                                </div>
                                <FormField label="City" id="city" value={city} onChange={(e) => setCity(e.target.value)} icon="location_city" />
                                <FormField label="State" id="state" value={state} onChange={(e) => setState(e.target.value)} icon="map" />
                                <FormField label="Pincode" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} icon="pin_drop" />
                            </div>
                        </div>

                        {/* Operational Metrics */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#0a66c2] text-base">analytics</span>
                                </div>
                                <h2 className="text-sm font-bold text-slate-800">Operational Metrics</h2>
                            </div>
                            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-5">
                                <FormField label="No. of Doctors" id="noOfDoctors" type="number" value={noOfDoctors} onChange={(e) => setNoOfDoctors(e.target.value)} icon="medical_services" />
                                <FormField label="Total Beds" id="totalBeds" type="number" value={totalBeds} onChange={(e) => setTotalBeds(e.target.value)} icon="bed" />
                                <FormField label="Available Beds" id="availableBeds" type="number" value={availableBeds} onChange={(e) => setAvailableBeds(e.target.value)} icon="airline_seat_flat" />
                                <FormField label="Total Patients" id="totalPatients" type="number" value={totalPatients} onChange={(e) => setTotalPatients(e.target.value)} icon="patient_list" />
                                <FormField label="Available Patients" id="availablePatients" type="number" value={availablePatients} onChange={(e) => setAvailablePatients(e.target.value)} icon="people" />
                            </div>
                        </div>

                        {/* Image */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                                <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#0a66c2] text-base">image</span>
                                </div>
                                <h2 className="text-sm font-bold text-slate-800">Hospital Image</h2>
                            </div>
                            <div className="p-6">
                                <FormField label="Image URL" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/hospital.jpg" icon="link" />
                                <p className="text-xs text-slate-400 mt-2">Paste a direct image URL — the preview card on the right updates instantly.</p>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-end gap-3 pb-8">
                            <button type="button" onClick={handleReset} className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#0a66c2]/90 transition-all shadow-lg shadow-[#0a66c2]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>Saving…</>
                                ) : (
                                    <><span className="material-symbols-outlined text-sm">save</span>Save Changes</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Live preview */}
                    <div className="w-80 flex-shrink-0">
                        <HospitalPreviewCard
                            name={name} mobile={mobile} address={address} city={city} state={state}
                            pincode={pincode} hospitalCategory={hospitalCategory} registrationNumber={registrationNumber}
                            noOfDoctors={noOfDoctors} totalBeds={totalBeds} availableBeds={availableBeds}
                            totalPatients={totalPatients} workingHours={workingHours} status={status} image={image}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}

// ─── Main Dashboard Shell ───────────────────────────────────────────────────────
export default function HospitalDashboard() {
    const [activeNav, setActiveNav] = useState("Dashboard");
    const hospital = useSelector((state) => state.hospital?.hospitalData);
    const dispatch = useDispatch();

    const renderContent = () => {
        switch (activeNav) {
            case "Dashboard": return <DashboardView hospital={hospital} />;
            case "View Doctors": return <ViewDoctorsView />;
            case "Hospital Profile": return <HospitalProfileView hospital={hospital} dispatch={dispatch} />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <span className="material-symbols-outlined text-5xl mb-3">construction</span>
                        <p className="text-base font-medium">Coming soon</p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#f5f7f8] text-slate-900 font-sans">
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-[#0a66c2] size-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-[#0a66c2]/30">
                        <span className="material-symbols-outlined">local_hospital</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-base font-bold leading-none">{hospital?.name ?? "Hospital"}</h1>
                        <p className="text-slate-500 text-xs font-medium mt-0.5">Admin Management</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {NAV.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveNav(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${activeNav === item.label
                                    ? "bg-[#0a66c2]/10 text-[#0a66c2] font-semibold shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}

                    <div className="pt-5 pb-2">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">System</p>
                    </div>

                    <button
                        onClick={() => setActiveNav("Hospital Profile")}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${activeNav === "Hospital Profile"
                                ? "bg-[#0a66c2]/10 text-[#0a66c2] font-semibold shadow-sm"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">edit_note</span>
                        <span>Hospital Profile</span>
                    </button>

                    <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-rose-500 hover:bg-rose-50 transition-all text-sm">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Logout</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                        <div className="size-9 rounded-full bg-gradient-to-br from-[#0a66c2] to-[#38bdf8] flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-white text-base">account_circle</span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 truncate">{hospital?.name ?? "Admin"}</p>
                            <p className="text-xs text-slate-500 truncate">{hospital?.email ?? "Head Administrator"}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto bg-[#f5f7f8]">
                <div className="max-w-[1400px] mx-auto p-8">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}