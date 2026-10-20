import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description: "Hubungi Taichanese untuk pemesanan dan pertanyaan.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        subtitle="Mau pesan atau punya pertanyaan? Tulis saja di sini."
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Informasi</h2>
            <p><b>Alamat:</b> {company.address}</p>
            <p><b>WhatsApp:</b> {company.phone}</p>
            <p><b>Email:</b> {company.email}</p>
            <p><b>Jam Buka:</b> {company.hours}</p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
