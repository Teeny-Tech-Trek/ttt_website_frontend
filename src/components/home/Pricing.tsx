// src/components/SubscriptionPricing.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const packages = [
  {
    id: "3b9320e7-8bc5-479d-9a42-b9ab2fc1afa9",
    name: "Starter Strategy Call",
    description: "Unlock the potential of AI for your business in just 45 minutes.",
    price: 1,
    duration: 45, // minutes
    benefits: [
      "A clear understanding of how AI fits into your business",
      "Tactical quick wins you can implement fast",
      "A no-fluff roadmap for future AI adoption",
      "Guidance on ROI and effort vs. impact",
      "A curated resource pack to take things forward",
    ],
  },
  {
    id: "c46c37e2-de78-4443-abb2-12589fad1a5b",
    name: "AI Readiness Audit",
    description: "A 90-minute deep-dive designed for business owners.",
    price: 2100,
    duration: 90,
    benefits: [
      "A thorough consultation uncovering process bottlenecks",
      "An objective AI readiness score across your operations",
      "A customized 3-month action plan",
      "A detailed PDF report with tool recommendations",
      "Expert insight into integration feasibility and ROI",
    ],
  },
  {
    id: "6a71c226-d189-4f92-89df-c3896c25fc6c",
    name: "Custom AI Roadmap",
    description: "Turn your AI vision into a ready-to-execute plan.",
    price: "Custom",
    duration: 0,
    benefits: [
      "In-depth analysis of your workflows",
      "A custom AI implementation plan",
      "A technical requirements document",
      "Recommended tools and platforms",
      "Defined timeline and milestones",
      "Risk mitigation strategies",
      "A team training outline",
    ],
  },
];

