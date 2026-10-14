const paths = {
  arrow: (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M8 14c-5-5-1-12 4-12s9 7 4 12l-1 2H9z" />
      <path d="M12 7v4" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h12M9 12h12M9 18h12" />
      <circle cx="3" cy="6" r="1" />
      <circle cx="3" cy="12" r="1" />
      <circle cx="3" cy="18" r="1" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M6 21v-3a6 6 0 0112 0v3M3 7a2 2 0 010 4M21 7a2 2 0 010 4M2 20v-3a4 4 0 013-4M22 20v-3a4 4 0 00-3-4" />
    </>
  ),
  code: (
    <>
      <path d="M7 6l-5 6 5 6M17 6l5 6-5 6M14 3l-4 18" />
    </>
  ),
  cap: (
    <>
      <path d="M1 8l11-5 11 5-11 5zM5 10v7c5 4 9 4 14 0v-7M23 8v9" />
    </>
  ),
  leaf: (
    <>
      <path d="M12 22V10M12 15C0 16 2 2 2 2s11 0 10 13zM12 19c0-10 9-11 9-11s2 10-9 11" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 5l10 8L22 5" />
    </>
  ),
  linkedin: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M7 10v8M7 6v1M11 18v-8M11 13c0-4 6-4 6 0v5" />
    </>
  ),
  github: (
    <>
      <path d="M9 22v-4c-5 1-5-3-7-3M15 22v-4c0-1 0-2-1-3 5 0 7-3 7-6 0-2-1-3-2-4 0-2 0-3-1-3l-4 2h-4L6 2C5 2 5 4 5 5 4 6 3 7 3 9c0 3 2 6 7 6-1 1-1 2-1 3" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1-5a9 9 0 1117-4 9 9 0 01-13 8zM8 7c0 5 4 9 9 9l1-3-3-1-1 1-3-3 1-1-1-3z" />
    </>
  ),
  heart: (
    <path d="M12 21S1 14 1 7a6 6 0 0111-3A6 6 0 0123 7c0 7-11 14-11 14z" />
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M5 5l14 14M19 5L5 19" />,
};
export default function Icon({ name, ...props }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
