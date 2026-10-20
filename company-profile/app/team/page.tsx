import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TeamCard from "@/components/TeamCard";
import { teamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "Team",
  description: "Kenali tim di balik Taichanese.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Orang-orang di balik setiap tusuk sate Taichanese."
      />

      <section className="section">
        <div className="container">
          <div className="team-panel">
            <div className="grid grid-3">
              {teamMembers.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
