import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { useLanguage } from "@/i18n/LanguageContext";
import { Minus, Plus } from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();

  return (
    <section id="hoi-dap" className="scroll-mt-4 md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container>
        <AnimateOnView once blur>
          <div className="text-center mb-8 md:mb-20 max-w-2xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 inline-block">
              {t.landing.faq.badge}
            </span>
            <h2 className="h2 mb-4">{t.landing.faq.title}</h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t.landing.faq.subtitle}
            </p>
          </div>
        </AnimateOnView>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
          <AnimateOnView once className="max-w-[480px] w-full">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-card border border-border shadow-card p-6 flex items-center justify-center">
              <img
                src="/images/common/logo.svg"
                alt="Monarch Securities"
                className="w-4/5 h-auto object-contain"
              />
            </div>
          </AnimateOnView>

          <div className="max-w-[560px] w-full">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {t.landing.faq.items.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border px-0">
                    <AccordionTrigger className="text-left py-5 hover:no-underline [&>svg]:hidden cursor-pointer group">
                      <span className="h4 text-lg md:text-xl pr-6 font-semibold group-hover:text-primary transition-colors">
                        {faq.question}
                      </span>
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                        <Minus className="absolute w-5 h-5 transition-transform duration-300 scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
                        <Plus className="absolute w-5 h-5 transition-transform duration-300 scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
