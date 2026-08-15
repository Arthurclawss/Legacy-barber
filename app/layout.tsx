import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Analytics } from "@/components/analytics";
import { CookieBanner } from "@/components/cookie-banner";
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
    url: "https://legacy-barber.vercel.app", // Altere para o domínio real
    siteName: "Legacy Barber",
    images: [
      {
        url: "/images/hero-after.jpg", // Imagem que aparece ao compartilhar
        width: 1200,
        height: 630,
        alt: "Legacy Barber Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LEGACY BARBER — Seu Estilo Começa Aqui",
    description: "Uma experiência criada para quem exige mais.",
    images: ["/images/hero-after.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${inter.variable} antialiased`}
    >
      <body>
        <Analytics />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieBanner />
      </body>
    </html>
  );
}
