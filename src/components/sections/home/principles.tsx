import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useLanguage } from "@/i18n/LanguageContext";
import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { Droplets, Hourglass, Receipt, Scale, Users } from "lucide-react";

const ICONS = [Droplets, Hourglass, Receipt, Scale, Users];

// Two wide cards over three narrow ones on desktop; the odd card spans the row on tablets
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "md:col-span-2 lg:col-span-2"];

const Principles = () => {
  const { t } = useLanguage();
  const { badge, title, subtitle, items } = t.landing.principles;

  return (
    <section id={SECTIONS.principles} className="relative py-12 md:py-[60px] scroll-mt-4">
      {/* Faint dot grid that fades out toward the edges */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-70"
        aria-hidden
      />
      <Container className="relative">
        <AnimateOnView blur className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">{badge}</span>
          <h2 className="h2 mb-4">{title}</h2>
          <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>
        </AnimateOnView>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6 max-w-[1062px] mx-auto">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Scale;
            return (
              <AnimateOnView key={item.title} delay={i * 0.08} className={cn("h-full", SPANS[i])}>
                <SpotlightCard
                  spotlightColor="#00a0b0"
                  intensity={0.5}
                  spotlightSize={280}
                  borderGlow={0.9}
                  className="h-full !rounded-[24px] !p-6 md:!p-8"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.description}</p>
                </SpotlightCard>
              </AnimateOnView>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Principles;
