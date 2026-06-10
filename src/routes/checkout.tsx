import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, ArrowRight, ShieldCheck, Sparkles, Check, CheckCircle2, Wallet, QrCode, Landmark } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — AstroAura" },
      {
        name: "description",
        content: "Complete your purchase of energised spiritual products and crystals at AstroAura.",
      },
      { property: "og:title", content: "Checkout | AstroAura" },
      { property: "og:description", content: "Complete your cosmic order securely." },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI (Paytm / GPay / PhonePe)", icon: QrCode, desc: "Scan QR code or enter UPI ID" },
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay, Amex" },
  { id: "netbanking", label: "Net Banking", icon: Landmark, desc: "Select from major Indian banks" },
  { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay with cash at your doorstep" },
];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [method, setMethod] = useState("upi");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Card states
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UPI states
  const [upiId, setUpiId] = useState("");

  // Net banking states
  const [selectedBank, setSelectedBank] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!name || !email || !phone || !address || !city || !state || !zip) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    if (method === "card" && (!cardNumber || !cardName || !cardExpiry || !cardCvv)) {
      toast.error("Please fill in all credit card details.");
      return;
    }

    if (method === "upi" && !upiId && !upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID (e.g. name@okhdfcbank).");
      return;
    }

    setLoading(true);
    toast.info("Connecting to secure payment gateway... 🔐");

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      clear();
      toast.success("Order placed successfully! May the stars guide your package. ✨");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2500);
  };

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (val: string) => {
    const clean = val.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (clean.length >= 2) {
      return clean.substring(0, 2) + "/" + clean.substring(2, 4);
    }
    return clean;
  };

  if (success) {
    const orderId = "AA-" + Math.floor(100000 + Math.random() * 900000);
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-8">
        <div className="glass flex flex-col items-center rounded-3xl p-10 md:p-16">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <CheckCircle2 className="relative h-20 w-20 text-gold" />
          </div>
          <span className="text-gradient-gold text-sm font-semibold uppercase tracking-[0.25em]">Cosmic Connection Established</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Order Confirmed!</h2>
          <p className="mt-4 text-muted-foreground">
            Thank you for shopping at AstroAura. Your order has been registered in the stars.
          </p>

          <div className="my-8 w-full border-y border-border py-6 text-left space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-semibold text-foreground">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery to</span>
              <span className="font-semibold text-foreground text-right">{name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-semibold text-foreground capitalize">{method === "cod" ? "Cash on Delivery" : method.toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-semibold text-gold">3 - 5 Business Days</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-8">
            We've sent a confirmation email with invoice details to <span className="text-foreground font-medium">{email}</span>.
          </p>

          <Button variant="gold" size="lg" className="w-full" asChild>
            <Link to="/">
              Return Home <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Secure Checkout"
        subtitle="Review your sacred items and complete your purchase securely."
      />

      {items.length === 0 ? (
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <div className="glass flex flex-col items-center rounded-2xl p-10">
            <Sparkles className="h-12 w-12 text-gold/60 animate-pulse" />
            <h3 className="mt-4 text-xl font-semibold">Your Cart is Empty</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't added any spiritual items to your cart yet.
            </p>
            <Button variant="gold" className="mt-6 w-full" asChild>
              <Link to="/shop">Explore the Shop</Link>
            </Button>
          </div>
        </div>
      ) : (
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-8 lg:grid-cols-12">
          {/* Main Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-8 lg:col-span-7">
            {/* Delivery Details */}
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-sm text-gold border border-gold/30">1</span>
                Delivery Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input
                    id="address"
                    required
                    placeholder="House/Flat No, Apartment, Street Name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        required
                        placeholder="MH"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        required
                        placeholder="400001"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass rounded-2xl p-6">
              <h2 className="mb-6 text-xl font-semibold text-foreground flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/10 text-sm text-gold border border-gold/30">2</span>
                Choose Payment Method
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = pm.icon;
                  return (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setMethod(pm.id)}
                      className={cn(
                        "rounded-xl border p-4 text-left transition-all flex items-start gap-3 relative",
                        method === pm.id
                          ? "border-gold bg-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                          : "border-border hover:border-gold/50"
                      )}
                    >
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-gold">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-semibold text-foreground block">{pm.label}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 block">{pm.desc}</span>
                      </div>
                      {method === pm.id && (
                        <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-gold-foreground">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Payment Option Views */}
              <div className="border-t border-border pt-6 mt-6">
                {/* UPI Option */}
                {method === "upi" && (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center gap-4 bg-background/50 border border-border/60 p-6 rounded-2xl text-center">
                      <div className="relative bg-white p-3 rounded-xl shadow-lg border border-gold/20">
                        {/* Interactive and elegant QR Code placeholder */}
                        <svg className="w-40 h-40 text-background" viewBox="0 0 100 100">
                          {/* Corner Squares */}
                          <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                          <rect x="9" y="9" width="12" height="12" fill="white" />
                          <rect x="12" y="12" width="6" height="6" fill="currentColor" />
                          
                          <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                          <rect x="79" y="9" width="12" height="12" fill="white" />
                          <rect x="82" y="12" width="6" height="6" fill="currentColor" />
                          
                          <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                          <rect x="9" y="79" width="12" height="12" fill="white" />
                          <rect x="12" y="82" width="6" height="6" fill="currentColor" />

                          {/* Center Spiritual Logo inside QR */}
                          <circle cx="50" cy="50" r="14" fill="currentColor" />
                          <path d="M50 42 L52 48 L58 50 L52 52 L50 58 L48 52 L42 50 L48 48 Z" fill="#D4AF37" />

                          {/* Random QR code pixels block */}
                          <rect x="35" y="10" width="8" height="4" fill="currentColor" />
                          <rect x="45" y="20" width="10" height="5" fill="currentColor" />
                          <rect x="60" y="15" width="6" height="6" fill="currentColor" />
                          <rect x="10" y="35" width="15" height="4" fill="currentColor" />
                          <rect x="30" y="30" width="8" height="8" fill="currentColor" />
                          <rect x="15" y="50" width="10" height="5" fill="currentColor" />
                          <rect x="75" y="45" width="12" height="6" fill="currentColor" />
                          <rect x="70" y="60" width="10" height="10" fill="currentColor" />
                          <rect x="35" y="75" width="12" height="4" fill="currentColor" />
                          <rect x="40" y="65" width="15" height="6" fill="currentColor" />
                          <rect x="50" y="85" width="15" height="5" fill="currentColor" />
                          <rect x="80" y="80" width="8" height="8" fill="currentColor" />
                        </svg>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        Scan this QR code using any UPI app (Paytm, GPay, PhonePe, BHIM) to make a secure payment of <span className="text-gold font-bold">₹{total}</span>.
                      </p>
                    </div>

                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-border/50"></div>
                      <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground">OR ENTER UPI ID</span>
                      <div className="flex-grow border-t border-border/50"></div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID / Virtual Payment Address (VPA)</Label>
                      <Input
                        id="upi-id"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required={method === "upi"}
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Enter your UPI ID and click "Pay & Confirm" to receive a payment request on your phone.
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Option */}
                {method === "card" && (
                  <div className="space-y-6">
                    {/* Glassmorphic Interactive Credit Card Display */}
                    <div className="flex justify-center mb-6 perspective-1000">
                      <div
                        className={cn(
                          "relative w-full max-w-[340px] h-[200px] rounded-2xl p-6 text-white shadow-2xl transition-transform duration-500 transform-style-3d",
                          focusedField === "cvv" ? "rotate-y-180" : ""
                        )}
                      >
                        {/* Front Side */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900/95 to-gold/20 border border-white/10 backdrop-blur-md backface-hidden flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">AstroAura card</span>
                            <div className="h-6 w-9 rounded bg-white/20 border border-white/10 flex items-center justify-center font-bold text-[10px]">VISA</div>
                          </div>

                          <div className="h-8 w-11 rounded-md bg-gradient-to-br from-yellow-300 to-amber-500 border border-amber-300 opacity-80 my-3 relative overflow-hidden">
                            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-800" />
                            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-800" />
                          </div>

                          <div className="text-lg md:text-xl font-mono tracking-[0.15em] text-white">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>

                          <div className="flex justify-between items-end mt-2">
                            <div>
                              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Card Holder</span>
                              <span className="text-xs font-medium tracking-wide block truncate max-w-[180px]">{cardName.toUpperCase() || "YOUR NAME"}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] uppercase tracking-wider text-white/50 block">Expires</span>
                              <span className="text-xs font-medium tracking-wide block">{cardExpiry || "MM/YY"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Back Side */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-white/10 backface-hidden rotate-y-180 flex flex-col justify-between py-6">
                          <div className="h-10 w-full bg-slate-950 opacity-90" />
                          <div className="px-6 space-y-1">
                            <div className="flex justify-end pr-2">
                              <span className="text-[8px] uppercase tracking-wider text-white/40">Authorized Signature</span>
                            </div>
                            <div className="h-8 bg-slate-700/50 rounded flex items-center justify-end px-3 font-mono text-sm tracking-wider text-white border border-slate-700">
                              {cardCvv || "•••"}
                            </div>
                          </div>
                          <div className="px-6 text-[8px] text-white/30 text-center font-mono">
                            SECURE COSMIC ENCRYPTION KEY 256-BIT
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          onFocus={() => setFocusedField("number")}
                          onBlur={() => setFocusedField(null)}
                          required={method === "card"}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="card-name">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="NAME ON CARD"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required={method === "card"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-expiry">Expiry Date</Label>
                        <Input
                          id="card-expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          onFocus={() => setFocusedField("expiry")}
                          onBlur={() => setFocusedField(null)}
                          required={method === "card"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input
                          id="card-cvv"
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ""))}
                          onFocus={() => setFocusedField("cvv")}
                          onBlur={() => setFocusedField(null)}
                          required={method === "card"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Option */}
                {method === "netbanking" && (
                  <div className="space-y-4">
                    <Label htmlFor="bank-select">Select Your Bank</Label>
                    <select
                      id="bank-select"
                      required={method === "netbanking"}
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">-- Select Bank --</option>
                      <option value="sbi">State Bank of India (SBI)</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="pnb">Punjab National Bank (PNB)</option>
                    </select>
                    <p className="text-[11px] text-muted-foreground">
                      You will be redirected to your bank's secure page to complete the transaction.
                    </p>
                  </div>
                )}

                {/* COD Option */}
                {method === "cod" && (
                  <div className="bg-background/40 border border-border/60 p-4 rounded-xl space-y-2">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                      <Wallet className="h-4 w-4 text-gold" /> Cash on Delivery (COD) Enabled
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      An additional fee of <span className="text-gold font-bold">₹49</span> applies to Cash on Delivery orders. You can pay with cash or scanning the delivery agent's UPI QR code upon arrival.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Sidebar Order Summary */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit">
            <div className="glass space-y-6 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
              
              <div className="divide-y divide-border overflow-y-auto max-h-[220px] pr-2 space-y-3">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-3 py-3 items-center first:pt-0">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover border border-border" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold text-foreground block truncate">{item.name}</span>
                      <span className="text-xs text-muted-foreground mt-0.5 block">Qty: {item.qty}</span>
                    </div>
                    <span className="text-sm font-bold text-gold">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-gold">{total >= 1500 ? "FREE" : "₹99"}</span>
                </div>
                {method === "cod" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">COD Charge</span>
                    <span className="font-medium text-foreground">₹49</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gradient-gold">
                    ₹{total + (total >= 1500 ? 0 : 99) + (method === "cod" ? 49 : 0)}
                  </span>
                </div>
              </div>

              <div className="bg-background/30 rounded-xl p-4 border border-border/50 space-y-3">
                <div className="flex gap-2.5 items-start text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-foreground font-semibold block">Secure Cosmic Encryption</span>
                    Your personal information is secure and fully confidential.
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-gold-foreground" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Payment...
                  </span>
                ) : (
                  <>
                    Place Order & Pay <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground" asChild>
                <Link to="/shop">← Back to Shop</Link>
              </Button>
            </div>
          </aside>
        </section>
      )}
    </>
  );
}
