// Section ids on the landing page
export const SECTIONS = {
  allocation: "phan-bo",
  services: "dich-vu",
  principles: "rang-buoc",
  commitment: "cam-ket",
  process: "quy-trinh",
  reviews: "danh-gia",
  faq: "hoi-dap",
  contact: "lien-he",
} as const;

export type SectionId = (typeof SECTIONS)[keyof typeof SECTIONS];

export const scrollToSection = (id: string, behavior: ScrollBehavior = "smooth") => {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
};
