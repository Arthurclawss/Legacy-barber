"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/booking-modal";

const NAV_LINKS = [
  { label: "SERVIÇOS", href: "#servicos" },
  { label: "EXPERIÊNCIA", href: "#experiencia" },
  { label: "GALERIA", href: "#galeria" },
  { label: "CONTATO", href: "#contato" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navHeight = useTransform(scrollY, [0, 100], [80, 64]);
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]
  );
  const navBlur = useTransform(scrollY, [0, 100], [0, 16]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        style={{
          height: navHeight,
          backgroundColor: navBg,
          backdropFilter: useTransform(navBlur, (v) => `blur(${v}px)`),
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(255,255,255,${v})`
          ),
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-transparent"
      >
        <div className="container-legacy flex items-center justify-between w-full">
          {/* Logo */}
          <a
            href="#"
            className="heading-display text-2xl text-legacy-white tracking-[0.08em] hover:text-legacy-warm transition-colors duration-300"
            aria-label="Legacy Barber - Voltar ao topo"
          >
            LEGACY BARBER
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-label text-legacy-silver text-xs font-semibold tracking-[0.1em] hover:text-legacy-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-legacy-warm transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Button 
              onClick={() => setBookingOpen(true)}
              variant="primary" 
              className="bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] shadow-[0_0_20px_rgba(196,168,124,0.2)] hover:shadow-[0_0_30px_rgba(196,168,124,0.4)] transition-all font-bold tracking-widest text-sm h-11 px-8 rounded-sm !py-0"
            >
              AGENDAR
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-legacy-white p-2 hover:text-legacy-warm transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-legacy-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                className="heading-display text-4xl text-legacy-white hover:text-legacy-warm transition-colors duration-300"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                delay: NAV_LINKS.length * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <Button 
                onClick={() => { setMobileOpen(false); setBookingOpen(true); }}
                variant="primary" 
                size="lg"
                className="bg-legacy-warm text-legacy-black hover:bg-[#d8bd96] shadow-[0_0_20px_rgba(196,168,124,0.2)] font-bold tracking-widest rounded-sm px-10 h-14"
              >
                AGENDAR HORÁRIO
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
