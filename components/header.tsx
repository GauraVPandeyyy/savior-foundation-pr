"use client";

import Link from "next/link";
import { ChevronDown, HeartHandshake, Menu, Stethoscope, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { primaryNav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [desktopGroup, setDesktopGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMobileGroup(null);
    setDesktopGroup(null);
  }, [pathname]);

  return (
    <>
      <div className="utility-bar">
        <div className="container-shell flex min-h-9 items-center justify-between gap-3">
          <span>Established 2022 · Healthcare, cardiac care and community support</span>
          <Link href="/patient-support" className="hidden items-center gap-1.5 font-extrabold sm:flex">
            Patient support <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <header className="site-header">
        <div className="container-shell header-row">
          <Logo />

          <nav className="desktop-nav" aria-label="Main navigation">
            {primaryNav.map((item) => {
              const children = "children" in item ? item.children : undefined;
              const directActive = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const childActive = children?.some((child) => pathname === child.href || pathname.startsWith(`${child.href}/`)) ?? false;
              const active = directActive || childActive;

              if (!children) {
                return (
                  <Link key={item.href} href={item.href} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                    {item.label}
                  </Link>
                );
              }

              const expanded = desktopGroup === item.label;
              return (
                <div
                  key={item.href}
                  className="desktop-nav-group"
                  onMouseEnter={() => setDesktopGroup(item.label)}
                  onMouseLeave={() => setDesktopGroup(null)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link ${active ? "nav-link-active" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={expanded}
                    onFocus={() => setDesktopGroup(item.label)}
                    onClick={() => setDesktopGroup(null)}
                  >
                    {item.label}
                    <ChevronDown size={14} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                  </Link>
                  <div className={`desktop-dropdown ${expanded ? "desktop-dropdown-open" : ""}`}>
                    <div className="desktop-dropdown-card">
                      {children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="dropdown-link"
                          onClick={() => setDesktopGroup(null)}
                        >
                          {child.label}
                          <span aria-hidden>→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link href="/patient-support" className="btn-secondary min-h-[44px] px-4 text-sm">
              <Stethoscope size={16} /> Get help
            </Link>
            <Link href="/donate" className="btn-primary min-h-[44px] px-4 text-sm">
              <HeartHandshake size={16} /> Donate
            </Link>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>

        <div id="mobile-navigation" className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
          <div className="container-shell grid gap-1 py-4">
            {primaryNav.map((item) => {
              const children = "children" in item ? item.children : undefined;
              if (!children) {
                return (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-nav-link">
                    {item.label}
                  </Link>
                );
              }

              const groupOpen = mobileGroup === item.label;
              return (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link href={item.href} onClick={() => setOpen(false)} className="mobile-nav-link flex-1">
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      className="mobile-submenu-toggle"
                      onClick={() => setMobileGroup(groupOpen ? null : item.label)}
                      aria-label={`${groupOpen ? "Close" : "Open"} ${item.label} submenu`}
                      aria-expanded={groupOpen}
                    >
                      <ChevronDown size={18} className={`transition-transform ${groupOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  {groupOpen ? (
                    <div className="mobile-submenu">
                      {children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => setOpen(false)} className="mobile-sub-link">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link href="/patient-support" onClick={() => setOpen(false)} className="btn-secondary text-sm">Get help</Link>
              <Link href="/donate" onClick={() => setOpen(false)} className="btn-primary text-sm">Donate</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
