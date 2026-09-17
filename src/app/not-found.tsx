import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page page-hero">
      <p className="eyebrow">404</p>
      <h1>This reference is not in the book.</h1>
      <Link href="/collection" className="btn-primary">Return to the collection</Link>
    </div>
  );
}
