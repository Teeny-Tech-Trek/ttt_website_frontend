// src/components/SubscriptionPricing.tsx

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
    return () => { isMounted = false; };
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

    // Prepare amount in paise for Razorpay
    const amountPaise = pkg.price * 100;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountPaise,
      currency: "INR",
      name: "Teeny Tech Trek",
      description: pkg.description || pkg.name,
      // image: '...', // Optional: logo
      handler: async function (response: any) {
        try {
          // Send payment info to backend for verification & to create your order record
          await api.post(
            '/orders/verify', // <-- create this endpoint on your backend
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
      prefill: {

      },
      notes: {
        package_id: pkg.id,
      },
      theme: { color: "#1976d2" }
    };

    // @ts-ignore
    const razorpay = new window.Razorpay(options);
    razorpay.open();
    setPaying(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading title="Subscription Packages" subtitle="Loading subscription packages…" />
        <div className="text-center py-16 text-gray-600">Loading…</div>
      </Container>
    </section>
  );
  if (error) return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading title="Subscription Packages" subtitle="Unable to load subscription packages" />
        <div className="text-center py-16 text-red-500">Something went wrong. Please try again later.</div>
      </Container>
    </section>
  );
  if (!packages.length) return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading title="Subscription Packages" subtitle="Choose the perfect plan to accelerate your AI journey" />
        <div className="text-center py-16 text-gray-600">No subscription packages found.</div>
      </Container>
    </section>
  );

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading title="Subscription Packages" subtitle="Choose the perfect plan to accelerate your AI journey" />
        {paymentError && (
          <div className="text-center text-red-500 mb-4">{paymentError}</div>
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
                className={`relative bg-white rounded-2xl shadow-lg p-8 text-center border-2 flex flex-col
                  ${popular ? "border-blue-700" : "border-gray-200"}
                `}
              >
                {popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-700 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">
                    Most Popular
                  </span>
                )}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className={`inline-block w-6 h-6 rounded-full ${popular ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'} flex items-center justify-center`}>
                    <Check size={18} />
                  </span>
                  <span className="text-lg font-semibold">{pkg.name}</span>
                </div>
                <div className="text-gray-500 mb-3">{pkg.description}</div>
                <div className="text-3xl font-bold mb-1 text-blue-700">{priceText}
                  <span className="text-lg text-gray-600 font-medium ml-1">/ {durationText}</span>
                </div>
                <div className="flex-grow" />
                <div className="mt-4">
                  <button
                    onClick={() => handleBuy(pkg)}
                    disabled={paying === pkg.id}
                    className="bg-blue-700 text-white py-3 px-8 rounded-xl text-lg font-semibold shadow hover:bg-blue-800 transition disabled:opacity-70"
                  >
                    {paying === pkg.id ? 'Processing...' : `Buy for ₹${pkg.price}`}
                  </button>
                </div>
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
          <p className="text-gray-600 mb-4">Need a custom solution? We've got you covered.</p>
          <a href="#contact" className="btn btn-primary inline-flex items-center gap-2">Contact Us <Check size={16} /></a>
        </motion.div>
      </Container>
    </section>
  );
};

export default SubscriptionPricing;
