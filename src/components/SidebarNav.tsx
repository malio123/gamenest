"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  Gamepad2,
  Home,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { primarySidebarNavLinks, sidebarCategoryLinks } from "@/components/portal-nav";

type SidebarNavProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const iconMap = {
  home: Home,
  "gamepad-2": Gamepad2,
  flame: Flame,
  sparkles: Sparkles,
  zap: Zap,
} as const;

function NavIcon({ icon }: { icon: keyof typeof iconMap }) {
  const Icon = iconMap[icon];

  return <Icon aria-hidden="true" size={18} className="shrink-0" strokeWidth={2.1} />;
}

function CategoryNavIcon({ icon }: { icon: LucideIcon }) {
  return <CategoryIcon icon={icon} size={18} strokeWidth={2.1} />;
}

const activeLinkClass =
  "bg-[linear-gradient(135deg,#2563eb,#0891b2_72%,#22d3ee)] text-white shadow-[0_18px_30px_-20px_rgba(37,99,235,0.7)]";
const desktopIdleLinkClass = "text-slate-300 hover:bg-white/10 hover:text-white";
const mobileIdleLinkClass = "text-slate-300 hover:bg-white/10 hover:text-white";

export function SidebarNav({ mobile = false, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();
  const desktopNavClassName =
    "group/sidebar absolute left-0 top-0 z-[620] h-full w-[72px] overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-[0_30px_70px_-36px_rgba(2,8,23,0.95)] transition-[width,box-shadow] duration-300 ease-out hover:w-56";
  const desktopPanelClassName =
    "flex h-full w-full flex-col overflow-hidden rounded-2xl bg-slate-950/98 px-2.5 py-3";
  const desktopLabelClassName =
    "w-0 min-w-0 -translate-x-1 overflow-hidden whitespace-nowrap opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover/sidebar:w-auto group-hover/sidebar:max-w-[148px] group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100 group-hover/sidebar:pointer-events-auto";
  const desktopLinkLayoutClassName =
    "justify-center gap-0 px-0 group-hover/sidebar:justify-start group-hover/sidebar:gap-3 group-hover/sidebar:px-3";

  return (
    <nav className={mobile ? "w-full" : desktopNavClassName}>
      <div
        className={
          mobile
            ? "flex h-full flex-col rounded-[26px] border border-white/10 bg-slate-950/95 p-3 shadow-[0_24px_54px_-30px_rgba(2,8,23,0.9)] backdrop-blur-xl"
            : desktopPanelClassName
        }
      >
        <div className="space-y-1.5">
          {primarySidebarNavLinks.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={!mobile ? item.label : undefined}
                aria-label={!mobile ? item.label : undefined}
                className={`group relative flex h-11 items-center rounded-2xl text-sm font-semibold transition-all duration-300 ease-out ${
                  mobile ? "gap-3 px-3" : desktopLinkLayoutClassName
                } ${
                  active ? activeLinkClass : mobile ? mobileIdleLinkClass : desktopIdleLinkClass
                }`}
              >
                <span className="flex w-5 shrink-0 items-center justify-center">
                  <NavIcon icon={item.icon} />
                </span>
                <span
                  className={`min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    mobile ? "max-w-[160px] opacity-100" : desktopLabelClassName
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="my-2 border-t border-white/10" />

        <div
          className={`min-h-0 space-y-2 overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            mobile
              ? "pr-1"
              : "pr-0 [scrollbar-color:rgba(148,163,184,0.28)_transparent] [scrollbar-width:thin] group-hover/sidebar:pr-1"
          }`}
        >
          <p
            className={`overflow-hidden whitespace-nowrap text-[11px] font-black uppercase tracking-[0.24em] text-slate-400 transition-all duration-300 ${
              mobile
                ? "max-h-6 px-3 pt-1 opacity-100"
                : "max-h-0 w-0 -translate-x-1 px-0 pt-0 opacity-0 group-hover/sidebar:max-h-6 group-hover/sidebar:w-auto group-hover/sidebar:translate-x-0 group-hover/sidebar:px-3 group-hover/sidebar:pt-1 group-hover/sidebar:opacity-100"
            }`}
          >
            Categories
          </p>
          {sidebarCategoryLinks.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={!mobile ? item.label : undefined}
                aria-label={!mobile ? item.label : undefined}
                className={`group relative flex h-11 items-center rounded-2xl text-sm font-semibold transition-all duration-300 ease-out ${
                  mobile ? "gap-3 px-3" : desktopLinkLayoutClassName
                } ${
                  active ? activeLinkClass : mobile ? mobileIdleLinkClass : desktopIdleLinkClass
                }`}
              >
                <span className="flex w-5 shrink-0 items-center justify-center">
                  <CategoryNavIcon icon={item.icon} />
                </span>
                <span
                  className={`min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    mobile ? "max-w-[160px] opacity-100" : desktopLabelClassName
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
