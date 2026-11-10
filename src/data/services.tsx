import { Bot, Workflow, Sparkles, Rocket } from 'lucide-react';
import React from 'react';
import chatbotImg from '../Images/services/chatbot.webp';
import agenticImg from '../Images/services/agentic workflow.webp';
import n8nImg from '../Images/services/n8n automations.webp';
import lightweightImg from '../Images/services/lightweight api.webp';

export const services = [
  {
    icon: <Bot size={32} className="text-primary" />,
    title: "AI-Powered Chatbots & Virtual Assistants",
    slug: "ai-chatbots",
    image: "/ai virtual assistants.webp",
    description: "Context-aware GPT bots for customer support, onboarding, or internal tools — integrated with your existing platforms (Slack, Notion, CRMs, etc.)",
    features: ["Customer Support", "User Onboarding", "Internal Knowledge Base", "Platform Integration"],
    featureDescriptions: [
      "Provide 24/7 customer support with AI chatbots that can handle common questions, troubleshoot issues, and escalate to human agents when needed.",
      "Guide new users through your product or service with interactive onboarding assistants that adapt to user behavior and questions.",
      "Create an AI-powered knowledge base that can answer employee questions about company policies, procedures, and best practices.",
      "Seamlessly integrate your AI assistants with your existing tools like Slack, Microsoft Teams, Notion, and various CRM systems."
    ],
    detailedContent: `
      <h2>How Our AI Chatbots Work</h2>
      <p>We build custom AI assistants that go beyond simple rule-based chatbots. Our solutions use the latest large language models (like GPT-4) combined with your specific business knowledge to create truly helpful virtual assistants.</p>
      
      <h3>The Development Process</h3>
      <ol>
        <li><strong>Discovery:</strong> We identify your specific needs and use cases</li>
        <li><strong>Knowledge Base Creation:</strong> We help you organize your information</li>
        <li><strong>Bot Development:</strong> We build and train your custom assistant</li>
        <li><strong>Integration:</strong> We connect it to your existing platforms</li>
        <li><strong>Testing & Refinement:</strong> We ensure it works perfectly</li>
        <li><strong>Deployment & Monitoring:</strong> We help you launch and maintain it</li>
      </ol>
      
      <h3>Technologies We Use</h3>
      <p>Depending on your needs, we might implement your solution using:</p>
      <ul>
        <li>OpenAI's GPT models</li>
        <li>Anthropic's Claude</li>
        <li>LangChain or LlamaIndex for knowledge retrieval</li>
        <li>Custom vector databases for efficient information storage</li>
        <li>Platform-specific SDKs for seamless integration</li>
      </ul>
    `,
    caseStudies: [
      {
        title: "HR Assistant for Tech Startup",
        description: "We built an internal AI assistant that helped a growing startup's HR team handle employee questions, reducing response time from days to minutes."
      },
      {
        title: "E-commerce Customer Support Bot",
        description: "Our AI chatbot helped an online retailer handle 80% of customer inquiries automatically, improving customer satisfaction and reducing support costs."
      }
    ]
  },
  {
    icon: <Sparkles size={32} className="text-primary" />,
    title: "Agentic AI & Claude Automation",
    slug: "agentic-ai-workflows",
    image: agenticImg,
    description: "Autonomous agents and Claude-powered automation that retrieve data, make decisions, connect to your tools via MCP, and complete multi-step tasks with humans in the loop.",
    features: ["Multi-step AI Agents", "Tool & MCP Connections", "Decision Making", "Scheduled & Approval Runs"],
    featureDescriptions: [
      "Build agents with LangChain, AutoGen, or CrewAI that search data, summarize content, and complete multi-step tasks on their own.",
      "Connect Claude to your CRMs, docs, sheets, email, and APIs — including custom MCP tools that give it safe access to your systems.",
      "Develop workflows that evaluate options, apply business rules, and make or recommend decisions based on your data.",
      "Schedule recurring runs for digests, reports, and routine ops, with approval gates before any significant action."
    ],
    detailedContent: `
      <h2>Agents That Actually Finish the Job</h2>
      <p>Agentic AI plans and executes multi-step tasks with minimal supervision. We pair agent frameworks with Anthropic's Claude and your existing tools, so repetitive knowledge work runs on autopilot while humans stay in control of the important moments.</p>

      <h3>What You Get</h3>
      <ul>
        <li>Agents that break complex problems into steps and coordinate with each other</li>
        <li>Claude connected to your tools through custom MCP integrations</li>
        <li>Approval gates before any significant or irreversible action</li>
        <li>Full audit log of every tool call, and your data is never used to train models</li>
      </ul>

      <h3>Frameworks We Use</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">LangChain</h4>
          <p>Complex chains of AI operations with strong integration capabilities.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">AutoGen & CrewAI</h4>
          <p>Role-based agent teams that collaborate on complex tasks.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">Claude + MCP</h4>
          <p>Tool-connected Claude workflows with scheduled runs and human approvals.</p>
        </div>
      </div>
    `,
    caseStudies: [
      {
        title: "Research Assistant for Investment Firm",
        description: "We created an AI system that researches companies, analyzes financial reports, and produces investment summaries, saving analysts hours of work per day."
      },
      {
        title: "Weekly Ops Digest with Claude",
        description: "A scheduled Claude run compiles weekly ops reports from Slack, email, and sheets — saving the team 6+ hours of manual compilation every week."
      }
    ]
  },
  {
    icon: <Workflow size={32} className="text-primary" />,
    title: "Workflow & Process Automation",
    slug: "automations",
    image: n8nImg,
    description: "Save hours by automating repetitive work with n8n, Zapier, Make, Python, and APIs. From CRM updates to email replies — we connect your stack end-to-end.",
    features: ["CRM & Email Automation", "n8n, Zapier & Make", "API & App Connectors", "Data Processing"],
    featureDescriptions: [
      "Automate contact updates, lead scoring, follow-ups, and rule-based email triage and replies.",
      "Build on the right platform for the job — including self-hosted n8n with no per-task pricing or vendor lock-in.",
      "Connect hundreds of apps and any REST API so data flows between the tools you already use.",
      "Build pipelines that extract, transform, and load data between systems, with AI steps to classify or summarize."
    ],
    detailedContent: `
      <h2>Beyond Basic Automation</h2>
      <p>Zapier, Make, and n8n are powerful. We combine them with custom code and AI where needed, so your processes run reliably end-to-end instead of breaking at the first edge case.</p>

      <h3>Our Approach</h3>
      <ol>
        <li><strong>Process Analysis:</strong> We map your workflows and find the automation opportunities</li>
        <li><strong>Tool Selection:</strong> We choose the right mix of platforms, self-hosted or cloud</li>
        <li><strong>Implementation:</strong> We build and connect your automation systems</li>
        <li><strong>Testing & Training:</strong> We make sure it works reliably and your team can maintain it</li>
        <li><strong>Optimization:</strong> We keep improving based on results</li>
      </ol>

      <h3>Technologies We Use</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div class="text-center p-2"><div class="font-bold">n8n</div><div class="text-sm">Self-hosted workflows</div></div>
        <div class="text-center p-2"><div class="font-bold">Zapier & Make</div><div class="text-sm">No-code integrations</div></div>
        <div class="text-center p-2"><div class="font-bold">Python</div><div class="text-sm">Custom automation scripts</div></div>
        <div class="text-center p-2"><div class="font-bold">REST APIs</div><div class="text-sm">Direct system integration</div></div>
      </div>
    `,
    caseStudies: [
      {
        title: "Sales Process Automation",
        description: "We automated a sales workflow from lead capture to proposal generation to follow-up, saving the sales team 15 hours per week."
      },
      {
        title: "Lead Routing with n8n",
        description: "An n8n workflow enriches inbound leads, scores them with an AI model, and routes them to the right sales rep automatically."
      }
    ]
  },
  {
    icon: <Rocket size={32} className="text-primary" />,
    title: "AI Apps & Custom Integrations",
    slug: "ai-apps-micro-saas",
    image: lightweightImg,
    description: "Ship focused micro-SaaS and internal AI tools in weeks, or plug AI into your existing product with embeddings, RAG, and vector search.",
    features: ["Rapid MVPs & Micro-SaaS", "Model Integration", "Embeddings & RAG", "Internal Dashboards"],
    featureDescriptions: [
      "Launch focused micro-SaaS products and lean MVPs with auth, billing, and AI baked in.",
      "Plug OpenAI, Claude, or open-source models into your production databases and backend APIs.",
      "Build Retrieval-Augmented Generation pipelines and semantic vector search over your own data.",
      "Wrap your AI workflows in simple internal dashboards and API-first apps your team enjoys using."
    ],
    detailedContent: `
      <h2>Small Apps, Deep Integrations</h2>
      <p>Not every AI project needs a massive platform. We either ship a polished single-purpose app fast, or connect language models to your existing stack, databases, and APIs, securely and accurately.</p>

      <h3>What We Build</h3>
      <ul>
        <li>Single-purpose micro-SaaS products and MVPs to validate ideas with real users</li>
        <li>Internal tools and admin dashboards for your team</li>
        <li>RAG pipelines and semantic search over your documents and records</li>
        <li>Secure middleware between LLMs and your databases and APIs</li>
      </ul>

      <h3>Our Stack</h3>
      <ul>
        <li><strong>Apps:</strong> React, Next.js, Tailwind, and serverless backends</li>
        <li><strong>Vector Databases:</strong> Pinecone, Qdrant, Milvus, and Pgvector</li>
        <li><strong>Retrieval:</strong> LangChain, LlamaIndex, and raw API implementations</li>
        <li><strong>LLM Providers:</strong> Anthropic, OpenAI, DeepSeek, and local open-source models</li>
      </ul>
    `,
    caseStudies: [
      {
        title: "AI Resume Screener",
        description: "A focused micro-SaaS that ranks incoming resumes against a job spec, helping a recruiting agency triage applicants 5x faster."
      },
      {
        title: "Enterprise Semantic Search",
        description: "We integrated Pinecone and OpenAI embeddings to enable natural-language search across 50,000+ catalog items, boosting search conversions by 35%."
      }
    ]
  },
];
