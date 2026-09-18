import type { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, Users, Stethoscope, HandHeart } from "lucide-react";
import { CtaBand, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { MediaFigure } from "@/components/media";
import { media } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SAVIOR Healthcare Foundation, established in 2022, its heart-care work, healthcare programmes, volunteers and community initiatives.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About SAVIOR"
        title="Healthcare service built around access, responsibility and continuity."
        intro="Established in 2022, SAVIOR Healthcare Foundation works in heart care, community health, patient assistance and selected social-welfare programmes."
        image={media.womenCamp}
      />

      <section className="section-pad">
        <div className="container-shell editorial-intro">
          <div>
            <div className="year-marker">2022</div>
            <p className="mt-6 max-w-sm body-copy">
              The Foundation began its work with a healthcare-led approach and
              has continued to expand its support through community programmes
              and volunteers.
            </p>
          </div>
          <div>
            <Eyebrow>Our Journey</Eyebrow>
            <h2 className="mt-5 section-title">
              A growing healthcare initiative with a strong focus on cardiac
              support.
            </h2>
            <p className="mt-7 lead">
              SAVIOR Healthcare Foundation supports people who face financial,
              awareness or access barriers in healthcare. A major part of this
              work is related to heart care, including support for children with
              congenital heart conditions, economically vulnerable cardiac
              patients, screening initiatives and assistance with suitable
              treatment pathways.
            </p>
            <p className="mt-5 body-copy">
              The Foundation also works in free health camps, women and child
              health, disability support, assistance for vulnerable patients,
              health awareness and community initiatives such as Child Labour
              awareness, Swachh Bharat activities and Beti Bachao Beti Padhao
              awareness. Volunteers continue to strengthen outreach and
              programme coordination across these areas.
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#eef4f1]">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div className="content-photo content-photo-tall">
            <MediaFigure
              asset={media.motherChildCamp}
              className="h-12 md:h-10 w-full"
              caption
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Our Approach"
              title="Principles that guide the Foundation's work."
              copy="Healthcare support is approached through awareness, screening, appropriate guidance, patient dignity and coordination with qualified healthcare professionals and institutions."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [
                  HeartPulse,
                  "Cardiac care",
                  "Focused support for heart-related healthcare needs.",
                ],
                [
                  Stethoscope,
                  "Healthcare access",
                  "Screening, referral and patient-support pathways.",
                ],
                [
                  Users,
                  "Volunteer network",
                  "Community outreach and programme coordination.",
                ],
                [
                  HandHeart,
                  "Dignity",
                  "Respectful assistance for patients and families.",
                ],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof HeartPulse;
                return (
                  <div
                    key={title as string}
                    className="border-t border-[#c9d9d5] pt-4"
                  >
                    <I className="text-[#0b8f80]" size={23} />
                    <h3 className="mt-3 text-lg font-bold">
                      {title as string}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#637687]">
                      {copy as string}
                    </p>
                  </div>
                );
              })}
            </div>
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
        <div className="container-shell grid gap-10 lg:grid-cols-3">
          <div>
            <Eyebrow>Mission</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.035em]">
              Improve access to healthcare support for patients and communities
              in need.
            </h2>
          </div>
          <div>
            <Eyebrow>Vision</Eyebrow>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-.035em]">
              Contribute to a society where timely healthcare is not limited by
              awareness or financial circumstances.
            </h2>
          </div>
          <div>
            <Eyebrow>Values</Eyebrow>
            <p className="mt-5 body-copy">
              Compassion · Dignity · Integrity · Inclusion · Prevention ·
              Collaboration · Responsibility
            </p>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f6f2ea]">
        <div className="container-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Community Healthcare"
              title="Programmes designed around real healthcare and social needs."
              copy="The Foundation combines patient support with community outreach so that health awareness, screening and practical assistance can reach people beyond formal healthcare settings."
            />
          </div>
          <div className="content-photo content-photo-compact">
            <MediaFigure
              asset={media.raebareliCamp}
              className="h-full w-full"
              caption
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
