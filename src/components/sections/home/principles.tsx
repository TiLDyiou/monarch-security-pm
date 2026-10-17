import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { Droplets, Hourglass, Receipt, Scale, Users } from "lucide-react";

const ICONS = [Droplets, Hourglass, Receipt, Scale, Users];

// Two wide cards over three narrow ones on desktop; the odd card spans the row on tablets
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "md:col-span-2 lg:col-span-2"];

// Same card shell as the planning process section, so both sections read as one set
const Principles = () => {
  const { t } = useLanguage();
  const { title, subtitle, items } = t.landing.principles;

  return (
    <section id={SECTIONS.principles} className="py-12 md:py-[60px] scroll-mt-4">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">{title}</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Scale;
            return (
              <AnimateOnView key={item.title} delay={i * 0.1} className={cn("h-full", SPANS[i])}>
                <div className="h-full border border-border bg-card rounded-[32px] overflow-hidden hover:border-[#00a0b0]/40 shadow-card hover:shadow-neumorphic transition-all duration-300 p-6 md:p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/70 bg-gradient-to-br from-[#eef9fb] via-white to-[#eef2ff] text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="h4 text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                </div>
              </AnimateOnView>
            );
          })}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default Principles;
