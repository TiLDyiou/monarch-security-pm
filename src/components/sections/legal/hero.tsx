import Container from "@/components/container";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

interface LegalHeroProps {
  title: string;
  description: string;
  updated: string;
}

const LegalHero = ({ title, description, updated }: LegalHeroProps) => {
  return (
    <section className="hero-padding-top pb-16 md:pb-20">
      <Container>
        <AnimateOnView once blur className="text-center max-w-3xl mx-auto" delay={0.2}>
          <h1 className="h1 text-foreground mb-5 font-extrabold">
            {title}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground/80">
            {updated}
          </p>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default LegalHero;
