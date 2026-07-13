import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Quote,
  Sparkles,
  Heart,
} from "lucide-react";

/* =========================================================================
   Fleur & COM. — premium wedding & event planning landing page
   Single-file React component. Home page only.
   ========================================================================= */

/* ---------- small utility hook: reveal-on-scroll ---------- */
function useReveal(options = {}): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.18, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, visible];
}

/* ---------- the signature element: a hand-drawn gold garland
   that threads down the page and "draws" itself as you scroll ---------- */
function GarlandSpine() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = prefersReduced ? 1 : scrolled / Math.max(total, 1);
      path.style.strokeDashoffset = `${len * (1 - pct)}`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="garland-wrap" ref={wrapRef} aria-hidden="true">
      <svg
        className="garland-svg"
        viewBox="0 0 120 3200"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M60 0
             C 20 120, 100 220, 60 340
             C 20 460, 100 560, 60 680
             C 20 800, 100 900, 60 1020
             C 20 1140, 100 1240, 60 1360
             C 20 1480, 100 1580, 60 1700
             C 20 1820, 100 1920, 60 2040
             C 20 2160, 100 2260, 60 2380
             C 20 2500, 100 2600, 60 2720
             C 20 2840, 100 2940, 60 3060
             C 20 3140, 100 3160, 60 3200"
          stroke="url(#garlandGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="garlandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C6A15B" />
            <stop offset="50%" stopColor="#E4C98A" />
            <stop offset="100%" stopColor="#C6A15B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ============================== NAV ==================================== */
function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Celebrations" },
    { href: "#process", label: "The Journey" },
    { href: "#gallery", label: "Moodboard" },
    { href: "#packages", label: "Packages" },
    { href: "#contact", label: "Enquire" },
  ];

  return (
    <header className={`nav ${solid ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__mark">
          <Heart size={16} strokeWidth={1.6} />
          <span>Fleur&nbsp;&amp;&nbsp;Com.</span>
        </a>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta">
          Begin your story
        </a>

        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className={`nav__mobile ${open ? "is-open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav__mobile-cta" onClick={() => setOpen(false)}>
          Begin your story <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}

/* ============================== HERO ==================================== */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grain" aria-hidden="true" />

      <p className="hero__eyebrow">
        <Sparkles size={13} strokeWidth={1.6} />
        Bengaluru&nbsp;·&nbsp;Destination&nbsp;·&nbsp;Bespoke, since 2013
      </p>

      <h1 className="hero__title">
        Every <em>“I do”</em>
        <br />
        deserves its own
        <br />
        <span className="hero__title-gold">language.</span>
      </h1>

      <p className="hero__sub">
        Fleur &amp; Com. designs and directs full-scale weddings and private
        celebrations — from a Coorg estate to a Tuscan courtyard — so the only
        thing you plan on the day itself is what to feel.
      </p>

      <div className="hero__actions">
        <a href="#contact" className="btn btn--gold">
          Reserve a consultation <ArrowRight size={16} />
        </a>
        <a href="#gallery" className="btn btn--ghost">
          See our celebrations
        </a>
      </div>

      <div className="hero__stats">
        <div>
          <span className="hero__stats-num">180+</span>
          <span className="hero__stats-label">Weddings directed</span>
        </div>
        <div className="hero__stats-div" />
        <div>
          <span className="hero__stats-num">14</span>
          <span className="hero__stats-label">Countries hosted</span>
        </div>
        <div className="hero__stats-div" />
        <div>
          <span className="hero__stats-num">4.9/5</span>
          <span className="hero__stats-label">Average client rating</span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span />
        scroll
      </div>
    </section>
  );
}

