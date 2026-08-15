"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Salva o lead no banco de dados para controle interno
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isClient: "nao_informado" }),
      }).catch(() => {});

      // Redireciona para o WhatsApp Web
      const phoneNumber = "5584998071144";
      const message = `Olá! Meu nome é ${formData.name}. Gostaria de informações sobre agendamento de horário.`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, "_blank");
      
      // Fecha o modal e reseta o form
      onClose();
      setFormData({ name: "", email: "", whatsapp: "" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50 bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-legacy-warm/10 blur-[100px] pointer-events-none" />

            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="heading-section text-2xl text-legacy-white mb-1">
                    Agendar Horário
                  </h2>
                  <p className="text-body text-legacy-silver text-sm">
                    Preencha os dados abaixo para falar com nossa recepção no WhatsApp.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-legacy-silver hover:text-legacy-white transition-colors"
                  aria-label="Fechar"
                >
                  <X size={24} />
                </button>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-label text-xs text-legacy-silver">
                    NOME COMPLETO
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Seu nome"
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-label text-xs text-legacy-silver">
                    E-MAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="seu@email.com"
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="whatsapp" className="text-label text-xs text-legacy-silver">
                    WHATSAPP
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    required
                    placeholder="(00) 00000-0000"
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-legacy-white placeholder:text-white/20 focus:outline-none focus:border-legacy-warm/60 transition-colors text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="w-full mt-4 py-6 text-sm font-bold tracking-[0.2em] bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] uppercase shadow-[0_0_30px_rgba(196,168,124,0.15)] rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "CARREGANDO..." : "CONTINUAR PARA WHATSAPP"}
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
