import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Home, Sun, Droplets } from "lucide-react";

import heroBg from "@/assets/hero-bg.jpg";
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiThumbsUp,
  FiMail,
  FiPhone,
  FiUser,
  FiHome,
  FiDollarSign,
  FiBriefcase,
  FiSend,
  FiCheckCircle,
  FiUsers,
  FiUserCheck,
  FiMessageSquare,
  FiSmartphone,
  FiZap,
  FiClock,
  FiShield,
  FiTool,
  FiSun,
  FiCloudRain,
  FiAward,
  FiDroplet,
  FiSearch,
  FiMapPin,
} from "react-icons/fi";
import { RiBuildingLine, RiShieldCheckLine } from "react-icons/ri";
import completeData from "../src/data/completeData.json";



// MODERN PROFESSIONAL FORM COMPONENT - ADVANCED ROOFING SERVICES
const RoofingInquiryForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    serviceType: "roof-inspection",
    serviceDetails: "",
    email: "",
    phone: "",
    address: "",
    urgency: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(520);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      setContainerHeight(Math.max(height, 500));
    }
  }, [step, isSubmitted]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/advancedroofingomaha@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `🏠 Hero Quote Request - ${formData.firstName} ${formData.lastName}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          service_type: formData.serviceType,
          service_details: formData.serviceDetails,
          urgency: formData.urgency,
          _template: "table",
          _captcha: "false",
        }),
      });
    } catch (err) {
      console.log("Form submission fallback to mailto");
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setStep(1);
      setFormData({
        firstName: "",
        lastName: "",
        serviceType: "roof-inspection",
        serviceDetails: "",
        email: "",
        phone: "",
        address: "",
        urgency: "standard",
      });
    }, 4000);
  };

  const serviceOptions = [
    {
      value: "roof-inspection",
      label: "Roof Inspection",
      icon: FiSearch,
      desc: "Thorough storm & leak evaluation",
    },
    {
      value: "roof-installation",
      label: "Roof Installation & Replacement",
      icon: FiHome,
      desc: "Complete residential & commercial roofs",
    },
    {
      value: "roof-repair",
      label: "Roof Repair & Leak Fix",
      icon: FiTool,
      desc: "Shingle repair, flashing & leaks",
    },
    {
      value: "storm-damage",
      label: "Storm Damage Restoration",
      icon: FiCloudRain,
      desc: "Hail, wind damage & insurance claims",
    },
    {
      value: "siding-services",
      label: "Siding Services",
      icon: RiBuildingLine,
      desc: "Durable siding installation & repair",
    },
    {
      value: "gutter-venting",
      label: "Gutter Cleaning & Attic Venting",
      icon: FiShield,
      desc: "Drainage protection & ventilation",
    },
  ];

  const urgencyOptions = [
    { value: "emergency", label: "🚨 Urgent (ASAP)" },
    { value: "soon", label: "⚡ Soon (1-2 weeks)" },
    { value: "planned", label: "📅 Planning (1-3 months)" },
  ];

  const stepIcons = [FiUserCheck, FiMessageSquare, FiSmartphone];
  const stepLabels = ["Your Info", "Project Details", "Contact"];

  const SelectedIcon =
    serviceOptions.find((opt) => opt.value === formData.serviceType)?.icon ||
    FiHome;

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 24, boxShadow: "0 20px 60px rgba(8,102,213,0.12), 0 4px 24px rgba(0,0,0,0.07)" }}
        className="overflow-hidden will-change-transform transform-gpu"
      >
        <div className="relative flex-shrink-0" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)", borderBottom: "1px solid #BFDBFE" }}>
          <div className="px-5 sm:px-6 md:px-8 py-4 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, var(--primary-hex), var(--primary-hover-hex))" }}>
                  <FiZap className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#FFFFFF" }} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black" style={{ fontFamily: "var(--font-heading)", color: "#1E293B" }}>
                    Free Roofing Estimate
                  </h3>
                  <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: "#1E40AF" }}>
                    Get your fast quote in 3 easy steps
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 rounded-full px-3 py-1.5" style={{ background: "rgba(var(--primary-rgb), 0.08)", border: "1px solid rgba(var(--primary-rgb), 0.2)" }}>
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={step >= i ? { background: "var(--primary-hex)", color: "#FFFFFF" } : { background: "#E2E8F0", color: "#94A3B8" }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium ml-1" style={{ color: "var(--primary-hex)" }}>
                  Steps
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          style={{ minHeight: `${containerHeight}px` }}
          className="transition-all duration-300 ease-in-out"
        >
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="px-4 sm:px-6 md:px-8 py-4 sm:py-6"
            >
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((s) => {
                    const StepIcon = stepIcons[s - 1];
                    const isActive = step === s;
                    const isCompleted = step > s;
                    return (
                      <div
                        key={s}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                          style={isActive ? { background: "linear-gradient(135deg,var(--primary-hex),var(--primary-hover-hex))", color: "#FFFFFF", boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.25)" } : isCompleted ? { background: "rgba(var(--primary-rgb), 0.12)", color: "var(--primary-hex)" } : { background: "#E2E8F0", color: "#94A3B8" }}
                        >
                          {isCompleted ? (
                            <FiCheckCircle className="w-6 h-6" />
                          ) : (
                            <StepIcon className="w-5 h-5" />
                          )}
                        </div>
                        <span
                          className="text-xs font-bold mt-2 transition-colors"
                          style={{ color: isActive ? "var(--primary-hex)" : isCompleted ? "rgba(var(--primary-rgb), 0.6)" : "#94A3B8" }}
                        >
                          {stepLabels[s - 1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="relative mt-4 h-1 rounded-full overflow-hidden" style={{ background: "var(--graphite-color)" }}>
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--primary-hex), var(--primary-hover-hex))" }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.14)" }}>
                        <FiUser className="w-4 h-4" style={{ color: "var(--primary-hex)" }} />
                        <span className="text-xs font-medium" style={{ color: "#1E40AF" }}>
                          Step 1 of 3 - Tell us who you are
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          First name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--primary-hex)" }} />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-gray-800 transition-all focus:outline-none"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(var(--primary-rgb), 0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                            placeholder="John"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Last name
                        </label>
                        <div className="relative group">
                          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--primary-hex)" }} />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-gray-800 transition-all focus:outline-none"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(var(--primary-rgb), 0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Property address
                        </label>
                        <div className="relative group">
                          <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--primary-hex)" }} />
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-gray-800 transition-all focus:outline-none"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(var(--primary-rgb), 0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                            placeholder="123 Main St, Canton, MI"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!formData.firstName || !formData.lastName || !formData.address}
                        className="w-full py-3.5 rounded-xl font-bold mt-4 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                        style={{ background: "linear-gradient(135deg, var(--primary-hex), var(--primary-hover-hex))", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(var(--primary-rgb), 0.18)" }}
                      >
                        Continue
                        <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.14)" }}>
                        <FiTool className="w-4 h-4" style={{ color: "var(--primary-hex)" }} />
                        <span className="text-xs" style={{ color: "#1E40AF" }}>
                          Step 2 of 3 - What service do you need?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Service needed
                        </label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3.5 pl-12 pr-10 text-gray-800 focus:outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", height: "52px" }}
                          >
                            {serviceOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-white text-gray-800">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <SelectedIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Urgency
                        </label>
                        <div className="relative">
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3.5 pl-4 pr-10 text-gray-800 focus:outline-none transition-all appearance-none cursor-pointer"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                          >
                            {urgencyOptions.map((opt) => (
                              <option key={opt.value} value={opt.value} className="bg-white text-gray-800">
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Additional details{" "}
                          <span className="font-normal" style={{ color: "#94A3B8" }}>
                            (optional)
                          </span>
                        </label>
                        <textarea
                          name="serviceDetails"
                          value={formData.serviceDetails}
                          onChange={handleChange}
                          rows={3}
                          className="w-full rounded-xl py-3 px-4 text-gray-800 focus:outline-none transition-all resize-none"
                          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", minHeight: "80px" }}
                          placeholder="Tell us about your project, colors, etc."
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                          style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#64748B" }}
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                          style={{ background: "linear-gradient(135deg, var(--primary-hex), var(--primary-hover-hex))", color: "#FFFFFF" }}
                        >
                          Continue
                          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-xl p-3 flex items-center gap-2 mb-2" style={{ background: "rgba(var(--primary-rgb), 0.06)", border: "1px solid rgba(var(--primary-rgb), 0.14)" }}>
                        <FiShield className="w-4 h-4" style={{ color: "var(--primary-hex)" }} />
                        <span className="text-xs" style={{ color: "#1E40AF" }}>
                          Step 3 of 3 - How should we reach you?
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Email address
                        </label>
                        <div className="relative group">
                          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--primary-hex)" }} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-gray-800 transition-all focus:outline-none"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(var(--primary-rgb), 0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                            placeholder="hello@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: "#1E293B" }}>
                          Phone number
                        </label>
                        <div className="relative group">
                          <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: "var(--primary-hex)" }} />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl py-3 pl-11 pr-4 text-gray-800 transition-all focus:outline-none"
                            style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(var(--primary-rgb), 0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "#E2E8F0"}
                            placeholder="+1 (386) 246-7999"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                          style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#64748B" }}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.email || !formData.phone}
                          className="flex-1 py-3.5 rounded-xl font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                          style={{ background: "linear-gradient(135deg, var(--primary-hex), var(--primary-hover-hex))", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(var(--primary-rgb), 0.18)" }}
                        >
                          {isSubmitting ? "Sending..." : "Get Free Estimate"}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 py-12 text-center flex flex-col items-center justify-center"
              style={{ minHeight: `${containerHeight}px` }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <FiCheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Estimate Request Sent!
              </h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                Thanks for contacting Advanced Roofing & Exteriors. We'll reach out within 24 hours with your free estimate.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { badge, headlines, description, buttons, stats } = completeData.hero;

  const iconComponents = {
    FiArrowRight: FiArrowRight,
    RiBuildingLine: RiBuildingLine,
    FiStar: FiStar,
    FiThumbsUp: FiThumbsUp,
    RiShieldCheckLine: RiShieldCheckLine,
    FiDollarSign: FiDollarSign,
    FiClock: FiClock,
    FiShield: FiShield,
    FiHome: FiHome,
    FiTool: FiTool,
    FiMapPin: FiMapPin,
    FiMessageSquare: FiMessageSquare,
    FiAward: FiAward,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden isolate bg-[#1E293B]"
    >
      {/* Decorative background texture and clean gradient overlay without any bottom fade */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.img
          src={heroBg}
          alt=""
          aria-hidden="true"
          loading="eager"
          {...({ fetchpriority: "high" } as any)}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full object-cover absolute inset-0 will-change-transform opacity-75"
        />
        {/* Directional gradient: Rich dark on left for text readability, clear image on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D18]/95 via-[#0A1222]/80 via-45% to-transparent" />

        {/* Subtle radial ambient blue glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-blue-900/25 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-28 pb-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">

              {/* Trust Pill Badge */}
              {badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-950/80 border border-blue-800/60 shadow-sm"
                >
                  <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-blue-300 tracking-wide">
                    {badge}
                  </span>
                </motion.div>
              )}

              {/* Main Headline with Crisp White & Soft Blue Accent */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-medium leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {headlines[0] && <span className="block text-white">{headlines[0]}</span>}
                {headlines[1] && <span className="block text-white mt-1">{headlines[1]}</span>}
                {headlines[2] && (
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200 mt-1">
                    {headlines[2]}
                  </span>
                )}
              </motion.h1>

              {/* Description with readable soft slate text */}
              <motion.p
                className="text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium text-slate-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {description}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
                  {buttons.map((button, idx) => {
                    const Icon = iconComponents[button.icon as keyof typeof iconComponents] || FiArrowRight;
                    const isFirst = idx === 0;

                    return (
                      <motion.a
                        key={idx}
                        href={button.href}
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl sm:rounded-2xl w-full sm:w-auto inline-flex items-center justify-center gap-3 text-base font-bold transition-all duration-300 active:scale-95 shadow-md ${isFirst
                          ? "bg-primary hover:bg-primary/90 text-white shadow-primary/40 hover:shadow-lg hover:shadow-primary/50"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 backdrop-blur-sm"
                          }`}
                        whileHover={{ y: -3 }}
                      >
                        <span className="relative z-10">{button.text}</span>
                        <Icon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-white" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Modern Trust Indicators Bar */}
              <motion.div
                className="pt-6 border-t border-white/15 w-full mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {stats.map((stat) => {
                    const StatIcon = iconComponents[stat.icon as keyof typeof iconComponents] || FiAward;
                    const isPhone = stat.value.includes("(") || stat.label.toLowerCase().includes("call") || stat.value.includes("-");

                    const itemContent = (
                      <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/25 border border-primary/50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm shadow-primary/20">
                          <StatIcon className="w-5 h-5 text-blue-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm sm:text-base font-black text-white leading-snug tracking-tight">
                            {stat.value}
                          </div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );

                    if (isPhone) {
                      return (
                        <a
                          key={stat.label}
                          href="tel:+14026098072"
                          className="block focus:outline-none transition-transform hover:-translate-y-0.5"
                        >
                          {itemContent}
                        </a>
                      );
                    }

                    return (
                      <div key={stat.label}>
                        {itemContent}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-5 relative">
              <RoofingInquiryForm />
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
