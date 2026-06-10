import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WHATSAPP_LINK } from "@/lib/data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact AstroAura — Get in Touch" },
      {
        name: "description",
        content:
          "Have questions about astrology readings or spiritual products? Contact the AstroAura team by email, phone or WhatsApp.",
      },
      { property: "og:title", content: "Contact AstroAura" },
      { property: "og:description", content: "Reach our team for guidance and support." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const INFO = [
  { icon: Mail, label: "Email", value: "hello@astroaura.com" },
  { icon: Phone, label: "Phone", value: "+1 555 123 4567" },
  { icon: MapPin, label: "Address", value: "Cosmic Lane, Starlight City" },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reach Out"
        title="Contact Us"
        subtitle="We'd love to hear from you. Send a message and our cosmic team will respond swiftly."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:px-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Let's Connect</h2>
          <p className="text-muted-foreground">
            Whether you're seeking guidance, have a question about a product, or simply want to say
            hello — we're here for you under the same stars.
          </p>
          <ul className="space-y-4">
            {INFO.map((i) => (
              <li key={i.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-aura)] text-gold ring-1 ring-gold/30">
                  <i.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{i.label}</p>
                  <p className="font-medium">{i.value}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="lg" asChild>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </Button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent! We'll be in touch soon. ✨");
            (e.target as HTMLFormElement).reset();
          }}
          className="glass space-y-5 rounded-2xl p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="How can we help?" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" required rows={5} placeholder="Write your message…" />
          </div>
          <Button type="submit" variant="gold" size="lg" className="w-full">
            Send Message <Send className="h-4 w-4" />
          </Button>
        </form>
      </section>
    </>
  );
}
