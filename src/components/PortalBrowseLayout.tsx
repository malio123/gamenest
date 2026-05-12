import type { ReactNode } from "react";
import { SidebarNav } from "@/components/SidebarNav";

type PortalBrowseLayoutProps = {
  children: ReactNode;
};

export function PortalBrowseLayout({ children }: PortalBrowseLayoutProps) {
  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-6 xl:px-7">
      <div className="relative isolate flex w-full gap-4 overflow-visible">
        <aside className="relative z-[520] hidden h-[calc(100vh-6rem)] w-[72px] shrink-0 self-start overflow-visible lg:sticky lg:top-24 lg:block">
          <SidebarNav />
        </aside>
        <div className="relative z-0 min-w-0 flex-1 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
