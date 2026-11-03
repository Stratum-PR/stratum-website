import { LegalPage } from "@/components/LegalPage";
import { TERMS_ROUTE } from "@/config/discoverable-routes";
import { TERMS_OF_USE } from "@/content/legal";

const Terms = () => <LegalPage route={TERMS_ROUTE} doc={TERMS_OF_USE} />;

export default Terms;
