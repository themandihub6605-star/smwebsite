import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-base">
      <Navbar />
      <div className="flex items-center justify-center px-4" style={{ minHeight: "80vh" }}>
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-signal/10 flex items-center justify-center mx-auto mb-6">
            <span className="w-3 h-3 rounded-full bg-signal" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            Thanks for watching!
          </h1>
          <p className="text-muted text-sm mb-8">
            Hope you enjoyed the stream. Check back anytime to see who's live
            and join another session.
          </p>
          <Link
            to="/"
            className="inline-block bg-signal text-base font-semibold text-sm rounded-lg px-6 py-2.5 hover:brightness-110 transition"
          >
            See who's live now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;