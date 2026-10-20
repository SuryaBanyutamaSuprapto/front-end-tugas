import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import SectionTitle from "@/components/SectionTitle";
import SocialLinks from "@/components/SocialLinks";
import TeamCard from "@/components/TeamCard";
import { getMemberBySlug, teamMembers } from "@/lib/team";

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/team/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return { title: "Anggota tidak ditemukan" };
  return { title: member.nama, description: member.ringkas };
}

export default async function TeamDetailPage({
  params,
}: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) notFound();

  const lainnya = teamMembers.filter((m) => m.slug !== member.slug).slice(0, 3);

  return (
    <>
      <section className="section">
        <div className="container">
          <Link href="/team" className="back-link">
            &larr; Kembali ke tim
          </Link>

          <div className="detail-grid">
            <div className="detail-photo">
              <Image src={member.foto} alt={member.nama} width={800} height={600} />
            </div>

            <div className="detail-info">
              <h1>{member.nama}</h1>
              <p className="team-role">{member.peran}</p>
              <p>{member.deskripsi}</p>

              <h2 className="detail-subtitle">Tanggung Jawab</h2>
              <ul className="detail-list">
                {member.tugas.map((tugas) => (
                  <li key={tugas}>{tugas}</li>
                ))}
              </ul>

              <SocialLinks />
              <ButtonLink href="/contact">Hubungi Kami</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionTitle title="Anggota Tim Lainnya" />
          <div className="grid grid-3">
            {lainnya.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
