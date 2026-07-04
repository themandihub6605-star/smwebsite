import React from "react";
import { Link } from "react-router-dom";

const LiveCard = ({ influencer }) => {
  const initials = influencer.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      to={`/watch/${influencer._id}`}
      className="group bg-surface border border-line rounded-2xl overflow-hidden hover:border-signal/40 transition"
    >
      <div className="aspect-video bg-surface2 flex items-center justify-center relative">
        {influencer.profileImage ? (
          <img
            src={influencer.profileImage}
            alt={influencer.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-display text-3xl font-bold text-muted">{initials}</span>
        )}

        <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
          <span className="text-xs font-mono font-medium text-signal uppercase">Live</span>
        </span>
      </div>

      <div className="p-4 flex items-center justify-between">
        <span className="text-sm font-medium text-white truncate">{influencer.name}</span>
        <span className="text-xs text-muted group-hover:text-signal transition">Watch →</span>
      </div>
    </Link>
  );
};

export default LiveCard;
