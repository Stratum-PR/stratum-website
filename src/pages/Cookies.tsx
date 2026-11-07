import { LegalPage } from "@/components/LegalPage";
import { CookiePrefsButton } from "@/components/CookiePrefsButton";
import { COOKIES_ROUTE } from "@/config/discoverable-routes";
import { COOKIE_POLICY } from "@/content/legal";

const Cookies = () => <LegalPage route={COOKIES_ROUTE} doc={COOKIE_POLICY} action={<CookiePrefsButton />} />;

export default Cookies;
