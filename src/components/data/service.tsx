// data/services.ts
import { MessageSquare, Puzzle, Workflow, Cpu } from 'lucide-react';
import { Service } from '../../types/service';


export const services: Service[] = [
  {
    slug: 'ai-chatbots',
    title: 'AI-Powered Chatbots & Virtual Assistants',
    description: 'Smart, context-aware virtual assistants that streamline support, simplify onboarding, and boost internal efficiency.',
    icon: <MessageSquare size={24} className="text-primary" />,
    features: [
      '24/7 Customer Support',
      'Frictionless User Onboarding',
      'Internal Knowledge Assistants',
      'Full-Stack Platform Integration',
    ],
    longDescription: `At Teeny Tech Trek, we don’t build bots that talk for the sake of talking. We craft intelligent, context-aware virtual assistants powered by GPT to streamline your support, simplify onboarding, and supercharge internal efficiency — all within the platforms your team already uses.

While most chatbots are rule-based and rigid, our AI assistants are trained on your content, context, and customer journey. They understand nuance, adapt to tone, and actually help users — not frustrate them.

Whether it’s guiding a customer through your pricing plan, answering internal FAQs for your team, or helping a new user activate their account, our bots show up like a smart team member — not a script.

We use OpenAI's GPT models and fine-tuned logic chains (via LangChain, CrewAI, or custom RAG setups) to ensure every conversation is grounded in your brand, language, and logic. You’re not just getting “a chatbot.” You’re getting a trained assistant that understands your product, your team, and your tone — and improves with use.`,
    benefits: [
      '24/7 support without hiring a night shift',
      'Reduced support ticket volume',
      'Personalized user onboarding experiences',
      'Seamless integration with your existing tools',
      'Secure, role-based access for internal assistants',
    ],
    caseStudies: [
      {
        title: 'E-commerce Support Bot',
        description: 'Built a chatbot for an e-commerce platform that handles FAQs, tracks orders, and escalates complex issues to human agents, reducing ticket volume by 40%.',
      },
      {
        title: 'SaaS Onboarding Assistant',
        description: 'Created an onboarding bot that guides new users through setup, resulting in a 25% increase in user activation rates.',
      },
    ],
    faq: [
      {
        question: 'What platforms do your chatbots integrate with?',
        answer: 'Our chatbots integrate with Slack, Notion, HubSpot, Salesforce, Airtable, Google Workspace, Intercom, WhatsApp, Discord, Webflow, Typeform, and more.',
      },
      {
        question: 'How secure are your internal knowledge assistants?',
        answer: 'We deploy securely with SSO support and internal-only data access, ensuring your data stays private and protected.',
      },
    ],
  },
  {
    slug: 'agentic-ai-workflows',
    title: 'Agentic AI Workflows',
    description: 'Autonomous AI agents that retrieve data, make decisions, and complete multi-step tasks with minimal human supervision.',
    icon: <Puzzle size={24} className="text-primary" />,
    features: [
      'Data Retrieval from Anywhere',
      'Intelligent Content Summarization',
      'Smart Decision-Making',
      'Multi-Step Task Automation',
    ],
    longDescription: `Modern businesses are overloaded with fragmented data, repeatable decisions, and tedious multi-step tasks. Our Agentic AI Workflows solve this by building intelligent, action-oriented agents that operate across your stack — autonomously.

Unlike single-step automations or simple bots, an agentic AI workflow thinks through tasks dynamically, calls multiple tools/APIs as needed, remembers context and prior steps, adapts based on data it retrieves, and works independently with optional human oversight.

We use cutting-edge frameworks like LangChain, AutoGen, and CrewAI to chain actions, reasoning, and decision-making into a cohesive system — tailored to your goals.

We build your agents using proven open frameworks and custom logic, combining these with custom APIs, secure environments, and your preferred tools (Sheets, Notion, CRMs, Slack, databases, etc.).`,
    benefits: [
      'Autonomous data retrieval and synthesis',
      'Reduced time spent on repetitive tasks',
      'Smart decision-making based on your criteria',
      'Secure and auditable workflows',
      'Human-in-the-loop options for critical steps',
    ],
    caseStudies: [
      {
        title: 'Competitor Pricing Monitor',
        description: 'Built an agent that scrapes competitor pricing weekly, updates Airtable, and notifies the team via Slack, saving 10 hours of manual work per week.',
      },
      {
        title: 'Customer Feedback Summarizer',
        description: 'Developed an agent that digests survey responses, flags pain points, and posts summaries to Notion, streamlining feedback analysis.',
      },
    ],
    faq: [
      {
        question: 'What is an agentic workflow?',
        answer: 'An agentic workflow involves AI agents that dynamically think through tasks, call multiple tools, and adapt based on retrieved data, with optional human oversight.',
      },
      {
        question: 'How secure are these agents?',
        answer: 'Our agents are deployed in secure environments with audit trails and private data handling, ensuring your information remains protected.',
      },
    ],
  },
  {
    slug: 'smart-process-automation',
    title: 'Smart Process Automation',
    description: 'Custom automations that connect your tools, streamline data processing, and eliminate repetitive tasks.',
    icon: <Workflow size={24} className="text-primary" />,
    features: [
      'CRM Automation',
      'Email Management Automation',
      'Data Processing & Cleanup',
      'Cross-Tool Workflow Integration',
    ],
    longDescription: `At Teeny Tech Trek, we build automations that don’t just click buttons — they move your business forward. Whether it's updating your CRM, processing client data, or replying to repetitive emails — our systems work quietly in the background, so you can focus on high-leverage work.

Modern businesses run on 50+ apps. Most don’t talk to each other. Your team ends up copy-pasting data between tabs, manually logging info into CRMs, forgetting follow-ups, or creating the same report over and over again. We fix all of that with custom-built automations tailored to your exact workflow — no bloat, no fluff.

We help your tools talk to each other with low-code platforms (Zapier, Make) or custom Python scripts — so tasks are triggered exactly when you need them. We specialize in multi-app choreography — taking an input from one platform, enriching or validating it, then sending it to 3+ destinations.`,
    benefits: [
      'Eliminate manual data entry',
      'Streamlined CRM and email workflows',
      'Clean, actionable data with minimal effort',
      'Seamless integration across your tech stack',
      'Secure and reliable automation with fail-safe alerts',
    ],
    caseStudies: [
      {
        title: 'Investor Update Automation',
        description: 'Automated weekly investor updates by pulling data from multiple sources and compiling them into a polished report, saving 5 hours weekly.',
      },
      {
        title: 'Support Ticket Routing',
        description: 'Built a system to route support tickets based on keywords and client priority, reducing response time by 30%.',
      },
    ],
    faq: [
      {
        question: 'What tools do you use for automation?',
        answer: 'We use Zapier, Make, n8n, Pipedream, Python, Pandas, REST APIs, and Webhooks, integrating with tools like Google Workspace, Slack, CRMs, and more.',
      },
      {
        question: 'How do you ensure automation reliability?',
        answer: 'We implement secure credential storage, custom logging, and fail-safe alerts to ensure your automations run smoothly and reliably.',
      },
    ],
  },
  {
    slug: 'ai-apps-micro-saas',
    title: 'Lightweight AI Apps & Micro-SaaS Tools',
    description: 'Fast, lean, and functional AI-powered apps and MVPs built to validate ideas or streamline operations.',
    icon: <Cpu size={24} className="text-primary" />,
    features: [
      'Internal Tools',
      'Client Portals',
      'Product Prototypes / MVPs',
      'Quick-Launch MVPs',
    ],
    longDescription: `Need to turn an idea into a working product — fast? Or maybe you’re building an internal tool for your team or a client portal to deliver AI outputs? At Teeny Tech Trek, we help you go from “sketch” to shipped using nimble frameworks like Streamlit, Chainlit, or FastAPI.

Whether it’s a GPT-powered content tool, a document reviewer, or a live data dashboard — we design, build, and deliver lean AI-powered apps that are lightweight, scalable, and purpose-built for speed.

We build, test, and deliver live, hosted MVPs in 7–21 days — end-to-end. Your idea → scoped build → working demo → custom branding → live app. Built lean, so you can validate fast and scale later.`,
    benefits: [
      'Launch MVPs in weeks, not months',
      'Custom tools tailored to your workflow',
      'Scalable apps with optional add-ons like billing or analytics',
      'No dev team required for client portals',
      'Founder-led execution for fast iteration',
    ],
    caseStudies: [
      {
        title: 'Contract Analyzer MVP',
        description: 'Built an MVP that uploads PDFs and auto-summarizes key legal clauses, launched in 14 days.',
      },
      {
        title: 'Lead Gen Assistant',
        description: 'Developed a client portal where users input data and receive GPT-generated outreach scripts, integrated with Stripe for billing.',
      },
    ],
    faq: [
      {
        question: 'How fast can you build an MVP?',
        answer: 'We can deliver a fully functional MVP in 7–21 days, depending on complexity, with custom branding and hosting.',
      },
      {
        question: 'What tech stack do you use for AI apps?',
        answer: 'We use Streamlit, Chainlit, FastAPI, Flask, LangChain, GPT-4 API, Pinecone, Supabase, Firebase, and HuggingFace, with integrations like Notion, Slack, and Stripe.',
      },
    ],
  },
];