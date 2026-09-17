import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getWatch, watches } from "@/lib/catalog";
import { InquiryForm } from "@/components/InquiryForm";

export function generateStaticParams() {
  return watches.map((watch) => ({ slug: watch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) return { title: "Reference" };
  return { title: watch.name, description: watch.tagline };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) notFound();

  return (
    <div className="page product-page">
      <div className="product-layout">
        <div className="product-visual">
          <img src={watch.image} alt={`${watch.name} by REFLECTOR`} />
        </div>
        <div className="product-copy">
          <p className="eyebrow">
            {watch.collection}
            {watch.limited ? ` · ${watch.edition}` : ""}
          </p>
          <h1>{watch.name}</h1>
          <p className="lead">{watch.tagline}</p>
          <p className="price">{formatPrice(watch.price)}</p>
          <p>{watch.description}</p>
          <ul className="spec-list">
            <li><span>Case</span>{watch.caseSize} · {watch.caseMaterial}</li>
            <li><span>Movement</span>{watch.movement}</li>
            <li><span>Water</span>{watch.water}</li>
            <li><span>Strap</span>{watch.strap}</li>
          </ul>
          <ul className="ticks">
            {watch.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <section className="panel">
        <h2>Request this reference</h2>
        <p className="muted">The atelier confirms availability and books a viewing in Geneva, or with a partner boutique.</p>
        <InquiryForm presetSlug={watch.slug} />
      </section>
      <p className="center-row">
        <Link href="/collection" className="btn-ghost">Back to the collection</Link>
      </p>
    </div>
  );
}
