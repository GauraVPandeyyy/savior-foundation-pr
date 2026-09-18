import type { Metadata } from "next";
import { BulletList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community Programmes",
  description: "Child welfare, hygiene, Swachh Bharat, Beti Bachao Beti Padhao and health-awareness initiatives supported by SAVIOR Healthcare Foundation.",
  alternates: { canonical: "/community-initiatives" },
};

export default function CommunityInitiativesPage() {
  return (
    <>
      <PageHero
        eyebrow="Community Programmes"
        title="Health awareness and social initiatives that strengthen community wellbeing."
        intro="SAVIOR Healthcare Foundation complements its healthcare work with selected programmes around hygiene, child welfare, girl-child awareness and volunteer-led community outreach."
        image={media.swachhDrive}
      />

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Community outreach"
              title="Practical programmes shaped around health, dignity and awareness."
              copy="These initiatives support the Foundation’s healthcare mission by addressing social and environmental factors that influence the wellbeing of children, families and communities."
            />
            <BulletList items={[
              "Child Labour awareness and child-welfare outreach",
              "Swachh Bharat and community hygiene activities",
              "Beti Bachao Beti Padhao awareness",
              "Preventive-health education",
              "Volunteer-led social and community outreach",
            ]} />
          </div>
          <div className="content-photo content-photo-tall">
            <MediaFigure asset={media.swachhDrive} className="h-full w-full" caption />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f4f0e8]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="content-photo">
            <MediaFigure asset={media.womenCamp} className="h-full w-full" caption />
          </div>
          <div>
            <SectionHeading
              eyebrow="Health awareness"
              title="Community engagement supports earlier and better-informed care."
              copy="Awareness activities help families recognise common health concerns, understand preventive practices and seek appropriate medical guidance when it is needed."
            />
            <p className="mt-6 body-copy">The Foundation’s community work is designed to remain connected to its broader purpose: improving access to healthcare and supporting people who may otherwise face barriers to timely care.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
