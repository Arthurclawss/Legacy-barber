"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      id="galeria"
      className="relative py-32 lg:py-40 bg-legacy-charcoal overflow-hidden"
      aria-labelledby="before-after-heading"
    >
      {/* Ambiance: Glows and texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-legacy-warm/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-legacy-warm/[0.02] rounded-full blur-[100px] pointer-events-none" />
      
      {/* Subtle overlay texture */}
      <div className="absolute inset-0 bg-[url('/images/academia-vintage.jpg')] bg-cover bg-center opacity-[0.04] mix-blend-luminosity pointer-events-none" />

      <div className="container-legacy relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 lg:mb-20 text-center"
        >
          <p className="text-label text-legacy-warm mb-4">TRANSFORMAÇÃO</p>
          <h2
            id="before-after-heading"
            className="heading-section text-4xl sm:text-5xl lg:text-6xl text-legacy-white"
          >
            A DIFERENÇA ESTÁ NOS DETALHES.
          </h2>
          <div className="divider-warm mt-6 mx-auto" />
        </motion.div>

        {/* Comparator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-5xl mx-auto p-2 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] overflow-hidden rounded-xl cursor-ew-resize select-none touch-none shadow-inner"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            role="slider"
            aria-label="Comparador antes e depois — arraste para revelar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft")
                setSliderPosition((p) => Math.max(0, p - 2));
              if (e.key === "ArrowRight")
                setSliderPosition((p) => Math.min(100, p + 2));
            }}
          >
            {/* AFTER — full background */}
            <Image
              src="/images/comparator-after.png"
              alt="Depois do corte"
              fill
              quality={100}
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover pointer-events-none"
            />

            {/* BEFORE — clipped */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src="/images/comparator-before.png"
                alt="Antes do corte"
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover pointer-events-none"
              />
            </div>

            {/* Divider */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white/60 z-10 transition-shadow"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
                boxShadow: isDragging
                  ? "0 0 20px rgba(196,168,124,0.3)"
                  : "none",
              }}
            >
              {/* Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/70 bg-black/50 backdrop-blur-sm flex items-center justify-center gap-1">
                <div className="flex gap-[3px]">
                  <div className="w-[2px] h-4 bg-white/70 rounded-full" />
                  <div className="w-[2px] h-4 bg-white/70 rounded-full" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
              <span className="text-label text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white/80">
                ANTES
              </span>
            </div>
            <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
              <span className="text-label text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 text-legacy-warm">
                DEPOIS
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
