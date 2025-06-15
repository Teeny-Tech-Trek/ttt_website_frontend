// pages/services/ChatbotsPage.tsx
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';

const ChatbotsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">AI-Powered Chatbots & Virtual Assistants</h1>
            <p className="text-xl text-gray-600">
              Smart Conversations. Seamless Experiences. Real Results.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why Our Bots Are Different */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Why Our Bots Are Different
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              While most chatbots are rule-based and rigid, our AI assistants are trained on your content, context, and
              customer journey. They understand nuance, adapt to tone, and actually help users — not frustrate them.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* What You Can Automate */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
              What You Can Automate
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Customer Support */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Customer Support That Never Sleeps</h3>
                <p className="text-gray-600 mb-4">
                  Offer 24/7 support without hiring a night shift. Our AI chatbots handle common queries, guide users, and
                  escalate when needed.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Answer FAQs, return policies, order tracking</li>
                  <li>Surface personalized recommendations</li>
                  <li>Reduce support ticket volume</li>
                  <li>Handoff to human agents with full context</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Integrates with Zendesk, Intercom, Help Scout, or your own live chat tool.
                </p>
              </motion.div>
              {/* User Onboarding */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Frictionless User Onboarding</h3>
                <p className="text-gray-600 mb-4">
                  Help new users understand features, activate accounts, and get value faster with friendly onboarding
                  assistants.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Step-by-step product walkthroughs</li>
                  <li>Personalized feature explanations</li>
                  <li>Nudges to complete key setup actions</li>
                  <li>In-app tooltips and Slack/WhatsApp nudges</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Connects to your web app, CRM, or onboarding email flow.
                </p>
              </motion.div>
              {/* Internal Knowledge Assistants */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Internal Knowledge Assistants</h3>
                <p className="text-gray-600 mb-4">
                  Reduce repetitive internal questions with AI tools that answer operational queries using your
                  documentation.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Slack bots trained on Notion, Google Docs, Confluence</li>
                  <li>Answers to “How do I request PTO?” or “Where’s the Q4 deck?”</li>
                  <li>AI-powered SOP retrievers</li>
                  <li>Private, secure, role-based access</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Deployed securely with SSO and internal-only data.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Platform Integrations */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Full-Stack Platform Integration
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Our virtual assistants don’t just talk — they take action. Create tickets, log data, update records, and
              trigger workflows seamlessly.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
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
                <span
                  key={platform}
                  className="bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  {platform}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Powered by GPT */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Powered by GPT, Trained on Your Knowledge
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Using OpenAI’s GPT models and fine-tuned logic chains (LangChain, CrewAI, or custom RAG), we deliver
              assistants that understand your brand, language, and logic — improving with use.
            </motion.p>
            <motion.div variants={itemVariants} className="text-center">
             
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ChatbotsPage;