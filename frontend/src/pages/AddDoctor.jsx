import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// ─── Constants ───────────────────────────────────────────────────────────────────
const SPECIALIZATIONS = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Oncology",
    "Orthopedics",
    "Dermatology",
    "Gastroenterology",
    "Gynecology & Obstetrics",
    "Ophthalmology",
    "ENT (Ear, Nose & Throat)",
    "Psychiatry & Mental Health",
    "Pulmonology",
    "Nephrology",
    "Endocrinology",
    "Rheumatology",
    "Urology",
    "Hematology",
    "Infectious Disease",
    "Plastic & Reconstructive Surgery",
    "General Surgery",
    "Anesthesiology",
    "Radiology & Imaging",
    "Emergency Medicine",
    "Internal Medicine",
    "Dental & Oral Surgery",
    "Physiotherapy & Rehabilitation",
    "Nutrition & Dietetics",
];

const AVAILABILITY_TIMINGS = [
    "24/7 (Round the Clock)",
    "Morning: 6:00 AM – 12:00 PM",
    "Afternoon: 12:00 PM – 6:00 PM",
    "Evening: 6:00 PM – 10:00 PM",
    "Night: 10:00 PM – 6:00 AM",
    "9:00 AM – 5:00 PM",
    "9:00 AM – 6:00 PM",
    "9:00 AM – 9:00 PM",
    "8:00 AM – 4:00 PM",
    "8:00 AM – 8:00 PM",
    "10:00 AM – 6:00 PM",
    "10:00 AM – 8:00 PM",
    "Mon–Fri: 9:00 AM – 5:00 PM",
    "Mon–Sat: 9:00 AM – 5:00 PM",
    "Mon–Sat: 8:00 AM – 8:00 PM",
    "Weekends Only: 9:00 AM – 3:00 PM",
    "On-Call / Emergency",
];

// ─── Form Field ──────────────────────────────────────────────────────────────────
function FormField({ label, id, type = "text", value, onChange, placeholder, icon, required }) {
    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {icon && <span className="material-symbols-outlined text-[14px] text-slate-400">{icon}</span>}
                {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder || label}
                required={required}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm hover:border-slate-300"
            />
        </div>
    );
}

