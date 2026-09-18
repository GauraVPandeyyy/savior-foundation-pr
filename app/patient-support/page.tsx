import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";
import { FoundationForm } from "@/components/forms";
import { PageHero, SectionHeading } from "@/components/ui";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Patient Support",
  description: "Submit a healthcare-support enquiry for patient guidance, referral, treatment-support or assistive-device programmes.",
  alternates: { canonical: "/patient-support" },
};

export default function PatientSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Support"
        title="Healthcare-support enquiries for patients and families."
        intro="This route is intended for people seeking guidance or eligible assistance through the Foundation’s healthcare and patient-support programmes."
        image={media.nrhmPatient}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading
              eyebrow="Support enquiry"
              title="Provide the information needed to understand the patient’s requirement."
              copy="The Foundation reviews the enquiry against its programme scope and may provide guidance, referral information or request relevant supporting details where appropriate."
            />
            <Link href="/heart-care/patient-support" className="mt-7 flex items-center gap-3 rounded-[22px] bg-[#f1e7df] p-5 font-semibold text-[#0a2444]"><HeartPulse className="text-[#e24d47]" />For a heart-related case, use the cardiac patient-support form.<ArrowRight className="ml-auto" size={18} /></Link>
          </div>
          <FoundationForm type="Patient Support" />
        </div>
      </section>
    </>
  );
}
