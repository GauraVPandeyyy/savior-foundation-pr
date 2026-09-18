import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BulletList, CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Community Health & Patient Support",
  description: "Free health camps, women and child health initiatives, disability assistance and patient-support programmes from SAVIOR Healthcare Foundation.",
  alternates: { canonical: "/health-support" },
};

const sections = [
  {
    id: "health-camps",
    eyebrow: "Community health camps",
    title: "Accessible screening and medical guidance closer to communities.",
    copy: "The Foundation organises and supports health camps that help people access preliminary screening, consultation, health awareness and referral guidance. Services vary by programme and the healthcare professionals available.",
    bullets: ["General health consultation", "Blood pressure and blood sugar checks", "Cardiac screening and ECG where available", "Women and child health consultation", "Preventive health awareness", "Referral for further medical evaluation"],
    image: media.raebareliCamp,
  },
  {
    id: "women-child-health",
    eyebrow: "Women & child health",
    title: "Preventive healthcare for women, children and families.",
    copy: "Programmes focus on health awareness, early screening and practical guidance for women and children, including areas where delayed care or limited access can affect long-term wellbeing.",
    bullets: ["Women’s preventive health awareness", "Anaemia and menstrual-health awareness", "Maternal health and nutrition guidance", "Child health screening and awareness", "Support for children with serious medical needs", "Girl-child health and wellbeing initiatives"],
    image: media.motherChildCamp,
  },
  {
    id: "disability-patient-support",
    eyebrow: "Disability & patient assistance",
    title: "Practical support for people facing healthcare and mobility barriers.",
    copy: "The Foundation works to support eligible persons with disabilities and vulnerable patients through assistive-device initiatives, medical guidance, referrals and suitable treatment-support pathways.",
    bullets: ["Assistive devices for eligible beneficiaries", "Wheelchairs and mobility-support aids", "Support for children with disabilities", "Medical guidance and referral", "Treatment-support facilitation for vulnerable patients", "Rehabilitation-related guidance where appropriate"],
    image: media.girlCheck,
  },
] as const;

export default function HealthSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Community Health & Patient Support"
        title="Healthcare support that responds to everyday community needs."
        intro="Alongside cardiac care, SAVIOR Healthcare Foundation works through health camps, women and child health initiatives, disability support and assistance for vulnerable patients."
        image={media.tamenglongCamp}
      />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Programme areas"
            title="Connected healthcare programmes, presented in one clear pathway."
            copy="These programmes are grouped together so patients, families and communities can understand the Foundation’s wider healthcare work without navigating multiple overlapping pages."
          />
        </div>
      </section>

      {sections.map((section, index) => (
        <section id={section.id} key={section.id} className={`scroll-mt-28 section-pad ${index % 2 ? "bg-[#f4f0e8]" : "pt-0"}`}>
          <div className={`container-shell grid gap-12 lg:grid-cols-2 lg:items-center`}>
            <div className={index % 2 ? "lg:order-2" : ""}>
              <SectionHeading eyebrow={section.eyebrow} title={section.title} copy={section.copy} />
              <BulletList items={[...section.bullets]} />
            </div>
            <div className={`content-photo ${index === 1 ? "content-photo-tall" : ""} ${index % 2 ? "lg:order-1" : ""}`}>
              <MediaFigure asset={section.image} className="h-full w-full" caption />
            </div>
          </div>
        </section>
      ))}

      <section className="section-pad bg-[#eef4f1]">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Patient assistance"
              title="A direct route for families seeking healthcare support."
              copy="Patient-support enquiries are reviewed according to the Foundation’s programme scope, available resources and the medical information provided by the family."
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/patient-support" className="btn-primary">Patient support <ArrowRight size={17} /></Link>
              <Link href="/heart-care/patient-support" className="btn-secondary">Heart patient support</Link>
            </div>
          </div>
          <div className="content-photo content-photo-compact">
            <MediaFigure asset={media.nrhmPatient} className="h-full w-full" caption />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
