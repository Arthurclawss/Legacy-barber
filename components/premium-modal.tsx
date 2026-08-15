"use client";

import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [isClient, setIsClient] = useState<string>("nao");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          isClient,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({ name: "", email: "", whatsapp: "" });
          setIsClient("nao");
        }, 3000);
      } else {
        alert("Ocorreu um erro ao enviar seus dados. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg z-50 bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-legacy-warm/10 blur-[100px] pointer-events-none" />

            <div className="p-6 sm:p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="heading-section text-2xl text-legacy-white mb-1">
                    Clube Legacy Premium
                  </h2>
                  <p className="text-body text-legacy-silver text-sm">
                    Preencha os dados para solicitar seu convite.
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
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 bg-legacy-warm/20 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-legacy-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl text-legacy-white font-medium mb-2">Solicitação Recebida!</h3>
                    <p className="text-legacy-silver text-sm">Entraremos em contato com você em breve pelo WhatsApp.</p>
                  </div>
                ) : (
                  <>
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

                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-label text-xs text-legacy-silver">VOCÊ JÁ É CLIENTE DA BARBEARIA?</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsClient("sim")}
                      className={`flex items-center justify-center py-4 px-4 rounded-xl border transition-all duration-300 ${
                        isClient === "sim" 
                          ? "bg-legacy-warm/15 border-legacy-warm text-legacy-warm shadow-[0_0_20px_rgba(196,168,124,0.15)]" 
                          : "bg-black/40 border-white/10 text-legacy-white/80 hover:border-white/30 hover:text-legacy-white hover:bg-black/60"
                      }`}
                    >
                      <span className="text-sm font-medium">Sim, já sou cliente</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsClient("nao")}
                      className={`flex items-center justify-center py-4 px-4 rounded-xl border transition-all duration-300 ${
                        isClient === "nao" 
                          ? "bg-legacy-warm/15 border-legacy-warm text-legacy-warm shadow-[0_0_20px_rgba(196,168,124,0.15)]" 
                          : "bg-black/40 border-white/10 text-legacy-white/80 hover:border-white/30 hover:text-legacy-white hover:bg-black/60"
                      }`}
                    >
                      <span className="text-sm font-medium">Não, será a 1ª vez</span>
                    </button>
                  </div>
                </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      variant="primary"
                      className="w-full mt-4 py-6 text-sm font-bold tracking-[0.2em] bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] uppercase shadow-[0_0_30px_rgba(196,168,124,0.15)] rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "ENVIANDO..." : "FINALIZAR CADASTRO"}
                    </Button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
