import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import AgenticWorkflowsImg from "../../Images/Extra Resources - Hero Page/WhatsApp Image 2025-09-22 at 10.31.55 PM.jpeg";


const loadCalendly = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("calendly-sdk")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "calendly-sdk";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Calendly SDK");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-sdk")) {
      return resolve(true);
    }
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
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
    id: "d0f1c2a3-b456-4c78-9abc-def123456789",
    name: "DIY Audit Kit",
    description: "Best for browsing, early scoping, sharing with your team.",
    price: 0,
    duration: 0,
    for: "Anyone",
    ledBy: "Self-guided",
    deliverables: [
      "AI Readiness Audit (Lite) 8-page PDF checklist",
      "Ops Inventory Sheet (CSV) log top 10 processes",
      "3 sample prompts to test your data",
    ],
    followUp: "Optional email tips (48–72h)",
    cta: "Get your free audit",
    schemaType: "Product",
  },
  {
    id: "3b9320e7-8bc5-479d-9a42-b9ab2fc1afa9",
    name: "Strategy Call",
    description: "Best for founders/solo operators who want a crisp plan now.",
    price: 1200,
    duration: 45,
    for: "Founder",
    ledBy: "Anisha (Founder & Product/AI)",
    deliverables: [
      "1-page plan (PDF) goal, stack, 2–3 next actions",
      "Mini prompt pack 3 starter prompts",
      "Loom recap (5–7 min) next 2 weeks",
    ],
    followUp: "7 days email support",
    cta: "Book the 45-min call",
    schemaType: "Product",
    mostBooked: true,
  },
  {
    id: "c46c37e2-de78-4443-abb2-12589fad1a5b",
    name: "Audit & Roadmap",
    description: "Best for service studios/marketing agencies adding AI.",
    price: 2100,
    duration: 90,
    for: "Agencies",
    ledBy: "Anisha + Lead AI Architect",
    deliverables: [
      "Roadmap (PDF, 2–3 pages) 90-day plan, pilot scope",
      "Integration notes HubSpot/Zapier/Make/Sheets",
      "Guardrails sheet what not to ship",
    ],
    followUp: "14 days async Q&A (email/WhatsApp)",
    cta: "Schedule the 90-min audit",
    schemaType: "Product",
    mostBooked: true,
  },
  {
    id: "6a71c226-d189-4f92-89df-c3896c25fc6c",
    name: "Strategy Workshop",
    description: "Best for teams with multiple stakeholders and compliance needs.",
    price: 9500,
    duration: 120,
    for: "Teams",
    ledBy: "Anisha + Lead AI Architect",
    deliverables: [
      "Executive brief (PDF, 3–5 pages) objectives, KPIs",
      "Reference architecture diagram, auth & logging",
      "Budget & timeline bands pilot to run costs",
      "Risk register & mitigation data, safety",
    ],
    followUp: "30 days async Q&A + 1 30-min call",
    cta: "Book the 120-min workshop",
    schemaType: "Product",
  },
];

const addOns = [
  { id: "roi", name: "ROI calculator deep-dive", price: 500 },
  { id: "pitch", name: "Proposal/pitch deck skeleton", price: 300 },
  { id: "case", name: "Case study pack", price: 400 },
  { id: "security", name: "Security mini-review", price: 600 },
  { id: "backlog", name: "Pre-pilot backlog", price: 350 },
];

