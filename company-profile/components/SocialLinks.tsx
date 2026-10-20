export default function SocialLinks() {
  return (
    <div className="social-links">
      <a href="#" aria-label="Facebook" className="social-link">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.4 1.5-1.4h1.6V4.5c-.3 0-1.2-.1-2.300-.1-2.300 0-3.800 1.400-3.800 3.900v2.200H8v3h2.500V21h3z" />
        </svg>
      </a>
      <a href="#" aria-label="Instagram" className="social-link">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.200" cy="6.800" r="0.800" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href="#" aria-label="YouTube" className="social-link">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800c.4-1.600.4-4.800.4-4.800s0-3.200-.4-4.800zM10 15V9l5.200 3L10 15z" />
        </svg>
      </a>
    </div>
  );
}
