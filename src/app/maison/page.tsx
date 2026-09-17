export const metadata = { title: "Maison" };

export default function MaisonPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Since 2018</p>
        <h1>The maison</h1>
        <p className="lead">REFLECTOR began as a finishing studio above a courtyard in Geneva. The first brief was simple: a watch should look expensive in a dark room, not only under a lamp.</p>
      </header>
      <div className="story-grid">
        <article className="panel">
          <h2>Light as a material</h2>
          <p>Cases are designed around the crystal first. Domes, inner coatings, and the angle of a bezel are chosen so a single window can draw a line across the dial.</p>
        </article>
        <article className="panel">
          <h2>Small book</h2>
          <p>Six references. No seasonal palette. When a piece leaves the book it is because the movement or the metal is no longer the one we want to sign.</p>
        </article>
        <article className="panel">
          <h2>Service</h2>
          <p>Regulation and service stay in Geneva. A watch returns with a timed sheet and a note on what was actually done — not a stamp.</p>
        </article>
      </div>
    </div>
  );
}
