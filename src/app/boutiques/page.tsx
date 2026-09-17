const houses = [
  { city: "Geneva", name: "Atelier Cour Saint-Pierre", detail: "By appointment · 10:00–18:00 CET", note: "The home bench. Full collection, regulation, and fittings." },
  { city: "Paris", name: "Partner salon, Rue de la Paix", detail: "Tue–Sat", note: "Aurora, Nocturne, Verdant. Céleste on request." },
  { city: "Dubai", name: "Partner salon, Financial District", detail: "Daily", note: "City and Element collections. Evening viewings." },
  { city: "Tokyo", name: "Partner salon, Ginza", detail: "Wed–Sun", note: "Meridian shown under appointment only." },
];

export const metadata = { title: "Boutiques" };

export default function BoutiquesPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Where to see the pieces</p>
        <h1>Boutiques</h1>
        <p className="lead">One atelier. Three partner salons. Write first — walk-ins are rare on complication pieces.</p>
      </header>
      <div className="story-grid">
        {houses.map((house) => (
          <article key={house.city} className="panel">
            <p className="eyebrow">{house.city}</p>
            <h2>{house.name}</h2>
            <p className="muted">{house.detail}</p>
            <p>{house.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
