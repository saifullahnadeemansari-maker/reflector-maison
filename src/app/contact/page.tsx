import { InquiryForm } from "@/components/InquiryForm";

export const metadata = { title: "Atelier" };

export default function ContactPage() {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">Private desk</p>
        <h1>Write the atelier</h1>
        <p className="lead">For a viewing, a wrist size, or a question on a numbered Meridian. Replies come from Geneva within two working days.</p>
      </header>
      <section className="panel">
        <InquiryForm />
        <p className="muted contact-aside">atelier@reflector.watch · +41 22 555 0140</p>
      </section>
    </div>
  );
}
