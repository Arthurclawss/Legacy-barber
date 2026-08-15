"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("legacy_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("legacy_cookie_consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6"
        >
          <div className="max-w-6xl mx-auto bg-legacy-black/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-legacy-white font-bold mb-1">Nós respeitamos sua privacidade</h3>
              <p className="text-legacy-silver text-xs lg:text-sm">
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência em nosso site, 
                personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, você concorda com a nossa 
                política de privacidade.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <Button 
                variant="primary" 
                onClick={acceptCookies}
                className="w-full md:w-auto text-xs px-8"
              >
                ACEITAR COOKIES
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
