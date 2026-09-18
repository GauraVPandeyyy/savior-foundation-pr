import type { Metadata } from "next";
import { HeartHandshake, Hospital, Stethoscope, Users } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/ui";
import { FoundationForm } from "@/components/forms";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, contribute professional healthcare expertise, host a health camp or explore an institutional partnership with SAVIOR Healthcare Foundation.",
  alternates: { canonical: "/get-involved" },
};

const ways = [
  [
    Users,
    "Community volunteering",
    "Support health camps, patient coordination, programme logistics, awareness activities and local outreach.",
  ],
  [
    Stethoscope,
    "Healthcare professionals",
    "Doctors and qualified healthcare professionals can contribute to suitable screening, consultation and awareness programmes.",
  ],
  [
    Hospital,
    "Institutional collaboration",
    "Hospitals, diagnostic centres and healthcare institutions can discuss programme, referral and screening collaboration.",
  ],
  [
    HeartHandshake,
    "CSR & programme support",
    "Organisations can explore responsible support for healthcare camps, patient assistance and community programmes.",
  ],
] as const;

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Contribute time, expertise or institutional support."
        intro="SAVIOR Healthcare Foundation works with volunteers, healthcare professionals, institutions and supporters who want to strengthen healthcare access and community programmes."
        image={media.doctorsCamp}
      />

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Ways to participate"
              title="Ways to support and work with the Foundation."
              copy="Contribute your time, professional expertise or institutional support to healthcare and community programmes aligned with the Foundation’s work."
            />
          </div>
          <div className="content-photo content-photo-compact">
            <MediaFigure
              asset={media.combinedCamp}
              className="h-full w-full"
              caption
            />
          </div>
        </div>

        <div className="container-shell mt-14 grid gap-x-10 gap-y-9 md:grid-cols-2">
          {ways.map(([Icon, title, copy]) => (
            <div key={title} className="border-t border-[#cbdcd7] pt-6">
              <Icon size={27} className="text-[#087b6f]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-.025em] text-[#0a2444]">
                {title}
              </h2>
              <p className="mt-3 body-copy">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-[#f4f0e8]">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="Get in touch"
              title="Tell us how you would like to contribute."
              copy="The same enquiry form covers community volunteering, medical volunteering, institutional partnerships, CSR discussions and health-camp collaboration."
            />
          </div>
          <FoundationForm type="Get Involved" />
        </div>
      </section>
    </>
  );
}
