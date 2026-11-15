export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#10b981" />
      {/* scan corners */}
      <path d="M12 18v-4a2 2 0 0 1 2-2h4M30 12h4a2 2 0 0 1 2 2v4M36 30v4a2 2 0 0 1-2 2h-4M18 36h-4a2 2 0 0 1-2-2v-4"
        stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" />
      {/* text lines */}
      <path d="M17 19h14M17 24h14M17 29h8" stroke="#09090b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}