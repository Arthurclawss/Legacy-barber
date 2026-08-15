"use client";

import Image from "next/image";

import { motion } from "motion/react";
import { Scissors, Sparkles, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    icon: Scissors,
    name: "CORTE",
    description: "Corte masculino personalizado.",
    price: "R$ 45",
  },
  {
    icon: Sparkles,
    name: "CORTE + BARBA",
    description: "Corte completo + acabamento de barba.",
    price: "R$ 70",
  },
  {
    icon: Users,
    name: "BARBA",
    description: "Modelagem e acabamento profissional.",
    price: "R$ 35",
  },
  {
    icon: Eye,
    name: "CORTE + SOBRANCELHA",
    description: "Visual completo.",
    price: "R$ 55",
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative py-20 lg:py-40 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/images/academia-vintage.jpg"
          alt="Academia Vintage Background"
          fill
          quality={80}
          className="object-cover opacity-30"
        />
        {/* Extra gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-legacy-black/90 via-legacy-black/50 to-legacy-black/90 pointer-events-none" />
      </div>

      <div className="container-legacy relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 lg:mb-24"
        >
          <p className="text-label text-legacy-warm mb-4">NOSSOS SERVIÇOS</p>
          <h2
            id="services-heading"
            className="heading-section text-4xl sm:text-5xl lg:text-6xl text-legacy-white"
          >
            PRECISÃO EM CADA DETALHE.
          </h2>
          <div className="divider-warm mt-6" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative bg-legacy-charcoal border border-white/[0.06] p-4 lg:p-10 flex flex-col transition-colors duration-500 hover:border-legacy-warm/30 min-h-[220px] lg:min-h-[280px]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-legacy-warm/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="relative mb-3 lg:mb-8">
                <service.icon
                  className="w-5 h-5 lg:w-7 lg:h-7 text-legacy-warm transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <h3 className="heading-section text-sm lg:text-xl text-legacy-white mb-2 lg:mb-3 relative">
                {service.name}
              </h3>
              <p className="text-body text-legacy-silver text-[10px] lg:text-sm mb-4 lg:mb-8 relative flex-1 line-clamp-3">
                {service.description}
              </p>

              {/* Price + CTA */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto gap-2 sm:gap-0">
                <span className="heading-display text-lg lg:text-3xl text-legacy-white">
                  {service.price}
                </span>
                <Button variant="ghost" className="text-[9px] lg:text-[10px] px-0 sm:px-4 py-1 sm:py-2 h-auto text-legacy-warm sm:text-legacy-white hover:text-legacy-warm">
                  AGENDAR
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
