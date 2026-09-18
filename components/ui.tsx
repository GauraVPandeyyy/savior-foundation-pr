import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { MediaAsset } from "@/lib/content";
import { MediaFigure } from "@/components/media";

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return <span className={`eyebrow ${inverse ? "eyebrow-inverse" : ""}`}>{children}</span>;
}

export function SectionHeading({ eyebrow, title, copy, center = false, inverse = false }: { eyebrow?: string; title: string; copy?: string; center?: boolean; inverse?: boolean }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? <Eyebrow inverse={inverse}>{eyebrow}</Eyebrow> : null}
      <h2 className={`${eyebrow ? "mt-5" : ""} section-title ${inverse ? "text-white" : "text-[#0a2444]"}`}>{title}</h2>
      {copy ? <p className={`mt-5 lead ${inverse ? "!text-white/68" : ""}`}>{copy}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, image, children }: { eyebrow: string; title: string; intro: string; image?: MediaAsset; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-[#0a2444] text-white">
      {image ? <div className="absolute inset-0"><MediaFigure asset={image} className="h-full w-full" imageClassName="scale-[1.02] opacity-42" priority sizes="100vw" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,23,46,.97)_0%,rgba(6,23,46,.84)_48%,rgba(6,23,46,.42)_100%)]" /></div> : null}
      <div className="absolute inset-0 editorial-grid opacity-30" />
      <div className="container-shell relative z-10 py-20 md:py-28 lg:py-32">
        <Eyebrow inverse>{eyebrow}</Eyebrow>
        <h1 className="editorial-serif mt-6 max-w-5xl text-[clamp(2.8rem,7vw,6.1rem)] font-semibold leading-[.96] tracking-[-.042em]">{title}</h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-8 text-white/70 md:text-xl">{intro}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

export function TrustStrip({ dark = false }: { dark?: boolean }) {
  const items = [
    ["2022", "Serving since"],
    ["Cardiac care", "Dedicated programme"],
    ["Health camps", "Community outreach"],
    ["Volunteers", "Community support"],
  ];
  return <div className={`trust-strip ${dark ? "trust-strip-dark" : ""}`}>{items.map(([value, label]) => <div key={label} className="trust-item"><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

export function BulletList({ items, inverse = false }: { items: string[]; inverse?: boolean }) {
  return <ul className="mt-7 grid gap-3">{items.map((item) => <li key={item} className={`flex items-start gap-3 text-[15px] leading-7 ${inverse ? "text-white/72" : "text-[#52677a]"}`}><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${inverse ? "bg-[#7fe0d3]" : "bg-[#0b9b89]"}`} />{item}</li>)}</ul>;
}

export function StoryQuote({ children, byline }: { children: ReactNode; byline?: string }) {
  return <blockquote className="border-l-2 border-[#e24d47] pl-6 text-2xl font-bold leading-10 tracking-[-.025em] text-[#0a2444]">{children}{byline ? <footer className="mt-4 text-sm font-extrabold uppercase tracking-[.12em] text-[#6d7f8f]">{byline}</footer> : null}</blockquote>;
}

export function CtaBand() {
  return (
    <section className="section-pad bg-[#f4f0e8]">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[42px] bg-[#0a2444] px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
          <Image src="/brand/logo-emblem.png" alt="" width={300} height={220} className="pointer-events-none absolute -right-10 -top-8 w-64 opacity-[.09]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><Eyebrow inverse>Support SAVIOR</Eyebrow><h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-.03em] sm:text-5xl">Support healthcare programmes for patients and communities.</h2><p className="mt-5 max-w-2xl leading-8 text-white/68">Contribute to patient support, volunteer-led outreach and community healthcare programmes through the Foundation.</p></div>
            <div className="flex flex-wrap gap-3"><Link href="/donate" className="btn-primary">Donate now <ArrowRight size={17} /></Link><Link href="/get-involved" className="btn-light">Get involved</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProgrammeSteps() {
  const steps = [
    [HeartPulse, "Screening", "Preliminary health screening and awareness through suitable programmes."],
    [Sparkles, "Guidance", "Information and practical guidance based on the patient's situation."],
    [ShieldCheck, "Referral", "Connection with appropriate healthcare professionals or institutions where required."],
    [ArrowRight, "Support", "Assistance with eligible healthcare or treatment-support pathways."],
  ];
  return <div className="process-line">{steps.map(([Icon, title, copy], index) => { const I = Icon as typeof HeartPulse; return <div key={title as string} className="process-step"><span className="process-number">0{index + 1}</span><I size={22} className="text-[#e24d47]" /><h3>{title as string}</h3><p>{copy as string}</p></div>; })}</div>;
}
