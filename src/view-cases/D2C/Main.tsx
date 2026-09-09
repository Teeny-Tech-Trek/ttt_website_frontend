import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  Package,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  Zap,
  Star,
  ShieldCheck,
  Globe,
  Database,
  Layers,
  Bot,
  Eye,
  Send,
  Paperclip,
  Check,
  Calendar,
  BarChart3,
  DollarSign,
  Settings,
  Rocket,
  FileText,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';
import HashLink from '../../components/ui/SectionLink';

// Asset Imports from src/Images/d2c/
import d2cHeroImg from '../../Images/d2c/D2C.png';
import customerSupportImg from '../../Images/d2c/customer-support-chatbot.png';
import salesConversionImg from '../../Images/d2c/sales-conversion-chatbot.png';

// Framer Motion Animation Variants
const slideFromLeft = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromRight = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromTop = {
  hidden: { y: -25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const slideFromBottom = {
  hidden: { y: 25, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

interface MainD2CProps {
  onOpenChatbot?: () => void;
}

/* ------------------------------------------------------------------ */
/*  SECTION 1 — HERO SECTION (Matches Screenshot 5)                   */
/* ------------------------------------------------------------------ */

const HeroSection: React.FC<MainD2CProps> = ({ onOpenChatbot }) => {
  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenChatbot) {
      onOpenChatbot();
    } else {
      const el = document.getElementById('chatbot-action-demo');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Ambient background glow matching Screenshot 5 */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-12 left-10 w-[350px] h-[350px] bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            className="lg:col-span-6 space-y-5 sm:space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow Pill */}
            <motion.div variants={slideFromLeft}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold tracking-wide shadow-2xs">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="uppercase">AI Chatbots</span>
              </div>
            </motion.div>

            {/* Headline matching Screenshot 5 */}
            <motion.div className="space-y-3" variants={slideFromLeft}>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                Transform Your <br />
                <span className="text-blue-600">D2C Business</span> <br />
                with Intelligent <br />
                <span className="text-blue-600">AI Chatbots</span>
              </h1>
              <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
            </motion.div>

            {/* Subhead matching copy */}
            <motion.div variants={slideFromLeft}>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Automate support. Boost sales. Deliver exceptional experiences 24/7 with AI chatbots designed for direct-to-consumer brands.
              </p>
            </motion.div>

            {/* 4 Feature Checklist Items with Icons */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1" variants={slideFromLeft}>
              <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm sm:text-base">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span>24/7 Customer Support</span>
              </div>

              <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm sm:text-base">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span>Increase Conversions</span>
              </div>

              <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm sm:text-base">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4" />
                </div>
                <span>Order Tracking & Updates</span>
              </div>

              <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm sm:text-base">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span>Smarter Insights</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3" variants={slideFromLeft}>
              <button
                onClick={handleTryDemo}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md hover:shadow-lg group cursor-pointer"
              >
                <Play className="w-4 h-4 mr-2 fill-white" />
                <span>See Demo</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <HashLink
                to="/book-consultation"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-2xs group"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                <span>Talk to an Expert</span>
              </HashLink>
            </motion.div>
          </motion.div>

          {/* Right Visual Column (Matching Screenshot 5) */}
          <motion.div
            className="lg:col-span-6 relative"
            initial="hidden"
            animate="visible"
            variants={slideFromRight}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-100/60 bg-white">
                <img
                  src={d2cHeroImg}
                  alt="Transform Your D2C Business with Intelligent AI Chatbots showing 3D phone, delivery boxes, shopping cart, and side stat cards"
                  className="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Bar (Matching Screenshot 5) */}
        <motion.div
          className="mt-14 sm:mt-16 pt-8 border-t border-slate-200/80 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <p className="text-xs sm:text-sm font-bold text-slate-400 tracking-widest uppercase mb-6">
            TRUSTED BY GROWING D2C BRANDS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-700 font-bold text-lg sm:text-xl">
            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
              <span>Shopify</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Layers className="w-6 h-6 text-purple-600" />
              <span>WooCommerce</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <span>BigCommerce</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Database className="w-6 h-6 text-orange-600" />
              <span>Magento</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 2 — D2C CHATBOT SOLUTIONS (Two Horizontal Feature Cards)  */
/* ------------------------------------------------------------------ */

const D2CChatbotSolutionsSection: React.FC<MainD2CProps> = ({ onOpenChatbot }) => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Built for D2C Brands</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            D2C Chatbot <span className="text-blue-600">Solutions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Intelligent chatbot systems designed specifically for direct-to-consumer e-commerce businesses.
          </p>
        </motion.div>

        {/* 2 Feature Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Card 1: Customer Support Chatbot */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold">
                  24/7 Support
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Customer Support Chatbot
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                AI-powered chatbot that handles customer inquiries, order tracking, returns, and support tickets with instant, accurate responses.
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">24/7 Availability</strong>
                    <span className="text-slate-600 text-sm block">Round-the-clock customer support</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">Instant Responses</strong>
                    <span className="text-slate-600 text-sm block">Sub-5-second response times</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">Smart Learning</strong>
                    <span className="text-slate-600 text-sm block">Continuously improves responses</span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase: Support Chatbot Mockup */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-6">
                <img
                  src={customerSupportImg}
                  alt="Customer Support Chatbot tracking Order #12345: Placed, Shipped, Out for Delivery"
                  className="w-full h-auto object-cover max-h-80 mx-auto"
                />
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <button
                onClick={onOpenChatbot}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group cursor-pointer"
              >
                <span>Try Support Chatbot</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Sales Conversion Chatbot */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-2xs">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  +28% Sales Lift
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Sales Conversion Chatbot
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Intelligent sales assistant that delivers personalized product recommendations, handles objections, and guides customers to purchase.
              </p>

              {/* Bullet Highlights */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">Personalized Recommendations</strong>
                    <span className="text-slate-600 text-sm block">AI-driven product suggestions</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">Upselling & Cross-Selling</strong>
                    <span className="text-slate-600 text-sm block">Intelligent product bundling</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-semibold text-sm sm:text-base">Conversion Analytics</strong>
                    <span className="text-slate-600 text-sm block">Real-time sales insights</span>
                  </div>
                </div>
              </div>

              {/* Visual Showcase: Sales Conversion Mockup */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 mb-6">
                <img
                  src={salesConversionImg}
                  alt="Sales Conversion Chatbot recommending Performance Runner shoes for $89.99 with Add to Cart button"
                  className="w-full h-auto object-cover max-h-80 mx-auto"
                />
              </div>
            </div>

            {/* Action CTA */}
            <div>
              <HashLink
                to="/book-consultation"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group"
              >
                <span>Boost Sales Now</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </HashLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 3 — SEE OUR CHATBOT IN ACTION (Matches Screenshot 4)      */
/* ------------------------------------------------------------------ */

const ChatbotActionSection: React.FC = () => {
  return (
    <section id="chatbot-action-demo" className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            <span>Real Conversations. Real Results.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            See Our <span className="text-blue-600">Chatbot</span> in Action
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Watch how our AI chatbot engages customers and drives sales conversions
          </p>
        </motion.div>

        {/* 3-Column Layout Matching Screenshot 4 */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3 Feature Cards with dashed connector lines */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Natural Conversations</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Engages customers just like a human
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Product Recommendations</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Suggests the right products based on customer needs
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Drives Conversions</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Turns conversations into sales
              </p>
            </div>
          </motion.div>

          {/* Center Column: Live Demo Window (Exact Match to Screenshot 4) */}
          <motion.div
            className="lg:col-span-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Chat Header */}
              <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base leading-tight">TeenyBot Sales Assistant</div>
                    <div className="text-xs text-blue-100 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      AI Shopping Helper • Online
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-xs font-semibold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    Live Demo
                  </span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="p-4 sm:p-5 space-y-3.5 max-h-[460px] overflow-y-auto text-xs sm:text-sm bg-slate-50/50">
                {/* Bot Message 1 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tl-xs max-w-[90%] shadow-xs leading-relaxed">
                      "Hi! I'm your AI shopping assistant. I noticed you're browsing our wireless headphones. Can I help you find the perfect pair?"
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1 inline-block">TeenyBot • Just now</span>
                  </div>
                </div>

                {/* Customer Message 1 */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="text-right">
                    <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tr-xs max-w-[90%] border border-slate-200 shadow-xs text-left leading-relaxed">
                      "I'm looking for headphones under $200 with good noise cancellation."
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mr-1 inline-block">Customer • Just now</span>
                  </div>
                </div>

                {/* Bot Message 2 */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tl-xs max-w-[90%] shadow-xs leading-relaxed">
                      "Perfect! Based on your budget and preferences, I recommend our SoundMax Pro headphones. They're $179, have excellent noise cancellation, and 40-hour battery life. Plus, they come with a 30-day money-back guarantee!"
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1 inline-block">TeenyBot • Just now</span>
                  </div>
                </div>

                {/* Customer Message 2 */}
                <div className="flex items-start gap-2.5 justify-end">
                  <div className="text-right">
                    <div className="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tr-xs max-w-[90%] border border-slate-200 shadow-xs text-left leading-relaxed">
                      "That sounds great! Do you have any customer reviews?"
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mr-1 inline-block">Customer • Just now</span>
                  </div>
                </div>

                {/* Bot Message 3 with Product Recommendation */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tl-xs max-w-[90%] shadow-xs leading-relaxed">
                      "Absolutely! The SoundMax Pro has a 4.8/5 star rating from over 1,200 reviews. Customers especially love the comfort and sound quality. Want me to add it to your cart with a 10% first-time buyer discount?"
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1 inline-block">TeenyBot • Just now</span>
                  </div>
                </div>

                {/* Product Card matching Screenshot 4 */}
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm ml-0 sm:ml-9 max-w-full sm:max-w-[90%]">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm sm:text-base">SoundMax Pro</div>
                      <div className="text-blue-600 font-extrabold text-base sm:text-lg">$179</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.8</span>
                      <span className="text-slate-400 font-normal">(1,200 reviews)</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active noise cancellation</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>40-hour battery life</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-600"
                  readOnly
                  value="What colors are available?"
                />
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3 Stat Cards + Handwritten Arrow (Screenshot 4) */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-black text-slate-900">+28%</span>
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Sales Lift</h4>
              <p className="text-xs text-slate-500 mt-0.5">Driven by personalized recommendations</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-black text-slate-900">4.8<span className="text-base text-slate-400">/5</span></span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <h4 className="text-sm font-bold text-slate-900">Customer Satisfaction</h4>
              <p className="text-xs text-slate-500 mt-0.5">Based on 10,000+ real interactions</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-black text-slate-900">24/7</span>
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Always On Support</h4>
              <p className="text-xs text-slate-500 mt-0.5">Zero wait time for every customer</p>
            </div>

            {/* Handwritten callout */}
            <div className="pt-2 text-center lg:text-right">
              <span className="inline-block text-blue-800 font-serif italic text-sm font-semibold bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 shadow-2xs">
                Try it yourself! ↗
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 4 — MAXIMIZE ROI WITH SMART AUTOMATION (Screenshot 3)     */
/* ------------------------------------------------------------------ */

const SmartAutomationSection: React.FC = () => {
  const categories = [
    { name: 'Docs', icon: FileText },
    { name: 'Media', icon: Eye },
    { name: 'Audio', icon: Sparkles },
    { name: 'Web', icon: Globe },
    { name: 'Email', icon: MessageSquare },
    { name: 'Chat', icon: Bot },
    { name: 'Calls', icon: Zap },
    { name: 'Analytics', icon: BarChart3 }
  ];

  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Smarter Operations. Greater Growth.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Maximize ROI with <span className="text-blue-600">Smart Automation</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Reduce operational costs while improving customer experience and driving revenue growth
          </p>
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: 3 Feature Cards with Checkmark Circles */}
          <motion.div
            className="lg:col-span-5 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromLeft}
          >
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Smart Knowledge Base</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Import all your product catalogs, FAQs, support documents, and brand guidelines. Our chatbot learns your business inside-out.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Seamless Platform Integration</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Connect with Shopify, WooCommerce, Klaviyo, and 100+ other platforms your D2C business already uses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Rapid Deployment</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                Launch your chatbots in days, not months. Pre-trained models specifically designed for D2C businesses.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Chatbot Integration Hub (Matches Screenshot 3) */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromRight}
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg relative overflow-hidden">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Chatbot Integration Hub</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect all your business data sources
                </p>
              </div>

              {/* 8 Dark Tiles in 2 Rows of 4 on Desktop, 4 Rows of 2 on Mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#1e3a8a] text-white flex flex-col items-center justify-center text-center shadow-xs hover:bg-blue-800 transition-colors"
                    >
                      <Icon className="w-5 h-5 mb-1.5 text-blue-200" />
                      <span className="text-xs font-semibold">{cat.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Popular D2C Integrations Pills */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-3">
                  Popular D2C Integrations
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    Shopify
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    WooCommerce
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    Klaviyo
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    Mailchimp
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    Facebook Ads
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold">
                    Google Analytics
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stat Row (Matching Screenshot 3) */}
        <motion.div
          className="mt-14 pt-8 border-t border-slate-200/80"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Lower</div>
                <div className="text-sm text-slate-600 font-medium">Operational Costs</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Higher</div>
                <div className="text-sm text-slate-600 font-medium">Conversions</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">Better</div>
                <div className="text-sm text-slate-600 font-medium">Customer Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 5 — GET STARTED IN 4 SIMPLE STEPS (Screenshot 2)          */
/* ------------------------------------------------------------------ */

const GettingStartedStepsSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Setup & Configuration',
      desc: 'Connect your existing D2C platforms and configure chatbots according to your brand voice and business requirements.',
      checks: ['Connect your tools', 'Configure settings', 'Align with your brand'],
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </div>
      )
    },
    {
      num: '02',
      title: 'Knowledge Training',
      desc: 'Upload your product catalogs, FAQs, and brand guidelines. Our chatbot learns your business to provide accurate customer support.',
      checks: ['Upload your content', 'Train on your data', 'Fine-tune responses'],
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Database className="w-5 h-5" />
        </div>
      )
    },
    {
      num: '03',
      title: 'Testing & Optimization',
      desc: 'Test chatbot responses, fine-tune conversation flows, and optimize performance before going live with real customers.',
      checks: ['Test conversations', 'Optimize performance', 'Validate with real scenarios'],
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )
    },
    {
      num: '04',
      title: 'Launch & Scale',
      desc: 'Deploy your chatbots across all channels and watch your customer engagement and sales conversions grow.',
      checks: ['Go live across channels', 'Monitor performance', 'Scale with confidence'],
      icon: (
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Rocket className="w-5 h-5" />
        </div>
      )
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <Rocket className="w-3.5 h-3.5 text-blue-600" />
            <span>From Setup to Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Get Started in <span className="text-blue-600">4 Simple Steps</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our streamlined onboarding process gets your D2C chatbots up and running quickly.
          </p>
        </motion.div>

        {/* 4 Step Cards with Circular Arrow Separators between them (Screenshot 2) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex">
              <motion.div
                className="w-full bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={slideFromBottom}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                      {step.num}
                    </span>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{step.desc}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  {step.checks.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Circular arrow connector between cards on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-blue-200 text-blue-600 shadow-sm items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Central Action CTA + Tagline + Security & Handwritten Badge */}
        <div className="mt-14 text-center">
          <HashLink
            to="/book-consultation"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group"
          >
            <span>Start Your Chatbot Journey</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </HashLink>
          <div className="text-xs sm:text-sm text-slate-500 mt-2.5">
            Get up and running in days, not months.
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Enterprise-grade security</span>
            </div>

            <div className="text-blue-800 font-serif italic text-sm font-semibold bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
              Launch faster, grow bigger! ↗
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 6 — WHY CHOOSE TEENY TECH TREK (Matches Screenshot 1)     */
/* ------------------------------------------------------------------ */

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching Screenshot 1 */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideFromTop}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs font-bold tracking-wider uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Trusted Globally</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose <span className="text-blue-600">Teeny Tech Trek</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Trusted by D2C brands worldwide to deliver exceptional chatbot experiences
          </p>
        </motion.div>

        {/* 4 Stat Cards Matching Screenshot 1 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 500+ D2C Brands */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                {/* Visual illustration */}
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-200 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-blue-400 border-2 border-white"></div>
                  <div className="w-7 h-7 rounded-full bg-blue-600 border-2 border-white"></div>
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">500+</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">D2C Brands</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Trusted by fast-growing D2C brands across the globe.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50/80 px-3 py-2 rounded-xl">
              <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Global reach, local impact</span>
            </div>
          </motion.div>

          {/* Card 2: 85% Revenue Increase */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                {/* 3D-styled ascending bars */}
                <div className="flex items-end gap-1 h-6">
                  <div className="w-1.5 h-2 bg-blue-200 rounded-xs"></div>
                  <div className="w-1.5 h-4 bg-blue-400 rounded-xs"></div>
                  <div className="w-1.5 h-6 bg-blue-600 rounded-xs"></div>
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">85%</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Avg Revenue Increase</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Our chatbots help brands convert more conversations into customers.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50/80 px-3 py-2 rounded-xl">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>More conversations. More sales.</span>
            </div>
          </motion.div>

          {/* Card 3: 4.8/5 Customer Rating */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Star className="w-6 h-6 fill-blue-600/20 text-blue-600" />
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">4.8<span className="text-xl text-slate-400 font-normal">/5</span></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Customer Rating</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Loved by customers for seamless and helpful experiences.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50/80 px-3 py-2 rounded-xl">
              <Star className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Real customers. Real satisfaction.</span>
            </div>
          </motion.div>

          {/* Card 4: 7 Days Average Setup */}
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={slideFromBottom}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                {/* 3D calendar illustration */}
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="text-4xl font-black text-slate-900 tracking-tight mb-1">7 Days</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Average Setup Time</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Get your chatbot up and running in days, not months.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50/80 px-3 py-2 rounded-xl">
              <Zap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Launch faster. Grow sooner.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION 7 — FINAL CLOSING CTA                                      */
/* ------------------------------------------------------------------ */

const FinalClosingCTASection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={slideFromTop} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Supercharge Your Store
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4"
            variants={slideFromTop}
          >
            Ready to Supercharge Your D2C Store{' '}
            <span className="text-blue-600">with AI?</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8"
            variants={slideFromBottom}
          >
            Join 500+ fast-growing D2C brands automating support, boosting sales conversions, and delighting customers 24/7 with Teeny Tech Trek.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={slideFromBottom}
          >
            <HashLink
              to="/book-consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 transition-all shadow-md group"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </HashLink>

            <HashLink
              to="/pilot"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-base hover:border-blue-600 hover:text-blue-600 transition-all shadow-2xs"
            >
              <span>Request a Pilot</span>
            </HashLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT COMPONENT FOR /ecommerce (D2C)                        */
/* ------------------------------------------------------------------ */

const MainD2C: React.FC<MainD2CProps> = ({ onOpenChatbot }) => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection onOpenChatbot={onOpenChatbot} />
      <D2CChatbotSolutionsSection onOpenChatbot={onOpenChatbot} />
      <ChatbotActionSection />
      <SmartAutomationSection />
      <GettingStartedStepsSection />
      <WhyChooseSection />
      <FinalClosingCTASection />
    </div>
  );
};

export default MainD2C;