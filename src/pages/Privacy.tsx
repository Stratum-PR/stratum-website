import { LegalPage } from "@/components/LegalPage";
import { PRIVACY_ROUTE } from "@/config/discoverable-routes";
import { PRIVACY_POLICY } from "@/content/legal";

const Privacy = () => <LegalPage route={PRIVACY_ROUTE} doc={PRIVACY_POLICY} />;

export default Privacy;
