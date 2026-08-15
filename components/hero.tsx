"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [showAfter, setShowAfter] = useState(false);

  /* ── Auto-transition for mobile ── */
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, [isMobile]);

  /* ── Desktop scroll-based animation (hooks always called) ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const clipRight = useTransform(smoothProgress, [0, 0.75], [50, 0]);
  const clipPath = useTransform(clipRight, (v) => `inset(0 ${v}% 0 0)`);
  const imageY = useTransform(smoothProgress, [0, 1], [0, -60]);
  const imageScale = useTransform(smoothProgress, [0, 0.75], [1, 1.06]);
  const dividerLeft = useTransform(smoothProgress, [0, 0.5], [0, 100]);
  const dividerLeftPx = useTransform(dividerLeft, (v) => `${v}%`);
  const textY = useTransform(smoothProgress, [0, 1], [0, -30]);
  const beforeLabelOpacity = useTransform(smoothProgress, [0, 0.15, 0.4], [1, 0.6, 0]);
  const afterLabelOpacity = useTransform(smoothProgress, [0.3, 0.75], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative ${isMobile ? "min-h-screen" : "min-h-[200vh]"}`}
      aria-label="Hero — Legacy Barber"
    >
      {/* Sticky container pinned to viewport */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden ${isMobile ? "relative" : "flex flex-row"}`}>
        {/* ─── LEFT / TOP: Images ─── */}
        {isMobile ? (
          <>
          /* ── MOBILE: Auto-transitioning images ── */
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/hero-before.jpg"
              alt="Cliente antes do corte"
              fill
              priority
              quality={70}
              sizes="100vw"
              className="object-cover object-[25%_15%]"
            />

            <AnimatePresence>
              {showAfter && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/hero-after.jpg"
                    alt="Cliente após o corte — visual renovado"
                    fill
                    priority
                    quality={70}
                    sizes="100vw"
                    className="object-cover object-[25%_15%]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={showAfter ? "depois" : "antes"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className={`text-label text-xs ${showAfter ? "text-legacy-warm" : "text-white/60"}`}
                >
                  {showAfter ? "DEPOIS" : "ANTES"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${!showAfter ? "bg-legacy-warm scale-110" : "bg-white/30"}`} />
              <div className={`w-2 h-2 rounded-full transition-all duration-500 ${showAfter ? "bg-legacy-warm scale-110" : "bg-white/30"}`} />
            </div>

            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
          </div>

          {/* ── MOBILE: Content overlaid on image ── */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-label text-legacy-warm mb-2 text-[10px]"
            >
              LEGACY BARBER
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
              className="heading-display text-4xl text-legacy-white mb-3"
            >
              SEU ESTILO<br />COMEÇA AQUI.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="divider-warm mb-4 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
              className="text-body text-legacy-silver max-w-xs mb-6 text-xs"
            >
              Cortes precisos. Presença marcante. Uma experiência criada para quem exige mais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-3"
            >
              <a href="#contato">
                <Button variant="primary" size="lg" className="w-full text-xs">
                  AGENDAR HORÁRIO
                </Button>
              </a>
              <a href="#servicos">
                <Button variant="secondary" size="lg" className="w-full text-xs">
                  CONHECER SERVIÇOS
                </Button>
              </a>
            </motion.div>
          </div>
          </>
        ) : (
          /* ── DESKTOP: Scroll-based clip reveal ── */
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full lg:w-[58%] h-full flex-shrink-0"
          >
            <Image
              src="/images/hero-before.jpg"
              alt="Cliente antes do corte — cabelo desalinhado e barba desajustada"
              fill
              priority
              quality={100}
              sizes="60vw"
              className="object-cover object-[25%_15%]"
            />

            <motion.div
              style={{ clipPath }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero-after.jpg"
                alt="Cliente após o corte — visual renovado e profissional"
                fill
                priority
                quality={100}
                sizes="60vw"
                className="object-cover object-[25%_15%]"
              />
            </motion.div>

            <motion.div
              style={{ left: dividerLeftPx }}
              className="absolute top-0 bottom-0 w-px bg-white/30 z-10"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <div className="w-3 h-px bg-white/60" />
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none" />

            <motion.div
              style={{ opacity: beforeLabelOpacity }}
              className="absolute bottom-8 left-8 z-10"
            >
              <span className="text-label text-xs text-white/60">ANTES</span>
            </motion.div>
            <motion.div
              style={{ opacity: afterLabelOpacity }}
              className="absolute bottom-8 left-8 z-10"
            >
              <span className="text-label text-xs text-legacy-warm">DEPOIS</span>
            </motion.div>
          </motion.div>
        )}

        {/* ─── RIGHT: Content (Desktop only) ─── */}
        {!isMobile && (
        <motion.div
          style={{ y: textY }}
          className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-8 lg:py-0"
        >
          {/* Brand tag */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-label text-legacy-warm mb-3 lg:mb-6 text-[10px] lg:text-xs"
          >
            LEGACY BARBER
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
            className="heading-display text-4xl sm:text-5xl lg:text-8xl xl:text-9xl text-legacy-white mb-3 lg:mb-6"
          >
            SEU ESTILO
            <br />
            COMEÇA AQUI.
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="divider-warm mb-4 lg:mb-8 origin-left"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
            className="text-body text-legacy-silver max-w-md mb-6 lg:mb-10 text-xs lg:text-base"
          >
            Cortes precisos. Presença marcante. Uma experiência criada para quem
            exige mais.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 lg:gap-4"
          >
            <a href="#contato">
              <Button variant="primary" size="lg" className="w-full sm:w-auto text-xs lg:text-sm">
                AGENDAR HORÁRIO
              </Button>
            </a>
            <a href="#servicos">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-xs lg:text-sm">
                CONHECER SERVIÇOS
              </Button>
            </a>
          </motion.div>

          {/* Scroll indicator — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden lg:flex absolute bottom-12 left-16 xl:left-24 flex-col items-center gap-3"
          >
            <span className="text-label text-[10px] text-legacy-silver tracking-[0.2em]">
              SCROLL TO EXPLORE
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <ChevronDown size={16} className="text-legacy-silver" />
            </motion.div>
          </motion.div>
        </motion.div>
        )}
      </div>
    </section>
  );
}
