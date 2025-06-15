// pages/services/AiAppsPage.tsx
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';

const AiAppsPage = () => {
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
              <Cpu size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Lightweight AI Apps & Micro-SaaS Tools</h1>
            <p className="text-xl text-gray-600">
              Launch Smart. Iterate Fast. Scale When Ready.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* What We Build */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
              What We Build
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Internal Tools */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Internal Tools</h3>
                <p className="text-gray-600 mb-4">
                  Automate workflows with AI-powered utilities built for your team’s operations.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>GPT-based research assistants</li>
                  <li>Auto-reporting dashboards</li>
                  <li>Internal Q&A bots trained on Notion/Google Drive</li>
                  <li>Admin panels for AI task management</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Best for startups, ops-heavy teams, agencies.
                </p>
              </motion.div>
              {/* Client Portals */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Client Portals</h3>
                <p className="text-gray-600 mb-4">
                  Impress clients with AI-enhanced delivery portals, no dev team required.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Doc upload → GPT insights/summaries</li>
                  <li>Personalized client dashboards</li>
                  <li>Lead intelligence tools for sales</li>
                  <li>Self-service AI apps (e.g., clause checkers)</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Best for agencies, consulting, service providers.
                </p>
              </motion.div>
              {/* Product Prototypes / MVPs */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Product Prototypes / MVPs</h3>
                <p className="text-gray-600 mb-4">
                  Validate AI product ideas fast with GPT-powered MVPs.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>AI chat apps with Streamlit/Chainlit</li>
                  <li>SaaS dashboards with Stripe billing</li>
                  <li>Agent-based analysis systems</li>
                  <li>RAG-powered knowledge bases</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Best for founders, indie hackers, pre-seed startups.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Tech Stack We Use
            </motion.h2>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {[
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
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Notion API',
                    'Slack',
                    'Stripe',
                    'Google Drive',
                    'Airtable',
                    'Twilio',
                    'Zapier',
                    'Webflow',
                    'Discord',
                  ].map((integration) => (
                    <span
                      key={integration}
                      className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Real Apps Built */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
              Real Apps We’ve Built
            </motion.h2>
            <motion.ul variants={itemVariants} className="list-disc pl-5 max-w-2xl mx-auto text-gray-600">
              <li>Contract Analyzer MVP – Upload PDFs → auto-summarize key legal clauses</li>
              <li>Lead Gen Assistant – Client fills form → GPT writes outreach scripts</li>
              <li>Field Log Portal – WhatsApp logs synced to dashboard</li>
              <li>InterGen Brand GPT – AI answers company policy/docs</li>
              <li>Micro-SaaS with Billing – GPT-powered sales objection handler</li>
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Ready to Launch Your Lightweight AI Tool?
            </motion.h2>
         
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default AiAppsPage;