const SubscriptionPricing: React.FC = () => {
  const { user, accessToken, loading } = useAuth();
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [paymentError, setPaymentError] = useState("");
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [showFormFor, setShowFormFor] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleFormSubmit = (pkg: typeof packages[0]) => {
    // Validate before proceeding
    if (!email || !validateEmail(email)) {
      setPaymentError("Please enter a valid email address.");
      return;
    }
    if (!selectedDateTime) {
      setPaymentError("Please select a date and time.");
      return;
    }
    setPaymentError("");
    // Proceed to payment
    initiatePayment(pkg);
  };

  const initiatePayment = async (pkg: typeof packages[0]) => {
    setLoadingPayment(pkg.id);
    try {
      // 1. Load Razorpay SDK
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) throw new Error("Failed to load Razorpay SDK");

      // 2. Create Razorpay order on backend
      const orderResponse = await api.post(
        "/orders/create-order",
        { package_id: pkg.id, amount: pkg.price },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const { razorpayOrderId } = orderResponse.data;

      // 3. Open Razorpay checkout
      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Number(pkg.price) * 100, // in paise
        currency: "INR",
        name: "Your Business Name",
        description: pkg.name,
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          // Called on successful payment
          try {
            await api.post(
              "/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            // Optionally: create calendar event
            try {
              await api.post(
                "/calendar/create-event",
                {
                  startDateTime: selectedDateTime!.toISOString(),
                  endDateTime: new Date(
                    selectedDateTime!.getTime() + pkg.duration * 60000
                  ).toISOString(),
                  attendeeEmail: email,
                  summary: `${pkg.name} Booking`,
                  description: `Scheduled consultation for ${pkg.name}`,
                },
                { headers: { Authorization: `Bearer ${accessToken}` } }
              );
            } catch (calErr) {
              console.warn("Calendar creation failed:", calErr);
            }
            toast.success("Booking confirmed! Check your email/calendar.", { duration: 5000 });
            navigate("/orders");
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setLoadingPayment(null);
            setShowFormFor(null);
          }
        },
        prefill: { email },
        theme: { color: "#3b82f6" },
        modal: {
          ondismiss: () => {
            setLoadingPayment(null);
            toast("Payment window closed");
          },
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Order creation/initiation error:", error);
      const msg =
        error.response?.data?.error ||
        error.message ||
        "Payment initiation failed";
      setPaymentError(msg);
      setLoadingPayment(null);
    }
  };

  const onBookClick = (pkg: typeof packages[0]) => {
    if (!user || !accessToken) {
      navigate("/login");
      toast("Please sign in to continue booking!");
      return;
    }
    if (pkg.price === "Custom") {
      // Navigate to contact or show contact form
      navigate("/contact");
      return;
    }
    // Toggle form display
    if (showFormFor === pkg.id) {
      // already showing form; maybe user changed mind: close it
      setShowFormFor(null);
    } else {
      setShowFormFor(pkg.id);
      // Reset previous inputs/errors
      setPaymentError("");
      setEmail("");
      setSelectedDateTime(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="py-20 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-80" />
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-[#93c5fd]/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#3b82f6]/30 rounded-full blur-xl"
      />
      <Container className="relative z-10">
        <SectionHeading
          title="Book Consultation"
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
            const priceText =
              typeof pkg.price === "number"
                ? `₹${pkg.price.toLocaleString()}`
                : pkg.price;
            const popular = index === 0;
            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-lg p-8 text-center border-2 flex flex-col"
              >
                {popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-4 left-[8.5rem] -translate-x-1/2 bg-[#3b82f6] text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.span
                    className={`inline-block w-6 h-6 rounded-full ${
                      popular
                        ? "bg-[#93c5fd]/20 text-[#3b82f6]"
                        : "bg-[#93c5fd]/10 text-[#1e40af]/80"
                    } flex items-center justify-center animate-pulse-slow`}
                  >
                    <Check size={18} />
                  </motion.span>
                  <span className="text-lg font-semibold text-[#1e40af]">
                    {pkg.name}
                  </span>
                </div>
                <div className="text-[#1e40af]/80 mb-3">
                  {pkg.description}
                </div>
                <div className="text-3xl font-bold mb-1 text-[#1e40af]">
                  {priceText}
                  {typeof pkg.price === "number" && (
                    <span className="text-lg text-[#1e40af]/80 font-medium ml-1">
                      / {pkg.duration} mins
                    </span>
                  )}
                </div>
                <ul className="text-left text-[#1e40af]/80 mb-6">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-1 text-[#3b82f6]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {showFormFor === pkg.id && typeof pkg.price === "number" && (
                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="block text-[#1e40af] mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-lg text-[#1e40af]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1e40af] mb-2">
                        Select Date and Time (IST)
                      </label>
                      <DatePicker
                        selected={selectedDateTime}
                        onChange={(date: Date | null) =>
                          setSelectedDateTime(date)
                        }
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        // Optionally restrict time window:
                        filterTime={(time) => {
                          const hour = time.getHours();
                          return hour >= 9 && hour <= 18;
                        }}
                        className="w-full p-2 border rounded-lg text-[#1e40af]"
                        placeholderText="Choose a date and time"
                      />
                    </div>
                    <button
                      onClick={() => handleFormSubmit(pkg)}
                      disabled={!selectedDateTime || !email || loadingPayment===pkg.id}
                      className="w-full bg-[#3b82f6] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingPayment === pkg.id
                        ? 'Processing...'
                        : `Proceed to Payment`}
                    </button>
                  </div>
                )}

                <div className="flex-grow" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => onBookClick(pkg)}
                    disabled={loadingPayment === pkg.id}
                    className="w-full bg-[#3b82f6] text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loadingPayment === pkg.id
                      ? 'Processing...'
                      : typeof pkg.price === "number"
                      ? (showFormFor === pkg.id ? "Cancel" : `Book for ₹${pkg.price}`)
                      : 'Contact for Quote'}
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="mt-16 text-center"
        >
          <p className="text-[#1e40af]/80 mb-4">
            Need a custom solution? We've got you covered.
          </p>
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
