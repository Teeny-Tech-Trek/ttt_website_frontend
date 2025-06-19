import { motion } from 'framer-motion';
import { Workflow, CheckCircle2 } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const ProcessAutomationPage = () => {
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
              <Workflow className="text-blue-600" size={28} />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Smart Process Automation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Eliminate manual tasks and streamline workflows with intelligent automation.
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

      {/* Why It Matters */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
            >
              Why Automation Matters
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-3xl mx-auto text-center leading-relaxed"
            >
              Businesses often juggle disconnected apps, leading to manual data entry and repetitive tasks. Our custom
              automations connect your tools and optimize your workflows for efficiency.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Automate */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            >
              Automation Solutions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'CRM Automation',
                  description: 'Streamline sales and client management with automated data syncing and deal tracking.',
                  features: [
                    'Auto-create/update contacts from forms',
                    'Move deals based on email replies/payments',
                    'Sync Typeform/Calendly/Stripe to CRM',
                    'Assign leads based on rules',
                  ],
                  support: 'Supports HubSpot, Salesforce, Zoho, Pipedrive, Airtable, Notion',
                },
                {
                  title: 'Email Management Automation',
                  description: 'Automate email sorting, tagging, and responses with AI-driven filters.',
                  features: [
                    'Auto-label and forward support requests',
                    'Trigger workflows on keywords',
                    'Generate draft replies with GPT',
                    'Archive/escalate based on sentiment',
                  ],
                  support: 'Integrates with Gmail, Outlook, helpdesk tools',
                },
                {
                  title: 'Data Processing & Cleanup',
                  description: 'Automate data formatting, reporting, and cleanup for actionable insights.',
                  features: [
                    'Merge CSV reports into clean tables',
                    'Transform survey results into charts',
                    'Parse PDFs/invoices, log to dashboards',
                    'Deduplicate, normalize, tag data',
                  ],
                  support: 'Optional GPT agent for summaries/anomaly detection',
                },
                {
                  title: 'Cross-Tool Workflow Integration',
                  description: 'Connect your tools for seamless task triggers and multi-app workflows.',
                  features: [
                    'Follow-up emails on Google Sheet changes',
                    'Slack alerts on Pipedrive deal closes',
                    'Auto-generate invoices from Airtable',
                    'Notify team on Notion doc uploads',
                  ],
                  support: 'Specializes in multi-app choreography',
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

      {/* Tools & Platforms */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
            >
              Tools & Platforms We Integrate
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Automation Platforms',
                  items: ['Zapier', 'Make', 'n8n', 'Pipedream'],
                },
                {
                  title: 'Data & Logic',
                  items: ['Python', 'Pandas', 'REST APIs', 'Webhooks'],
                },
                {
                  title: 'Integrations',
                  items: [
                    'Google Workspace',
                    'Slack',
                    'WhatsApp',
                    'Discord',
                    'CRMs',
                    'Stripe',
                    'Notion',
                    'Airtable',
                    'Typeform',
                    'Trello',
                    'Webflow',
                    'Shopify',
                    'Calendly',
                    'Dropbox',
                    'Gmail/Outlook',
                    'PDF Parsers',
                  ],
                },
              ].map((section, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
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

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Streamline Your Processes?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto">
              Automate repetitive tasks and connect your tools for maximum efficiency.
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

export default ProcessAutomationPage;