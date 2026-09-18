import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore SAVIOR Healthcare Foundation's work in cardiac care, community health, patient support and social programmes.",
  alternates: { canonical: "/our-work" },
};

const groups = [
  {
    eyebrow: "Heart Care",
    title: "Cardiac screening, patient guidance and support for families facing heart-related conditions.",
    copy: "Cardiac care is a major area of the Foundation’s work, including support for children with congenital heart conditions, economically vulnerable patients and community screening initiatives.",
    href: "/heart-care",
    image: media.cardiacCamp,
  },
  {
    eyebrow: "Health & Patient Support",
    title: "Health camps, women and child health, disability assistance and support for vulnerable patients.",
    copy: "These connected programmes bring screening, awareness, medical guidance and practical assistance closer to families and communities.",
    href: "/health-support",
    image: media.motherChildCamp,
  },
  {
    eyebrow: "Community Programmes",
    title: "Health awareness, hygiene, child welfare and volunteer-led social outreach.",
    copy: "Selected community initiatives complement the Foundation’s healthcare work and support broader wellbeing, dignity and awareness.",
    href: "/community-initiatives",
    image: media.swachhDrive,
  },
] as const;

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Healthcare programmes organised around clear areas of need."
        intro="The Foundation’s work is presented through three connected areas: cardiac care, wider health and patient support, and community programmes."
        image={media.healthCamp}
      />

      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Programme structure"
            title="A simpler way to understand the Foundation’s work."
            copy="Related programmes are grouped together so visitors can find the right information without navigating a long list of overlapping pages."
          />
          <div className="mt-12 grid gap-8">
            {groups.map((group, index) => (
              <Link
                href={group.href}
                key={group.href}
                className={`group grid overflow-hidden rounded-[34px] border border-[#dce6e3] bg-white lg:grid-cols-[1.02fr_.98fr] ${index === 1 ? "lg:grid-cols-[.98fr_1.02fr]" : ""}`}
              >
                <div className={`relative min-h-[350px] ${index === 1 ? "lg:order-2" : ""}`}>
                  <MediaFigure asset={group.image} className="h-full w-full" imageClassName="transition duration-700 group-hover:scale-[1.025]" />
                </div>
                <div className={`flex flex-col justify-center p-7 sm:p-10 lg:p-12 ${index === 1 ? "lg:order-1" : ""}`}>
                  <span className="eyebrow">{group.eyebrow}</span>
                  <h2 className="mt-5 editorial-serif text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.03] tracking-[-.035em] text-[#0a2444]">{group.title}</h2>
                  <p className="mt-5 body-copy">{group.copy}</p>
                  <span className="mt-7 inline-flex items-center gap-2 font-bold text-[#087b6f]">Explore <ArrowRight size={17} className="transition group-hover:translate-x-1" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
