import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

const Watch = () => {
  const { influencerId } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  const fetchAndJoin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/live/join/${influencerId}`);
      // Opens the REAL Zoom app/website in a new tab as a viewer -
      // full native Zoom experience, not embedded on our site.
      window.open(res.data.data.joinUrl, "_blank");
      setJoined(true);
    } catch (err) {
      setError(err.response?.data?.message || "This stream is not live right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndJoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <Navbar />

      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <Link to="/" className="text-sm text-muted hover:text-white transition mb-8 inline-block">
          ← Back to all live streams
        </Link>

        {loading ? (
          <p className="text-muted text-sm">Connecting to stream...</p>
        ) : error ? (
          <div className="border border-dashed border-line rounded-2xl py-16 text-center">
            <p className="text-danger text-sm mb-2">{error}</p>
            <p className="text-muted text-sm">
              This creator may have ended their stream. Head back to see who's live.
            </p>
          </div>
        ) : joined ? (
          <div className="border border-line rounded-2xl py-16 text-center bg-surface">
            <p className="text-white text-sm mb-2">Zoom opened in a new tab.</p>
            <p className="text-muted text-sm mb-5">
              If it didn't open, check your browser's popup blocker.
            </p>
            <button
              onClick={fetchAndJoin}
              className="bg-signal text-base font-semibold text-sm rounded-lg px-5 py-2.5 hover:brightness-110 transition"
            >
              Reopen Zoom
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Watch;