"use client";

import { useEffect, useState } from "react";

const KEY = "reflector-entered";

export function WelcomeGate() {
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === "1") setOpen(false);
  }, []);

  function enter() {
    setLeaving(true);
    sessionStorage.setItem(KEY, "1");
    window.setTimeout(() => setOpen(false), 780);
  }

  if (!open) return null;

  return (
    <div className={`welcome ${leaving ? "welcome-leave" : ""}`} role="dialog" aria-label="Welcome to REFLECTOR">
      <div className="welcome-glow" />
      <div className="welcome-crystal">
        <img src="/watches/hero.jpg" alt="" />
        <span className="welcome-beam" />
      </div>
      <p className="eyebrow">Geneva · Est. 2018</p>
      <h1 className="welcome-mark">REFLECTOR</h1>
      <p className="welcome-line">Light, held in time.</p>
      <button className="btn-primary welcome-btn" onClick={enter} type="button">
        Enter the maison
      </button>
    </div>
  );
}
