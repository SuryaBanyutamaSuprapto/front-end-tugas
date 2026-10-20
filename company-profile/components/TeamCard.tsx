import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import type { TeamMember } from "@/lib/team";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="team-card">
      <Link href={`/team/${member.slug}`} className="team-card-link">
        <div className="team-photo">
          <Image src={member.foto} alt={member.nama} width={800} height={600} />
        </div>
        <h3>{member.nama}</h3>
        <p className="team-role">{member.peran}</p>
      </Link>
      <SocialLinks />
    </article>
  );
}
