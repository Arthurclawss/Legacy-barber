"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Finalmente encontrei uma barbearia onde o corte realmente fica como eu quero.",
    name: "Lucas Almeida",
  },
  {
    quote: "O atendimento e o acabamento são outro nível.",
    name: "Rafael Mendes",
  },
  {
    quote: "Ambiente incrível e barbeiros extremamente profissionais.",
    name: "Gabriel Costa",
  },
];

function Stars() {
  return (
    <div className="flex justify-center gap-1 mb-6" aria-label="5 estrelas">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-legacy-warm fill-legacy-warm"
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="depoimentos"
      className="relative py-20 lg:py-40 bg-legacy-charcoal"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-legacy">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-24"
        >
          <p className="text-label text-legacy-warm mb-4">DEPOIMENTOS</p>
          <h2
            id="testimonials-heading"
            className="heading-section text-4xl sm:text-5xl lg:text-6xl text-legacy-white"
          >
            QUEM PASSA PELA LEGACY, VOLTA.
          </h2>
          <div className="divider-warm mt-6 mx-auto" />
        </motion.div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-legacy-black border border-white/[0.06] p-8 lg:p-12 min-h-[240px] flex flex-col justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <blockquote>
                <Stars />
                <p className="text-body text-legacy-light text-base lg:text-lg leading-relaxed mb-8 italic">
                  &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
                </p>
                <footer>
                  <cite className="text-label text-legacy-warm not-italic text-xs lg:text-sm tracking-wider">
                    {TESTIMONIALS[activeIndex].name}
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  idx === activeIndex
                    ? "w-8 bg-legacy-warm"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir para depoimento ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
