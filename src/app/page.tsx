import Link from "next/link";
import { formatPrice, watches } from "@/lib/catalog";

export default function HomePage() {
  const featured = watches.slice(0, 3);

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Geneva atelier</p>
          <h1>
            A crystal is not
            <em> decoration.</em>
          </h1>
          <p className="lead">
            REFLECTOR builds watches around light — how a dial takes it, how a
            case returns it, how a day ends on the wrist.
          </p>
          <div className="hero-actions">
            <Link href="/collection" className="btn-primary">
              View the collection
            </Link>
            <Link href="/contact" className="btn-ghost">
              Private viewing
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/watches/hero.jpg"
            alt="Sapphire crystal catching a line of light"
          />
          <div className="hero-orb" />
        </div>
      </section>

      <section className="strip">
        <article>
          <span>01</span>
          <h2>Finish first</h2>
          <p>Bevels, sunburst, and black polish before a logo is considered.</p>
        </article>
        <article>
          <span>02</span>
          <h2>In-house rate</h2>
          <p>Every movement is regulated in Geneva against two positions.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Quiet volume</h2>
          <p>Small series. No seasonal drops. Pieces stay in the book.</p>
        </article>
      </section>

      <section className="featured">
        <div className="section-head">
          <p className="eyebrow">Now in the window</p>
          <h2>Three references</h2>
        </div>
        <div className="watch-grid">
          {featured.map((watch) => (
            <Link
              key={watch.slug}
              href={`/collection/${watch.slug}`}
              className="watch-card"
            >
              <div className="watch-frame">
                <img src={watch.image} alt={watch.name} />
              </div>
              <div className="watch-meta">
                <span>{watch.collection}</span>
                <h3>{watch.name}</h3>
                <p>{watch.tagline}</p>
                <strong>{formatPrice(watch.price)}</strong>
              </div>
            </Link>
          ))}
        </div>
        <div className="center-row">
          <Link href="/collection" className="btn-ghost">
            All six references
          </Link>
        </div>
      </section>
    </div>
  );
}
