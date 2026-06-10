import rudraksha from "@/assets/product-rudraksha.jpg";
import sapphire from "@/assets/product-sapphire.jpg";
import evileye from "@/assets/product-evileye.jpg";
import yantra from "@/assets/product-yantra.jpg";
import crystals from "@/assets/product-crystals.jpg";
import pendant from "@/assets/product-pendant.jpg";
import astro1 from "@/assets/astro-1.jpg";
import astro2 from "@/assets/astro-2.jpg";
import astro3 from "@/assets/astro-3.jpg";
import astro4 from "@/assets/astro-4.jpg";

export const ZODIAC_SIGNS = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth" },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water" },
];

export const HOROSCOPES: Record<string, string> = {
  Aries: "A bold opportunity arrives today. Trust your instincts and lead with courage.",
  Taurus: "Stability brings abundance. Focus on what truly grounds your spirit.",
  Gemini: "Conversations open new doors. Speak your truth with clarity and grace.",
  Cancer: "Emotional healing flows your way. Nurture yourself and your loved ones.",
  Leo: "Your radiance attracts admiration. Shine without fear of being seen.",
  Virgo: "Details align in your favour. A patient mind unlocks hidden answers.",
  Libra: "Harmony returns to your relationships. Seek balance over perfection.",
  Scorpio: "Transformation is calling. Release the old to welcome powerful renewal.",
  Sagittarius: "Adventure beckons your soul. Follow the path that expands your horizons.",
  Capricorn: "Discipline meets destiny. Your steady efforts bear golden fruit.",
  Aquarius: "Innovation sparks within. Your unique vision inspires those around you.",
  Pisces: "Intuition runs deep today. Let your dreams guide your next sacred step.",
};

export interface Service {
  slug: string;
  title: string;
  icon: string;
  description: string;
  price: number;
}

export const SERVICES: Service[] = [
  { slug: "kundli", title: "Kundli Reading", icon: "ScrollText", description: "A complete birth-chart analysis revealing your life path, strengths and karmic lessons.", price: 49 },
  { slug: "tarot", title: "Tarot Reading", icon: "Sparkles", description: "Ancient card wisdom to illuminate your present questions and future possibilities.", price: 39 },
  { slug: "career", title: "Career Guidance", icon: "Briefcase", description: "Align your professional journey with planetary timing for growth and success.", price: 59 },
  { slug: "love", title: "Love & Relationship", icon: "Heart", description: "Understand your emotional patterns and attract harmonious, lasting connections.", price: 55 },
  { slug: "marriage", title: "Marriage Compatibility", icon: "HeartHandshake", description: "Detailed Kundli matching and guna milan for a blessed, balanced union.", price: 69 },
  { slug: "numerology", title: "Numerology", icon: "Hash", description: "Decode the vibration of your name and birth numbers to unlock your potential.", price: 35 },
  { slug: "palm", title: "Palm Reading", icon: "Hand", description: "Read the sacred lines of your palm to reveal destiny written in your hands.", price: 29 },
  { slug: "vastu", title: "Vastu Consultation", icon: "Home", description: "Harmonise your home and workspace energies for prosperity and peace.", price: 79 },
];

export interface Astrologer {
  name: string;
  image: string;
  experience: number;
  specialization: string;
  languages: string[];
  rating: number;
  price: number;
}

export const ASTROLOGERS: Astrologer[] = [
  { name: "Pandit Arjun Sharma", image: astro1, experience: 22, specialization: "Vedic Astrology & Kundli", languages: ["Hindi", "English", "Sanskrit"], rating: 4.9, price: 49 },
  { name: "Maya Celeste", image: astro2, experience: 14, specialization: "Tarot & Intuitive Reading", languages: ["English", "French"], rating: 4.8, price: 55 },
  { name: "Acharya David Rune", image: astro3, experience: 18, specialization: "Numerology & Remedies", languages: ["English", "German"], rating: 4.7, price: 45 },
  { name: "Sana Kapoor", image: astro4, experience: 9, specialization: "Love & Relationship Astrology", languages: ["Hindi", "English", "Punjabi"], rating: 4.9, price: 52 },
];

