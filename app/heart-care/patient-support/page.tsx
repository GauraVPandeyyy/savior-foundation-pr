import type { Metadata } from "next";
import { FoundationForm } from "@/components/forms";
import { PageHero, SectionHeading } from "@/components/ui";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Heart Patient Support",
  description:
    "Submit an enquiry for cardiac patient support, congenital heart guidance, referral or eligible treatment-support pathways.",
  alternates: { canonical: "/heart-care/patient-support" },
};

export default function HeartPatientSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Heart Patient Support"
        title="Share the patient’s cardiac-care requirement."
        intro="The Foundation reviews heart-related support enquiries to understand the patient’s situation and identify whether an appropriate programme, referral or assistance pathway is available."
        image={media.childCamp}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="Support enquiry"
              title="Provide the essential information needed to review the case."
              copy="This form is intended for programme review and coordination. Medical diagnosis and treatment decisions remain with the patient’s qualified healthcare professionals."
            />
            {/* <p className="mt-6 body-copy">For a medical emergency, contact the nearest appropriate emergency service or hospital directly.</p> */}
          </div>
          <FoundationForm type="Heart Patient Support" />
        </div>
      </section>
    </>
  );
}
