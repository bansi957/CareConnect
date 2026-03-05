import React, { useState } from "react";
import { useSelector } from "react-redux";
import PatientNavbar from "../components/PatientNavbar";

const PatientProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: userData?.fullName || "John Doe",
    email: userData?.email || "john@example.com",
    phone: "+1 (555) 000-0000",
    age: "28",
    bloodGroup: "O+",
    weight: "72",
    height: "178",
    hasSugar: true,
    sugarDetails: "HbA1c: 6.5%",
    hasBP: false,
    bpDetails: "",
    address: "123 Health Ave, Medical District, NY",
  });

  const handleToggleCondition = (condition) => {
    if (!isEditing) return;
    setProfileData((prev) => ({
      ...prev,
      [condition]: !prev[condition],
      [`${condition.replace("has", "").toLowerCase()}Details`]: !prev[condition]
        ? prev[`${condition.replace("has", "").toLowerCase()}Details`]
        : "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic to save to backend would go here
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased">
      <PatientNavbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 lg:px-10 py-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-primary/10 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="h-32 w-32 rounded-3xl bg-primary/10 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden">
              <span className="text-4xl font-black text-primary">
                {profileData.fullName.charAt(0)}
              </span>
            </div>
            <div className="text-center md:text-left space-y-1">
              <h1 className="text-3xl font-black italic tracking-tight">
                {profileData.fullName}
              </h1>
              <p className="text-slate-500 font-bold flex items-center justify-center md:justify-start gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  mail
                </span>
                {profileData.email}
              </p>
              <div className="flex gap-3 justify-center md:justify-start pt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">
                  Patient ID: #CC-8829
                </span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                  Verified Profile
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center gap-2 relative z-10 ${
              isEditing
                ? "bg-slate-900 text-white hover:bg-slate-800"
                : "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isEditing ? "save" : "edit_square"}
            </span>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[120px] rotate-12">
              person
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Physical Metrics & Identity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Medical Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Blood Group",
                  value: profileData.bloodGroup,
                  icon: "water_drop",
                  color: "text-red-500",
                  name: "bloodGroup",
                },
                {
                  label: "Age",
                  value: `${profileData.age} yr`,
                  icon: "event",
                  color: "text-blue-500",
                  name: "age",
                },
                {
                  label: "Weight",
                  value: `${profileData.weight} kg`,
                  icon: "monitor_weight",
                  color: "text-emerald-500",
                  name: "weight",
                },
                {
                  label: "Height",
                  value: `${profileData.height} cm`,
                  icon: "straighten",
                  color: "text-amber-500",
                  name: "height",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-primary/5 shadow-sm space-y-3"
                >
                  <div
                    className={`size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${item.color}`}
                  >
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">
                      {item.label}
                    </p>
                    {isEditing ? (
                      <input
                        name={item.name}
                        value={profileData[item.name]}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-b border-primary/20 text-sm font-black outline-none py-1"
                      />
                    ) : (
                      <p className="text-lg font-black">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Info Form */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-primary/5 shadow-sm space-y-8">
              <h3 className="text-xl font-black italic flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  contact_page
                </span>
                Contact & Identity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    label: "Full Name",
                    value: profileData.fullName,
                    name: "fullName",
                    type: "text",
                  },
                  {
                    label: "Email Address",
                    value: profileData.email,
                    name: "email",
                    type: "email",
                  },
                  {
                    label: "Phone Number",
                    value: profileData.phone,
                    name: "phone",
                    type: "tel",
                  },
                  {
                    label: "Permanent Address",
                    value: profileData.address,
                    name: "address",
                    type: "text",
                  },
                ].map((field, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type={field.type}
                        name={field.name}
                        value={profileData[field.name]}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-primary/5 rounded-2xl py-3 px-4 text-sm font-bold focus:border-primary outline-none transition-all shadow-inner"
                      />
                    ) : (
                      <p className="text-sm font-bold p-1">{field.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chronic Conditions & Medical OP */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[3px] text-slate-400">
                  Chronic Tracking
                </h3>
                <span className="material-symbols-outlined text-primary">
                  analytics
                </span>
              </div>

              {/* Sugar Tracking */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-10 rounded-xl flex items-center justify-center ${profileData.hasSugar ? "bg-primary/20 text-primary" : "bg-white/5 text-white/20"}`}
                    >
                      <span className="material-symbols-outlined">glucose</span>
                    </div>
                    <div>
                      <p className="font-bold">Diabetes / Sugar</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">
                        Chronic Condition
                      </p>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleToggleCondition("hasSugar")}
                      className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${profileData.hasSugar ? "bg-primary border-primary" : "border-white/20"}`}
                    >
                      {profileData.hasSugar && (
                        <span className="material-symbols-outlined text-sm font-black text-white">
                          check
                        </span>
                      )}
                    </button>
                  )}
                </div>
                {profileData.hasSugar && (
                  <div className="pl-14 space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      Current Levels / Quantity
                    </label>
                    {isEditing ? (
                      <input
                        name="sugarDetails"
                        value={profileData.sugarDetails}
                        onChange={handleChange}
                        placeholder="e.g. HbA1c 6.5%"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs font-bold focus:border-primary outline-none"
                      />
                    ) : (
                      <p className="text-xs font-bold text-primary">
                        {profileData.sugarDetails || "Not specified"}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* BP Tracking */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`size-10 rounded-xl flex items-center justify-center ${profileData.hasBP ? "bg-primary/20 text-primary" : "bg-white/5 text-white/20"}`}
                    >
                      <span className="material-symbols-outlined">
                        blood_pressure
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">Hypertension / BP</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black">
                        Chronic Condition
                      </p>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleToggleCondition("hasBP")}
                      className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${profileData.hasBP ? "bg-primary border-primary" : "border-white/20"}`}
                    >
                      {profileData.hasBP && (
                        <span className="material-symbols-outlined text-sm font-black text-white">
                          check
                        </span>
                      )}
                    </button>
                  )}
                </div>
                {profileData.hasBP && (
                  <div className="pl-14 space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      Current Reading / Quantity
                    </label>
                    {isEditing ? (
                      <input
                        name="bpDetails"
                        value={profileData.bpDetails}
                        onChange={handleChange}
                        placeholder="e.g. 130/85 mmHg"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-xs font-bold focus:border-primary outline-none"
                      />
                    ) : (
                      <p className="text-xs font-bold text-primary">
                        {profileData.bpDetails || "Not specified"}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="h-px bg-white/5 pt-4" />

              <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    verified_user
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Security Note
                  </p>
                </div>
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  Your medical data is encrypted and only shared with licensed
                  practitioners during physical visit registrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfile;