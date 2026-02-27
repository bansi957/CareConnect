import React from "react";
import { useNavigate, Link } from "react-router-dom";

const AuthHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Back Icon */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors group"
          title="Go back"
        >
          <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">
            arrow_back
          </span>
        </button>

        {/* Logo and Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined font-bold text-xl">
              medical_services
            </span>
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            CareConnect
          </h1>
        </Link>

        {/* Placeholder for symmetry */}
        <div className="size-10 invisible" />
      </div>
    </header>
  );
};

export default AuthHeader;
