import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LiveCard from "../components/LiveCard";
import api from "../api/axios";

const POLL_INTERVAL_MS = 10000; // refresh live list every 10s

const Home = () => {
  const [liveInfluencers, setLiveInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLive = async () => {
    try {
      const res = await api.get("/influencer/live-list");
      setLiveInfluencers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch live list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <Navbar />

      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-12 border-b border-line relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#39FF9D 1px, transparent 1px), linear-gradient(90deg, #39FF9D 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-3xl">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-xs tracking-[0.2em] text-signal uppercase">
              {liveInfluencers.length} live right now
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Watch creators go live,
            <br />
            no app required.
          </h1>
          <p className="text-muted text-base max-w-lg">
            Every stream below is happening right now, right here on this
            page. Pick one and join instantly.
          </p>
        </div>
      </section>

      {/* Live grid */}
      <section className="px-6 md:px-10 py-10 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-muted text-sm">Checking for live streams...</p>
        ) : liveInfluencers.length === 0 ? (
          <div className="border border-dashed border-line rounded-2xl py-20 text-center">
            <p className="text-muted text-sm">
              Nobody is live right now. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {liveInfluencers.map((inf) => (
              <LiveCard key={inf._id} influencer={inf} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
