
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { language } = useLanguage();
  const previousLanguage = useRef(language);
  const scrollPosition = useRef(0);

  useEffect(() => {
    // Store current scroll position before any potential changes
    scrollPosition.current = window.scrollY;
  });

  useEffect(() => {
    // Check if this is a language change (not a route change)
    const isLanguageChange = previousLanguage.current !== language;
    
    if (isLanguageChange) {
      // Language changed - preserve scroll position
      previousLanguage.current = language;
      // Restore the scroll position after a brief delay to ensure DOM updates
      setTimeout(() => {
        window.scrollTo({ top: scrollPosition.current, behavior: "instant" });
      }, 0);
    } else if (hash) {
      // Link to a section (e.g. "/#productos"): sections may render late, so retry briefly
      // and images above shift the layout, so jump once found and again after it settles
      let tries = 0;
      let settle: number | undefined;
      const timer = window.setInterval(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target || ++tries > 20) {
          window.clearInterval(timer);
          target?.scrollIntoView({ block: "start" });
          settle = window.setTimeout(() => target?.scrollIntoView({ block: "start" }), 400);
        }
      }, 100);
      return () => {
        window.clearInterval(timer);
        window.clearTimeout(settle);
      };
    } else {
      // Route changed - scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash, language]);

  return null;
};

export default ScrollToTop;
