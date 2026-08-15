"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const phoneNumber = "5584998071144";
  const message = "Olá! Vim pelo site da Legacy Barber e gostaria de agendar um horário.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 lg:hidden flex items-center gap-3 bg-[#25D366] rounded-full pl-5 pr-4 py-3 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] active:scale-95 transition-all"
      aria-label="Falar no WhatsApp"
    >
      <span className="text-white text-xs font-bold tracking-wide whitespace-nowrap">Agende pelo WhatsApp</span>
      <MessageCircle size={22} className="text-white" fill="white" />
    </motion.a>
  );
}
