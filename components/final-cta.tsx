"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, MessageCircle } from "lucide-react";

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative py-24 lg:py-48 flex items-center justify-center overflow-hidden min-h-[80vh] lg:min-h-0"
      aria-labelledby="cta-heading"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-[-20%] z-0">
        <Image
          src="/images/barber-after.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[30%_center] lg:object-center opacity-30"
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark overlay with radial vignette for cinematic effect */}
      <div className="absolute inset-0 bg-legacy-black/60 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] z-[1]" />

      {/* Content */}
      <div className="container-legacy relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-label text-legacy-warm mb-4">AGENDE AGORA</p>
          <h2
            id="cta-heading"
            className="heading-display text-4xl sm:text-5xl lg:text-8xl xl:text-9xl text-legacy-white mb-6"
          >
            SEU PRÓXIMO CORTE
            <br />
            COMEÇA AGORA.
          </h2>
          <div className="divider-warm mx-auto mb-6" />
          <p className="text-body text-legacy-silver text-xs lg:text-base max-w-md mx-auto mb-10">
            Agende seu horário e descubra a experiência LEGACY.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/5584998071144?text=Olá!%20Gostaria%20de%20agendar%20um%20horário%20na%20Legacy%20Barber."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2.5 text-xs py-6">
              <MessageCircle size={16} strokeWidth={1.5} />
              AGENDAR PELO WHATSAPP
            </Button>
          </a>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-legacy-silver"
          >
            <div className="flex items-center gap-2.5">
              <MapPin size={14} strokeWidth={1.2} className="text-legacy-warm" />
              <span className="text-label text-[11px]">Natal — RN</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2.5">
              <Clock size={14} strokeWidth={1.2} className="text-legacy-warm" />
              <span className="text-label text-[11px]">
                Seg–Sex 09:00–20:00
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2.5">
              <Clock size={14} strokeWidth={1.2} className="text-legacy-warm" />
              <span className="text-label text-[11px]">Sáb 08:00–18:00</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
