// pages/services/SmartProcessAutomationPage.tsx
import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';

const ProcessAutomationPage = () => {
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
              <Workflow size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Smart Process Automation</h1>
            <p className="text-xl text-gray-600">
              Less Manual Work. More Meaningful Outcomes.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why It Matters */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Why It Matters
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Modern businesses juggle 50+ apps that don’t sync, leading to copy-pasting, manual CRM updates, and repetitive
              tasks. We fix this with custom automations tailored to your workflow.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* What We Automate */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
              What We Automate
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CRM Automation */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">CRM Automation</h3>
                <p className="text-gray-600 mb-4">
                  Streamline sales and client management by auto-updating fields, tracking deals, and syncing data.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Auto-create/update contacts from forms</li>
                  <li>Move deals based on email replies/payments</li>
                  <li>Sync Typeform/Calendly/Stripe to CRM</li>
                  <li>Assign leads based on rules</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Supports HubSpot, Salesforce, Zoho, Pipedrive, Airtable, Notion.
                </p>
              </motion.div>
              {/* Email Management */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Email Management Automation</h3>
                <p className="text-gray-600 mb-4">
                  Monitor, sort, tag, and respond to emails using AI and smart filters.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Auto-label and forward support requests</li>
                  <li>Trigger workflows on keywords</li>
                  <li>Generate draft replies with GPT</li>
                  <li>Archive/escalate based on sentiment</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Integrates with Gmail, Outlook, helpdesk tools.
                </p>
              </motion.div>
              {/* Data Processing */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Data Processing & Cleanup</h3>
                <p className="text-gray-600 mb-4">
                  Process and prep data automatically, from formatting to reporting.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Merge CSV reports into clean tables</li>
                  <li>Transform survey results into charts</li>
                  <li>Parse PDFs/invoices, log to dashboards</li>
                  <li>Deduplicate, normalize, tag data</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Optional GPT agent for summaries/anomaly detection.
                </p>
              </motion.div>
              {/* Cross-Tool Integration */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Cross-Tool Workflow Integration</h3>
                <p className="text-gray-600 mb-4">
                  Connect your tools with low-code platforms or custom scripts for seamless task triggers.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Follow-up emails on Google Sheet changes</li>
                  <li>Slack alerts on Pipedrive deal closes</li>
                  <li>Auto-generate invoices from Airtable</li>
                  <li>Notify team on Notion doc uploads</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Specializes in multi-app choreography.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Tools & Platforms */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Tools & Platforms We Work With
            </motion.h2>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Automation Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {['Zapier', 'Make', 'n8n', 'Pipedream'].map((tool) => (
                    <span key={tool} className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Data & Logic</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Pandas', 'REST APIs', 'Webhooks'].map((tool) => (
                    <span key={tool} className="bg-primary-100 text-primary px-3 py-1 rounded-full text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {[
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

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Ready to Streamline Your Processes?
            </motion.h2>
            <motion.div variants={itemVariants} className="text-center">
            
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ProcessAutomationPage;