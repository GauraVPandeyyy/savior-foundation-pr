import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BulletList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Congenital Heart Support for Children",
  description: "Guidance, referral, hospital coordination and eligible support pathways for families of children with congenital heart conditions.",
  alternates: { canonical: "/heart-care/congenital-heart-support" },
};

export default function CongenitalHeartSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Children & Cardiac Care"
        title="Support for families navigating congenital heart conditions."
        intro="Families may need specialist access, hospital coordination and practical guidance after a child is diagnosed or suspected to have a congenital heart condition."
        image={media.girlCheck}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Family support"
              title="Clearer access to specialist and treatment pathways."
              copy="The Foundation may assist eligible families with referral guidance, coordination and suitable treatment-support enquiries according to medical need and available programme resources."
            />
            <BulletList items={["Review of information for programme triage", "Specialist or hospital referral guidance", "Coordination support for eligible families", "Treatment-support enquiries", "Cardiac surgery-support facilitation where eligible", "Follow-up communication and documentation guidance"]} />
            <p className="mt-6 body-copy">Clinical decisions, including diagnosis and suitability for surgery or treatment, remain with qualified healthcare professionals and treating institutions.</p>
            <Link href="/heart-care/patient-support" className="btn-primary mt-7">Heart patient support <ArrowRight size={17} /></Link>
          </div>
          <div className="content-photo content-photo-tall"><MediaFigure asset={media.childCamp} className="h-full w-full" caption /></div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
