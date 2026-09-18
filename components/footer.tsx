import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Foundation",
    items: [
      ["About", "/about"],
      ["Impact", "/impact"],

      ["Contact", "/contact"],
    ],
  },
  {
    title: "Our Work",
    items: [
      ["Heart Care", "/heart-care"],
      ["Health & Patient Support", "/health-support"],
      ["Community Programmes", "/community-initiatives"],
    ],
  },
  {
    title: "Support",
    items: [
      ["Get Involved", "/get-involved"],
      ["Patient Support", "/patient-support"],
      ["Donate", "/donate"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#07172e] text-white">
      <div className="container-shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.95fr]">
          <div>
            <Logo variant="emblem" light />
            <h2 className="mt-5 max-w-sm editorial-serif text-2xl font-semibold tracking-[-.025em]">
              Healthcare support for patients, families and communities since
              2022.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
              SAVIOR Healthcare Foundation works across cardiac care, health
              camps, patient assistance, women and child health, disability
              support and community programmes.
            </p>
            <Link
              href="/donate"
              className="mt-6 inline-flex items-center gap-2 font-bold text-[#ff8e88]"
            >
              Support the Foundation <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[.16em] text-white/38">
                  {column.title}
                </h3>
                <div className="grid gap-3">
                  {column.items.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="text-sm font-semibold text-white/68 transition hover:text-white"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Row */}
        <div className="mt-12 border-y border-white/10 py-6">
          <div className="flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            {/* Address - Left */}
            <div className="flex items-start gap-2.5 md:max-w-[62%]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white/45" />
              <span className="leading-6 transition-colors hover:text-white/80">
                {site.address}
              </span>
            </div>

            {/* Email - Right */}
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-2.5 transition-colors hover:text-white md:ml-auto md:justify-end"
            >
              <Mail
                size={16}
                className="shrink-0 text-white/45 transition-colors group-hover:text-white/80"
              />
              <span>{site.email}</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-xs text-white/35">
            © 2026{" "}
            <span className="text-white/50">SAVIOR Healthcare Foundation</span>.
            All rights reserved.
          </p>

          {/* PRAIB Highlight */}
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1]"
          >
            {/* Subtle Glow */}
            <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />

            <span className="relative text-[10px] font-medium uppercase tracking-[0.13em] text-white/40">
              Designed & Developed by
            </span>

            <span className="relative flex items-center gap-1.5 text-xs font-bold tracking-[0.06em] text-white">
              PRAIB ADVISORS LLP
              <span className="text-sm text-white/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
