import { AtSign, MessageCircle, MapPin } from "lucide-react";

const LINKS = [
  {
    label: "INSTAGRAM",
    href: "https://instagram.com/legacybarber",
    icon: AtSign,
  },
  {
    label: "WHATSAPP",
    href: "https://wa.me/5584998071144",
    icon: MessageCircle,
  },
  {
    label: "LOCALIZAÇÃO",
    href: "https://maps.google.com",
    icon: MapPin,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16" role="contentinfo">
      <div className="container-legacy">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Logo */}
          <a
            href="#"
            className="heading-display text-xl text-legacy-white tracking-[0.08em] hover:text-legacy-warm transition-colors duration-300"
          >
            LEGACY BARBER
          </a>

          {/* Links */}
          <nav aria-label="Links sociais" className="flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-label text-[11px] text-legacy-silver hover:text-legacy-warm transition-colors duration-300 group"
                aria-label={link.label}
              >
                <link.icon
                  size={14}
                  strokeWidth={1.2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span className="hidden sm:inline">{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[11px] text-legacy-silver/50 tracking-wider">
            © 2026 LEGACY BARBER
          </p>
        </div>
      </div>
    </footer>
  );
}
