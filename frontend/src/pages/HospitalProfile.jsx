import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/UserSlice";
import axios from "axios";

// ─── Form Field ──────────────────────────────────────────────────────────────────
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

// ─── Info Row (read-only) ────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
            <div className="size-8 rounded-lg bg-[#0a66c2]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#0a66c2] text-base">{icon}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-slate-800 truncate">
                    {value || <span className="text-slate-300 font-normal italic">Not set</span>}
                </p>
            </div>
        </div>
    );
}

// ─── Detail Row (preview card) ───────────────────────────────────────────────────
function DetailRow({ icon, text }) {
    return (
        <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#38bdf8]/70 text-sm mt-0.5 flex-shrink-0">{icon}</span>
            <span className="text-white/50 text-xs leading-relaxed truncate">{text}</span>
        </div>
    );
}

// ─── Live Hospital Preview Card ──────────────────────────────────────────────────
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
        </div>
    );
}

// ─── View Mode ───────────────────────────────────────────────────────────────────
function ProfileViewMode({ hospital, onEdit }) {
    const isActive = hospital?.status?.toLowerCase() === "active";

    return (
        <div>
            {/* Hero Banner */}
            <div
                className="relative rounded-2xl overflow-hidden mb-8 shadow-lg"
                style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b3e 60%, #0a1628 100%)" }}
            >
                {hospital?.image && (
                    <img
                        src={hospital.image}
                        alt={hospital?.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                        onError={(e) => { e.target.style.display = "none"; }}
                    />
                )}
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,15,30,0.95) 40%, rgba(10,15,30,0.4))" }} />
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #0a66c2, #38bdf8, #0a66c2)" }} />

                <div className="relative flex items-center gap-6 p-7">
                    <div className="size-20 rounded-2xl flex-shrink-0 overflow-hidden border-2 border-white/10 shadow-xl bg-white/5 flex items-center justify-center">
                        {hospital?.image ? (
                            <img src={hospital.image} alt={hospital?.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                        ) : (
                            <span className="material-symbols-outlined text-[36px] text-white/30">local_hospital</span>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h2 className="text-2xl font-black text-white truncate">
                                {hospital?.name ?? <span className="text-white/30 italic font-normal">Hospital Name</span>}
                            </h2>
                            {hospital?.status && (
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${isActive ? "bg-teal-500/20 text-teal-400 border border-teal-500/30" : "bg-slate-600/30 text-slate-400 border border-slate-500/30"}`}>
                                    <span className={`size-1.5 rounded-full inline-block ${isActive ? "bg-teal-400" : "bg-slate-400"}`} />
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
                            {hospital?.mobile && (
                                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">phone</span>
                                    {hospital.mobile}
                                </span>
                            )}
                            {hospital?.workingHours && (
                                <span className="flex items-center gap-1.5 text-white/50 text-xs">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    {hospital.workingHours}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Edit button */}
                    <button
                        onClick={onEdit}
                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
                    >
                        <span className="material-symbols-outlined text-base">edit</span>
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                        <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0a66c2] text-base">business</span>
                        </div>
                        <h2 className="text-sm font-bold text-slate-800">Basic Information</h2>
                    </div>
                    <div className="px-6">
                        <InfoRow icon="local_hospital" label="Hospital Name" value={hospital?.name} />
                        <InfoRow icon="phone" label="Mobile Number" value={hospital?.mobile} />
                        <InfoRow icon="category" label="Category" value={hospital?.hospitalCategory} />
                        <InfoRow icon="badge" label="Registration Number" value={hospital?.registrationNumber} />
                        <InfoRow icon="schedule" label="Working Hours" value={hospital?.workingHours} />
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
                    <div className="px-6">
                        <InfoRow icon="signpost" label="Street Address" value={hospital?.address} />
                        <InfoRow icon="location_city" label="City" value={hospital?.city} />
                        <InfoRow icon="map" label="State" value={hospital?.state} />
                        <InfoRow icon="pin_drop" label="Pincode" value={hospital?.pincode} />
                    </div>
                </div>

                {/* Operational Metrics */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden lg:col-span-2">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                        <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#0a66c2] text-base">analytics</span>
                        </div>
                        <h2 className="text-sm font-bold text-slate-800">Operational Metrics</h2>
                    </div>
                    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[
                            { icon: "medical_services", label: "No. of Doctors", value: hospital?.noOfDoctors },
                            { icon: "bed", label: "Total Beds", value: hospital?.totalBeds },
                            { icon: "airline_seat_flat", label: "Available Beds", value: hospital?.availableBeds },
                            { icon: "patient_list", label: "Total Patients", value: hospital?.totalPatients },
                            { icon: "people", label: "Available Patients", value: hospital?.availablePatients },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="flex flex-col items-center bg-slate-50 rounded-2xl py-5 border border-slate-100 text-center">
                                <span className="material-symbols-outlined text-[#0a66c2] text-2xl mb-2">{icon}</span>
                                <span className="text-2xl font-black text-slate-900">{value ?? "—"}</span>
                                <span className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Hospital Profile View & Update Profile Section ───────────────────────────────────────────────────────
const HospitalProfileView = () => {
    const hospital = useSelector((state) => state.user?.userData);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

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

    // sync form fields when hospital data changes in Redux
    const syncFromHospital = (h) => {
        setName(h?.name ?? "");
        setMobile(h?.mobile ?? "");
        setAddress(h?.address ?? "");
        setCity(h?.city ?? "");
        setState(h?.state ?? "");
        setPincode(h?.pincode ?? "");
        setHospitalCategory(h?.hospitalCategory ?? "");
        setRegistrationNumber(h?.registrationNumber ?? "");
        setNoOfDoctors(h?.noOfDoctors ?? "");
        setTotalBeds(h?.totalBeds ?? "");
        setAvailableBeds(h?.availableBeds ?? "");
        setTotalPatients(h?.totalPatients ?? "");
        setAvailablePatients(h?.availablePatients ?? "");
        setWorkingHours(h?.workingHours ?? "");
        setStatus(h?.status ?? "");
        setImage(h?.image ?? "");
    };

    const handleEdit = () => {
        syncFromHospital(hospital);
        setIsEditing(true);
    };

    const handleCancel = () => {
        syncFromHospital(hospital);
        setIsEditing(false);
    };

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
            console.log(res.data.data);
            dispatch(setUserData(res.data.data));
            setToast({ type: "success", msg: "Profile saved successfully!" });
            setTimeout(() => {
                setToast(null);
                setIsEditing(false);
            }, 1500);
        } catch (err) {
            setToast({ type: "error", msg: err?.response?.data?.message ?? "Update failed. Try again." });
            setTimeout(() => setToast(null), 4000);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hospital Profile</h1>
                    <p className="text-slate-500 mt-1">
                        {isEditing ? "Edit your hospital's information below." : "View your hospital's current profile."}
                    </p>
                </div>
                {isEditing && (
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-all"
                    >
                        <span className="material-symbols-outlined text-base">close</span>
                        Cancel Editing
                    </button>
                )}
            </header>

            {toast && (
                <div className={`mb-6 flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-semibold shadow-sm ${toast.type === "success" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                    <span className="material-symbols-outlined text-base">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.msg}
                </div>
            )}

            {/* ── VIEW MODE ── */}
            {!isEditing && (
                <ProfileViewMode hospital={hospital} onEdit={handleEdit} />
            )}

            {/* ── EDIT MODE ── */}
            {isEditing && (
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
                                    <div>
                                        <label htmlFor="hospitalCategory" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                            <span className="material-symbols-outlined text-[14px] text-slate-400">category</span>
                                            Specialization / Category
                                        </label>
                                        <select
                                            id="hospitalCategory"
                                            value={hospitalCategory}
                                            onChange={(e) => setHospitalCategory(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm"
                                        >
                                            <option value="">Select specialization</option>
                                            <option value="General">General</option>
                                            <option value="Multi-Specialty">Multi-Specialty</option>
                                            <option value="Super Specialty">Super Specialty</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Orthopedics">Orthopedics</option>
                                            <option value="Oncology">Oncology</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="Gynecology & Obstetrics">Gynecology &amp; Obstetrics</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="Gastroenterology">Gastroenterology</option>
                                            <option value="Ophthalmology">Ophthalmology</option>
                                            <option value="ENT">ENT</option>
                                            <option value="Psychiatry">Psychiatry</option>
                                            <option value="Dental">Dental</option>
                                            <option value="Trauma & Emergency">Trauma &amp; Emergency</option>
                                        </select>
                                    </div>
                                    <FormField label="Registration Number" id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} icon="badge" />
                                    <div>
                                        <label htmlFor="workingHours" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                            <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                                            Working Hours / Timings
                                        </label>
                                        <select
                                            id="workingHours"
                                            value={workingHours}
                                            onChange={(e) => setWorkingHours(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm"
                                        >
                                            <option value="">Select timings</option>
                                            <option value="24/7">24/7 (Round the Clock)</option>
                                            <option value="6:00 AM – 10:00 PM">6:00 AM – 10:00 PM</option>
                                            <option value="8:00 AM – 8:00 PM">8:00 AM – 8:00 PM</option>
                                            <option value="8:00 AM – 6:00 PM">8:00 AM – 6:00 PM</option>
                                            <option value="9:00 AM – 5:00 PM">9:00 AM – 5:00 PM</option>
                                            <option value="9:00 AM – 9:00 PM">9:00 AM – 9:00 PM</option>
                                            <option value="Mon–Sat: 8:00 AM – 8:00 PM">Mon–Sat: 8:00 AM – 8:00 PM</option>
                                            <option value="Mon–Sat: 9:00 AM – 6:00 PM">Mon–Sat: 9:00 AM – 6:00 PM</option>
                                            <option value="Mon–Fri: 9:00 AM – 5:00 PM">Mon–Fri: 9:00 AM – 5:00 PM</option>
                                            <option value="Emergency Only">Emergency Only</option>
                                        </select>
                                    </div>
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
                                <button type="button" onClick={handleCancel} className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                                    Cancel
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
            )}
        </div>
    );
};

export default HospitalProfileView;