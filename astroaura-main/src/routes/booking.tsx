import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, MessageCircle, CreditCard, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SERVICES, WHATSAPP_LINK } from "@/lib/data";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Book a Consultation — AstroAura" },
      {
        name: "description",
        content:
          "Book your personalised astrology consultation with AstroAura. Choose a date, time slot and consultation type, then connect with an expert astrologer.",
      },
      { property: "og:title", content: "Book a Consultation | AstroAura" },
      { property: "og:description", content: "Schedule your cosmic guidance session today." },
    ],
    links: [{ rel: "canonical", href: "/booking" }],
  }),
  component: BookingPage,
});

const SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM", "06:30 PM", "08:00 PM"];
const TYPES = [
  { id: "chat", label: "Chat", desc: "Text-based session" },
  { id: "call", label: "Voice Call", desc: "Audio consultation" },
  { id: "video", label: "Video Call", desc: "Face-to-face guidance" },
];

function BookingPage() {
  const [date, setDate] = useState<Date>();
  const [slot, setSlot] = useState<string>();
  const [type, setType] = useState("video");
  const [service, setService] = useState(SERVICES[0].slug);

  const selectedService = SERVICES.find((s) => s.slug === service)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) {
      toast.error("Please select a date and time slot.");
      return;
    }
    toast.success("Consultation booked! A confirmation is on its way. ✨");
  };

  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="Book Your Consultation"
        subtitle="Reserve a private session with one of our expert astrologers in just a few steps."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:px-8 lg:grid-cols-3">
        <form onSubmit={submit} className="space-y-8 lg:col-span-2">
          {/* Service */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">1. Choose a Service</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s.slug}
                  onClick={() => setService(s.slug)}
                  className={cn(
                    "flex items-center justify-between rounded-xl border p-4 text-left transition-colors",
                    service === s.slug ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
                  )}
                >
                  <span className="text-sm font-medium">{s.title}</span>
                  <span className="text-sm text-gold">${s.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date & time */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">2. Pick Date & Time</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      autoFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-1"><Clock className="h-4 w-4" /> Time Slot</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SLOTS.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-lg border px-2 py-2 text-sm transition-colors",
                        slot === s ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/50",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Type */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">3. Consultation Type</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {TYPES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setType(t.id)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    type === t.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{t.label}</span>
                    {type === t.id && <Check className="h-4 w-4 text-gold" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-lg font-semibold">4. Your Details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" required placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bemail">Email</Label>
                <Input id="bemail" type="email" required placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required placeholder="+1 555 000 0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="notes">Your Question (optional)</Label>
                <Textarea id="notes" rows={3} placeholder="What guidance are you seeking?" />
              </div>
            </div>
          </div>
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="glass space-y-4 rounded-2xl p-6">
            <h2 className="text-lg font-semibold">Booking Summary</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Service</dt><dd className="font-medium">{selectedService.title}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd className="font-medium">{date ? format(date, "PP") : "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Time</dt><dd className="font-medium">{slot ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-medium capitalize">{type}</dd></div>
            </dl>
            <div className="flex items-center justify-between border-t border-border pt-4 text-lg font-semibold">
              <span>Total</span>
              <span className="text-gradient-gold">${selectedService.price}</span>
            </div>
            <Button type="submit" variant="gold" size="lg" className="w-full" onClick={submit}>
              <CreditCard className="h-5 w-5" /> Pay & Confirm
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Book via WhatsApp
              </a>
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Secure payment · 100% confidential · Free rescheduling
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
