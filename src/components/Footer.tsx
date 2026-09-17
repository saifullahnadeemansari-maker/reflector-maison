"use client";

import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setNote(data.message);
      setEmail("");
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="brand-word">REFLECTOR</p>
          <p className="muted">Geneva atelier. Light, held in time.</p>
        </div>
        <form onSubmit={onSubmit} className="news-form">
          <label htmlFor="news-email">Private list</label>
          <div className="news-row">
            <input
              id="news-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
            />
            <button className="btn-primary" disabled={busy} type="submit">
              {busy ? "Sending" : "Join"}
            </button>
          </div>
          {note && <p className="form-note">{note}</p>}
        </form>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} REFLECTOR Geneva</span>
        <span>Atelier hours 10:00–18:00 CET</span>
      </div>
    </footer>
  );
}
