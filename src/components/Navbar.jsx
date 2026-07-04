import React from "react";
import { Link } from "react-router-dom";

// Influencer registration lives on a separate app (Creator Studio panel).
// Change this URL if you deploy it under a different domain/port.
const INFLUENCER_PANEL_URL = import.meta.env.VITE_INFLUENCER_PANEL_URL || "http://localhost:3002";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-line">
      <Link to="/" className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-signal animate-pulse" />
        <span className="font-display text-lg font-bold text-white tracking-tight">
          LiveHub
        </span>
      </Link>

      <a
        href={`${INFLUENCER_PANEL_URL}/register`}
        className="text-sm font-medium text-base bg-signal px-4 py-2 rounded-lg hover:brightness-110 transition"
      >
        Become a creator
      </a>
    </header>
  );
};

export default Navbar;
