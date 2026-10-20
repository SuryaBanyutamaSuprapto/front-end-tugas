import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import TeamCard from "@/components/TeamCard";
import ButtonLink from "@/components/ButtonLink";
import { company } from "@/lib/company";
import { teamMembers } from "@/lib/team";

const features = [
  {
    icon: "\uD83D\uDD25",
    title: "Dibakar Langsung",
    text: "Setiap tusuk dibakar saat dipesan, jadi selalu hangat dan beraroma arang.",
  },
  {
    icon: "\uD83C\uDF36\uFE0F",
    title: "Sambal Segar",
    text: "Sambal dibuat segar dan tingkat pedasnya bisa disesuaikan dengan selera.",
  },
  {
    icon: "\uD83C\uDF4B",
    title: "Tanpa Kecap Manis",
    text: "Rasa asli daging ayam dipadukan dengan perasan jeruk limau yang menyegarkan.",
  },
];

export default function HomePage() {
  const sorotan = teamMembers.slice(0, 3);

  return (
    <>
      <Hero
        title={`Welcome to ${company.name}`}
        description={company.description}
      />

      <section className="section">
        <div className="container">
          <SectionTitle
            title="Kenapa Taichanese?"
            subtitle="Sederhana, pedas, dan bikin nambah."
          />
          <div className="grid grid-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle
            title="Meet Our Team"
            subtitle="Kenalan dengan orang-orang di balik Taichanese."
          />
          <div className="grid grid-3">
            {sorotan.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
          <div className="center">
            <ButtonLink href="/team" variant="outline">
              Lihat Semua Tim
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
