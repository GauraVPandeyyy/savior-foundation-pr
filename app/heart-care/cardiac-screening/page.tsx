import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BulletList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cardiac Screening & Heart Health Camps",
  description: "Cardiac screening and heart-health awareness initiatives including BP, blood sugar, ECG where available and referral guidance.",
  alternates: { canonical: "/heart-care/cardiac-screening" },
};

export default function CardiacScreeningPage() {
  return (
    <>
      <PageHero
        eyebrow="Cardiac Screening"
        title="Community screening for earlier cardiac evaluation."
        intro="Heart-health camps can help identify common risk factors, improve awareness and guide people towards appropriate medical evaluation when further assessment is required."
        image={media.davanagereCamp}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="content-photo content-photo-tall"><MediaFigure asset={media.healthCamp} className="h-full w-full" caption /></div>
          <div>
            <SectionHeading
              eyebrow="Screening services"
              title="Basic checks, medical guidance and referral support."
              copy="Services vary according to the programme, location and availability of qualified healthcare professionals."
            />
            <BulletList items={["Blood pressure screening", "Blood sugar testing", "ECG where available", "Basic cardiac-risk assessment", "Qualified medical consultation where available", "Lifestyle and prevention awareness", "Referral for further evaluation"]} />
            <p className="mt-6 body-copy">Screening is intended to support awareness and appropriate referral. Diagnosis and treatment decisions remain with qualified medical professionals.</p>
            <Link href="/get-involved" className="btn-primary mt-7">Discuss a health camp <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
