import { motion } from 'framer-motion';
import { Cpu, CheckCircle2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const AiAppsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23bfdbfe%22 fill-opacity=%220.3%22/%3E%3C/svg%3E')] opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Cpu className="text-blue-600" size={28} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Build Smarter with Lightweight AI Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Rapidly deploy AI-powered tools and micro-SaaS solutions tailored to your business needs.
            </p>
            <HashLink smooth to="/#contact">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </motion.button>
            </HashLink>
          </motion.div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Our AI-Powered Solutions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Internal Tools',
                  description: 'Streamline operations with custom AI utilities designed for your team.',
                  features: [
                    'AI-driven research assistants',
                    'Automated reporting dashboards',
                    'Internal Q&A bots for Notion/Google Drive',
                    'AI task management panels',
                  ],
                  bestFor: 'Startups, operations teams, agencies',
                },
                {
                  title: 'Client Portals',
                  description: 'Elevate client experiences with AI-enhanced, no-code portals.',
                  features: [
                    'Document upload with AI insights',
                    'Personalized client dashboards',
                    'Lead intelligence for sales teams',
                    'Self-service AI tools (e.g., clause checkers)',
                  ],
                  bestFor: 'Agencies, consultants, service providers',
                },
                {
                  title: 'Product Prototypes',
                  description: 'Launch AI-driven MVPs to validate your product ideas quickly.',
                  features: [
                    'AI chat apps with Streamlit/Chainlit',
                    'SaaS dashboards with Stripe integration',
                    'Agent-based analysis systems',
                    'RAG-powered knowledge bases',
                  ],
                  bestFor: 'Founders, indie hackers, early-stage startups',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={cardHoverVariants.hover}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={18} />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500 italic">{`Best for: ${item.bestFor}`}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Our Technology Stack
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  title: 'Frameworks & Tools',
                  items: [
                    'Streamlit',
                    'Chainlit',
                    'FastAPI',
                    'Flask',
                    'LangChain',
                    'GPT-4 API',
                    'Pinecone',
                    'Supabase',
                    'Firebase',
                    'HuggingFace',
                  ],
                },
                {
                  title: 'Integrations',
                  items: [
                    'Notion API',
                    'Slack',
                    'Stripe',
                    'Google Drive',
                    'Airtable',
                    'Twilio',
                    'Zapier',
                    'Webflow',
                    'Discord',
                  ],
                },
              ].map((section, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">{section.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {section.items.map((item) => (
                      <motion.span
                        key={item}
                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                        whileHover={{ scale: 1.1, backgroundColor: '#bfdbfe' }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Proven Success Stories
            </motion.h2>
            <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
              <ul className="space-y-4 text-gray-600">
                {[
                  'Contract Analyzer MVP: PDF uploads with automated legal clause summaries.',
                  'Lead Gen Assistant: Form-based input generating AI-crafted outreach scripts.',
                  'Field Log Portal: Real-time WhatsApp logs synced to a centralized dashboard.',
                  'InterGen Brand GPT: AI-powered Q&A for company policies and documents.',
                  'Micro-SaaS Sales Tool: GPT-driven sales objection handler with Stripe billing.',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Transform Your Business with AI?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto">
              Let’s build your next AI-powered tool to drive efficiency and growth.
            </motion.p>
            <motion.div variants={itemVariants}>
              <HashLink smooth to="/#contact">
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Us Today
                </motion.button>
              </HashLink>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AiAppsPage;