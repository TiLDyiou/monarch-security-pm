import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { useLanguage } from "@/i18n/LanguageContext";
import { SECTIONS } from "@/lib/sections";
import { Droplets, Hourglass, Landmark, Receipt, Scale, Users } from "lucide-react";

// Adapted from the shadcnui-blocks "features-12" block: a bordered grid with a heading cell and hatched filler cells
const ICONS = [Droplets, Hourglass, Receipt, Scale, Users];

const HATCH =
  "bg-[repeating-linear-gradient(315deg,rgb(var(--border))_0,rgb(var(--border))_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed";

const Principles = () => {
  const { t } = useLanguage();
  const { title, cardHeading, subtitle, items } = t.landing.principles;

  return (
    <section id={SECTIONS.principles} className="py-12 md:py-[60px] scroll-mt-4">
      <Container>
        <AnimateOnView blur className="text-center max-w-2xl mx-auto mb-8 md:mb-14">
          <h2 className="h2 mb-4">{title}</h2>
          <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>
        </AnimateOnView>

        <AnimateOnView delay={0.1} className="max-w-[1062px] mx-auto">
          <div className="grid grid-cols-1 bg-card sm:grid-cols-2 lg:grid-cols-3">
            <div className="-mr-px flex min-h-16 items-center border px-6 py-4 font-medium text-lg sm:col-span-2 lg:col-span-1">
              <Landmark className="mr-4 h-5 w-5 shrink-0 text-primary" aria-hidden />
              {cardHeading}
            </div>
            <div className={`-mr-px hidden min-h-16 border lg:col-span-2 lg:block ${HATCH}`} aria-hidden />
            {items.map((item, i) => {
              const Icon = ICONS[i] ?? Scale;
              return (
                <div key={item.title} className="-mt-px -mr-px border border-border/75 px-5 pt-7 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.07] text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="font-medium text-lg tracking-[-0.005em] text-foreground">{item.title}</h3>
                  </div>
                  <p className="mt-4 text-foreground/80 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
            {/* Fills the empty slot left by an odd number of items */}
            <div className={`-mt-px -mr-px hidden border border-border/75 sm:block lg:col-span-1 ${HATCH}`} aria-hidden />
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default Principles;
