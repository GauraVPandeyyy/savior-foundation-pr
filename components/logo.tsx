import Image from "next/image";
import Link from "next/link";

export function Logo({ variant = "header", light = false, className = "" }: { variant?: "header" | "full" | "emblem"; light?: boolean; className?: string }) {
  if (variant === "emblem") {
    return (
      <Link href="/" aria-label="SAVIOR Healthcare Foundation home" className={`inline-flex items-center ${className}`}>
        <Image src="/brand/logo-emblem.png" alt="" width={56} height={42} className="h-11 w-auto object-contain" priority />
      </Link>
    );
  }

  if (variant === "full") {
    return (
      <Link href="/" aria-label="SAVIOR Healthcare Foundation home" className={`inline-flex ${className}`}>
        <Image src="/brand/logo-full.png" alt="SAVIOR Healthcare Foundation" width={250} height={227} className="h-auto w-[220px] object-contain" />
      </Link>
    );
  }

  return (
    <Link href="/" className={`group flex min-w-0 items-center gap-2.5 ${className}`} aria-label="SAVIOR Healthcare Foundation home">
      <Image src="/brand/logo-emblem.png" alt="" width={58} height={44} className="h-11 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03]" priority />
      <span className="hidden min-w-0 leading-[1.02] sm:block">
        <span className={`block text-[17px] font-black tracking-[-.04em] ${light ? "text-white" : "text-[#0a2444]"}`}>SAVIOR</span>
        <span className={`mt-1 block whitespace-nowrap text-[8.5px] font-extrabold uppercase tracking-[.12em] ${light ? "text-white/60" : "text-[#607487]"}`}>Healthcare Foundation</span>
      </span>
    </Link>
  );
}
