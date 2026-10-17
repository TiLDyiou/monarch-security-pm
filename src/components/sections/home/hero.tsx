import GradientWaves from "@/components/GradientWaves";
import AllocationChart from "@/components/sections/home/allocation-chart";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative flex items-center justify-center overflow-hidden hero-padding-top pb-14 md:pb-16 bg-[url(/images/home/hero-bg.webp)] bg-cover bg-center">
      {/* Background Interactive Gradient Waves */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-0">
        <GradientWaves
          horizonColor="#00a0b0"
          waveColor="#97b5ff"
          crestColor="#ffffff"
          speed={0.4}
          amplitude={2.5}
          relief={1}
          lightAngle={120}
          mouseInteraction
          swellOnClick
          lightMode={true}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={64}
          zoom={1}
          height={5.5}
          fogDepth={15}
          sheen={0}
          brightness={1}
          opacity={0.85}
          grain={0.15}
          quality="medium"
          intro
          parallaxStrength={0.5}
          mouseStrength={0.6}
          paused={false}
          className="w-full h-full"
        />
        {/* Soft bottom fade to smoothly transition into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <StaggerContainer>
            <AnimateOnView blur>
              <h1 className="h1 text-foreground mb-5 tracking-tight font-extrabold leading-[1.15]">
                {t.landing.hero.title1}<br className="hidden sm:inline" /> {t.landing.hero.title2}
              </h1>
            </AnimateOnView>

            <AnimateOnView blur delay={0.2}>
              <p className="text-body-md max-w-2xl mx-auto mb-8 text-muted-foreground leading-relaxed text-base md:text-lg">
                {t.landing.hero.subtitle}
              </p>
            </AnimateOnView>

            <AnimateOnView
              className="flex flex-col items-center justify-center mb-10"
              delay={0.3}
            >
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 cursor-pointer">
                <Link to="/dashboard">
                  {t.landing.hero.cta}
                </Link>
              </Button>
            </AnimateOnView>
          </StaggerContainer>

          {/* Interactive asset allocation chart */}
          <div id="phan-bo" className="relative flex justify-center mt-6 scroll-mt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[340px] md:h-[500px] bg-gradient-to-tr from-[#00a0b0]/20 to-[#97b5ff]/25 rounded-full blur-[90px] pointer-events-none -z-10" />
            <AnimateOnView delay={0.2} className="relative z-10 w-full max-w-[880px]">
              <AllocationChart />
            </AnimateOnView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
