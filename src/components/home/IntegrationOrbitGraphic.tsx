type OrbitIntegration = {
  slug: string;
  name: string;
  angle: number;
  radius: number;
};

const INNER_INTEGRATIONS: OrbitIntegration[] = [
  { slug: "asana", name: "Asana", angle: -70, radius: 38 },
  { slug: "jira", name: "Jira", angle: 10, radius: 38 },
  { slug: "salesforce", name: "Salesforce", angle: 95, radius: 38 },
  { slug: "hubspot", name: "HubSpot", angle: 185, radius: 38 },
];

const OUTER_INTEGRATIONS: OrbitIntegration[] = [
  { slug: "quickbooks", name: "QuickBooks", angle: -130, radius: 52 },
  { slug: "sap", name: "SAP", angle: -35, radius: 52 },
  { slug: "zapier", name: "Zapier", angle: 45, radius: 52 },
  { slug: "shopify", name: "Shopify", angle: 130, radius: 52 },
  { slug: "google", name: "Google", angle: 215, radius: 52 },
];

function OrbitLogo({ slug, name, angle, radius }: OrbitIntegration) {
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return (
    <div
      className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-white p-2 shadow-sm sm:h-12 sm:w-12 sm:rounded-2xl"
      style={{ left: `${x}%`, top: `${y}%` }}
      title={name}
      aria-hidden
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function IntegrationOrbitGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(100%,28rem)]">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <circle
          cx="200"
          cy="200"
          r="115"
          fill="none"
          stroke="#1E2B7E"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="#1E2B7E"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
      </svg>

      {INNER_INTEGRATIONS.map((item) => (
        <OrbitLogo key={`inner-${item.slug}`} {...item} />
      ))}
      {OUTER_INTEGRATIONS.map((item) => (
        <OrbitLogo key={`outer-${item.slug}`} {...item} />
      ))}
    </div>
  );
}
