import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";
import { impactPlaceholders } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impact",
  description: "The healthcare, patient-support, volunteer and community work of SAVIOR Healthcare Foundation since 2022.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Healthcare programmes built around people, families and communities."
        intro="Since 2022, SAVIOR Healthcare Foundation has worked across cardiac care, health camps, patient assistance and community programmes with the support of volunteers and healthcare professionals."
        image={media.healthCamp}
      />

      <section className="section-pad impact-band">
        <div className="container-shell">
          <SectionHeading
            inverse
            eyebrow="Foundation reach"
            title="A growing body of healthcare and community work."
            copy="Programme figures are maintained centrally so the Foundation can update its published reach as its records are consolidated."
          />
          <div className="mt-12 impact-metrics">
            {impactPlaceholders.map((metric) => (
              <div key={metric.label} className="impact-metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Programme outcomes"
              title="Impact is reflected in access, continuity and community participation."
              copy="The Foundation’s work brings together patient support, screening, referral, volunteer mobilisation and health-awareness programmes rather than treating each activity as an isolated intervention."
            />
            <div className="mt-8 grid gap-0">
              {["Patient and family support through suitable healthcare pathways", "Community screening and health-camp outreach", "Support for women, children and persons with disabilities", "Volunteer participation in grassroots programmes", "Health, hygiene and social-awareness initiatives"].map((item, index) => (
                <div className="flex gap-4 border-b border-[#cbdcd7] py-4" key={item}>
                  <span className="editorial-serif text-[#9aaba6]">0{index + 1}</span>
                  <span className="font-semibold text-[#344d62]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="content-photo content-photo-tall">
            <MediaFigure asset={media.nrhmPatient} className="h-full w-full" caption />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#eef4f1]">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="content-photo">
            <MediaFigure asset={media.doctorsCamp} className="h-full w-full" caption />
          </div>
          <div>
            <SectionHeading
              eyebrow="Volunteer contribution"
              title="Community work is strengthened by people who give their time and professional support."
              copy="Volunteers help organise outreach, coordinate programmes, guide families and support the Foundation’s connection with communities. Healthcare professionals contribute clinical expertise where suitable programmes require it."
            />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