/* ============================== MARQUEE ================================= */
function Marquee() {
  const words = [
    "Udaipur",
    "Goa",
    "Coorg",
    "Tuscany",
    "Bengaluru",
    "Alibaug",
    "Jaipur",
    "Bali",
    "Santorini",
    "Chikkamagaluru",
  ];
  const row = [...words, ...words];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {row.map((w, i) => (
          <span key={i} className="marquee__item">
            {w}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================== MANIFESTO ================================ */
function Manifesto() {
  const [ref, visible] = useReveal();
  return (
    <section className="manifesto" ref={ref}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow eyebrow--dark">Our Philosophy</span>
        <p className="manifesto__text">
          We don't decorate weddings. We <em>direct</em> them — the sightline
          from the mandap, the pause before the first look, the exact minute
          the lights should dim. Design is only the surface; what our clients
          are really paying for is the certainty that nothing will be left to
          chance on the one day it matters most.
        </p>
        <div className="manifesto__sign">— Meera Rao, Founder &amp; Creative Director</div>
      </div>
    </section>
  );
}

/* ============================== SERVICES ================================= */
const SERVICES = [
  {
    title: "Full Wedding Planning",
    copy:
      "End-to-end direction across every function — from the first mehendi sketch to the last dance. One team, one vision, zero loose threads.",
    tag: "Most booked",
  },
  {
    title: "Destination Weddings",
    copy:
      "Estates in Coorg, palaces in Udaipur, villas on the Amalfi coast. We scout, negotiate and manage logistics across borders and time zones.",
    tag: "3–5 day itineraries",
  },
  {
    title: "Décor & Set Design",
    copy:
      "Custom mandaps, floral architecture and lighting design built from scratch for your venue — never a rented template.",
    tag: "Bespoke builds",
  },
  {
    title: "Day-of Coordination",
    copy:
      "Already planned it yourself? We take the reins two weeks out and run the day with a floor manager, run-sheet and vendor command centre.",
    tag: "For the independent couple",
  },
];

function Services() {
  const [ref, visible] = useReveal();
  return (
    <section className="services" id="services" ref={ref as React.Ref<HTMLDivElement>}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">Signature Celebrations</span>
        <h2 className="section-title">
          Choose how much of the day you'd like to hand over.
        </h2>
      </div>

      <div className="services__grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} data={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ data, index }: { data: (typeof SERVICES)[0]; index: number }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`service-card reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span className="service-card__tag">{data.tag}</span>
      <h3>{data.title}</h3>
      <p>{data.copy}</p>
      <a href="#contact" className="service-card__link">
        Explore this path <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

/* ============================== PROCESS ================================== */
const STEPS = [
  {
    n: "01",
    title: "The Conversation",
    copy: "A two-hour sit-down to hear your story, your families, and the feeling you want the day to leave behind.",
  },
  {
    n: "02",
    title: "The Concept",
    copy: "A moodboard, a budget architecture and a venue shortlist — presented before a single vendor is contacted.",
  },
  {
    n: "03",
    title: "The Build",
    copy: "Décor fabrication, vendor contracts, guest logistics and travel — all managed on a shared timeline you can see.",
  },
  {
    n: "04",
    title: "The Rehearsal",
    copy: "A full walkthrough with every vendor, one week out, down to the minute the phera begins.",
  },
  {
    n: "05",
    title: "The Day",
    copy: "A floor team of six to twelve, invisible in the photographs and everywhere it matters.",
  },
];

function Process() {
  const [ref, visible] = useReveal();
  return (
    <section className="process" id="process" ref={ref}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">The Journey</span>
        <h2 className="section-title">
          Five stages. One point of contact, start to finish.
        </h2>
      </div>

      <ol className="process__list">
        {STEPS.map((s, i) => (
          <ProcessStep key={s.n} step={s} index={i} />
        ))}
      </ol>
    </section>
  );
}

function ProcessStep({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const [ref, visible] = useReveal();
  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      className={`process__step reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span className="process__num">{step.n}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.copy}</p>
      </div>
    </li>
  );
}

/* ============================== GALLERY (moodboard, with hover animation) =========== */
const SWATCHES = [
  { 
    label: "Marigold & Brass", 
    sub: "Haldi",
    image: "https://i.pinimg.com/originals/26/54/87/26548704bca2725f49f708323299951c.jpg",
    grad: "linear-gradient(135deg, rgba(232,169,59,0.9), rgba(198,116,42,0.9))" 
  },
  { 
    label: "Ivory & Antique Gold", 
    sub: "Pheras", 
    image: "https://i.pinimg.com/1200x/0c/a4/ef/0ca4ef3bffc41275663f7997220092b8.jpg",
    grad: "linear-gradient(135deg, rgba(243,236,216,0.9), rgba(198,161,91,0.9))" 
  },
  { 
    label: "Wine & Champagne", 
    sub: "Reception", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiVBgS64ONkGFCAKFHAH5k3qWBdk-Sv7RF_ZbLVYAf0Q&s=10",
    grad: "linear-gradient(135deg, rgba(107,30,43,0.9), rgba(176,141,87,0.9))" 
  },
  { 
    label: "Dusk Rose & Silver", 
    sub: "Sangeet", 
    image: "https://i.pinimg.com/1200x/b5/e4/9c/b5e49c4d9689d52af22b1138d495a1b9.jpg",
    grad: "linear-gradient(135deg, rgba(216,167,160,0.9), rgba(140,140,140,0.9))" 
  },
  { 
    label: "Bottle Green & Gold", 
    sub: "Mandap", 
    image: "https://i.pinimg.com/1200x/03/d3/c6/03d3c6aacf3410dd8f4936b46e3208d5.jpg",
    grad: "linear-gradient(135deg, rgba(27,58,47,0.9), rgba(198,161,91,0.9))" 
  },
  { 
    label: "Blush & Pearl", 
    sub: "Mehendi", 
    image: "https://i.pinimg.com/1200x/dd/31/33/dd31330c8cb43a01543705fb80bac6cd.jpg",
    grad: "linear-gradient(135deg, rgba(240,217,211,0.9), rgba(255,253,248,0.9))" 
  },
];

function Gallery() {
  const [ref, visible] = useReveal();
  return (
    <section className="gallery" id="gallery" ref={ref as unknown as React.RefObject<HTMLDivElement>}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">Moodboard</span>
        <h2 className="section-title">
          Palettes we've built celebrations around.
        </h2>
      </div>
      <div className="gallery__grid">
        {SWATCHES.map((s, i) => (
          <SwatchCard key={s.label} data={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function SwatchCard({ data, index }: { data: { label: string; sub: string; image: string; grad: string }; index: number }) {
  const [ref, visible] = useReveal();
  
  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={`swatch reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      {/* Background Image Layer */}
      <div 
        className="swatch__bg" 
        style={{ backgroundImage: `url(${data.image})` }}
      />
      
      {/* Color Overlay Layer */}
      <div 
        className="swatch__overlay" 
        style={{ background: data.grad }}
      />

      {/* Content Layer */}
      <div className="swatch__content">
        <span className="swatch__sub">{data.sub}</span>
        <span className="swatch__label">{data.label}</span>
      </div>
    </div>
  );
}

/* ============================== TESTIMONIALS ============================= */
const QUOTES = [
  {
    quote:
      "They ran a 400-guest wedding across three venues and I never once saw them look worried. That's the whole review.",
    name: "Ananya & Rohan",
    place: "Udaipur, 2025",
  },
  {
    quote:
      "My mother stopped micromanaging by day two of the wedding week. I didn't think that was possible.",
    name: "Kavya & Arjun",
    place: "Coorg, 2024",
  },
  {
    quote:
      "We changed our minds on the mandap design nine days out. They rebuilt it without telling us how hard that was.",
    name: "Priya & Sanjay",
    place: "Bengaluru, 2025",
  },
];

function Testimonials() {
  const [ref, visible] = useReveal();
  return (
    <section className="testimonials" ref={ref}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow eyebrow--gold">In Their Words</span>
      </div>
      <div className="testimonials__grid">
        {QUOTES.map((q, i) => (
          <TestimonialCard key={q.name} data={q} index={i} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ data, index }: { data: { quote: string; name: string; place: string }; index: number }) {
  const [ref, visible] = useReveal();
  return (
    <figure
      ref={ref}
      className={`testimonial reveal ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Quote size={20} strokeWidth={1.4} className="testimonial__mark" />
      <blockquote>{data.quote}</blockquote>
      <figcaption>
        <span>{data.name}</span>
        <span className="testimonial__place">{data.place}</span>
      </figcaption>
    </figure>
  );
}

/* ============================== PACKAGES ================================= */
const PACKAGES = [
  {
    name: "Intimate",
    price: "₹9L onward",
    desc: "For celebrations under 150 guests, one venue, one unforgettable evening.",
    features: ["Single point of contact", "Décor & floral direction", "Day-of coordination team", "Vendor curation (3 categories)"],
  },
  {
    name: "Celebration",
    price: "₹28L onward",
    desc: "The full multi-function wedding — haldi to reception — planned and run end to end.",
    features: ["Everything in Intimate", "Full event planning, 4–6 functions", "Custom set design & fabrication", "Guest travel & logistics desk", "On-site team of 6–10"],
    featured: true,
  },
  {
    name: "Grand & Destination",
    price: "Bespoke",
    desc: "Multi-day, multi-venue, multi-country. Built from a blank page around your family.",
    features: ["Everything in Celebration", "International venue sourcing", "Dedicated production office", "On-site team of 12+"],
  },
];

function Packages() {
  const [ref, visible] = useReveal();
  return (
    <section className="packages" id="packages" ref={ref}>
      <div className={`reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">Investment</span>
        <h2 className="section-title">
          Three ways to begin. Every quote is tailored after we meet.
        </h2>
      </div>
      <div className="packages__grid">
        {PACKAGES.map((p) => (
          <div key={p.name} className={`package ${p.featured ? "package--featured" : ""}`}>
            {p.featured && <span className="package__badge">Most chosen</span>}
            <h3>{p.name}</h3>
            <div className="package__price">{p.price}</div>
            <p className="package__desc">{p.desc}</p>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#contact" className={`btn ${p.featured ? "btn--gold" : "btn--outline"}`}>
              Enquire
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================== CONTACT / CTA ============================ */
function Contact() {
  const [ref, visible] = useReveal();
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`contact__inner reveal ${visible ? "is-visible" : ""}`}>
        <div className="contact__copy">
          <span className="eyebrow eyebrow--gold">Begin Your Story</span>
          <h2 className="contact__title">
            Tell us your date. <br /> We'll take it from there.
          </h2>
          <p>
            Consultations are limited to eight new weddings per quarter, so we
            can give each one the attention it deserves.
          </p>

          <div className="contact__details">
            <a href="tel:+919876543210">
              <Phone size={16} strokeWidth={1.6} /> +91 98765 43210
            </a>
            <a href="mailto:hello@Fleurco.in">
              <Mail size={16} strokeWidth={1.6} /> hello@Fleurco.in
            </a>
            <span>
              <MapPin size={16} strokeWidth={1.6} /> Indiranagar, Bengaluru
            </span>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="contact__success">
              <Sparkles size={22} strokeWidth={1.4} />
              <h3>Received, with joy.</h3>
              <p>We'll write back within one business day to schedule your consultation.</p>
            </div>
          ) : (
            <>
              <label>
                Your names
                <input type="text" placeholder="e.g. Ananya & Rohan" required />
              </label>
              <label>
                Wedding date <span>(or a season, if not fixed)</span>
                <input type="text" placeholder="e.g. February 2027" required />
              </label>
              <label>
                Guest count
                <input type="text" placeholder="e.g. 250" />
              </label>
              <label>
                A little about your vision
                <textarea rows={3} placeholder="Venue in mind, must-have moments, anything at all..." />
              </label>
              <button type="submit" className="btn btn--gold btn--block">
                Send enquiry <ArrowRight size={16} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

/* ============================== FOOTER ==================================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <a href="#top" className="nav__mark">
          <Heart size={16} strokeWidth={1.6} />
          <span>Fleur&nbsp;&amp;&nbsp;Co.</span>
        </a>
        <a href="#" aria-label="Instagram" className="footer__social">
          <Instagram size={18} strokeWidth={1.6} />
        </a>
      </div>
      <p className="footer__tag">Wedding &amp; event direction, built around your family — Bengaluru &amp; worldwide.</p>
      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Fleur &amp; Com. Wedding Studio.</span>
        <span>
    Crafted with{" "}
    <a
      href="https://www.linkedin.com/in/anmolmishra09/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Anmol Mishra
    </a>
  </span>
      </div>
    </footer>
  );
}

/* ============================== ROOT ====================================== */
export default function WeddingPlannerLanding() {
  return (
    <div className="apw">
      <Style />
      <GarlandSpine />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <Process />
        <Gallery />
        <Testimonials />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ============================== STYLES ===================================== */
function Style() {
  return (
    <style>{`
      .apw {
        --ink-green: #1B3A2F;
        --ink-green-deep: #122820;
        --ivory: #F6F1E7;
        --ivory-dim: #EFE8D8;
        --gold: #C6A15B;
        --gold-light: #E4C98A;
        --wine: #6B1E2B;
        --rose: #D8A7A0;
        --charcoal: #22201B;
        --charcoal-soft: #4A463D;

        --display: 'Fraunces', 'Iowan Old Style', 'Palatino Linotype', serif;
        --body: 'Manrope', 'Segoe UI', sans-serif;

        font-family: var(--body);
        color: var(--charcoal);
        background: var(--ivory);
        position: relative;
        overflow-x: clip;
      }

      .apw *, .apw *::before, .apw *::after { box-sizing: border-box; }

      .apw a { text-decoration: none; color: inherit; }
      .apw ul, .apw ol { list-style: none; margin: 0; padding: 0; }
      .apw button { font-family: inherit; cursor: pointer; }
      .apw input, .apw textarea { font-family: inherit; }

      .apw :focus-visible {
        outline: 2px solid var(--gold);
        outline-offset: 3px;
      }

      /* ---------- reveal-on-scroll ---------- */
      .reveal {
        opacity: 0;
        transform: translateY(22px);
        transition: opacity 0.8s cubic-bezier(.2,.7,.2,1), transform 0.8s cubic-bezier(.2,.7,.2,1);
      }
      .reveal.is-visible { opacity: 1; transform: translateY(0); }

      /* ---------- garland spine (signature element) ---------- */
      .garland-wrap {
        position: absolute;
        top: 720px;
        left: 18px;
        width: 40px;
        height: 3200px;
        pointer-events: none;
        z-index: 1;
        display: none;
      }
      @media (min-width: 1180px) {
        .garland-wrap { display: block; }
      }
      .garland-svg { width: 100%; height: 100%; }

      /* ---------- eyebrows / section titles ---------- */
      .eyebrow {
        display: inline-block;
        font-family: var(--body);
        font-size: 12px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--wine);
        font-weight: 700;
        margin-bottom: 18px;
      }
      .eyebrow--dark { color: var(--gold-light); }
      .eyebrow--gold { color: var(--gold); }

      .section-title {
        font-family: var(--display);
        font-weight: 500;
        font-size: clamp(28px, 3.6vw, 44px);
        line-height: 1.15;
        max-width: 720px;
        color: var(--charcoal);
        margin: 0 0 56px;
      }

      /* ---------- buttons ---------- */
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 15px 28px;
        border-radius: 999px;
        font-size: 14.5px;
        font-weight: 600;
        letter-spacing: 0.01em;
        transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        border: 1px solid transparent;
        white-space: nowrap;
      }
      .btn--gold {
        background: linear-gradient(135deg, var(--gold-light), var(--gold));
        color: var(--ink-green-deep);
        box-shadow: 0 8px 24px -8px rgba(198,161,91,0.6);
      }
      .btn--gold:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -8px rgba(198,161,91,0.75); }
      .btn--ghost {
        background: transparent;
        color: var(--ivory);
        border-color: rgba(246,241,231,0.35);
      }
      .btn--ghost:hover { background: rgba(246,241,231,0.08); border-color: rgba(246,241,231,0.6); }
      .btn--outline {
        background: transparent;
        color: var(--ink-green);
        border-color: rgba(34,32,26,0.2);
      }
      .btn--outline:hover { border-color: var(--gold); color: var(--wine); }
      .btn--block { width: 100%; justify-content: center; }

      /* ================= NAV ================= */
      .nav {
        position: fixed;
        top: 0; left: 0; right: 0;
        z-index: 50;
        padding: 20px 0;
        transition: background 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease;
      }
      .nav--solid {
        background: rgba(246,241,231,0.88);
        backdrop-filter: blur(10px);
        padding: 12px 0;
        box-shadow: 0 1px 0 rgba(34,32,26,0.08);
      }
      .nav__inner {
        max-width: 1240px;
        margin: 0 auto;
        padding: 0 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }
      .nav__mark {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: var(--display);
        font-size: 19px;
        font-style: italic;
        color: var(--ivory);
        transition: color 0.35s ease;
      }
      .nav--solid .nav__mark { color: var(--ink-green); }
      .nav__links {
        display: none;
        gap: 30px;
        font-size: 13.5px;
        letter-spacing: 0.03em;
        color: rgba(246,241,231,0.85);
      }
      .nav--solid .nav__links { color: var(--charcoal-soft); }
      .nav__links a { position: relative; padding: 4px 0; }
      .nav__links a:hover { color: var(--gold); }
      @media (min-width: 920px) { .nav__links { display: flex; } }

      .nav__cta {
        display: none;
        font-size: 13px;
        font-weight: 700;
        padding: 10px 20px;
        border-radius: 999px;
        background: var(--gold);
        color: var(--ink-green-deep);
      }
      @media (min-width: 920px) { .nav__cta { display: inline-flex; } }

      .nav__burger {
        background: none;
        border: none;
        color: var(--ivory);
        display: flex;
      }
      .nav--solid .nav__burger { color: var(--charcoal); }
      @media (min-width: 920px) { .nav__burger { display: none; } }

      .nav__mobile {
        max-height: 0;
        overflow: hidden;
        background: var(--ink-green-deep);
        transition: max-height 0.4s ease;
      }
      .nav__mobile.is-open { max-height: 400px; }
      .nav__mobile a {
        display: block;
        padding: 16px 28px;
        color: var(--ivory-dim);
        border-top: 1px solid rgba(246,241,231,0.1);
        font-size: 15px;
      }
      .nav__mobile-cta { color: var(--gold-light) !important; font-weight: 700; display: flex !important; align-items: center; gap: 6px; }

      /* ================= HERO ================= */
      .hero {
        position: relative;
        min-height: 100svh;
        background: radial-gradient(ellipse at 20% 0%, #234A3B 0%, var(--ink-green) 45%, var(--ink-green-deep) 100%);
        color: var(--ivory);
        padding: 150px 28px 90px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        z-index: 2;
      }
      .hero__glow {
        position: absolute;
        top: -10%;
        right: -10%;
        width: 60vw;
        height: 60vw;
        max-width: 700px;
        max-height: 700px;
        background: radial-gradient(circle, rgba(198,161,91,0.22) 0%, transparent 70%);
        pointer-events: none;
      }
      .hero__grain {
        position: absolute;
        inset: 0;
        opacity: 0.5;
        background-image: radial-gradient(rgba(246,241,231,0.04) 1px, transparent 1px);
        background-size: 3px 3px;
        pointer-events: none;
      }
      .hero__eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 12.5px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--gold-light);
        font-weight: 600;
        margin: 0 0 26px;
        z-index: 1;
      }
      .hero__title {
        font-family: var(--display);
        font-weight: 400;
        font-size: clamp(42px, 8vw, 92px);
        line-height: 1.04;
        margin: 0 0 26px;
        max-width: 900px;
        z-index: 1;
      }
      .hero__title em { font-style: italic; color: var(--gold-light); }
      .hero__title-gold {
        background: linear-gradient(120deg, var(--gold-light), var(--gold) 60%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .hero__sub {
        font-size: 17px;
        line-height: 1.65;
        color: rgba(246,241,231,0.78);
        max-width: 560px;
        margin: 0 0 40px;
        z-index: 1;
      }
      .hero__actions { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 68px; z-index: 1; }
      .hero__stats {
        display: flex;
        align-items: center;
        gap: 26px;
        z-index: 1;
        flex-wrap: wrap;
      }
      .hero__stats-num {
        display: block;
        font-family: var(--display);
        font-size: 26px;
        color: var(--ivory);
      }
      .hero__stats-label {
        display: block;
        font-size: 12px;
        color: rgba(246,241,231,0.6);
        margin-top: 3px;
      }
      .hero__stats-div { width: 1px; height: 34px; background: rgba(246,241,231,0.2); }

      .hero__scroll {
        position: absolute;
        bottom: 34px;
        left: 28px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(246,241,231,0.5);
      }
      .hero__scroll span {
        width: 1px;
        height: 34px;
        background: rgba(246,241,231,0.4);
        position: relative;
        overflow: hidden;
      }
      .hero__scroll span::after {
        content: '';
        position: absolute;
        top: -100%;
        left: 0; right: 0;
        height: 100%;
        background: var(--gold-light);
        animation: scrollLine 1.8s ease-in-out infinite;
      }
      @keyframes scrollLine {
        0% { top: -100%; }
        60% { top: 100%; }
        100% { top: 100%; }
      }
      @media (prefers-reduced-motion: reduce) {
        .hero__scroll span::after { animation: none; top: 0; }
      }

      /* ================= MARQUEE ================= */
      .marquee {
        background: var(--ink-green-deep);
        border-top: 1px solid rgba(246,241,231,0.08);
        border-bottom: 1px solid rgba(246,241,231,0.08);
        overflow: hidden;
        padding: 18px 0;
        z-index: 2;
        position: relative;
      }
      .marquee__track {
        display: flex;
        width: max-content;
        animation: marqueeScroll 32s linear infinite;
      }
      @media (prefers-reduced-motion: reduce) { .marquee__track { animation-duration: 90s; } }
      @keyframes marqueeScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee__item {
        display: flex;
        align-items: center;
        font-family: var(--display);
        font-style: italic;
        font-size: 20px;
        color: rgba(246,241,231,0.55);
        padding: 0 28px;
        white-space: nowrap;
      }
      .marquee__item i {
        width: 6px; height: 6px;
        margin-left: 28px;
        border-radius: 50%;
        background: var(--gold);
        display: inline-block;
      }

      /* ================= MANIFESTO ================= */
      .manifesto {
        background: var(--ink-green);
        color: var(--ivory);
        padding: 110px 28px;
        z-index: 2;
        position: relative;
      }
      .manifesto > .reveal { max-width: 780px; margin: 0 auto; text-align: center; }
      .manifesto__text {
        font-family: var(--display);
        font-weight: 400;
        font-size: clamp(22px, 3vw, 32px);
        line-height: 1.5;
        color: var(--ivory-dim);
      }
      .manifesto__text em { color: var(--gold-light); font-style: italic; }
      .manifesto__sign {
        margin-top: 30px;
        font-size: 13px;
        letter-spacing: 0.06em;
        color: rgba(246,241,231,0.55);
      }

      /* ================= SECTION shared padding ================= */
      .services, .process, .gallery, .packages {
        padding: 120px 28px;
        max-width: 1240px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }

      /* ---------------- SERVICES ---------------- */
      .services__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1px;
        background: rgba(34,32,26,0.12);
        border: 1px solid rgba(34,32,26,0.12);
      }
      @media (min-width: 760px) { .services__grid { grid-template-columns: 1fr 1fr; } }
      .service-card {
        background: var(--ivory);
        padding: 42px 34px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .service-card__tag {
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--wine);
        font-weight: 700;
      }
      .service-card h3 {
        font-family: var(--display);
        font-size: 24px;
        font-weight: 500;
        margin: 0;
      }
      .service-card p {
        font-size: 15px;
        line-height: 1.65;
        color: var(--charcoal-soft);
        margin: 0;
        max-width: 46ch;
      }
      .service-card__link {
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 13.5px;
        font-weight: 700;
        color: var(--ink-green);
      }
      .service-card__link:hover { color: var(--wine); }

      /* ---------------- PROCESS ---------------- */
      .process__list { display: flex; flex-direction: column; }
      .process__step {
        display: grid;
        grid-template-columns: 64px 1fr;
        gap: 24px;
        padding: 32px 0;
        border-top: 1px solid rgba(34,32,26,0.12);
      }
      .process__step:last-child { border-bottom: 1px solid rgba(34,32,26,0.12); }
      .process__num {
        font-family: var(--display);
        font-style: italic;
        font-size: 26px;
        color: var(--gold);
      }
      .process__step h3 {
        font-family: var(--display);
        font-weight: 500;
        font-size: 21px;
        margin: 0 0 8px;
      }
      .process__step p {
        font-size: 15px;
        line-height: 1.65;
        color: var(--charcoal-soft);
        margin: 0;
        max-width: 60ch;
      }

      /* ---------------- GALLERY (mood swatches) ---------------- */
      .gallery__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      @media (min-width: 720px) { .gallery__grid { grid-template-columns: repeat(3, 1fr); } }
      .swatch {
        aspect-ratio: 4 / 5;
        border-radius: 4px;
        padding: 22px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        overflow: hidden;
        transition: transform 0.4s ease;
      }
      .swatch:hover { transform: translateY(-6px); }
      .swatch::after {
        content: '';
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%);
      }
      .swatch__sub, .swatch__label { position: relative; z-index: 1; }
      .swatch__sub {
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.75);
        margin-bottom: 6px;
      }
      .swatch__label {
        font-family: var(--display);
        font-size: 19px;
        color: #fff;
        font-weight: 500;
      }


      .swatch {
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* Optional: smooth corners */
  min-height: 300px;  /* Adjust based on your layout */
  display: flex;
  align-items: flex-end;
  padding: 24px;
  cursor: pointer;
}

/* The actual photo background */
.swatch__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(40%) blur(2px); /* Starts slightly desaturated and blurry */
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), 
              filter 0.6s ease;
  z-index: 1;
}

/* The color theme gradient */
.swatch__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9; /* Strong color presence at first */
  transition: opacity 0.5s ease;
  z-index: 2;
}

/* Text Container */
.swatch__content {
  position: relative;
  z-index: 3; /* Stays safely on top of everything */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  pointer-events: none; /* Prevents text from interrupting the cursor hover */
}

/* ========================================================
   CURSER HOVER ANIMATION STATE
   ======================================================== */
.swatch:hover .swatch__bg {
  transform: scale(1.08);          /* Zooms image in gently */
  filter: grayscale(0%) blur(0px);  /* Reveals full, vivid image color */
}

.swatch:hover .swatch__overlay {
  opacity: 0.35;                   /* Drops the color overlay to let photo shine */
}

      /* ---------------- TESTIMONIALS ---------------- */
      .testimonials {
        background: var(--wine);
        color: var(--ivory);
        padding: 110px 28px;
        z-index: 2;
        position: relative;
      }
      .testimonials > .reveal { text-align: center; max-width: 1240px; margin: 0 auto; }
      .testimonials__grid {
        max-width: 1240px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
      }
      @media (min-width: 820px) { .testimonials__grid { grid-template-columns: repeat(3, 1fr); } }
      .testimonial {
        margin: 0;
        background: rgba(246,241,231,0.06);
        border: 1px solid rgba(246,241,231,0.14);
        border-radius: 6px;
        padding: 32px 28px;
      }
      .testimonial__mark { color: var(--gold-light); margin-bottom: 14px; }
      .testimonial blockquote {
        margin: 0 0 22px;
        font-family: var(--display);
        font-style: italic;
        font-size: 18px;
        line-height: 1.55;
        color: var(--ivory);
      }
      .testimonial figcaption { display: flex; flex-direction: column; gap: 2px; font-size: 13.5px; }
      .testimonial figcaption span:first-child { font-weight: 700; }
      .testimonial__place { color: rgba(246,241,231,0.55); font-size: 12.5px; }

      /* ---------------- PACKAGES ---------------- */
      .packages__grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 900px) { .packages__grid { grid-template-columns: repeat(3, 1fr); } }
      .package {
        border: 1px solid rgba(34,32,26,0.14);
        border-radius: 8px;
        padding: 36px 30px;
        display: flex;
        flex-direction: column;
        position: relative;
        background: #fff;
      }
      .package--featured {
        background: var(--ink-green);
        color: var(--ivory);
        border-color: var(--ink-green);
        transform: translateY(-8px);
        box-shadow: 0 30px 60px -20px rgba(27,58,47,0.45);
      }
      .package__badge {
        position: absolute;
        top: -13px;
        left: 30px;
        background: var(--gold);
        color: var(--ink-green-deep);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 5px 12px;
        border-radius: 999px;
      }
      .package h3 { font-family: var(--display); font-size: 22px; font-weight: 500; margin: 6px 0 4px; }
      .package__price { font-family: var(--display); font-size: 30px; color: var(--gold); margin-bottom: 14px; }
      .package--featured .package__price { color: var(--gold-light); }
      .package__desc {
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--charcoal-soft);
        margin-bottom: 22px;
      }
      .package--featured .package__desc { color: rgba(246,241,231,0.75); }
      .package ul { display: flex; flex-direction: column; gap: 11px; margin-bottom: 30px; flex: 1; }
      .package ul li {
        font-size: 13.5px;
        padding-left: 20px;
        position: relative;
        color: var(--charcoal-soft);
      }
      .package--featured ul li { color: rgba(246,241,231,0.85); }
      .package ul li::before {
        content: '';
        position: absolute;
        left: 0; top: 6px;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--gold);
      }

      /* ---------------- CONTACT ---------------- */
      .contact {
        background: var(--ivory-dim);
        padding: 120px 28px;
        z-index: 2;
        position: relative;
      }
      .contact__inner {
        max-width: 1180px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr;
        gap: 56px;
      }
      @media (min-width: 960px) { .contact__inner { grid-template-columns: 1fr 1fr; } }
      .contact__title {
        font-family: var(--display);
        font-weight: 500;
        font-size: clamp(30px, 4vw, 46px);
        line-height: 1.14;
        margin: 0 0 20px;
      }
      .contact__copy p { font-size: 15.5px; line-height: 1.65; color: var(--charcoal-soft); max-width: 46ch; }
      .contact__details { display: flex; flex-direction: column; gap: 14px; margin-top: 30px; font-size: 14.5px; }
      .contact__details a, .contact__details span { display: flex; align-items: center; gap: 10px; color: var(--charcoal-soft); }
      .contact__details a:hover { color: var(--wine); }

      .contact__form {
        background: #fff;
        border: 1px solid rgba(34,32,26,0.12);
        border-radius: 10px;
        padding: 34px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .contact__form label {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-size: 13px;
        font-weight: 700;
        color: var(--charcoal);
      }
      .contact__form label span { font-weight: 400; color: var(--charcoal-soft); }
      .contact__form input, .contact__form textarea {
        border: 1px solid rgba(34,32,26,0.18);
        border-radius: 6px;
        padding: 12px 14px;
        font-size: 14.5px;
        color: var(--charcoal);
        background: var(--ivory);
        resize: vertical;
      }
      .contact__form input:focus, .contact__form textarea:focus {
        border-color: var(--gold);
      }
      .contact__success {
        text-align: center;
        padding: 30px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        color: var(--ink-green);
      }
      .contact__success h3 { font-family: var(--display); font-size: 22px; margin: 4px 0; }
      .contact__success p { font-size: 14px; color: var(--charcoal-soft); }

      /* ---------------- FOOTER ---------------- */
      .footer {
        background: var(--ink-green-deep);
        color: var(--ivory-dim);
        padding: 56px 28px 34px;
        z-index: 2;
        position: relative;
      }
      .footer__top {
        max-width: 1240px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .footer__top .nav__mark { color: var(--ivory); }
      .footer__social {
        width: 38px; height: 38px;
        border: 1px solid rgba(246,241,231,0.25);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        transition: border-color 0.25s ease, color 0.25s ease;
      }
      .footer__social:hover { border-color: var(--gold-light); color: var(--gold-light); }
      .footer__tag {
        max-width: 1240px;
        margin: 26px auto 40px;
        font-size: 14px;
        color: rgba(246,241,231,0.55);
        max-width: 46ch;
      }
      .footer__bottom {
        max-width: 1240px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 20px;
        justify-content: space-between;
        font-size: 12.5px;
        color: rgba(246,241,231,0.4);
        padding-top: 24px;
        border-top: 1px solid rgba(246,241,231,0.1);
      }

      /* ---------------- fonts ---------------- */
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap');
    `}</style>
  );
}





























// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App



