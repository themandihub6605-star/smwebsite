import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/watch/:influencerId" element={<Watch />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;