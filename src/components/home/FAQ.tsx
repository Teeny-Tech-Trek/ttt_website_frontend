import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Container from "../ui/Container";
import AgenticWorkflowsImg from "../../Images/Extra Resources - Hero Page/WhatsApp Image 2025-09-22 at 10.31.55 PM.jpeg";

const faqs = [
  {
    question: "Can we apply the consultation fee to a pilot?",
    answer:
      "Yes—credit 100% of your consultation toward a 4-week Pilot if you start within 30 days.",
  },
  {
    question: "What if we need to reschedule?",
    answer: "You can reschedule up to 24 hours before the slot—link in your invite.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes. We can sign a mutual NDA before the session if required.",
  },
  {
    question: "Will you sell us a generic chatbot?",
    answer: "No. The goal is a clear, specific plan that fits your stack and constraints.",
  },
];

const FAQ: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/50" />
      <Container className="relative z-10">
        <motion.div
          id="faq"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="max-w-4xl px-6 py-10 mx-auto mb-12 border border-gray-100 rounded-2xl">
            <img src={AgenticWorkflowsImg} alt="Agentic Workflows" className="rounded-xl" />
          </div>

          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl"
              >
                <h3 className="mb-3 text-xl font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default FAQ;
