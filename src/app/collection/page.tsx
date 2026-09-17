import Link from "next/link";
import { formatPrice, getCollections, watches } from "@/lib/catalog";

export const metadata = { title: "Collection" };

export default function CollectionPage() {
  const groups = getCollections();

  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">The book</p>
        <h1>Collection</h1>
        <p className="lead">Six current references. Prices from {formatPrice(6250)}. Request a viewing rather than a cart.</p>
      </header>
      {groups.map((group) => (
        <section key={group} className="featured">
          <div className="section-head">
            <p className="eyebrow">{group}</p>
          </div>
          <div className="watch-grid">
            {watches.filter((watch) => watch.collection === group).map((watch) => (
              <Link key={watch.slug} href={`/collection/${watch.slug}`} className="watch-card">
                <div className="watch-frame">
                  <img src={watch.image} alt={watch.name} />
                </div>
                <div className="watch-meta">
                  <span>{watch.limited ? watch.edition : watch.caseSize}</span>
                  <h3>{watch.name}</h3>
                  <p>{watch.tagline}</p>
                  <strong>{formatPrice(watch.price)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
