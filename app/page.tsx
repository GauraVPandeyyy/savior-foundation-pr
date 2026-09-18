import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Accessibility,
  HandHeart,
  HeartPulse,
  Stethoscope,
  Users,
} from "lucide-react";
import {
  CtaBand,
  Eyebrow,
  ProgrammeSteps,
  SectionHeading,
  TrustStrip,
} from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "Heart Care, Health Camps & Patient Support",
  description:
    "Since 2022, SAVIOR Healthcare Foundation has worked in heart care, health camps, patient assistance, women and child health, disability support and community programmes.",
  alternates: { canonical: "/" },
};

const communityInitiatives = [
  [
    "01",
    "Child Labour Awareness",
    "Community outreach supporting child welfare, education and safer childhoods.",
  ],
  [
    "02",
    "Beti Bachao Beti Padhao",
    "Awareness initiatives supporting the health, dignity and education of girls.",
  ],
  [
    "03",
    "Swachh Bharat & Hygiene",
    "Cleanliness and hygiene activities that strengthen community health awareness.",
  ],
];

const homeFaqs = [
  [
    "What does SAVIOR Healthcare Foundation primarily work on?",
    "The Foundation works across healthcare and community programmes, with significant work in cardiac care, support for heart patients, health camps, patient assistance, women and child health and disability support.",
  ],
  [
    "How can a heart patient request support?",
    "Patients or family members can submit a support request through the website with available medical details. The Foundation team reviews the request and guides the family regarding suitable assistance and next steps.",
  ],
  [
    "Does the Foundation organise health camps?",
    "Yes. The Foundation undertakes health and screening camps as part of its community healthcare programmes, subject to programme planning and available medical resources.",
  ],
  [
    "Can doctors and volunteers work with the Foundation?",
    "Yes. Healthcare professionals, volunteers, institutions and organisations can connect with the Foundation through the Get Involved section.",
  ],
  // [
  //   "Are 80G or other tax benefits available?",
  //   "The Foundation has held provisional approval under Section 80G. Eligibility for tax deduction on a donation depends on the approval valid for the relevant tax period and applicable income-tax provisions. Donors should confirm the current eligibility and receipt requirements with the Foundation before claiming a deduction.",
  // ],
];

