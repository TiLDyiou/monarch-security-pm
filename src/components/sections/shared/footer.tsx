import Container from "@/components/container";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import SectionLink from "@/components/section-link";
import { SECTIONS } from "@/lib/sections";
import { Link } from "react-router-dom";

const pageLinks = [
  { title: "Dịch vụ tư vấn", section: SECTIONS.services },
  { title: "Quy trình hoạch định", section: SECTIONS.process },
  { title: "Câu hỏi thường gặp", section: SECTIONS.faq }
];

const innerLinks = [
  { title: "Phân bổ tài sản mẫu", section: SECTIONS.allocation },
  { title: "Tái cân bằng danh mục", section: SECTIONS.process }
];

const utilityLinks = [
  { title: "Điều khoản dịch vụ", href: "/legal/terms-&-condition" },
  { title: "Chính sách bảo mật", href: "/legal/privacy-policy" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/", label: "X" },
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
];

const Footer = () => {
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
              Monarch Securities cung cấp giải pháp hoạch định tài chính và quản trị danh mục đầu tư độc lập, minh bạch và đồng hành dài hạn cùng gia đình bạn.
            </p>
          </div>

          {/* Right Column: Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <h4 className="font-semibold text-primary mb-5 text-sm uppercase tracking-wider">Dịch vụ</h4>
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
              <h4 className="font-semibold text-primary mb-5 text-sm uppercase tracking-wider">Phương pháp</h4>
              <ul className="space-y-3.5">
                {innerLinks.map((link) => (
                  <li key={link.title}>
                    <SectionLink to={link.section} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link.title}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-5 text-sm uppercase tracking-wider">Pháp lý</h4>
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
            © {new Date().getFullYear()} Monarch Securities. Dịch vụ tư vấn danh mục đầu tư tài chính cá nhân độc lập. Bảo lưu mọi quyền.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center hover:bg-slate-100 hover:border-primary/60 transition-all text-muted-foreground hover:text-primary shadow-sm"
                aria-label={social.label || "Liên kết mạng xã hội"}
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
