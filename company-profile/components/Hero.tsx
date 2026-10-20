import Image from "next/image";
import ButtonLink from "@/components/ButtonLink";

type HeroProps = {
  title: string;
  description: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <Image
          src="/images/banner.jpg"
          alt="Taichanese - Taste the Flavor Fiesta"
          width={1600}
          height={1142}
          className="hero-banner"
          priority
        />
        <h1>{title}</h1>
        <p className="hero-text">{description}</p>
        <div className="btn-group">
          <ButtonLink href="/team">Meet Our Team</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Hubungi Kami
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
