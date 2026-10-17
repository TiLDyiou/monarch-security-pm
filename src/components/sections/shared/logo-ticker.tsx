
import Container from "@/components/container";
import FeatureTicker from "@/components/ui/feature-ticker";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

const VIETNAM_BRANDS = [
  { name: "Vietcombank", code: "VCB", src: "/images/brands/vietcombank.svg" },
  { name: "Techcombank", code: "TCB", src: "/images/brands/techcombank.svg" },
  { name: "FPT Corporation", code: "FPT", src: "/images/brands/fpt.svg" },
  { name: "Vinamilk", code: "VNM", src: "/images/brands/vinamilk.svg" },
  { name: "MBBank", code: "MBB", src: "/images/brands/mbbank.svg" },
  { name: "Hòa Phát Group", code: "HPG", src: "/images/brands/hoaphat.svg" },
  { name: "VietinBank", code: "CTG", src: "/images/brands/vietinbank.svg" },
  { name: "Chứng khoán SSI", code: "SSI", src: "/images/brands/ssi.svg" },
];

const LogoTicker = () => {
  return (
    <section className="overflow-hidden md:py-10 py-7 border-y border-border/50 bg-card/40">
      <Container>
        <AnimateOnView y={30} delay={0.2} className="relative w-full">
          <FeatureTicker speed={25} pauseOnHover={true} gap="12">
            {VIETNAM_BRANDS.map((brand) => (
              <div
                key={brand.code}
                className="flex items-center justify-center px-5 py-2.5 rounded-2xl bg-card border border-border/70 shadow-sm hover:border-primary/50 hover:shadow-card transition-all duration-300 group cursor-pointer"
                title={`${brand.name} (${brand.code})`}
              >
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="h-7 md:h-8 w-auto max-w-[170px] object-contain opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </FeatureTicker>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default LogoTicker;
