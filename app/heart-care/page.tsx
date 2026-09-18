import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, Baby, HeartPulse, Stethoscope } from "lucide-react";
import { BulletList, CtaBand, PageHero, ProgrammeSteps, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Heart Care & Cardiac Support",
  description: "Cardiac screening, support for children with congenital heart conditions, patient guidance, referrals and eligible treatment-support pathways from SAVIOR Healthcare Foundation.",
  alternates: { canonical: "/heart-care" },
};

export default function HeartCare() {
  const focusAreas = [
    [Baby, "Congenital Heart Support", "Support for children and families navigating congenital heart conditions, specialist evaluation and suitable care pathways.", "/heart-care/congenital-heart-support"],
    [Activity, "Cardiac Screening", "Community-based screening and heart-health awareness designed to encourage timely medical evaluation.", "/heart-care/cardiac-screening"],
    [Stethoscope, "Patient Support", "A structured enquiry route for heart patients seeking guidance, referral or eligible treatment-support assistance.", "/heart-care/patient-support"],
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="Heart Care & Cardiac Support"
        title="Specialised support for heart patients and their families."
        intro="SAVIOR Healthcare Foundation works with patients and families who need clearer access to cardiac screening, specialist guidance, referral and eligible treatment-support pathways."
        image={media.cardiacCamp}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/heart-care/patient-support" className="btn-primary">Seek heart-care support <ArrowRight size={17} /></Link>
          <Link href="/heart-care/cardiac-screening" className="btn-light">Cardiac screening</Link>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Cardiac care"
              title="Guidance and support through a complex healthcare journey."
              copy="A heart-related diagnosis can raise medical, practical and financial questions at the same time. The Foundation helps families understand suitable next steps and connect with appropriate healthcare pathways."
            />
            <BulletList items={[
              "Children with congenital heart conditions",
              "Economically vulnerable heart patients",
              "Cardiac screening and heart-health awareness",
              "Specialist referral and hospital coordination",
              "Eligible treatment and surgery-support enquiries",
              "Follow-up guidance after screening or referral",
            ]} />
          </div>
          <div className="content-photo content-photo-tall">
            <MediaFigure asset={media.childCamp} className="h-full w-full" caption />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f1e7df]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Support pathway"
            title="From early screening to appropriate medical support."
            copy="The Foundation facilitates screening, guidance, referral and eligible support. Diagnosis and treatment decisions remain with qualified healthcare professionals and treating institutions."
          />
          <div className="mt-12"><ProgrammeSteps /></div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-7 lg:grid-cols-3">
          {focusAreas.map(([Icon, title, copy, href]) => {
            const I = Icon as typeof HeartPulse;
            return (
              <Link key={href} href={href} className="group border-t border-[#cbdcd7] pt-7">
                <I size={29} className="text-[#e24d47]" />
                <h2 className="mt-5 text-2xl font-semibold tracking-[-.025em] text-[#0a2444]">{title}</h2>
                <p className="mt-3 body-copy">{copy}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#087b6f]">Learn more <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
