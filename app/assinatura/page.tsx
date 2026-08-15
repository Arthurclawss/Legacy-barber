"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AssinaturaPage() {
  return (
    <main className="min-h-screen bg-legacy-black flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-legacy-warm/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* Left Side — Details */}
        <div className="w-full lg:w-1/2">
          <Link href="/#experiencia" className="inline-flex items-center gap-2 text-legacy-silver hover:text-legacy-white transition-colors mb-10 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-wider uppercase font-medium">Voltar</span>
          </Link>
          
          <p className="text-label text-legacy-warm mb-4">CLUBE VIP</p>
          <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl text-legacy-white mb-6">
            O CLUBE <br/> EXCLUSIVO.
          </h1>
          <p className="text-body text-legacy-silver mb-8 text-base max-w-lg">
            Assine o Legacy Premium por <strong className="text-legacy-white">R$ 100/mês</strong> e tenha acesso a benefícios exclusivos, agendamento prioritário e a melhor experiência em barbearia.
          </p>

          <ul className="space-y-4">
            {[
              "Agendamento prioritário sem filas",
              "1 Corte + 1 Barba completos por mês",
              "Bebida premium cortesia em toda visita",
              "Desconto de 15% em produtos da loja"
            ].map((benefit, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-legacy-warm/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} className="text-legacy-warm" />
                </div>
                <span className="text-legacy-white/90 text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side — Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#121212] border border-white/5 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Glow inside form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-legacy-warm/10 blur-[100px] pointer-events-none" />

            <h2 className="heading-section text-2xl text-legacy-white mb-2 relative z-10">
              Solicitar Convite
            </h2>
            <p className="text-body text-legacy-silver text-sm mb-10 relative z-10">
              Preencha seus dados. Entraremos em contato via WhatsApp com o link de pagamento.
            </p>

            <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-label text-xs text-legacy-silver">NOME COMPLETO</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Seu nome"
                  className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-label text-xs text-legacy-silver">E-MAIL</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="seu@email.com"
                  className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="text-label text-xs text-legacy-silver">WHATSAPP</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  placeholder="(00) 00000-0000"
                  className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors"
                />
              </div>

              <Button 
                type="submit"
                variant="primary" 
                className="w-full mt-4 py-7 text-sm font-bold tracking-[0.2em] bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] uppercase shadow-[0_0_30px_rgba(196,168,124,0.15)] hover:shadow-[0_0_40px_rgba(196,168,124,0.3)] transition-all rounded-xl"
              >
                FINALIZAR CADASTRO
              </Button>
            </form>
          </div>
        </div>
        
      </div>
    </main>
  );
}
