import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ZoomViewerEmbed from "../components/ZoomViewerEmbed";
import api from "../api/axios";

const Watch = () => {
  const { influencerId } = useParams();
  const [meetingConfig, setMeetingConfig] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const fetchJoinDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/live/join/${influencerId}`);
      setMeetingConfig(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "This stream is not live right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nameSubmitted) {
      fetchJoinDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSubmitted]);

  // Ask for a display name before joining (shown to influencer/other viewers)
  if (!nameSubmitted) {
    return (
      <div className="min-h-screen bg-base">
        <Navbar />
        <div className="max-w-sm mx-auto mt-24 px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNameSubmitted(true);
            }}
            className="bg-surface border border-line rounded-2xl p-8"
          >
            <h1 className="font-display text-xl font-bold text-white mb-1">
              Join this live stream
            </h1>
            <p className="text-muted text-sm mb-5">
              What name should we show you as?
            </p>
            <input
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-surface2 border border-line rounded-lg px-3 py-2.5 text-sm text-white mb-5 placeholder:text-muted/50"
            />
            <button
              type="submit"
              className="w-full bg-signal text-base font-semibold text-sm rounded-lg py-2.5 hover:brightness-110 transition"
            >
              Join now
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="text-sm text-muted hover:text-white transition mb-6 inline-block">
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
        ) : (
          <ZoomViewerEmbed meetingConfig={meetingConfig} displayName={displayName} />
        )}
      </div>
    </div>
  );
};

export default Watch;
