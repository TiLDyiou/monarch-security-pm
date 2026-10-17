import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import SectionLink from '@/components/section-link';
import { SECTIONS } from '@/lib/sections';
import { useLanguage } from '@/i18n/LanguageContext';
import Container from '../../container';
import { Button } from '../../ui/button';
import {
  FeatureCard,
  FeatureCardAction,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardImage,
  FeatureCardTitle,
} from '../../ui/feature-card';

const Features = () => {
  const { t } = useLanguage();

  const cards = [
    {
      id: 1,
      title: t.landing.features.cards.card1.title,
      description: t.landing.features.cards.card1.description,
      imageSrc: "/images/home/feature-1.png",
      imageAlt: t.landing.features.cards.card1.imageAlt,
      buttonText: t.landing.features.cards.card1.buttonText,
    },
    {
      id: 2,
      title: t.landing.features.cards.card2.title,
      description: t.landing.features.cards.card2.description,
      imageSrc: "/images/home/feature-2.webp",
      imageAlt: t.landing.features.cards.card2.imageAlt,
      buttonText: t.landing.features.cards.card2.buttonText,
    },
    {
      id: 3,
      title: t.landing.features.cards.card3.title,
      description: t.landing.features.cards.card3.description,
      imageSrc: "/images/home/feature-3.webp",
      imageAlt: t.landing.features.cards.card3.imageAlt,
    },
  ];

  return (
    <section id="dich-vu" className="py-12 md:py-[60px] bg-background scroll-mt-4">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">{t.landing.features.badge}</span>
            <h2 className="h2 mb-4">
              {t.landing.features.sectionTitle}
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg">
              {t.landing.features.sectionSubtitle}
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer className="max-w-[1062px] mx-auto md:space-y-[60px] space-y-8">
          {cards.map((card, index) => (
            <AnimateOnView
              delay={index * 0.1}
              key={card.id}
              className={`md:sticky md:top-24 z-10 bg-background md:rounded-[30px] rounded-lg`}
            >
              <FeatureCard imagePosition="right">
                <FeatureCardContent>
                  <FeatureCardTitle>{card.title}</FeatureCardTitle>
                  <FeatureCardDescription>{card.description}</FeatureCardDescription>
                  {card.buttonText && (
                    <FeatureCardAction>
                      <Button asChild>
                        <SectionLink to={SECTIONS.process}>
                          {card.buttonText}
                        </SectionLink>
                      </Button>
                    </FeatureCardAction>
                  )}
                </FeatureCardContent>
                <FeatureCardImage src={card.imageSrc} alt={card.imageAlt} />
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default Features;