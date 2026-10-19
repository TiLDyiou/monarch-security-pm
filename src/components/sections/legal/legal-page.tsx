import Container from "@/components/container";
import GradientWaves from "@/components/GradientWaves";
import Layout from "@/components/layout";
import SEO from "@/components/seo";
import LegalHero from "@/components/sections/legal/hero";
import { useLanguage } from "@/i18n/LanguageContext";
import { LEGAL_PATHS, legalContent, type LegalDocKey } from "@/pages/legal/content";
import { appConfig } from "@/utils/app-config";

const LegalPage = ({ doc }: { doc: LegalDocKey }) => {
  const { language } = useLanguage();
  const content = legalContent[language];
  const { title, description, intro, sections } = content.docs[doc];
  const path = LEGAL_PATHS[doc];

  return (
    <>
      <SEO
        title={`${title} | ${appConfig.name}`}
        description={description}
        canonicalUrl={path}
        ogType="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${title} | ${appConfig.name}`,
          description,
          url: `${appConfig.url}${path}`,
        }}
      />
      {/* The home hero's gradient waves, fixed behind the whole page. A veil keeps it a backdrop so the text stays easy to read */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url(/images/home/hero-bg.webp)] bg-cover bg-center" aria-hidden="true">
        <GradientWaves
          horizonColor="#00a0b0"
          waveColor="#97b5ff"
          crestColor="#ffffff"
          speed={0.3}
          amplitude={2.5}
          relief={1}
          lightAngle={120}
          lightMode
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
          intro={false}
          mouseInteraction={false}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-background/35" />
      </div>
      <div className="relative z-10">
        <Layout>
          <LegalHero
            title={title}
            description={description}
            updated={`${content.updatedLabel}: ${content.updated}`}
          />
          <section>
            <Container className="pb-24">
              <article className="max-w-3xl mx-auto">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
                  {intro}
                </p>
                <ol className="space-y-10">
                  {sections.map((section, idx) => (
                    <li key={section.heading}>
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                        <span className="mr-2 tabular-nums">{idx + 1}.</span>
                        {section.heading}
                      </h2>
                      {section.bullets && (
                        <ul className="list-disc pl-5 space-y-2 mb-3 text-muted-foreground leading-relaxed marker:text-primary">
                          {section.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </li>
                  ))}
                </ol>
              </article>
            </Container>
          </section>
        </Layout>
      </div>
    </>
  );
};

export default LegalPage;
