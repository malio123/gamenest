"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScrollableDistance = documentHeight - viewportHeight;

      if (maxScrollableDistance <= 0) {
        setIsVisible(false);
        return;
      }

      setIsVisible(scrollTop > Math.min(720, maxScrollableDistance * 0.45));
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed bottom-5 left-1/2 z-50 inline-flex h-12 -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(59,130,246,0.3))] px-5 text-sm font-black text-white shadow-[0_18px_48px_-20px_rgba(34,211,238,0.45)] backdrop-blur transition duration-200 hover:border-cyan-300/40 hover:text-cyan-50 sm:bottom-6 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
      <span>Back to top</span>
    </button>
  );
}
