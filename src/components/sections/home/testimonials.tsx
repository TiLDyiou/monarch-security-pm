import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import TestimonialSlider from "@/components/ui/testimonial-slider";
import SoftAurora from "@/components/SoftAurora";
import { useLanguage } from "@/i18n/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="danh-gia" className="py-12 md:py-[60px] relative overflow-hidden scroll-mt-4">
      {/* Soft brand aurora: slow teal/sky bands in the same glow language as the rest of the landing page */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <SoftAurora
          lightMode
          color1="#97b5ff"
          color2="#00a0b0"
          speed={0.4}
          scale={1.6}
          brightness={1}
          spectrum={0}
          bandHeight={0.5}
          bandSpread={0.55}
          noiseAmplitude={1.6}
          tilt={-6}
          mouseInfluence={0.15}
          opacity={0.38}
        />
        {/* Fade into the page background at the top and bottom so the section has no visible seams */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>
      <Container className="relative z-10">
        <AnimateOnView
          blur
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">{t.landing.testimonials.badge}</span>
          <h2 className="h2 mb-4">{t.landing.testimonials.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t.landing.testimonials.subtitle}
          </p>
        </AnimateOnView>
        <TestimonialSlider />
      </Container>
    </section>
  );
};

export default Testimonials;
