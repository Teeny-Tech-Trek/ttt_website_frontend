import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { getPublicPackagesByField } from "../../services/packageService";
import { Package } from "../../types/package";
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

const SubscriptionPricing: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paying, setPaying] = useState<string | null>(null);

  const { user, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    async function fetchSubscriptions() {
      try {
        setLoading(true);
        const data = await getPublicPackagesByField("package_type", "subscription");
        if (isMounted) setPackages(data);
      } catch (err) {
        console.error("Error fetching subscription packages:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchSubscriptions();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBuy = async (pkg: Package) => {
    setPaymentError("");
    setPaying(pkg.id);

    const sdkLoaded = await loadRazorpay();
    if (!sdkLoaded) {
      setPaymentError("Failed to load Razorpay SDK.");
      setPaying(null);
      return;
    }

    const amountPaise = pkg.price * 100;

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
          alert("Payment successful! Access will be activated soon.");
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

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  if (loading)
    return (
      <section className="py-20 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
        </div>
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Loading subscription packages…"
          />
          <div className="text-center py-16 text-[#1e40af]/80">Loading…</div>
        </Container>
      </section>
    );

  if (error)
    return (
      <section className="py-20 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
        </div>
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Unable to load subscription packages"
          />
          <div className="text-center py-16 text-red-500">Something went wrong. Please try again later.</div>
        </Container>
      </section>
    );

  if (!packages.length)
    return (
      <section className="py-20 bg-[#f8fafc] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
        </div>
        <Container>
          <SectionHeading
            title="Subscription Packages"
            subtitle="Choose the perfect plan to accelerate your AI journey"
          />
          <div className="text-center py-16 text-[#1e40af]/80">No subscription packages found.</div>
        </Container>
      </section>
    );

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
          title="Subscription Packages"
          subtitle="Choose the perfect plan to accelerate your AI journey"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {packages.map((pkg, index) => {
            const priceText = `₹${pkg.price.toLocaleString()}`;
            const durationText = pkg.duration_days > 1 ? `${pkg.duration_days} days` : `${pkg.duration_days} day`;
            const popular = index === 0 && packages.length > 1;
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
                <div className="flex-grow" />
                <motion.div
                  className="mt-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => handleBuy(pkg)}
                    disabled={paying === pkg.id}
                    className="w-full bg-[#3b82f6] text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {paying === pkg.id ? 'Processing...' : `Buy for ₹${pkg.price}`}
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