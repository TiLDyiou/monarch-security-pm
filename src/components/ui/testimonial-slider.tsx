import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import * as React from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const IMAGES = [
  "/images/home/warren-buffett.webp",
  "/images/home/charlie-munger.webp",
  "/images/home/harry-markowitz.webp",
  "/images/home/benjamin-graham.webp",
  "/images/home/john-maynard-keynes.webp",
  "/images/home/adam-smith.webp",
];

const TestimonialSlider = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const testimonials = React.useMemo(() => {
    return t.landing.testimonials.items.map((item, idx) => ({
      id: idx + 1,
      quote: item.quote,
      author: item.author,
      role: item.role,
      image: IMAGES[idx] || IMAGES[0],
    }));
  }, [t]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden">
      <div className="relative min-h-[440px] md:h-[400px] flex items-center pb-4 md:pb-8">
        <div className="flex gap-6 items-center w-full relative">
          {/* Active Testimonial Card */}
          <motion.div
            layout
            key={`active-${current.id}`}
            className="flex-shrink-0 flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-[72%] z-20"
            initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="relative md:w-80 md:h-80 h-64 w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-card group">
              <img
                src={current.image}
                alt={current.author}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center md:hidden">
                <p className="text-white font-semibold text-sm">{current.author}</p>
                <p className="text-primary text-xs truncate">{current.role}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full max-w-lg text-center md:text-left">
              <div>
                <Quote className="w-9 h-9 text-primary/40 mb-3 mx-auto md:mx-0" />
                <p className="text-lg md:text-xl font-normal text-slate-800 leading-relaxed mb-6 italic">
                  "{current.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-lg font-bold text-foreground">{current.author}</p>
                <p className="text-sm text-primary font-medium">{current.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Testimonial Cards (Preview) */}
          <div className="hidden md:flex gap-5 flex-1 relative h-80 items-center">
            {testimonials.map((_, i) => {
              const index = (currentIndex + i + 1) % testimonials.length;
              if (i >= 2) return null;

              const previewItem = testimonials[index];

              return (
                <motion.div
                  key={`preview-${previewItem.id}`}
                  layout
                  onClick={() => {
                    setDirection(1);
                    setCurrentIndex(index);
                  }}
                  title={previewItem.author}
                  className="group cursor-pointer flex-shrink-0 w-60 h-80 flex flex-col justify-end p-4 relative rounded-2xl overflow-hidden border border-border/60 bg-card grayscale hover:grayscale-0 hover:scale-[1.03] transition-all duration-300"
                  initial={{ opacity: 0, x: direction > 0 ? 120 : -120 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -120 : 120 }}
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 250,
                    delay: i * 0.05,
                  }}
                >
                  <img
                    src={previewItem.image}
                    alt={previewItem.author}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  {/* Opaque veil instead of element opacity, so nothing behind the card bleeds into the portrait */}
                  <div className="absolute inset-0 bg-white/55 transition-opacity duration-300 group-hover:opacity-0" />
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-white leading-tight mb-1">{previewItem.author}</p>
                    <p className="text-xs text-zinc-300 line-clamp-1">{previewItem.role}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-border">
        <button
          onClick={prev}
          className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-slate-100 hover:border-primary/50 transition-all group cursor-pointer"
          aria-label="Previous quote"
        >
          <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 rounded-full border border-border bg-card flex items-center justify-center hover:bg-slate-100 hover:border-primary/50 transition-all group cursor-pointer"
          aria-label="Next quote"
        >
          <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
