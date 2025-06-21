import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const packages = [
  {
    id: "starter-strategy-call",
    name: "Starter Strategy Call",
    description: "Unlock the potential of AI for your business in just 45 minutes. Designed for founders, solopreneurs, and creators who are curious about AI but unsure where to begin.",
    price: 1200,
    duration: "45 mins",
    benefits: [
      "A clear understanding of how AI fits into your business",
      "Tactical quick wins you can implement fast",
      "A no-fluff roadmap for future AI adoption",
      "Guidance on ROI and effort vs. impact",
      "A curated resource pack to take things forward"
    ]
  },
  {
    id: "ai-readiness-audit",
    name: "AI Readiness Audit",
    description: "A 90-minute deep-dive designed for business owners, team leads, and decision-makers who want to evaluate where and how AI can be integrated effectively.",
    price: 2100,
    duration: "90 mins",
    benefits: [
      "A thorough consultation uncovering process bottlenecks and automation potential",
      "An objective AI readiness score across your operations",
      "A customized 3-month action plan with key next steps",
      "A detailed PDF report with tool recommendations, risks, and roadmap",
      "Expert insight into integration feasibility and ROI"
    ]
  },
  {
    id: "custom-ai-roadmap",
    name: "Custom AI Roadmap",
    description: "Turn your AI vision into a ready-to-execute plan — tailored to your team, tools, and timeline. Designed for growth-stage teams and startups.",
    price: "Custom",
    duration: "Custom",
    benefits: [
      "In-depth analysis of your workflows, pain points, and data sources",
      "A custom AI implementation plan with projected ROI and impact",
      "A technical requirements document to align with devs or vendors",
      "Recommended tools, platforms, and integration strategies",
      "Defined timeline, milestones, and team responsibilities",
      "Risk mitigation strategies to avoid costly missteps",
      "A team training outline to get everyone AI-ready"
    ]
  }
];

const SubscriptionPricing: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [paymentError, setPaymentError] = useState("");
  const [paying, setPaying] = useState<string | null>(null);

  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  const handleBuy = async (pkg: typeof packages[0]) => {
    if (pkg.price === "Custom") {
      navigate("/contact");
      return;
    }

    setPaymentError("");
    setPaying(pkg.id);

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      setPaymentError("Failed to load Razorpay SDK.");
      setPaying(null);
      return;
    }

    const amountPaise = typeof pkg.price === "number" ? pkg.price * 100 : 0;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: "INR",
      name: "Teeny Tech Trek",
      description: pkg.description || pkg.name,
      handler: async function (response: any) {
        try {
          await api.post(
            '/orders/verify',
            {
              razorpay_payment_id: response.razorpay_payment_id,
              package_id: pkg.id,
              amount: pkg.price,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          alert("Payment successful! Your consultancy booking will be scheduled and added to our calendar soon.");
          navigate("/orders");
        } catch (e: any) {
          setPaymentError("Payment verification failed. Please contact support.");
        }
      },
      prefill: {},
      notes: {
        package_id: pkg.id,
      },
      theme: { color: "#3b82f6" },
    };

    // @ts-ignore
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setPaying(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="pricing" className="py-20 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-20 h-20 bg-[#93c5fd]/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#3b82f6]/30 rounded-full blur-xl"
      />
      <Container className="relative z-10">
        <SectionHeading
          title="AI Consultancy"
          subtitle="Choose the perfect plan to kickstart your AI journey"
        />
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-500 mb-4 font-medium"
          >
            {paymentError}
          </motion.div>
        )}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {packages.map((pkg, index) => {
            const priceText = typeof pkg.price === "number" ? `₹${pkg.price.toLocaleString()}` : pkg.price;
            const durationText = pkg.duration;
            const popular = index === 0;
            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover="hover"
                className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 text-center border-2 flex flex-col perspective-1000 transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.span
                    className={`inline-block w-6 h-6 rounded-full ${popular ? 'bg-[#93c5fd]/20 text-[#3b82f6]' : 'bg-[#93c5fd]/10 text-[#1e40af]/80'} flex items-center justify-center animate-pulse-slow`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check size={18} />
                  </motion.span>
                  <span className="text-lg font-semibold text-[#1e40af]">{pkg.name}</span>
                </div>
                <div className="text-[#1e40af]/80 mb-3">{pkg.description}</div>
                <div className="text-3xl font-bold mb-1 text-[#1e40af]">
                  {priceText}
                  <span className="text-lg text-[#1e40af]/80 font-medium ml-1">/ {durationText}</span>
                </div>
                <ul className="text-left text-[#1e40af]/80 mb-6">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-[#3b82f6]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex-grow" />
                <motion.div
                  className="mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => {
                      if (typeof pkg.price === "number") {
                        handleBuy(pkg);
                      } else {
                        const el = document.querySelector("#contact");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    disabled={paying === pkg.id}
                    className="w-full bg-[#3b82f6] text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {paying === pkg.id ? 'Processing...' : typeof pkg.price === "number" ? `Book for ₹${pkg.price}` : 'Contact for Quote'}
                  </button>
                </motion.div>

                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.15 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2), transparent 70%)',
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-[#1e40af]/80 mb-4">Need a custom solution? We've got you covered.</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#3b82f6] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#1e40af] transition-all duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us <Check size={16} />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default SubscriptionPricing;