const SubscriptionPricing: React.FC = () => {
  const { user, accessToken, loading } = useAuth();
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showFormFor, setShowFormFor] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    goals: "",
    tools: "",
    dataSources: "",
    mustHaveOutcome: "",
  });

  useEffect(() => {
    loadCalendly();
    loadRazorpay();
  }, []);

  const validateForm = () => {
    if (!formData.goals || !formData.tools || !formData.dataSources || !formData.mustHaveOutcome) {
      setError("Please fill out all required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddOnChange = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]
    );
    window.dataLayer?.push({ event: "consult_addon_select", addon: addOns.find((addOn) => addOn.id === addOnId)?.name });
  };

  const calculateTotal = (pkg: typeof packages[0]) => {
    const basePrice = typeof pkg.price === "number" ? pkg.price : 0;
    const addOnTotal = addOns
      .filter((addOn) => selectedAddOns.includes(addOn.id))
      .reduce((sum, addOn) => sum + addOn.price, 0);
    return basePrice + addOnTotal;
  };

  const handleBookClick = (pkg: typeof packages[0]) => {
    if (!user || !accessToken) {
      navigate("/");
      toast("Please sign in to continue booking!");
      return;
    }
    if (pkg.price === 0) {
      setLoadingAction(pkg.id);
      window.dataLayer?.push({ event: "consult_file_download", file: "audit_kit" });
      toast.success("Get ready for the AI Readiness Audit!");
           navigate("/auditform");
      setLoadingAction(null);
      return;
    }
    if (showFormFor === pkg.id) {
      setShowFormFor(null);
      setSelectedAddOns([]);
    } else {
      setShowFormFor(pkg.id);
      setError("");
      setFormData({ goals: "", tools: "", dataSources: "", mustHaveOutcome: "" });
      setSelectedAddOns([]);
      window.dataLayer?.push({ event: "consult_tier_select", tier: pkg.name });
    }
  };

const handleFormSubmit = async (pkg: typeof packages[0]) => {
  if (!user || !accessToken) {
    navigate("/login");
    toast("Please sign in to continue booking!");
    return;
  }

  if (!validateForm()) return;

  setLoadingAction(pkg.id);
  window.dataLayer?.push({ event: "calendly_open", tier: pkg.name });

  try {
    // 1️⃣ Create Razorpay order
    const orderResponse = await fetch("https://api.teenytechtrek.com/consultations/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        package_id: pkg.id,
        add_ons: selectedAddOns,
        form_data: formData,
        total_amount: calculateTotal(pkg),
      }),
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      throw new Error(errorData.message || "Failed to create payment order.");
    }

    const { orderId, key, amount, currency } = await orderResponse.json();

    // 2️⃣ Razorpay payment options
    const options = {
      key,
      amount: amount * 100, // Razorpay expects paise
      currency,
      name: "TeenyTechTrek",
      description: `${pkg.name} Consultation`,
      order_id: orderId,
      prefill: {
        name: user?.username || "",
        email: user?.email || "",
      },
      theme: { color: "#2563EB" },

      // 3️⃣ Payment success handler
      handler: async (response: any) => {
        try {
          const bookingRes = await fetch("https://api.teenytechtrek.com/consultations/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              package_id: pkg.id,
              add_ons: selectedAddOns,
              form_data: formData,
              total_amount: calculateTotal(pkg),
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (!bookingRes.ok) {
            const errorData = await bookingRes.json();
            throw new Error(errorData.message || "Booking failed. Please try again.");
          }

          window.dataLayer?.push({ event: "calendly_booked", tier: pkg.name });
          toast.success("Booking confirmed! Check your email for confirmation.");

          // Reset form & UI
          setShowFormFor(null);
          setFormData({ goals: "", tools: "", dataSources: "", mustHaveOutcome: "" });
          setSelectedAddOns([]);
        } catch (err: any) {
          setError(err.message || "Booking failed. Please try again.");
        }
      },

      // Optional: handle payment failures
      modal: {
        ondismiss: () => {
          setError("Payment was cancelled.");
        },
      },
    };

    // 4️⃣ Open Razorpay checkout
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err: any) {
    setError(err.message || "Failed to create payment order.");
  } finally {
    setLoadingAction(null);
  }
};


  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/50" />
      <Container className="relative z-10">
        <SectionHeading
          title="Pick the consultation that fits you"
          subtitle="From a free DIY audit to a deep-dive workshop—every tier ends with a clear, practical action plan."
         
        />
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl px-4 py-3 mx-auto mb-6 font-medium text-center text-red-500 rounded-lg bg-red-50"
          >
            {error}
          </motion.div>
        )}
        
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {packages.map((pkg) => {
            const priceText = pkg.price === 0 ? "Free" : `₹${pkg.price.toLocaleString()}`;
            return (
              <motion.div 
                key={pkg.id}
                variants={itemVariants}
                className={`relative bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col transition-all hover:shadow-lg hover:border-blue-100 ${
                  pkg.mostBooked ? "ring-2 ring-blue-500 shadow-md" : ""
                }`}
                itemScope
                itemType="http://schema.org/Product"
              >
                {pkg.mostBooked && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-1.5 rounded-full text-xs font-medium shadow-md"
                  >
                    Most Booked
                  </motion.span>
                )}
                
                <meta itemProp="name" content={pkg.name} />
                <meta itemProp="description" content={pkg.description} />
                {pkg.price !== 0 && <meta itemProp="price" content={pkg.price.toString()} />}
                {pkg.duration !== 0 && <meta itemProp="duration" content={`PT${pkg.duration}M`} />}
                
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="mb-4 text-sm text-gray-600">{pkg.description}</p>
                  <div className="space-y-1.5">
                    <p className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-1.5">For:</span> {pkg.for}
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-1.5">Led by:</span> {pkg.ledBy}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="mb-1 text-3xl font-bold text-gray-900">
                    {priceText}
                    {pkg.duration > 0 && (
                      <span className="text-base text-gray-500 font-medium ml-1.5">
                        / {pkg.duration} mins
                      </span>
                    )}
                  </div>
                </div>
                
                <ul className="text-left text-gray-700 mb-8 space-y-3.5">
                  {pkg.deliverables.map((deliverable, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{deliverable}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 pt-2 border-t border-gray-100">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm"><span className="font-medium">Follow-up:</span> {pkg.followUp}</span>
                  </li>
                </ul>
                
                {showFormFor === pkg.id && pkg.price > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 mb-6 space-y-5 border border-gray-200 rounded-lg bg-gray-50"
                  >
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Your Goals
                      </label>
                      <input
                        type="text"
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                        placeholder="What do you want to achieve?"
                        className="w-full p-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Current Tools
                      </label>
                      <input
                        type="text"
                        value={formData.tools}
                        onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                        placeholder="List tools you currently use"
                        className="w-full p-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Data Sources
                      </label>
                      <input
                        type="text"
                        value={formData.dataSources}
                        onChange={(e) => setFormData({ ...formData, dataSources: e.target.value })}
                        placeholder="What data sources do you have?"
                        className="w-full p-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Must-Have Outcome
                      </label>
                      <input
                        type="text"
                        value={formData.mustHaveOutcome}
                        onChange={(e) => setFormData({ ...formData, mustHaveOutcome: e.target.value })}
                        placeholder="What's your key outcome?"
                        className="w-full p-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <label className="block mb-3 text-sm font-medium text-gray-700">
                        Optional Add-Ons
                      </label>
                      <div className="space-y-2">
                        {addOns.map((addOn) => (
                          <div key={addOn.id} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`${pkg.id}-${addOn.id}`}
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => handleAddOnChange(addOn.id)}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`${pkg.id}-${addOn.id}`} className="text-sm text-gray-700">
                              {addOn.name} (₹{addOn.price})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-3 text-lg font-semibold text-gray-900 border-t border-gray-200">
                      Total: ₹{calculateTotal(pkg).toLocaleString()}
                    </div>
                    
                    <button
                      onClick={() => handleFormSubmit(pkg)}
                      disabled={loadingAction === pkg.id}
                      className="w-full px-6 py-3 font-medium text-white transition-colors bg-blue-900 rounded-lg shadow-sm hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingAction === pkg.id ? "Processing..." : "Confirm Booking"}
                    </button>
                  </motion.div>
                )}
                
              // Find this section in your code (around line 340-365) and replace it with this:

<div className="pt-4 mt-auto">
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <button
      onClick={() => handleBookClick(pkg)}
      disabled={loadingAction === pkg.id}
      className={`w-full h-12 px-3 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center ${
        pkg.mostBooked
          ? "bg-blue-900 text-white hover:bg-blue-700 shadow-md"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
      } disabled:opacity-70 disabled:cursor-not-allowed`}
    >
      <span className="leading-tight text-center">
        {loadingAction === pkg.id ? "Processing..." : pkg.cta}
      </span>
    </button>
  </motion.div>
  
  <div className="flex flex-wrap justify-center gap-2 mt-4">
  <span className={`bg-blue-100 text-blue-800 rounded-full ${pkg.price > 0 ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
    Founder-led
  </span>
  <span className={`bg-blue-100 text-blue-800 rounded-full ${pkg.price > 0 ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'}`}>
    PDF deliverable
  </span>

    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
      Fee credited to pilot
    </span>

</div>
</div>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="mt-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Book a time that works for you
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-lg leading-relaxed text-gray-600">
            All times shown in your local time. Bookings include a calendar invite with Google Meet link. 
            Reschedule up to 24h before your slot.
          </p>
          <p className="mt-6 text-lg text-gray-600">
            Can't use the widget? Email us at{" "}
            <a href="mailto:anisha.singla@teenytechtrek.com" className="font-medium text-blue-900 hover:underline">
              anisha.singla@teenytechtrek.com
            </a>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="mt-20"
        >
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                Can we apply the consultation fee to a pilot?
              </h3>
              <p className="text-gray-600">
                Yes—credit 100% of your consultation toward a 4-week Pilot if you start within 30 days.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">What if we need to reschedule?</h3>
              <p className="text-gray-600">
                You can reschedule up to 24 hours before the slot—link in your invite.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Do you sign NDAs?</h3>
              <p className="text-gray-600">
                Yes. We can sign a mutual NDA before the session if required.
              </p>
            </div>
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Will you sell us a generic chatbot?</h3>
              <p className="text-gray-600">
                No. The goal is a clear, specific plan that fits your stack and constraints.
              </p>
            </div>
            <div >
              <img src={AgenticWorkflowsImg} alt="AgenticWorkflowsImg" className="rounded-xl" />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default SubscriptionPricing;