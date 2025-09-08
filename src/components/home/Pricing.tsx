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
    price: 1200,
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
            navigate("/");
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.success("Booking confirmed! Check your email/calendar.", { duration: 5000 });
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
    <section className="py-6 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/50" />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-blue-300/30 rounded-full blur-xl"
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
                className={`relative bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100 flex flex-col transition-all hover:shadow-md hover:border-blue-100 ${
                  popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {pkg.description}
                  </p>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {priceText}
                    {typeof pkg.price === "number" && (
                      <span className="text-base text-gray-500 font-medium ml-1">
                        / {pkg.duration} mins
                      </span>
                    )}
                  </div>
                </div>
                <ul className="text-left text-gray-700 mb-6 space-y-3">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {showFormFor === pkg.id && typeof pkg.price === "number" && (
                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">
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
                        filterTime={(time) => {
                          const hour = time.getHours();
                          return hour >= 9 && hour <= 18;
                        }}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                        placeholderText="Choose a date and time"
                      />
                    </div>
                    <button
                      onClick={() => handleFormSubmit(pkg)}
                      disabled={!selectedDateTime || !email || loadingPayment===pkg.id}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingPayment === pkg.id
                        ? 'Processing...'
                        : `Proceed to Payment`}
                    </button>
                  </div>
                )}

                <div className="flex-grow" />
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button
                    onClick={() => onBookClick(pkg)}
                    disabled={loadingPayment === pkg.id}
                    className={`w-full py-3 px-6 rounded-lg text-base font-medium transition-colors duration-200 ${
                      popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } shadow-sm disabled:opacity-70 disabled:cursor-not-allowed`}
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
          <p className="text-gray-600 mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default SubscriptionPricing;