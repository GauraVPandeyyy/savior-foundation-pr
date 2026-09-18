export type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
  creditHref?: string;
};

export const media = {
  healthCamp: {
    src: "/images/healthCamp.png",
    alt: "Doctors providing consultation and health screening at a community medical camp",
    width: 1448,
    height: 1086,
  },

  womenCamp: {
    src: "/images/womenCamp.png",
    alt: "A woman receiving medical consultation during a community health programme",
    width: 1448,
    height: 1086,
  },

  childCamp: {
    src: "/images/childCamp.png",
    alt: "A doctor examining a child during a community health camp",
    width: 1448,
    height: 1086,
  },

  girlCheck: {
    src: "/images/girlCheck.png",
    alt: "A young child receiving medical examination with a parent during a health camp",
    width: 1448,
    height: 1086,
  },

  raebareliCamp: {
    src: "/images/raebareliCamp.png",
    alt: "An elderly patient receiving consultation at a community health camp",
    width: 1448,
    height: 1086,
  },

  doctorsCamp: {
    src: "/images/doctorsCamp.png",
    alt: "Doctors and patients participating in a free community health camp",
    width: 1448,
    height: 1086,
  },

  motherChildCamp: {
    src: "/images/motherChildCamp.png",
    alt: "A woman receiving a routine health check during a community medical programme",
    width: 1448,
    height: 1086,
  },

  swachhDrive: {
    src: "/images/swachhDrive.png",
    alt: "Community members participating in a cleanliness and hygiene initiative",
    width: 1448,
    height: 1086,
  },

  cardiacCamp: {
    src: "/images/cardiacCamp.png",
    alt: "A woman undergoing blood pressure screening during a healthcare camp",
    width: 1448,
    height: 1086,
  },

  nrhmPatient: {
    src: "/images/nrhmPatient.png",
    alt: "A doctor examining a patient during a community healthcare programme",
    width: 1448,
    height: 1086,
  },

  tamenglongCamp: {
    src: "/images/tamenglongCamp.png",
    alt: "Patients and families attending a community health screening camp",
    width: 1448,
    height: 1086,
  },

  combinedCamp: {
    src: "/images/combinedCamp.png",
    alt: "A patient receiving an eye examination during a community medical camp",
    width: 1448,
    height: 1086,
  },

  davanagereCamp: {
    src: "/images/davanagereCamp.png",
    alt: "A patient receiving preventive health screening at a medical camp",
    width: 1448,
    height: 1086,
  },
} satisfies Record<string, MediaAsset>;
export type Programme = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  body: string;
  bullets: string[];
  image: MediaAsset;
  accent: "red" | "teal" | "blue" | "sand";
  cta: { label: string; href: string };
};

export const programmes: Programme[] = [
  {
    slug: "heart-care",
    title: "Heart Care & Cardiac Support",
    shortTitle: "Heart Care",
    eyebrow: "Cardiac care",
    intro:
      "Support for heart patients, children with congenital heart conditions and families navigating cardiac treatment.",
    body: "SAVIOR Healthcare Foundation places particular emphasis on heart-related healthcare. The Foundation supports cardiac screening and awareness, assists families seeking specialist guidance, and helps eligible patients explore appropriate referral, treatment and surgery-support pathways.",
    bullets: [
      "Cardiac screening and heart-health awareness",
      "Support for children with congenital heart conditions",
      "Guidance for economically vulnerable heart patients",
      "Specialist referral and hospital coordination",
      "Treatment and surgery-support enquiries for eligible cases",
      "Follow-up guidance after screening",
    ],
    image: media.cardiacCamp,
    accent: "red",
    cta: { label: "Explore heart care", href: "/heart-care" },
  },
  {
    slug: "health-camps",
    title: "Free Health Camps & Community Screening",
    shortTitle: "Health Camps",
    eyebrow: "Community healthcare",
    intro:
      "Health camps that bring basic screening, consultation and referral guidance closer to communities.",
    body: "Community health camps support early identification of common health concerns and connect people with appropriate medical guidance. Depending on the programme, services may include general consultation, blood pressure and blood sugar checks, cardiac screening, ECG, women and child health consultation and referral support.",
    bullets: [
      "General health consultation",
      "Blood pressure and blood sugar checks",
      "Cardiac screening and ECG where available",
      "Women and child health consultation",
      "Preventive health awareness",
      "Referral for further evaluation",
    ],
    image: media.raebareliCamp,
    accent: "teal",
    cta: {
      label: "Explore health support",
      href: "/health-support#health-camps",
    },
  },
  {
    slug: "women-child-health",
    title: "Women & Child Health",
    shortTitle: "Women & Child Health",
    eyebrow: "Women and children",
    intro:
      "Preventive health, awareness and medical-support initiatives for women, children and families.",
    body: "The Foundation's women and child health work includes health awareness, preventive screening, anaemia and menstrual-health awareness, maternal health, nutrition, child-health support and assistance for children with serious medical needs.",
    bullets: [
      "Women’s preventive health awareness",
      "Anaemia and menstrual-health awareness",
      "Maternal health and nutrition guidance",
      "Child health screening and awareness",
      "Congenital heart support for children",
      "Girl-child health and wellbeing initiatives",
    ],
    image: media.motherChildCamp,
    accent: "sand",
    cta: {
      label: "Explore health support",
      href: "/health-support#women-child-health",
    },
  },
  {
    slug: "disability-patient-support",
    title: "Disability & Patient Support",
    shortTitle: "Disability & Patient Support",
    eyebrow: "Patient assistance",
    intro:
      "Practical support for persons with disabilities and patients facing financial or access barriers in healthcare.",
    body: "The Foundation supports suitable initiatives for persons with disabilities and vulnerable patients, including facilitation of assistive devices, mobility support, medical guidance, referrals and treatment-support pathways based on individual need and available resources.",
    bullets: [
      "Assistive devices for eligible beneficiaries",
      "Wheelchairs and mobility-support aids",
      "Support for children with disabilities",
      "Medical guidance and referral",
      "Treatment-support facilitation for vulnerable patients",
      "Rehabilitation-related guidance where appropriate",
    ],
    image: media.girlCheck,
    accent: "blue",
    cta: {
      label: "Explore patient support",
      href: "/health-support#disability-patient-support",
    },
  },
  {
    slug: "community-initiatives",
    title: "Community & Social Initiatives",
    shortTitle: "Community Initiatives",
    eyebrow: "Community programmes",
    intro:
      "Health awareness, hygiene, child welfare and social-outreach initiatives that support stronger communities.",
    body: "Alongside healthcare, SAVIOR Healthcare Foundation undertakes selected community programmes including Child Labour awareness, Swachh Bharat and hygiene activities, Beti Bachao Beti Padhao awareness and volunteer-led social outreach.",
    bullets: [
      "Child Labour awareness and child-welfare outreach",
      "Swachh Bharat and community hygiene awareness",
      "Beti Bachao Beti Padhao awareness",
      "Health education and preventive awareness",
      "Volunteer-led community service",
      "Social-support activities aligned with community needs",
    ],
    image: media.swachhDrive,
    accent: "teal",
    cta: {
      label: "Explore community programmes",
      href: "/community-initiatives",
    },
  },
];
