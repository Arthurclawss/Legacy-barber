import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEGACY BARBER — Seu Estilo Começa Aqui",
  description:
    "Cortes precisos, presença marcante. Uma experiência criada para quem exige mais. Barbearia premium em Natal - RN.",
  keywords: [
    "barbearia",
    "barber",
    "corte masculino",
    "barba",
    "Natal RN",
    "barbearia premium",
    "Legacy Barber",
  ],
  openGraph: {
    title: "LEGACY BARBER — Seu Estilo Começa Aqui",
    description:
      "Cortes precisos, presença marcante. Uma experiência criada para quem exige mais.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} antialiased`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