// ─── Select Field ────────────────────────────────────────────────────────────────
function SelectField({ label, id, value, onChange, options, placeholder, icon, required }) {
    return (
        <div>
            <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                {icon && <span className="material-symbols-outlined text-[14px] text-slate-400">{icon}</span>}
                {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm"
            >
                <option value="">{placeholder || `Select ${label}`}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );
}

// ─── Live Preview Card ────────────────────────────────────────────────────────────
function DoctorPreviewCard({ name, specialization, experience, availability, image, status }) {
    const isActive = status === "Active";
    return (
        <div className="sticky top-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">preview</span>
                Live Card Preview
            </p>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                {/* Top accent */}
                <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #0a66c2, #38bdf8, #0a66c2)" }} />

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-5">
                        <div className="size-28 rounded-full border-4 border-slate-50 shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                            {image ? (
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                                />
                            ) : null}
                            <div className={`w-full h-full flex items-center justify-center ${image ? "hidden" : "flex"}`}>
                                <span className="material-symbols-outlined text-[48px] text-slate-300">account_circle</span>
                            </div>
                        </div>
                        <span className={`absolute bottom-1.5 right-1.5 size-5 border-2 border-white rounded-full ${isActive ? "bg-teal-500" : "bg-slate-300"}`} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {name || <span className="text-slate-300 italic font-normal text-base">Doctor Name</span>}
                    </h3>
                    <p className="text-[#0a66c2] text-sm font-semibold mt-1 mb-1">
                        {specialization || <span className="text-slate-300 italic font-normal">Specialization</span>}
                    </p>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-6">
                        <span className="material-symbols-outlined text-sm">work_history</span>
                        <span>{experience ? `${experience}+ Years Experience` : "Experience"}</span>
                    </div>

                    <div className="w-full pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs">
                            <div className="text-left">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-0.5">Availability</p>
                                <p className="font-semibold text-slate-700 truncate max-w-[120px]">{availability || "—"}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 font-bold px-3 py-1 rounded-full text-[11px] ${isActive ? "bg-teal-50 text-teal-600 border border-teal-200" : "bg-slate-100 text-slate-500 border border-slate-200"}`}>
                                <span className={`size-1.5 rounded-full inline-block ${isActive ? "bg-teal-500" : "bg-slate-400"}`} />
                                {status || "Active"}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-6">
                        <div className="py-2 px-3 bg-slate-100 text-slate-400 rounded-xl text-xs font-bold cursor-not-allowed text-center">Edit</div>
                        <div className="py-2 px-3 bg-[#0a66c2]/10 text-[#0a66c2]/50 rounded-xl text-xs font-bold cursor-not-allowed text-center">View Profile</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-[#0a66c2]/5 border border-[#0a66c2]/15 rounded-xl p-4 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0a66c2] text-base flex-shrink-0 mt-0.5">info</span>
                <p className="text-xs text-slate-500 leading-relaxed">This preview reflects the doctor card that will appear in the staff lineup. Changes update instantly as you type.</p>
            </div>
        </div>
    );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────────
function Section({ icon, title, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#0a66c2] text-base">{icon}</span>
                </div>
                <h2 className="text-sm font-bold text-slate-800">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Add Doctor Page ─────────────────────────────────────────────────────────────
export default function AddDoctor() {
    // — Personal details
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");

    // — Location
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    // — Professional
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [education, setEducation] = useState("");
    const [availability, setAvailability] = useState("");
    const [status, setStatus] = useState("Active");

    // — UI state
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 4000);
    };

    const handleReset = () => {
        setName(""); setEmail(""); setPassword(""); setPhone(""); setImage("");
        setAddress(""); setCity(""); setState(""); setPincode("");
        setSpecialization(""); setExperience(""); setEducation("");
        setAvailability(""); setStatus("Active");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post(
                "http://localhost:3000/api/doctor/add-doctor",
                { name, email, password, phone, address, city, state, pincode, specialization, experience, education, image, status, availability },
                { withCredentials: true }
            );
            showToast("success", `Dr. ${name} has been added successfully!`);
            handleReset();
        } catch (err) {
            showToast("error", err?.response?.data?.message ?? "Failed to add doctor. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Doctor Profile</h1>
                <p className="text-slate-500 mt-1">Add a new medical specialist to your hospital's staff.</p>
            </header>

            {/* Toast */}
            {toast && (
                <div className={`mb-6 flex items-center gap-3 px-5 py-3.5 rounded-xl border text-sm font-semibold shadow-sm ${toast.type === "success" ? "bg-teal-50 border-teal-200 text-teal-700" : "bg-rose-50 border-rose-200 text-rose-700"}`}>
                    <span className="material-symbols-outlined text-base">{toast.type === "success" ? "check_circle" : "error"}</span>
                    {toast.msg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex gap-8 items-start">

                    {/* ── LEFT: Form ─────────────────────────────────── */}
                    <div className="flex-1 min-w-0 space-y-6">

                        {/* Personal Info */}
                        <Section icon="person" title="Personal Information">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <FormField label="Full Name" id="name" value={name} onChange={(e) => setName(e.target.value)} icon="badge" placeholder="e.g. Dr. Jonathan Smith" required />
                                <FormField label="Email Address" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="email" placeholder="doctor@hospital.com" required />
                                <FormField label="Password" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} icon="lock" placeholder="Set login password" required />
                                <FormField label="Phone Number" id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} icon="phone" placeholder="+91 XXXXX XXXXX" required />
                            </div>
                        </Section>

                        {/* Professional Info */}
                        <Section icon="medical_services" title="Professional Details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <SelectField
                                    label="Specialization"
                                    id="specialization"
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                    options={SPECIALIZATIONS}
                                    icon="category"
                                    required
                                />
                                <FormField label="Years of Experience" id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} icon="work_history" placeholder="e.g. 8" required />
                                <div className="md:col-span-2">
                                    <FormField label="Education / Qualifications" id="education" value={education} onChange={(e) => setEducation(e.target.value)} icon="school" placeholder="e.g. MBBS, MD – Cardiology, AIIMS Delhi" required />
                                </div>
                                <SelectField
                                    label="Availability Timing"
                                    id="availability"
                                    value={availability}
                                    onChange={(e) => setAvailability(e.target.value)}
                                    options={AVAILABILITY_TIMINGS}
                                    placeholder="Select timing"
                                    icon="schedule"
                                    required
                                />
                                <div>
                                    <label htmlFor="status" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                                        <span className="material-symbols-outlined text-[14px] text-slate-400">circle</span>
                                        Status<span className="text-rose-400 ml-0.5">*</span>
                                    </label>
                                    <select
                                        id="status"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]/25 focus:border-[#0a66c2] transition-all shadow-sm"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </Section>

                        {/* Address */}
                        <Section icon="location_on" title="Address">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="md:col-span-2">
                                    <FormField label="Street Address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} icon="signpost" placeholder="Building, Street, Area" required />
                                </div>
                                <FormField label="City" id="city" value={city} onChange={(e) => setCity(e.target.value)} icon="location_city" required />
                                <FormField label="State" id="state" value={state} onChange={(e) => setState(e.target.value)} icon="map" required />
                                <FormField label="Pincode" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} icon="pin_drop" required />
                            </div>
                        </Section>

                        {/* Profile Image */}
                        <Section icon="image" title="Profile Image">
                            <FormField label="Image URL" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/doctor-photo.jpg" icon="link" required />
                            <p className="text-xs text-slate-400 mt-2">Paste a direct image URL. The preview card on the right updates instantly.</p>
                            {image && (
                                <div className="mt-4 flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="size-14 rounded-full object-cover border-2 border-white shadow"
                                        onError={(e) => { e.target.src = ""; }}
                                    />
                                    <div>
                                        <p className="text-xs font-semibold text-slate-700">Image Preview</p>
                                        <p className="text-[11px] text-slate-400 truncate max-w-[260px]">{image}</p>
                                    </div>
                                </div>
                            )}
                        </Section>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pb-8">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0a66c2] text-white text-sm font-bold hover:bg-[#0a66c2]/90 transition-all shadow-lg shadow-[#0a66c2]/25 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>Creating…</>
                                ) : (
                                    <><span className="material-symbols-outlined text-sm">person_add</span>Create Doctor Profile</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT: Live Preview ─────────────────────────── */}
                    <div className="w-80 flex-shrink-0">
                        <DoctorPreviewCard
                            name={name}
                            specialization={specialization}
                            experience={experience}
                            availability={availability}
                            image={image}
                            status={status}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}