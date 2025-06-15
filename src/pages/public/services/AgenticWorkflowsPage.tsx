// pages/services/AgenticWorkflowsPage.tsx
import { motion } from 'framer-motion';
import { Puzzle } from 'lucide-react';
import Container from '../../../components/ui/Container';
import Button from '../../../components/ui/Button';


const AgenticWorkflowsPage = () => {
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
              <Puzzle size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Agentic AI Workflows</h1>
            <p className="text-xl text-gray-600">
              Autonomous Agents That Think, Act, and Deliver.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* What Is an Agentic Workflow */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              What Is an Agentic Workflow?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-12">
              Unlike single-step automations, agentic AI workflows think dynamically, call multiple tools/APIs, remember
              context, adapt based on data, and work independently with optional human oversight.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* What Our Agents Can Do */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
              What Our Agents Can Do
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Data Retrieval */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Data Retrieval from Anywhere</h3>
                <p className="text-gray-600 mb-4">
                  Agents autonomously gather and synthesize data from internal or external sources.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Scrape competitor pricing and update Airtable</li>
                  <li>Pull sales data from Stripe, merge with CRM</li>
                  <li>Fetch Google Sheet reports, summarize in Slack</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Supports APIs, databases, Google Workspace, Notion, Slack, web scraping, PDFs, CSVs.
                </p>
              </motion.div>
              {/* Content Summarization */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Intelligent Content Summarization</h3>
                <p className="text-gray-600 mb-4">
                  Summarize long documents, meeting notes, or feedback surveys into actionable insights.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Summarize team meeting notes into action items</li>
                  <li>Digest customer feedback and flag pain points</li>
                  <li>Convert research papers into briefs</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Auto-post summaries to Slack, Notion, or email.
                </p>
              </motion.div>
              {/* Smart Decision-Making */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Smart Decision-Making</h3>
                <p className="text-gray-600 mb-4">
                  Agents follow your criteria to make decisions autonomously or escalate when needed.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Auto-score leads based on behavior</li>
                  <li>Monitor social mentions, alert on negative sentiment</li>
                  <li>Flag overdue invoices and escalate</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Uses IF-THEN rules, scoring logic, or AI judgment.
                </p>
              </motion.div>
              {/* Multi-Step Task Automation */}
              <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Multi-Step Task Automation</h3>
                <p className="text-gray-600 mb-4">
                  Handle 5–15+ step processes with full logic flow on autopilot.
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  <li>Pull metrics → generate insights → create slides → post</li>
                  <li>Review job board → shortlist resumes → schedule interviews</li>
                  <li>Scrape trends → summarize → suggest pricing tweaks</li>
                </ul>
                <p className="text-sm text-gray-500 italic">
                  Delivers outcomes without manual intervention.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Agent Infrastructure */}
      <section className="py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Agent Infrastructure We Use
            </motion.h2>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              {['LangChain', 'AutoGen', 'CrewAI'].map((framework) => (
                <span
                  key={framework}
                  className="bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  {framework}
                </span>
              ))}
            </motion.div>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto text-center mt-8">
              Combined with custom APIs, secure environments, and your tools (Sheets, Notion, CRMs, Slack, databases).
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <Container>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
              Ready to Automate with Agentic AI?
            </motion.h2>
           
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default AgenticWorkflowsPage;