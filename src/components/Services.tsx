import { useRef, useEffect, useState, memo } from "react";
import { motion } from "framer-motion";
import {
  Wrench, Home, Building2, Sun, CloudRain, Shield,
  TreePine, Droplets, Hammer, Square, ArrowRight,
  Layout, Building, CheckCircle, Phone, Zap,
} from "lucide-react";
import completeData from "../src/data/completeData.json";
import imgInspection from "@/assets/roofingowner.jpg";
import imgInstallation from "@/assets/roofingbg.webp";
import imgRepair from "@/assets/metalroofing.webp";
import imgStormDamage from "@/assets/stormdamagerepair.jpg";
import imgGutterCleaning from "@/assets/guttercleaning.jpg";
import imgSiding from "@/assets/sidingservice.webp";
import imgExteriorRepair from "@/assets/exteriorrepair.jpg";

const serviceImageMap: Record<string, string> = {
  "01": imgInspection,
  "02": imgInstallation,
  "03": imgRepair,
  "04": imgStormDamage,
  "05": imgGutterCleaning,
  "06": imgSiding,
  "07": imgExteriorRepair,
  // Also support legacy numbers as fallback
  "gutter": imgGutterCleaning,
  "siding": imgSiding,
  "exterior": imgExteriorRepair,
};

const iconMap: Record<string, React.ElementType> = {
  Wrench, Home, Building2, Sun, CloudRain, Shield,
  TreePine, Droplets, Hammer, Square, Layout, Building,
  Search: Zap, CloudSun: Sun, Thermometer: Zap,
};

// ── Animated Number ───────────────────────────────────────────────
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let t0: number;
        const run = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 2000, 1);
          setDisplay(Math.floor(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(run);
          else setDisplay(value);
        };
        requestAnimationFrame(run);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
};

// ── Service Card ──────────────────────────────────────────────────
const ServiceCard = memo(({
  service, index, orphan = false,
}: { service: any; index: number; orphan?: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
  const img = serviceImageMap[service.number];

  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative rounded-2xl overflow-hidden flex flex-col cursor-pointer transform-gpu will-change-transform transition-all duration-500 hover:-translate-y-2 ${orphan ? "md:col-start-2" : ""}`}
      style={{ background: "var(--card-bg)", border: "1px solid var(--graphite-color)", boxShadow: "0 4px 24px rgba(var(--black-rgb), 0.4)" }}
      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--primary-rgb), 0.25)"}
      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--graphite-color)"}
    >
      {/* Gold left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top z-10" style={{ background: "linear-gradient(180deg, var(--primary-hex), var(--primary-hover-hex))" }} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0 bg-gradient-to-br from-primary/5 to-primary/10">
        {img ? (
          <>
            <img
              src={img}
              alt={service.title}
              loading="lazy"
              decoding="async"
              onLoad={(e) => e.currentTarget.classList.add('loaded')}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform transform-gpu" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon className="w-20 h-20 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg" style={{ background: "linear-gradient(135deg, var(--primary-hex), var(--primary-hover-hex))", color: "var(--dark-bg)" }}>
            {service.tag}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="font-black text-4xl leading-none select-none" style={{ color: "rgba(var(--primary-rgb), 0.2)" }}>
            {service.number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(var(--primary-rgb), 0.08)", border: "1px solid rgba(var(--primary-rgb), 0.2)" }}>
            <Icon className="w-5 h-5" style={{ color: "var(--primary-hex)" }} />
          </div>
          <h3 className="text-lg font-black transition-colors duration-300 leading-tight text-foreground group-hover:text-[var(--primary-hex)]">
            {service.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--body-text-color)" }}>
          {service.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-5 flex-1">
          {service.features?.slice(0, 4).map((f: string, i: number) => (
            <div key={i} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--body-text-color)" }}>
              <CheckCircle className="w-3 h-3 shrink-0" style={{ color: "var(--primary-hex)" }} />
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-colors duration-300" style={{ color: "var(--primary-hex)" }}>
          <span>Get Free Estimate</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
        </div>
      </div>
    </motion.a>
  );
});

ServiceCard.displayName = "ServiceCard";

// ── Main Component ────────────────────────────────────────────────
const Services = () => {
  const { badge, headline, description, stats, services, cta } = completeData.services;

  return (
    <section className="relative bg-background overflow-hidden py-20 md:py-28">

      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* ══ HEADER — split, heading left / desc+stats right ════ */}
        <div className="mb-14 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* LEFT: Badge + Headline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: "rgba(var(--primary-rgb), 0.08)", border: "1px solid rgba(var(--primary-rgb), 0.25)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--primary-hex)" }} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--primary-hex)" }}>
                  {badge}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl xl:text-[3.25rem] font-black leading-[1.1] tracking-tight" style={{ color: "var(--heading-color)", fontFamily: "var(--font-heading)" }}>
                {headline.prefix}{" "}
                <span style={{ color: "var(--primary-hex)" }}>{headline.highlight}</span>{" "}
                <span style={{ color: "var(--body-text-color)" }}>{headline.suffix}</span>
              </h2>
            </motion.div>

            {/* RIGHT: Description + Stat cards */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <p className="text-base md:text-lg leading-relaxed font-medium" style={{ color: "var(--body-text-color)" }}>
                {description[0]}
              </p>

              {/* Stat cards — gold top bar */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat: any) => (
                  <div
                    key={stat.label}
                    className="relative rounded-xl p-4 overflow-hidden transition-all duration-300"
                    style={{ background: "var(--card-bg)", border: "1px solid var(--graphite-color)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl" style={{ background: "linear-gradient(90deg, var(--primary-hex), var(--primary-hover-hex))" }} />
                    <div className="text-2xl md:text-3xl font-black leading-none mb-1 pt-1" style={{ color: "var(--primary-hex)" }}>
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-tight" style={{ color: "var(--silver-color)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Separator line */}
          <div className="mt-12 h-px" style={{ background: "linear-gradient(to right, rgba(var(--primary-rgb), 0.25), var(--graphite-color), transparent)" }} />
        </div>

        {/* ══ SERVICES GRID ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
          {services.map((service: any, index: number) => {
            const isOrphan = services.length % 3 === 1 && index === services.length - 1;
            return (
              <ServiceCard key={service.number} service={service} index={index} orphan={isOrphan} />
            );
          })}
        </div>

        {/* ══ PREMIUM GRADIENT CTA ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #001B36 100%)",
            boxShadow: "0 25px 60px rgba(8, 102, 213, 0.15)",
            border: "1px solid rgba(var(--primary-rgb), 0.3)"
          }}
        >
          {/* Subtle Ambient Glow and Grid */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
              backgroundSize: '45px 45px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

              {/* Left text */}
              <div className="text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2.5 mb-5 rounded-full px-4 py-2 bg-primary/15 border border-primary/30">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                    Free Consultation Available
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl xl:text-5xl font-black leading-[1.08] tracking-tight mb-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  {cta.title}
                </h3>

                <p className="text-base md:text-lg leading-relaxed mb-6 text-slate-300">
                  {cta.description}
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                  {["Licensed & Insured", "Locally Owned", "Free Estimates"].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-primary/20 border border-primary/40">
                        <CheckCircle className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto lg:min-w-[240px] shrink-0">

                {/* Primary Button */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold transition-all duration-300 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 text-center"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="tel:+14026098072"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-slate-900 text-center backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span>(402) 609-8072</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Integrated Elegant Transition Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Services;
