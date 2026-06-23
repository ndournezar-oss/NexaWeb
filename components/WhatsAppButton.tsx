import { MessageCircle } from "lucide-react";
import { btn } from "@/lib/ui";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/site";

type WhatsAppButtonProps = {
  message?: string;
  label?: string;
  variant?: keyof typeof btn;
  className?: string;
};

/** Lien WhatsApp deep-link, ouvert dans un nouvel onglet. */
export function WhatsAppButton({
  message = defaultWhatsappMessage,
  label = "Discuter sur WhatsApp",
  variant = "primary",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btn[variant]} ${className}`}
    >
      <MessageCircle className="size-[1.1em]" aria-hidden="true" />
      {label}
    </a>
  );
}
