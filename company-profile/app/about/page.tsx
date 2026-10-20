import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import ButtonLink from "@/components/ButtonLink";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "About",
  description: "Kenali Taichanese, usaha sate taichan yang berdiri sejak 2025.",
};

const nilai = [
  {
    icon: "\uD83C\uDF57",
    title: "Bahan Pilihan",
    text: "Kami memilih ayam segar setiap hari untuk menjaga kualitas rasa.",
  },
  {
    icon: "\uD83D\uDC4B",
    title: "Pelayanan Ramah",
    text: "Pelanggan kami perlakukan seperti teman yang datang makan di rumah.",
  },
  {
    icon: "\u2728",
    title: "Rasa Konsisten",
    text: "Resep dan cara bakar yang sama di setiap porsi yang kami sajikan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Tentang Kami"
        subtitle={`${company.name} - est. ${company.established}`}
      />

      <section className="section">
        <div className="container about-grid">
          <Image
            src="/images/logo-diamond.png"
            alt={company.name}
            width={828}
            height={468}
            className="about-logo"
          />
          <div className="about-text">
            <h2>Cerita Kami</h2>
            <p>
              {company.name} berdiri pada tahun {company.established} dengan satu
              tujuan sederhana: menyajikan sate taichan yang enak dan terjangkau.
            </p>
            <p>
              Sate taichan adalah sate ayam yang dibakar tanpa kecap manis, lalu
              disantap dengan sambal dan perasan jeruk limau. Rasa asli dagingnya
              jadi lebih menonjol, dan setiap gigitan terasa segar.
            </p>
            <p>
              Dengan semboyan &quot;{company.tagline}&quot;, kami ingin setiap
              orang yang datang pulang dengan perut kenyang dan hati senang.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle title="Yang Kami Pegang" />
          <div className="grid grid-3">
            {nilai.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
          <div className="center">
            <ButtonLink href="/team">Kenali Tim Kami</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
