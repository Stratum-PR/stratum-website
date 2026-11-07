import type { PostHog } from "posthog-js";
import { logger } from "@/lib/logger";

/**
 * PostHog, only after the visitor accepts in the consent banner (essential-only by default).
 * Same project as Alertas PR and FoodTrail, with a cross-subdomain cookie so one person is
 * followed across www., alertas. and foodtrail.stratumpr.com. The key is public by design.
 * The library is loaded on demand, so visitors who don't accept never download it.
 */
const POSTHOG_KEY = "phc_pVPBRxRZtdfh9zAEkeYgvaagdWkSp5kRMYNdEC59jG7u";
/** This site's own consent cookie (host-only): "granted" or "denied". */
export const CONSENT_COOKIE = "stratum_analytics";
const CONSENT_MAX_AGE = 15724800; // about 6 months
/** The old GA/Clarity choice. That consent named other tools, so it isn't carried over. */
const LEGACY_STORAGE_KEY = "cookie-consent";

export type Consent = "granted" | "denied";

let client: PostHog | null = null;
let loading = false;

// Only the live site sends data; local and preview builds never load PostHog
const isProduction = () => ["www.stratumpr.com", "stratumpr.com"].includes(window.location.hostname);

export function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
  return match ? (match[1] as Consent) : null;
}

export function writeConsent(consent: Consent | null) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const value = consent ?? "";
  const maxAge = consent ? CONSENT_MAX_AGE : 0;
  document.cookie = `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function startAnalytics() {
  if (client) {
    if (client.has_opted_out_capturing()) client.opt_in_capturing();
    return;
  }
  if (loading) return;
  if (!isProduction()) {
    logger.log("PostHog not loaded: only runs on stratumpr.com");
    return;
  }
  loading = true;
  import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: "https://us.i.posthog.com",
        ui_host: "https://us.posthog.com",
        persistence: "localStorage+cookie",
        cross_subdomain_cookie: true,
        capture_pageview: "history_change",
        capture_pageleave: true,
        person_profiles: "identified_only",
        mask_personal_data_properties: true,
        session_recording: { maskAllInputs: true },
        loaded: (ph) => {
          // A visitor who said no earlier and yes now
          if (ph.has_opted_out_capturing()) ph.opt_in_capturing();
        },
      });
      client = posthog;
    })
    .catch((error) => logger.error("PostHog failed to load:", error))
    .finally(() => {
      loading = false;
    });
}

export function stopAnalytics() {
  if (!client) return;
  client.opt_out_capturing();
  client.reset();
}

/** Sends an event only when the visitor accepted and PostHog is running. Never send form values. */
export function track(event: string, properties?: Record<string, string | null>) {
  if (readConsent() !== "granted" || !client) return;
  client.capture(event, properties);
}

/** On page load: start PostHog if the visitor already accepted. */
export function initAnalytics() {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    /* storage blocked: nothing to clean */
  }
  if (readConsent() === "granted") startAnalytics();
}
