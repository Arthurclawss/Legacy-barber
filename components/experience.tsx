"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Scissors, Coffee, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumModal } from "./premium-modal";

const FEATURES = [
  {
    icon: CalendarCheck,
    title: "AGENDAMENTO PRIORITÁRIO",
    description: "Sem esperas. Seu horário garantido com prioridade máxima em nossa agenda.",
  },
  {
    icon: Scissors,
    title: "1 CORTE + 1 BARBA AO MÊS",
    description: "A manutenção do seu visual já inclusa, feita pelos nossos melhores barbeiros.",
  },
  {
    icon: Coffee,
    title: "BEBIDAS PREMIUM",
    description: "Espresso, cerveja artesanal ou whisky cortesia em todas as suas visitas.",
  },
  {
    icon: Tag,
    title: "15% OFF EM PRODUTOS",
    description: "Desconto exclusivo em toda nossa linha premium de cuidados para cabelo e barba.",
  },
];

export function Experience() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="experiencia"
      className="relative py-20 lg:py-40"
      aria-labelledby="experience-heading"
    >
      <div className="container-legacy">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full lg:w-1/2 aspect-square lg:aspect-[4/5] bg-[#111] p-2 sm:p-5 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="relative w-full h-full overflow-hidden border border-legacy-warm/30">
              <Image
                src="/images/experience-tailor.jpg"
                alt="Interior da LEGACY BARBER — ambiente premium"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-legacy-black/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p className="text-label text-legacy-warm mb-4">CLUBE LEGACY PREMIUM</p>
              <h2
                id="experience-heading"
                className="heading-section text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-legacy-white mb-6"
              >
                ELEVE SUA EXPERIÊNCIA
                <br />
                AO PRÓXIMO NÍVEL.
              </h2>
              <div className="divider-warm mb-8" />
              <p className="text-body text-legacy-silver text-sm lg:text-base max-w-lg mb-12">
                Mais do que um corte, um estilo de vida. Assine nosso clube exclusivo e desfrute de vantagens criadas para quem não abre mão do melhor atendimento.
              </p>
            </motion.div>

            {/* Features */}
            <div className="flex flex-col gap-5 lg:gap-8">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-white/[0.08] bg-white/[0.03]">
                    <feature.icon
                      size={18}
                      strokeWidth={1.2}
                      className="text-legacy-warm"
                    />
                  </div>
                  <div>
                    <h3 className="heading-section text-base text-legacy-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-body text-legacy-silver text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subscription CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Button 
                variant="primary" 
                className="w-full sm:w-auto px-6 py-6 text-xs lg:text-sm font-bold tracking-[0.2em] bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(196,168,124,0.2)] hover:shadow-[0_0_40px_rgba(196,168,124,0.4)]"
                onClick={() => setIsModalOpen(true)}
              >
                Assinatura Premium — R$ 100/mês
              </Button>
              <p className="text-legacy-silver/60 text-xs mt-4 pb-12 lg:pb-0">
                * Vagas limitadas. Garanta seu acesso ao clube exclusivo.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      <PremiumModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
