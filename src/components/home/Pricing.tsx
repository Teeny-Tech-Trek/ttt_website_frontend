import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

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
    id: "starter1",
    name: "Starter Strategy Call",
    description: "Unlock the potential of AI for your business in just 45 minutes.",
    price: 1200,
    duration: "45 mins",
    benefits: [
      "A clear understanding of how AI fits into your business",
      "Tactical quick wins you can implement fast",
      "A no-fluff roadmap for future AI adoption",
      "Guidance on ROI and effort vs. impact",
      "A curated resource pack to take things forward",
    ],
  },
  {
    id: "ai1",
    name: "AI Readiness Audit",
    description: "A 90-minute deep-dive designed for business owners.",
    price: 2100,
    duration: "90 mins",
    benefits: [
      "A thorough consultation uncovering process bottlenecks",
      "An objective AI readiness score across your operations",
      "A customized 3-month action plan",
      "A detailed PDF report with tool recommendations",
      "Expert insight into integration feasibility and ROI",
    ],
  },
  {
    id: "custom1",
    name: "Custom AI Roadmap",
    description: "Turn your AI vision into a ready-to-execute plan.",
    price: "Custom",
    duration: "Custom",
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
  const [paying, setPaying] = useState<string | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleBuy = async (pkg: typeof packages[0]) => {
    if (!user || !accessToken) {
      navigate("/login");
      toast("Please sign in to continue booking!");
      return;
    }

    if (pkg.price === "Custom") {
      navigate("/contact");
      return;
    }

    if (!email || !validateEmail(email)) {
      setPaymentError("Please enter a valid email address.");
      setShowForm(pkg.id);
      return;
    }

    if (!selectedDateTime) {
      setPaymentError("Please select a date and time.");
      setShowForm(pkg.id);
      return;
    }

    setPaymentError("");
    setPaying(pkg.id);

    try {
      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) throw new Error("Failed to load Razorpay SDK");

      // 1. Create Razorpay order
      const orderResponse = await api.post(
        "/orders/create-order",
        { package_id: pkg.id, amount: pkg.price },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const { razorpayOrderId, dbOrderId } = orderResponse.data;
      const durationMinutes = pkg.duration === "45 mins" ? 45 : 90;

      // 2. Initialize Razorpay payment
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
amount: Number(pkg.price) * 100,

        currency: "INR",
        name: "Teeny Tech Trek",
        description: pkg.name,
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            // 3. Verify payment
            await api.post(
              "/orders/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                db_order_id: dbOrderId
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            // 4. Create calendar event
            await api.post(
              "/calendar/create-event",
              {
                startDateTime: selectedDateTime.toISOString(),
                endDateTime: new Date(
                  selectedDateTime.getTime() + durationMinutes * 60000
                ).toISOString(),
                attendeeEmail: email,
                summary: `${pkg.name} Booking`,
                description: `Scheduled consultation for ${pkg.name}`
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            toast.success(
              `Booking confirmed! Check your email for calendar invite.`,
              { duration: 5000 }
            );
            navigate("/orders");
          } catch (error) {
            console.error("Payment processing error:", error);
            toast.error("Payment verification failed. Please contact support.");
          } finally {
            setPaying(null);
          }
        },
        prefill: { email },
        theme: { color: "#3b82f6" },
        modal: {
          ondismiss: () => {
            setPaying(null);
            toast("Payment window closed");
          }
        }
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error:any) {
      console.error("Order creation error:", error);
      setPaymentError(error.response?.data?.error || "Payment initiation failed");
      setPaying(null);
    }
  };

  const handleFormSubmit = (pkgId: string) => {
    if (!email || !validateEmail(email)) {
      setPaymentError("Please enter a valid email address.");
      return;
    }
    if (!selectedDateTime) {
      setPaymentError("Please select a date and time.");
      return;
    }
    setShowForm(null);
    const pkg = packages.find((p) => p.id === pkgId);
    if (pkg) handleBuy(pkg);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  if (loading) return <div>Loading...</div>;

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
            const priceText = typeof pkg.price === "number" ? `₹${pkg.price.toLocaleString()}` : pkg.price;
            const durationText = pkg.duration;
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
                    className={`inline-block w-6 h-6 rounded-full ${popular ? "bg-[#93c5fd]/20 text-[#3b82f6]" : "bg-[#93c5fd]/10 text-[#1e40af]/80"} flex items-center justify-center animate-pulse-slow`}
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
                {showForm === pkg.id && (
                  <div className="mb-4 space-y-4">
                    <div>
                      <label className="block text-[#1e40af] mb-2">Your Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-lg text-[#1e40af]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1e40af] mb-2">Select Date and Time (IST)</label>
                      <DatePicker
                        selected={selectedDateTime}
                        onChange={(date: Date | null) => setSelectedDateTime(date)}
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        minDate={new Date()}
                        minTime={new Date(new Date().setHours(9, 0, 0))}
                        maxTime={new Date(new Date().setHours(18, 0, 0))}
                        className="w-full p-2 border rounded-lg text-[#1e40af]"
                        placeholderText="Choose a date and time"
                      />
                    </div>
                    <button
                      onClick={() => handleFormSubmit(pkg.id)}
                      disabled={!selectedDateTime || !email}
                      className="w-full bg-[#3b82f6] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}
                <div className="flex-grow" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => {
                      if (typeof pkg.price === "number") {
                        if (!user) {
                          navigate("/login");
                          return;
                        }
                        handleBuy(pkg);
                      } else {
                        const el = document.querySelector("#contact");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    disabled={paying === pkg.id}
                    className="w-full bg-[#3b82f6] text-white py-3 px-8 rounded-xl text-lg font-semibold shadow-md hover:bg-[#1e40af] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {paying === pkg.id ? 'Processing...' : typeof pkg.price === "number" ? `Book for ₹${pkg.price}` : 'Contact for Quote'}
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