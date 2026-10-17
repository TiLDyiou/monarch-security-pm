import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import { useLanguage } from '@/i18n/LanguageContext';
import { FrontierIllustration, RebalanceIllustration, RiskProfileIllustration } from './process-illustrations';
import Container from '../../container';

const Content = () => {
  const { t } = useLanguage();

  const streamlineFeatures = [
    {
      id: 1,
      title: t.landing.process.cards.step1.title,
      description: t.landing.process.cards.step1.description,
      Illustration: RiskProfileIllustration,
    },
    {
      id: 2,
      title: t.landing.process.cards.step2.title,
      description: t.landing.process.cards.step2.description,
      Illustration: FrontierIllustration,
    },
    {
      id: 3,
      title: t.landing.process.cards.step3.title,
      description: t.landing.process.cards.step3.description,
      Illustration: RebalanceIllustration,
    },
  ];

  return (
    <section id="quy-trinh" className="py-12 md:py-[60px] scroll-mt-4">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">{t.landing.process.badge}</span>
            <h2 className="h2 md:mb-5 mb-3">
              {t.landing.process.sectionTitle1} <span className="whitespace-nowrap">{t.landing.process.sectionTitle2}</span>
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground text-base md:text-lg">
              {t.landing.process.sectionSubtitle}
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {streamlineFeatures.slice(0, 2).map((feature, index) => (
              <AnimateOnView
                key={feature.id}
                delay={index * 0.1}
              >
                <div className="border border-border bg-card rounded-[32px] overflow-hidden hover:border-[#00a0b0]/40 shadow-card hover:shadow-neumorphic transition-all duration-300">
                  <div className="w-full aspect-[4/3] sm:aspect-[519/317] p-4">
                    <feature.Illustration />
                  </div>
                  <div className="p-6 md:p-8 text-center md:text-left">
                    <h3 className="h4 text-xl font-bold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimateOnView>
            ))}
          </div>
          <AnimateOnView delay={0.2}>
            <div className="border border-border bg-card rounded-[32px] overflow-hidden hover:border-[#00a0b0]/40 shadow-card hover:shadow-neumorphic transition-all duration-300">
              <div className="w-full h-[300px] md:h-[320px] xl:h-[350px] p-4">
                <RebalanceIllustration />
              </div>
              <div className="p-6 md:p-8 text-center max-w-2xl mx-auto">
                <h3 className="h4 text-xl md:text-2xl font-bold mb-3">
                  {streamlineFeatures[2].title}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  {streamlineFeatures[2].description}
                </p>
              </div>
            </div>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default Content;
