
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
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
    } else {
      // Route changed - scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, language]);

  return null;
};

export default ScrollToTop;
