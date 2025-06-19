import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const ChatbotsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2, ease: 'easeOut' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
              <MessageSquare className="text-blue-600" size={28} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Chatbots & Virtual Assistants
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Deliver smart conversations and seamless experiences for your users.
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

      {/* Why Our Bots Are Different */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
            >
              Why Our Bots Stand Out
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed"
            >
              Unlike rigid, rule-based chatbots, our AI assistants are trained on your content, context, and customer
              journey, delivering nuanced, adaptive, and user-friendly interactions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What You Can Automate */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Automation Capabilities
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Customer Support',
                  description: 'Provide 24/7 support without extra staffing, handling queries and escalating when needed.',
                  features: [
                    'Answer FAQs, return policies, order tracking',
                    'Surface personalized recommendations',
                    'Reduce support ticket volume',
                    'Handoff to human agents with full context',
                  ],
                  support: 'Integrates with Zendesk, Intercom, Help Scout, or your live chat tool',
                },
                {
                  title: 'User Onboarding',
                  description: 'Guide new users to activate accounts and understand features faster.',
                  features: [
                    'Step-by-step product walkthroughs',
                    'Personalized feature explanations',
                    'Nudges to complete key setup actions',
                    'In-app tooltips and Slack/WhatsApp nudges',
                  ],
                  support: 'Connects to your web app, CRM, or onboarding email flow',
                },
                {
                  title: 'Internal Knowledge Assistants',
                  description: 'Reduce repetitive internal questions with AI trained on your documentation.',
                  features: [
                    'Slack bots trained on Notion, Google Docs, Confluence',
                    'Answers to operational queries like “How do I request PTO?”',
                    'AI-powered SOP retrievers',
                    'Private, secure, role-based access',
                  ],
                  support: 'Deployed securely with SSO and internal-only data',
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
                  <p className="text-sm text-gray-500 italic">{item.support}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
            >
              Seamless Platform Integrations
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8 leading-relaxed"
            >
              Our virtual assistants integrate with your tools to take action, create tickets, log data, and trigger
              workflows seamlessly.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
              {[
                'Slack',
                'Notion',
                'HubSpot',
                'Salesforce',
                'Airtable',
                'Google Workspace',
                'Intercom',
                'WhatsApp',
                'Discord',
                'Webflow',
                'Typeform',
              ].map((platform) => (
                <motion.span
                  key={platform}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                  whileHover={{ scale: 1.1, backgroundColor: '#bfdbfe' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {platform}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Powered by GPT */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
            >
              Powered by Advanced AI
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed"
            >
              Leveraging OpenAI’s GPT models and fine-tuned logic chains (LangChain, CrewAI, or custom RAG), our assistants
              adapt to your brand, language, and logic, improving with every interaction.
            </motion.p>
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
              Ready to Enhance Your Customer Experience?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto">
              Build intelligent chatbots and virtual assistants tailored to your business needs.
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

export default ChatbotsPage;