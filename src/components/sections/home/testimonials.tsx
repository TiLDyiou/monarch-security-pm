import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import TestimonialSlider from "@/components/ui/testimonial-slider";
import { useLanguage } from "@/i18n/LanguageContext";

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="danh-gia" className="py-12 md:py-[60px] relative overflow-hidden scroll-mt-4">
      <Container>
        <AnimateOnView
          blur
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
        >
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
