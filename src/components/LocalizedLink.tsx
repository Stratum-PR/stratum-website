import { forwardRef } from "react";
import { Link as RouterLink, type LinkProps } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { localizedPath } from "@/i18n/paths";

/**
 * react-router's Link, but a site path written in Spanish ("/preguntas") points to the English twin
 * ("/en/faq") on English pages. Import it as `Link` in pages and components.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LocalizedLink({ to, ...rest }, ref) {
  const { language } = useLanguage();
  const target = typeof to === "string" ? localizedPath(to, language) : to;
  return <RouterLink ref={ref} to={target} {...rest} />;
});
