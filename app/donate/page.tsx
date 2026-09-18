import type { Metadata } from "next";
import { DonationExperience } from "@/components/donation-form";
import { PageHero, SectionHeading } from "@/components/ui";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support SAVIOR Healthcare Foundation programmes in cardiac care, patient assistance, health camps and community healthcare.",
  alternates: { canonical: "/donate" },
};

export default function DonatePage() {
  const areas = [
    ["Cardiac care", "Support screening, patient guidance and eligible cardiac-care initiatives."],
    ["Community health", "Support health camps, preventive awareness and referral-oriented outreach."],
    ["Patient assistance", "Support healthcare-access initiatives for vulnerable patients and families."],
  ];
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Support healthcare programmes for patients and communities."
        intro="Contributions help strengthen the Foundation’s work across cardiac care, community health, patient assistance and related healthcare programmes."
        image={media.combinedCamp}
      />
      <section className="section-pad bg-[#f6f2ea]">
        <div className="container-shell">
          <SectionHeading eyebrow="Donation options" title="Choose a convenient way to contribute." copy="Online payment and direct-transfer options are presented through the Foundation’s configured donation channels." />
          <div className="mt-10"><DonationExperience /></div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-3">
          {areas.map(([title, copy]) => (
            <div key={title} className="border-t border-[#cbdcd7] pt-5">
              <h2 className="editorial-serif text-2xl font-semibold tracking-[-.025em] text-[#0a2444]">{title}</h2>
              <p className="mt-3 body-copy">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
