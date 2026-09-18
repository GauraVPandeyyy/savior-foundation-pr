import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/ui";
import { FoundationForm } from "@/components/forms";
import { media } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SAVIOR Healthcare Foundation for general enquiries, programme information and healthcare-support guidance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact the Foundation."
        intro="For general enquiries, programme information or guidance on the appropriate support route, contact SAVIOR Healthcare Foundation."
        image={media.womenCamp}
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <SectionHeading eyebrow="Contact details" title="SAVIOR Healthcare Foundation" copy="Registered in Lucknow, Uttar Pradesh, with healthcare and community programmes supported by volunteers and partner professionals." />
            <div className="mt-8 grid gap-4">
              <div className="flex gap-4 border-t border-[#cadbd6] py-5"><MapPin className="mt-1 shrink-0 text-[#0b8f80]" /><p className="font-semibold leading-7 text-[#506376]">{site.address}</p></div>
              <div className="flex gap-4 border-t border-[#cadbd6] py-5"><Mail className="shrink-0 text-[#0b8f80]" /><a href={`mailto:${site.email}`} className="font-semibold text-[#506376] hover:text-[#087b6f]">{site.email}</a></div>
            </div>
            <Link href="/get-involved" className="mt-6 inline-flex items-center gap-2 font-bold text-[#087b6f]">Volunteer or partner with us <ArrowRight size={17} /></Link>
          </div>
          <FoundationForm type="Contact" />
        </div>
      </section>
    </>
  );
}