export default function Home() {
  return (
    <>
      <section className="hero-home">
        <div className="hero-home-media">
          <MediaFigure
            asset={media.davanagereCamp}
            className="h-full w-full"
            imageClassName="object-[58%_center]"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container-shell hero-home-content">
          <div>
            <h1 className="hero-title">
              Heart care, medical support and community health.
            </h1>
            <p className="hero-copy">
              SAVIOR Healthcare Foundation supports heart patients, children
              with congenital heart conditions and economically vulnerable
              families, while extending healthcare access through screening
              camps, patient assistance and community programmes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/heart-care" className="btn-primary">
                Heart Care <ArrowRight size={18} />
              </Link>
              <Link href="/patient-support" className="btn-light">
                Patient Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffdf9]">
        <div className="container-shell">
          <TrustStrip />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell editorial-intro">
          <div>
            <div className="year-marker">2022</div>
            <div className="mt-8 editorial-rule" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#718393]">
              Established with a healthcare-led approach and supported by
              volunteers working across community programmes.
            </p>
          </div>
          <div>
            <Eyebrow>About the Foundation</Eyebrow>
            <h2 className="mt-5 max-w-4xl section-title">
              A healthcare foundation focused on access, continuity and
              practical support.
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.82fr]">
              <p className="lead">
                Since 2022, SAVIOR Healthcare Foundation has worked across
                healthcare and social-welfare initiatives, with particular
                emphasis on heart-related care. The Foundation supports
                economically weaker cardiac patients, children with congenital
                heart conditions, screening initiatives and suitable
                treatment-support pathways.
              </p>
              <div>
                <p className="body-copy">
                  Its wider work includes free health camps, women and child
                  health, disability support, assistance for vulnerable
                  patients, health awareness and selected community initiatives.
                  Volunteers play an important role in extending these
                  programmes at the grassroots level.
                </p>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-[#087b6f]"
                >
                  About SAVIOR <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="signature-grid">
        <div className="signature-copy">
          <Eyebrow>Heart Care & Cardiac Support</Eyebrow>
          <h2 className="mt-5 section-title text-[#0a2444]">
            Focused support for heart patients and families.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f7183]">
            The Foundation's cardiac-care work includes heart-health awareness,
            screening, support for children with congenital heart conditions,
            specialist referral, hospital coordination and assistance enquiries
            for eligible treatment or surgery-related needs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/heart-care" className="btn-dark">
              Heart Care Programme <ArrowRight size={17} />
            </Link>
            <Link href="/heart-care/patient-support" className="btn-secondary">
              Apply for Support
            </Link>
          </div>
        </div>
        <div className="signature-visual">
          <MediaFigure
            asset={media.cardiacCamp}
            className="h-full w-full"
            imageClassName="opacity-75"
            sizes="(max-width: 980px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,23,46,.72),rgba(6,23,46,.08)_70%)]" />
          <Image
            src="/brand/logo-emblem.png"
            alt=""
            width={150}
            height={120}
            className="absolute bottom-7 right-7 w-28 opacity-90"
          />
          <div className="signature-note">
            Cardiac support is delivered through awareness, screening, referral
            and suitable assistance pathways in coordination with qualified
            healthcare professionals.
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#fffdf9]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Cardiac Support Pathway"
            title="A structured route from screening to appropriate care."
            copy="Depending on an individual's needs, support may involve initial screening, guidance, specialist referral and assistance in navigating suitable treatment options."
          />
          <div className="mt-12">
            <ProgrammeSteps />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#eef4f1]">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our Work"
              title="Healthcare programmes across different stages of need."
              copy="Alongside cardiac care, the Foundation works in community health, women and child health, disability support and assistance for patients facing financial or access barriers."
            />
            <Link href="/our-work" className="btn-secondary w-fit">
              View Our Work <ArrowRight size={17} />
            </Link>
          </div>
          <div className="work-mosaic">
            <Link
              href="/health-support#health-camps"
              className="work-tile work-tile-large group"
            >
              <MediaFigure
                asset={media.raebareliCamp}
                className="h-full min-h-[100%] w-full"
                imageClassName="transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="tile-overlay">
                <span className="mb-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#9ce5da]">
                  Community Healthcare
                </span>
                <h3>Free Health Camps</h3>
                <p>
                  Screening, consultation, awareness and referral support
                  delivered closer to communities.
                </p>
              </div>
            </Link>
            <Link
              href="/health-support#women-child-health"
              className="work-tile group"
            >
              <MediaFigure
                asset={media.motherChildCamp}
                className="h-full w-full"
                imageClassName="transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="tile-overlay">
                <h3>Women & Child Health</h3>
                <p>
                  Preventive health, maternal and child-health support,
                  nutrition and awareness programmes.
                </p>
              </div>
            </Link>
            <Link
              href="/health-support#disability-patient-support"
              className="work-tile work-tile-accent"
            >
              <div>
                <span className="eyebrow eyebrow-inverse">
                  Patient Assistance
                </span>
                <h3 className="mt-4 text-3xl font-bold tracking-[-.035em]">
                  Disability & Patient Support
                </h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/78">
                  Assistive devices, mobility support, referral guidance and
                  healthcare assistance for eligible people and families.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex items-center justify-between">
                <Accessibility size={38} className="text-white/80" />
                <ArrowRight size={24} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="content-photo content-photo-tall">
            <MediaFigure asset={media.doctorsCamp} className="h-full w-full" />
          </div>
          <div>
            <Eyebrow>Volunteer Network</Eyebrow>
            <h2 className="mt-5 section-title">
              Community outreach supported by committed volunteers.
            </h2>
            <p className="mt-6 lead">
              Volunteers support health-camp coordination, patient and family
              guidance, awareness activities, local outreach and programme
              logistics. Their continued involvement helps the Foundation stay
              connected with people who may need healthcare support.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [
                  Users,
                  "Community outreach",
                  "Supporting programme access and local coordination.",
                ],
                [
                  Stethoscope,
                  "Health camps",
                  "Assisting with camp operations and beneficiary guidance.",
                ],
                [
                  HandHeart,
                  "Patient assistance",
                  "Helping families navigate available support processes.",
                ],
                [
                  HeartPulse,
                  "Health awareness",
                  "Supporting preventive-health and community-awareness activities.",
                ],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof Users;
                return (
                  <div
                    key={title as string}
                    className="border-t border-[#cadbd6] pt-4"
                  >
                    <I size={21} className="text-[#0b8f80]" />
                    <h3 className="mt-3 font-bold text-[#0a2444]">
                      {title as string}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6a7c8d]">
                      {copy as string}
                    </p>
                  </div>
                );
              })}
            </div>
            <Link href="/get-involved" className="btn-primary mt-8">
              Get Involved <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad impact-band">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow inverse>Our Impact</Eyebrow>
            <h2 className="mt-5 section-title text-white">
              Healthcare support across patients, families and communities.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              The Foundation's work since 2022 spans cardiac support, health
              camps, patient assistance, women and child health, disability
              support and community-awareness programmes.
            </p>
            <Link href="/impact" className="btn-light mt-8">
              View Impact <ArrowRight size={17} />
            </Link>
          </div>
          <div className="content-photo content-photo-compact">
            <MediaFigure asset={media.nrhmPatient} className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="leadership-wrap">
        <div className="container-shell leadership-grid">
          {/* Portrait / Framed Image */}
          <div className="leadership-photo-area">
            <div className="leadership-photo-shell">
              <div className="leadership-frame">
                <Image
                  src="/brand/logo-emblem.png"
                  alt=""
                  width={260}
                  height={220}
                  className="leadership-frame-watermark"
                />

                <div className="leadership-portrait">
                  <Image
                    src="/brand/shiwendra-kumar-shukla.png"
                    alt="Shiwendra Kumar Shukla"
                    fill
                    sizes="(max-width: 980px) 100vw, 460px"
                    className="object-contain object-bottom"
                    priority={false}
                  />
                </div>
              </div>

              <div className="leadership-frame-footer">
                <span>SAVIOR Healthcare Foundation</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="leadership-copy">
            <Eyebrow>Leadership</Eyebrow>

            <h2 className="mt-5 section-title leadership-title">
              A Message from
              <span> Shiwendra Kumar Shukla</span>
            </h2>

            <div className="leadership-accent-line" />

            <p className="leadership-message">
              Our commitment is to ensure that individuals and families facing
              financial, social or geographical barriers are able to find
              meaningful healthcare guidance and support when they need it most.
            </p>

            <p className="leadership-description">
              SAVIOR Healthcare Foundation continues to strengthen its work in
              cardiac care, community health programmes, patient assistance and
              volunteer-led outreach. The focus remains on responsible support,
              timely guidance and sustained engagement with people and
              communities in need.
            </p>

            <div className="leadership-signature">
              <strong>Shiwendra Kumar Shukla</strong>
              <span>SAVIOR Healthcare Foundation</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Community Programmes</Eyebrow>
            <h2 className="mt-5 section-title">
              Community health and social-awareness initiatives.
            </h2>
            <div className="social-list mt-8">
              {communityInitiatives.map(([n, title, copy]) => (
                <Link
                  href="/community-initiatives"
                  key={title}
                  className="social-row group"
                >
                  <span className="social-row-number">{n}</span>
                  <div className="-ms-4 md:-ms-18">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                  <ArrowRight className="transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
          <div className="content-photo content-photo-tall">
            <MediaFigure asset={media.swachhDrive} className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f2ea]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <Eyebrow>Frequently Asked Questions</Eyebrow>

            <h2 className="mt-5 section-title">
              Information about programmes, support and donations.
            </h2>

            <p className="mt-6 lead">
              Answers to common questions about healthcare support,
              participation and contributions to the Foundation.
            </p>
          </div>

          <div className="border-t border-[#cadbd6]">
            {homeFaqs.map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-[#cadbd6] py-6"
              >
                <summary className="cursor-pointer list-none editorial-serif text-xl font-semibold text-[#0a2444]">
                  {question}
                </summary>

                <p className="mt-4 max-w-3xl body-copy">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
