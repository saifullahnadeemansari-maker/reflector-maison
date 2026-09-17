"use client";

import { useState } from "react";
import { watches } from "@/lib/catalog";

export function InquiryForm({ presetSlug = "" }: { presetSlug?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    watchSlug: presetSlug,
    message: "",
  });
  const [note, setNote] = useState("");
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNote("");
    setOk(false);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "atelier-form" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setOk(true);
      setNote(data.message);
      setForm({ name: "", email: "", city: "", watchSlug: presetSlug, message: "" });
    } catch (error) {
      setNote(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="inquiry" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Name
          <input required minLength={2} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </label>
        <label>
          Email
          <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </label>
        <label>
          City
          <input value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
        </label>
        <label>
          Reference
          <select value={form.watchSlug} onChange={(e) => set("watchSlug", e.target.value)}>
            <option value="">A conversation</option>
            {watches.map((watch) => (
              <option key={watch.slug} value={watch.slug}>
                {watch.name} — {watch.collection}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Note to the atelier
        <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Preferred date, wrist size, or a question." />
      </label>
      <button className="btn-primary" type="submit" disabled={busy}>
        {busy ? "Sending" : "Request a viewing"}
      </button>
      {note && <p className={ok ? "form-note ok" : "form-note"}>{note}</p>}
    </form>
  );
}
