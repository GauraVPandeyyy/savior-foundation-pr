const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const site = {
  name: "SAVIOR Healthcare Foundation",
  shortName: "SAVIOR",
  legalName: "SAVIOR HEALTHCARE FOUNDATION (INDIA)",
  established: "2022",
  description:
    "Established in 2022, SAVIOR Healthcare Foundation works in heart care, community health, patient assistance, women and child health, disability support and social-welfare initiatives.",
  url: configuredUrl || "https://savior-foundation.example",
  hasLiveDomain: Boolean(configuredUrl && !configuredUrl.includes("example")),
  email: "shiwendrakumarshuklarbl@gmail.com",
  phone: "",
  addressShort: "Lucknow, Uttar Pradesh, India",
  address:
    "L 11/280, Sector-G, LDA, Kanpur Road, LDA Colony S.O, Lucknow, Uttar Pradesh 226012, India",
  socials: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    x: "#",
  },
  leadership: {
    name: "Shiwendra Kumar Shukla",
    role: "",
    heading: "A Message from Shiwendra Kumar Shukla",
  },
};

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Our Work",
    href: "/our-work",
    children: [
      { label: "Heart Care", href: "/heart-care" },
      { label: "Health & Patient Support", href: "/health-support" },
      { label: "Community Programmes", href: "/community-initiatives" },
    ],
  },
  { label: "Impact", href: "/impact" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
] as const;

export const bankDetails = {
  accountName: "SAVIOR HEALTHCARE FOUNDATION (INDIA)",
  bankName: "BANK OF INDIA",
  accountNumber: "680520110000602",
  ifsc: "BKID0006805",
  branch: "ASHOK MARG BRANCH, LUCKNOW",
  // accountType: "CURRENT / SAVINGS",
  upi: "boism-9305855463@boi",
  qrImage: "/brand/donation-qr.jpeg",
};

export const impactPlaceholders = [
  { value: "11,000+", label: "Patients and families supported" },
  { value: "300+", label: "Health and screening camps" },
  { value: "100+", label: "Community initiatives" },
  { value: "50+", label: "Volunteers and supporters" },
];
