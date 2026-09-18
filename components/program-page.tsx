import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Programme } from "@/lib/content";
import { MediaFigure } from "@/components/media";
import { BulletList, CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";

export function ProgramPage({ programme, secondaryTitle, secondaryCopy, secondaryItems = [], note }: { programme: Programme; secondaryTitle?: string; secondaryCopy?: string; secondaryItems?: string[]; note?: string }) {
  const reverse = programme.accent === "blue" || programme.accent === "sand";
  return (
    <>
      <PageHero eyebrow={programme.eyebrow} title={programme.title} intro={programme.intro} image={programme.image}>
        <div className="flex flex-wrap gap-3">
          <Link href={programme.cta.href} className="btn-primary">{programme.cta.label} <ArrowRight size={17} /></Link>
          {programme.slug !== "heart-care" ? <Link href="/patient-support" className="btn-light">Patient Support</Link> : null}
        </div>
      </PageHero>
      <section className="section-pad">
        <div className={`container-shell grid gap-12 lg:grid-cols-2 lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="content-photo content-photo-tall"><MediaFigure asset={programme.image} className="h-full w-full" caption /></div>
          <div>
            <Eyebrow>{programme.eyebrow}</Eyebrow>
            <h2 className="mt-5 section-title">Programme scope and support.</h2>
            <p className="mt-6 lead">{programme.body}</p>
            <BulletList items={programme.bullets} />
            {note ? <div className="mt-7 text-sm leading-7 text-[#64778a]">{note}</div> : null}
          </div>
        </div>
      </section>
      {secondaryTitle ? (
        <section className="section-pad bg-[#eef4f1]">
          <div className="container-shell grid gap-12 lg:grid-cols-[.82fr_1.18fr]">
            <SectionHeading eyebrow="Programme Approach" title={secondaryTitle} copy={secondaryCopy} />
            <div className="grid gap-3">
              {secondaryItems.map((item, index) => <div key={item} className="flex gap-4 border-b border-[#cbdcd7] py-5"><span className="editorial-serif text-lg text-[#9aaba6]">0{index + 1}</span><CheckCircle2 size={20} className="mt-1 shrink-0 text-[#0b8f80]" /><p className="font-semibold leading-7 text-[#344d62]">{item}</p></div>)}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBand />
    </>
  );
}
