import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  ArrowRight,
  CheckCircle,
  Instagram,
  Youtube,
  Facebook,
  Twitter
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "ecell@vit.edu",
    link: "mailto:ecell@vit.edu",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+91-9156834407",
    link: "tel:+919156834407",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    value: "VIT Pune, Bibwewadi",
    link: "https://www.google.com/maps/search/?api=1&query=Vishwakarma+Institute+of+Technology+Upper+Depo+Pune",
    gradient: "from-purple-500/20 to-pink-500/20"
  }
];

const teamMembers = [
  {
    name: "Rohit Dane",
    role: "Convener",
    phone: "+91-0000000000"
  },
  {
    name: "Rajvee Pardeshi",
    role: "Convener",
    phone: "+91-0000000000"
  },
 
];

const socialLinks = [
  { 
    icon: Instagram, 
    link: "https://www.instagram.com/v_edc/?hl=en", 
    label: "Instagram",
    hoverColor: "from-purple-500 via-pink-500 to-orange-500"
  },
  { 
    icon: Youtube, 
    link: "https://www.youtube.com/@v_edc", 
    label: "YouTube",
    hoverColor: "from-red-600 to-red-600"
  },
  { 
    icon: Facebook, 
    link: "https://facebook.com", 
    label: "Facebook",
    hoverColor: "from-blue-600 to-blue-600"
  },
  { 
    icon: Twitter, 
    link: "https://twitter.com", 
    label: "Twitter",
    hoverColor: "from-sky-400 to-sky-400"
  }
];

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Hero scroll animations
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1, 1.2]);
  const heroImageOpacity = useTransform(heroScrollProgress, [0, 0.5, 1], [0.7, 0.3, 0]);
  
  // Logo fade out on scroll
  const logoOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.6], [1, 0.5, 0]);
  
  // Parallax section scroll
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 0.86, 0.39, 0.96] 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Logo - Fixed Top Left with Scroll Fade */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ opacity: logoOpacity }}
        className="fixed top-6 left-6 z-50"
      >
        <ImageWithFallback
          src="https://ecellvitpune.in/images/VEDC_Logo1__1_-removebg-preview.png"
          alt="VIT E-Cell Logo"
          className="h-16 md:h-20 w-auto"
        />
      </motion.div>

      {/* Hero Section - Contact Us with Background Image */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-end pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            scale: heroImageScale,
            opacity: heroImageOpacity
          }}
        >
          <ImageWithFallback
            src="https://vizito.eu/images/blog/company_receptionist.webp"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </motion.div>

        {/* Contact Us Text - Always visible at bottom */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl tracking-tight text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Contact Us
          </span>
        </motion.h1>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">{/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/5 to-black" />

        <motion.div 
          ref={containerRef}
          className="relative z-10 max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl text-white mb-4">Send us a message</h3>
                <p className="text-white/60 text-lg">
                  Tell us about your project and we'll get back to you within 24 hours.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all ${
                            errors.name ? 'border-red-400' : 'border-white/[0.15]'
                          }`}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all ${
                            errors.email ? 'border-red-400' : 'border-white/[0.15]'
                          }`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm mt-2"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] border border-white/[0.15] rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-white/40" />
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all resize-none ${
                          errors.message ? 'border-red-400' : 'border-white/[0.15]'
                        }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        boxShadow: '0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
                      }}
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Message
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl text-white mb-4">Message Sent!</h3>
                    <p className="text-white/60 text-lg mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <motion.button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', company: '', message: '' });
                      }}
                      className="px-6 py-3 bg-white/[0.08] border border-white/[0.15] rounded-xl text-white hover:bg-white/[0.12] transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact Methods */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl text-white mb-4">Other ways to reach us</h3>
                <p className="text-white/60 text-lg">
                  Choose the method that works best for you.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    target={method.title === "Visit Us" ? "_blank" : undefined}
                    rel={method.title === "Visit Us" ? "noopener noreferrer" : undefined}
                    className="block p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <method.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-xl text-white mb-1">{method.title}</h4>
                        <p className="text-white/60 text-sm mb-2">{method.description}</p>
                        <p className="text-white">{method.value}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="p-6 bg-gradient-to-br from-indigo-500/[0.08] to-purple-500/[0.08] backdrop-blur-xl rounded-2xl border border-indigo-400/30">
                <h4 className="text-lg text-white mb-3">Quick Response Guarantee</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  We pride ourselves on rapid response times. All inquiries are typically answered within 2 hours during business hours, 
                  and we'll schedule a call within 24 hours to discuss your project in detail.
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Parallax Section - Do you have any questions? */}
      <section ref={parallaxRef} className="relative py-32 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Do you have any questions for us?
                </span>
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Feel free to ask anything! Our team is here to help you navigate your entrepreneurial journey and answer all your queries about E-Cell activities, events, and opportunities.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ y: imageY }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                  alt="Person at desk"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-20 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Team Members */}
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h4 className="text-xl text-white mb-2">{member.name}</h4>
                <p className="text-indigo-400 mb-3">{member.role}</p>
                <a 
                  href={`tel:${member.phone}`}
                  className="text-white/70 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {member.phone}
                </a>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h4 className="text-xl text-white mb-4">Socials</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 rounded-full bg-white/[0.08] border border-white/[0.15] flex items-center justify-center transition-all relative overflow-hidden"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <social.icon className="h-5 w-5 text-white/80 group-hover:text-white relative z-10 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Address */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-xl text-white mb-4" id="address">Address:</h4>
            <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
              Vishwakarma Institute of Technology<br />
              666, Upper Indiranagar, Bibwewadi,<br />
              Pune, Maharashtra, India - 411 037
            </p>
          </motion.div>

          {/* Bottom Logo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              src="https://ecellvitpune.in/images/vedc.png"
              alt="VEDC Logo"
              className="h-20 md:h-24 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} VIT E-Cell. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}