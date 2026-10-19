import Container from "@/components/container";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import SectionLink from "@/components/section-link";
import { SECTIONS } from "@/lib/sections";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { LEGAL_PATHS } from "@/pages/legal/content";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
];

const Footer = () => {
  const { t } = useLanguage();

  const pageLinks = [
    { title: t.landing.footer.serviceLinks.services, section: SECTIONS.services },
    { title: t.landing.footer.serviceLinks.process, section: SECTIONS.process },
    { title: t.landing.footer.serviceLinks.faq, section: SECTIONS.faq },
  ];

  const utilityLinks = [
    { title: t.landing.footer.legalLinks.terms, href: LEGAL_PATHS.terms },
    { title: t.landing.footer.legalLinks.privacy, href: LEGAL_PATHS.privacy },
  ];

  return (
    <footer id="lien-he" className="bg-slate-50 text-foreground pt-24 pb-12 border-t border-border">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          {/* Left Column: Brand & Logo */}
          <div className="space-y-6 max-w-[420px]">
            <Link to="/" className="inline-block">
              <img
                src="/images/common/logo.svg"
                alt="Monarch Securities"
                className="h-16 md:h-20 w-auto opacity-95 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.landing.footer.brandDesc}
            </p>
          </div>

          {/* Right Column: Links */}
          <div className="grid grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h4 className="font-semibold text-primary mb-5 text-sm uppercase tracking-wider">
                {t.landing.footer.servicesHeading}
              </h4>
              <ul className="space-y-3.5">
                {pageLinks.map((link) => (
                  <li key={link.title}>
                    <SectionLink to={link.section} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.title}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-5 text-sm uppercase tracking-wider">
                {t.landing.footer.legalHeading}
              </h4>
              <ul className="space-y-3.5">
                {utilityLinks.map((link) => (
                  <li key={link.title}>
                    <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} {t.landing.footer.copyright}
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center hover:bg-slate-100 hover:border-primary/60 transition-all text-muted-foreground hover:text-primary shadow-sm"
                aria-label={social.label || "Social link"}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
