import { WHATSAPP_LINK } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[oklch(0.72_0.17_150)] text-white shadow-lg transition-transform hover:scale-110 animate-float-slow"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