export interface Product {
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  { slug: "rudraksha-mala", name: "Rudraksha Mala", image: rudraksha, price: 39, oldPrice: 59, rating: 4.8, reviews: 214, tag: "Bestseller" },
  { slug: "blue-sapphire", name: "Blue Sapphire (Neelam)", image: sapphire, price: 299, oldPrice: 399, rating: 4.9, reviews: 87, tag: "Certified" },
  { slug: "evil-eye-bracelet", name: "Evil Eye Bracelet", image: evileye, price: 24, oldPrice: 34, rating: 4.7, reviews: 412 },
  { slug: "wealth-yantra", name: "Wealth Yantra", image: yantra, price: 45, rating: 4.8, reviews: 156, tag: "Energised" },
  { slug: "healing-crystals", name: "Healing Crystal Set", image: crystals, price: 64, oldPrice: 89, rating: 4.9, reviews: 178 },
  { slug: "zodiac-pendant", name: "Zodiac Gold Pendant", image: pendant, price: 79, rating: 4.6, reviews: 93, tag: "New" },
];

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  { name: "Priya M.", location: "Mumbai", text: "The Kundli reading was astonishingly accurate. It gave me clarity I'd been seeking for years.", rating: 5 },
  { name: "James R.", location: "London", text: "Maya's tarot session was deeply healing. I felt truly seen and guided toward my next chapter.", rating: 5 },
  { name: "Aisha K.", location: "Dubai", text: "The marriage compatibility report was detailed and reassuring. Highly recommend AstroAura.", rating: 5 },
  { name: "Daniel S.", location: "New York", text: "Professional, mystical and trustworthy. The remedies actually shifted my energy and luck.", rating: 5 },
];

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  { slug: "weekly-horoscope", title: "Your Weekly Horoscope: Cosmic Currents Ahead", category: "Horoscope", excerpt: "Discover what the planets have aligned for each zodiac sign this week and how to flow with the energy.", date: "Jun 5, 2026", readTime: "6 min" },
  { slug: "zodiac-compatibility", title: "Zodiac Compatibility: Who Is Your Cosmic Match?", category: "Compatibility", excerpt: "A guide to understanding which signs harmonise, clash and complement your unique energy.", date: "May 28, 2026", readTime: "8 min" },
  { slug: "spiritual-healing", title: "7 Spiritual Healing Rituals for Inner Peace", category: "Healing", excerpt: "Simple daily practices using crystals, mantras and meditation to cleanse and restore your aura.", date: "May 20, 2026", readTime: "5 min" },
  { slug: "astrology-remedies", title: "Powerful Astrology Remedies for Prosperity", category: "Remedies", excerpt: "Time-tested Vedic remedies, gemstones and yantras to attract abundance into your life.", date: "May 12, 2026", readTime: "7 min" },
  { slug: "mercury-retrograde", title: "Surviving Mercury Retrograde with Grace", category: "Horoscope", excerpt: "What retrograde really means and the mindful habits that keep you grounded through it.", date: "May 3, 2026", readTime: "4 min" },
  { slug: "moon-rituals", title: "Full Moon Rituals to Manifest Your Desires", category: "Healing", excerpt: "Harness the powerful energy of the full moon to set intentions and release what no longer serves you.", date: "Apr 25, 2026", readTime: "6 min" },
];

export const FAQS = [
  { q: "How accurate are the astrology readings?", a: "Our astrologers combine decades of Vedic and Western expertise with your precise birth details to deliver highly personalised, insightful guidance." },
  { q: "How do online consultations work?", a: "After booking, you'll receive a confirmation with your session link. Connect via chat, call or video at your chosen time slot — from anywhere in the world." },
  { q: "Are the gemstones and products authentic?", a: "Absolutely. Every gemstone is lab-certified and each spiritual product is energised by our astrologers before dispatch." },
  { q: "Is my personal information kept private?", a: "Your privacy is sacred to us. All birth details and consultations are fully confidential and securely stored." },
  { q: "What if I'm new to astrology?", a: "Perfect — our astrologers explain everything in simple, compassionate language so you leave every session feeling clear and empowered." },
];

export const WHATSAPP_NUMBER = "15551234567";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi AstroAura, I'd like to book a consultation.")}`;
