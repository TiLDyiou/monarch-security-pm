import Container from "@/components/container";
import FeatureTicker from "@/components/ui/feature-ticker";
import { useLanguage } from "@/i18n/LanguageContext";

// Slow strip of the portfolio-theory concepts the advisory is built on, a quiet bridge between the hero and the services
const Concepts = () => {
  const { t } = useLanguage();

  return (
    <section aria-label={t.landing.process.badge} className="border-y border-border/60">
      <Container>
        <FeatureTicker speed={22} pauseOnHover={false} className="[&>div]:py-4 md:[&>div]:py-5">
          {t.landing.concepts.map((concept) => (
            <span key={concept} className="flex items-center gap-12">
              <span className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                {concept}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-primary/50" aria-hidden />
            </span>
          ))}
        </FeatureTicker>
      </Container>
    </section>
  );
};

export default Concepts;
