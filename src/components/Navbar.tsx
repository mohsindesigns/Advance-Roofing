import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  X,
  Menu,
  Quote,
  Star,
  Shield,
  Zap,
  Calendar,
  Building2,
  Home,
  Users,
  Briefcase,
  MessageSquare,
  LayersIcon as Layout,
  Phone,
  FileText,
  CheckCircle,
  Wrench,
  ClipboardCheck,
  Clock,
} from "lucide-react";
import logo from "../assets/reallogoreal.png";
import logo2nd from "../assets/reallogoreal.png";
import completeData from "../src/data/completeData.json";

const iconMap = {
  Home: ({ className = "text-foreground" }: { className?: string } = {}) => <Home className={`h-5 w-5 ${className}`} />,
  Briefcase: ({ className = "text-foreground" }: { className?: string } = {}) => <Briefcase className={`h-5 w-5 ${className}`} />,
  Users: ({ className = "text-foreground" }: { className?: string } = {}) => <Users className={`h-5 w-5 ${className}`} />,
  MessageSquare: ({ className = "text-foreground" }: { className?: string } = {}) => <MessageSquare className={`h-5 w-5 ${className}`} />,
  Phone: ({ className = "text-foreground" }: { className?: string } = {}) => <Phone className={`h-5 w-5 ${className}`} />,
  ClipboardCheck: ({ className = "text-foreground" }: { className?: string } = {}) => <ClipboardCheck className={`h-5 w-5 ${className}`} />,
  Star: ({ className = "text-foreground" }: { className?: string } = {}) => <Star className={`h-5 w-5 ${className}`} />,
  Clock: ({ className = "text-foreground" }: { className?: string } = {}) => <Clock className={`h-5 w-5 ${className}`} />,
  Shield: ({ className = "text-foreground" }: { className?: string } = {}) => <Shield className={`h-5 w-5 ${className}`} />,
  Image: ({ className = "text-foreground" }: { className?: string } = {}) => <Briefcase className={`h-5 w-5 ${className}`} />,
  FileText: ({ className = "text-foreground" }: { className?: string } = {}) => <FileText className={`h-5 w-5 ${className}`} />,
  Calendar: ({ className = "text-foreground" }: { className?: string } = {}) => <Calendar className={`h-5 w-5 ${className}`} />,
  Wrench: ({ className = "text-foreground" }: { className?: string } = {}) => <Wrench className={`h-5 w-5 ${className}`} />,
};
const serviceIconMap = {
  Home: ({ isHovered = false }: { isHovered?: boolean }) => (
    <Home
      className={`h-5 w-5 ${isHovered ? "text-primary-foreground" : "text-primary"} transition-colors duration-300`}
    />
  ),
  Building2: ({ isHovered = false }: { isHovered?: boolean }) => (
    <Building2
      className={`h-5 w-5 ${isHovered ? "text-primary-foreground" : "text-primary"} transition-colors duration-300`}
    />
  ),
  Wrench: ({ isHovered = false }: { isHovered?: boolean }) => (
    <Wrench
      className={`h-5 w-5 ${isHovered ? "text-primary-foreground" : "text-primary"} transition-colors duration-300`}
    />
  ),
  Layout: ({ isHovered = false }: { isHovered?: boolean }) => (
    <Layout
      className={`h-5 w-5 ${isHovered ? "text-primary-foreground" : "text-primary"} transition-colors duration-300`}
    />
  ),
};

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) {
    const navbarHeight = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isHoveringMegaMenu, setIsHoveringMegaMenu] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { services, companyLinks, stats, cta, ctaButton } = completeData.navbar;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu("services");
  };

  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringMegaMenu) {
        setActiveMegaMenu(null);
      }
    }, 150);
  };

  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHoveringMegaMenu(true);
    setActiveMegaMenu("services");
  };

  const handleMegaMenuMouseLeave = () => {
    setIsHoveringMegaMenu(false);
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredService(null);
    }, 150);
  };

  const handleLinkClick = () => {
    setActiveMegaMenu(null);
    setIsMenuOpen(false);
    setHoveredService(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        servicesButtonRef.current &&
        !servicesButtonRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
        setHoveredService(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setActiveMegaMenu(null);
        setHoveredService(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white shadow-md border-b border-slate-100 py-3"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <motion.a
              href="#"
              className="flex items-center h-12 sm:h-14 py-1 group"
              onClick={handleLinkClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={logo}
                alt="Advanced Roofing & Exteriors Logo"
                className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain"
              />
            </motion.a>

            <div className="hidden lg:flex items-center space-x-2">
              {companyLinks.map((link) => {
                const LinkIcon = iconMap[link.icon as keyof typeof iconMap] || iconMap.Home;
                const isServices = link.label.toLowerCase() === "services";

                if (isServices) {
                  return (
                    <div key={link.label} className="relative">
                      <motion.button
                        ref={servicesButtonRef}
                        onMouseEnter={handleServicesMouseEnter}
                        onMouseLeave={handleServicesMouseLeave}
                        className="flex items-center space-x-2 px-5 py-2.5 text-slate-900 hover:text-primary transition-all duration-300 font-semibold rounded-xl relative group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="flex items-center space-x-2">
                          <LinkIcon className="text-slate-900 group-hover:text-primary transition-colors" />
                          <span className="text-slate-900 group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                        </span>
                        <motion.span
                          animate={{
                            rotate: activeMegaMenu === "services" ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-4 w-4 ml-1 text-slate-900 group-hover:text-primary transition-colors" />
                        </motion.span>
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-4/5 transition-all duration-500" />
                      </motion.button>

                      <AnimatePresence>
                        {activeMegaMenu === "services" && (
                          <motion.div
                            ref={megaMenuRef}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            onMouseEnter={handleMegaMenuMouseEnter}
                            onMouseLeave={handleMegaMenuMouseLeave}
                            className="absolute left-1/2 transform -translate-x-1/2 xl:left-0 xl:transform-none top-full mt-3 w-[90vw] max-w-[900px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-6 overflow-hidden"
                            style={{ zIndex: 1000 }}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              {services.map((service) => {
                                const ServiceIcon =
                                  serviceIconMap[
                                  service.icon as keyof typeof serviceIconMap
                                  ] || serviceIconMap.Home;
                                return (
                                  <motion.a
                                    key={service.title}
                                    href="#services"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleLinkClick();
                                      scrollToSection("services");
                                    }}
                                    onMouseEnter={() => {
                                      setHoveredService(service.title);
                                      setIsHoveringMegaMenu(true);
                                    }}
                                    onMouseLeave={() => {
                                      setHoveredService(null);
                                    }}
                                    className="group block p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/[0.04] transition-all duration-300 bg-white"
                                    whileHover={{ y: -4 }}
                                  >
                                    <div className="flex items-start space-x-3 mb-4">
                                      <div
                                        className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${hoveredService === service.title
                                          ? "bg-primary"
                                          : "bg-primary/10 group-hover:bg-primary"
                                          }`}
                                      >
                                        <ServiceIcon
                                          isHovered={hoveredService === service.title}
                                        />
                                      </div>
                                      <div>
                                        <h3
                                          className={`font-bold text-base mb-1 transition-colors ${hoveredService === service.title
                                            ? "text-primary"
                                            : "text-slate-800 group-hover:text-primary"
                                            }`}
                                        >
                                          {service.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs leading-relaxed">
                                          {service.description}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                      {service.items.map((item) => (
                                        <div
                                          key={item}
                                          className="flex items-center text-sm transition-colors"
                                        >
                                          <ChevronDown
                                            className={`h-3 w-3 mr-2 rotate-90 flex-shrink-0 transition-colors ${hoveredService === service.title
                                              ? "text-primary"
                                              : "text-muted-foreground group-hover:text-primary"
                                              }`}
                                          />
                                          <span
                                            className={`truncate transition-colors ${hoveredService === service.title
                                              ? "text-primary"
                                              : "text-slate-650 group-hover:text-primary"
                                              }`}
                                          >
                                            {item}
                                          </span>
                                        </div>
                                      ))}
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                      {service.features.map((feature) => (
                                        <span
                                          key={feature}
                                          className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full border transition-colors ${hoveredService === service.title
                                            ? "bg-blue-50 text-blue-600 border-blue-100"
                                            : "bg-slate-50 text-slate-500 border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100"
                                            }`}
                                        >
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#") && link.href.length > 1) {
                        e.preventDefault();
                        scrollToSection(link.href.slice(1));
                      }
                      handleLinkClick();
                    }}
                    onMouseEnter={() => setActiveMegaMenu(null)}
                    className="flex items-center space-x-2 px-4 py-2.5 text-slate-900 hover:text-primary transition-all duration-300 font-semibold rounded-xl relative group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-slate-900 group-hover:text-primary transition-colors">
                      <LinkIcon className="text-slate-900 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-slate-900 group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-500" />
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              className="hidden lg:flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href={ctaButton.href}
                onClick={handleLinkClick}
                onMouseEnter={() => setActiveMegaMenu(null)}
                className="group relative px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary hover:text-white shadow-md shadow-primary/20"
              >
                <span className="relative z-10 flex items-center space-x-2 text-white">
                  {(() => {
                    const CtaIcon = iconMap[ctaButton.icon as keyof typeof iconMap] || iconMap.Home;
                    return <CtaIcon className="text-white" />;
                  })()}
                  <span>{ctaButton.label}</span>
                </span>
              </a>
            </motion.div>

            <div className="flex items-center space-x-4 lg:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Toggle menu"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-6 w-6 text-slate-900" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-6 w-6 text-slate-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 lg:hidden shadow-2xl border-l border-slate-200 overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-slate-100 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-40 flex items-center justify-center overflow-hidden">
                        <img
                          src={logo2nd}
                          alt="Advanced Roofing & Exteriors Logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                      whileHover={{ rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-5 w-5 text-slate-900" />
                    </motion.button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Our Services
                      </h3>
                      <div className="space-y-3">
                        {services.map((service) => {
                          const ServiceIcon =
                            serviceIconMap[
                            service.icon as keyof typeof serviceIconMap
                            ] || serviceIconMap.Home;
                          return (
                            <motion.a
                              key={service.title}
                              href="#services"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsMenuOpen(false);
                                scrollToSection("services");
                              }}
                              className="block p-4 rounded-xl border border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 active:scale-[0.98] bg-white"
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <ServiceIcon isHovered={false} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900 text-base">
                                    {service.title}
                                  </h4>
                                  <p className="text-sm text-slate-600">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </motion.a>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Quick Links
                      </h3>
                      <div className="space-y-2">
                        {companyLinks.map((link) => {
                          const LinkIcon =
                            iconMap[link.icon as keyof typeof iconMap] ||
                            iconMap.Home;
                          return (
                            <motion.a
                              key={link.label}
                              href={link.href}
                              onClick={(e) => {
                                if (link.href.startsWith("#") && link.href.length > 1) {
                                  e.preventDefault();
                                  scrollToSection(link.href.slice(1));
                                }
                                setIsMenuOpen(false);
                              }}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 hover:text-primary transition-all duration-300 active:scale-[0.98]"
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="text-slate-900">
                                <LinkIcon />
                              </div>
                              <span className="font-semibold text-slate-900 text-base">
                                {link.label}
                              </span>
                            </motion.a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-200 bg-slate-50 flex-shrink-0">
                  <div className="space-y-4">
                    <a
                      href={ctaButton.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full py-4 bg-primary text-white font-bold rounded-xl text-center shadow-lg shadow-primary/20 transition-all duration-300 active:scale-[0.98]"
                    >
                      {ctaButton.label} Now
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;