import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  eyebrow?: string;
};

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
  eyebrow,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="portal-badge">{eyebrow}</p> : null}
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-black text-slate-100 shadow-[0_10px_26px_-20px_rgba(2,8,23,0.8)] transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}
