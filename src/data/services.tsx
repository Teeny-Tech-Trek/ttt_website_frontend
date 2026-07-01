import { Bot, Puzzle as PuzzlePiece, Cog, Sparkles, Rocket, Boxes } from 'lucide-react';
import React from 'react';

export const services = [
  {
    icon: <Bot size={32} className="text-primary" />,
    title: "AI-Powered Chatbots & Virtual Assistants",
    slug: "ai-chatbots",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena (e.g. '/images/services/ai-chatbots.png')
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/Chatbot-Image.webp",
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
    icon: <PuzzlePiece size={32} className="text-primary" />,
    title: "Agentic AI Workflows",
    slug: "agentic-ai-workflows",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/Agentic-Image.webp",
    description: "Autonomous agents that can retrieve data, summarize content, make decisions, and complete multi-step tasks using LangChain, AutoGen, or CrewAI.",
    features: ["Data Retrieval", "Content Summarization", "Decision Making", "Multi-step Task Automation"],
    featureDescriptions: [
      "Build AI agents that can search through your databases, documents, and online sources to find and extract relevant information.",
      "Create systems that can analyze large volumes of text and produce concise, accurate summaries tailored to your needs.",
      "Develop AI workflows that can evaluate options, apply business rules, and make or recommend decisions based on available data.",
      "Automate complex processes by breaking them down into steps that can be handled by specialized AI agents working together."
    ],
    detailedContent: `
      <h2>The Power of Agentic AI</h2>
      <p>Agentic AI represents the next evolution in artificial intelligence - systems that can plan and execute multi-step tasks with minimal human supervision. These systems can:</p>
      
      <ul>
        <li>Break complex problems into manageable steps</li>
        <li>Coordinate between different specialized AI agents</li>
        <li>Adapt to changing conditions and requirements</li>
        <li>Learn from successes and failures to improve over time</li>
      </ul>
      
      <h3>Framework Options</h3>
      <p>We work with several cutting-edge frameworks to build your agentic AI solution:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">LangChain</h4>
          <p>Perfect for building complex chains of AI operations with strong integration capabilities.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">AutoGen</h4>
          <p>Excellent for creating conversational agents that can collaborate with each other.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">CrewAI</h4>
          <p>Ideal for role-based agent teams that need to work together on complex tasks.</p>
        </div>
      </div>
    `,
    caseStudies: [
      {
        title: "Research Assistant for Investment Firm",
        description: "We created an AI system that could research companies, analyze financial reports, and produce investment summaries, saving analysts hours of work per day."
      },
      {
        title: "Content Creation Workflow",
        description: "Our agentic system helped a marketing team automate their content pipeline from research to drafting to optimization, increasing output by 300%."
      }
    ]
  },
  {
    icon: <Cog size={32} className="text-primary" />,
    title: "Smart Process Automation",
    slug: "smart-process-automation",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/SmartProcess-Image.webp",
    description: "Save hours by automating repetitive tasks with Python, APIs, Zapier, and Make. From CRM updates to email replies — we connect your stack, end-to-end.",
    features: ["CRM Automation", "Email Management", "Data Processing", "Workflow Integration"],
    featureDescriptions: [
      "Automate customer relationship management tasks like contact updates, lead scoring, and follow-up scheduling.",
      "Create systems that can categorize, prioritize, and respond to emails based on content and business rules.",
      "Build pipelines that can extract, transform, and load data between different systems with minimal manual intervention.",
      "Connect your various business tools into cohesive workflows that reduce manual handoffs and data entry."
    ],
    detailedContent: `
      <h2>Beyond Basic Automation</h2>
      <p>While tools like Zapier and Make are powerful, our smart process automation goes further by combining these platforms with custom code and AI capabilities when needed.</p>
      
      <h3>Our Approach</h3>
      <ol>
        <li><strong>Process Analysis:</strong> We map your current workflows and identify automation opportunities</li>
        <li><strong>Tool Selection:</strong> We choose the right combination of platforms and technologies</li>
        <li><strong>Implementation:</strong> We build and connect your automation systems</li>
        <li><strong>Testing:</strong> We ensure everything works reliably under various conditions</li>
        <li><strong>Training:</strong> We show your team how to monitor and maintain the system</li>
        <li><strong>Optimization:</strong> We continuously improve your automation based on results</li>
      </ol>
      
      <h3>Technologies We Use</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
        <div class="text-center p-2">
          <div class="font-bold">Python</div>
          <div class="text-sm">For custom automation scripts</div>
        </div>
        <div class="text-center p-2">
          <div class="font-bold">Zapier</div>
          <div class="text-sm">For no-code integrations</div>
        </div>
        <div class="text-center p-2">
          <div class="font-bold">Make (Integromat)</div>
          <div class="text-sm">For complex workflow design</div>
        </div>
        <div class="text-center p-2">
          <div class="font-bold">REST APIs</div>
          <div class="text-sm">For direct system integration</div>
        </div>
      </div>
    `,
    caseStudies: [
      {
        title: "Sales Process Automation",
        description: "We automated a complex sales workflow from lead capture to proposal generation to follow-up, saving the sales team 15 hours per week."
      },
      {
        title: "Data Synchronization System",
        description: "Our solution kept product data consistent across an e-commerce platform, inventory system, and accounting software, eliminating manual updates."
      }
    ]
  },
  {
    icon: <Sparkles size={32} className="text-primary" />,
    title: "Claude Automation",
    slug: "claude-automation",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/Claude-Image.webp",
    description: "Leverage Claude AI to automate complex tasks — tool connections, custom MCP integrations, scheduled runs, and human-in-the-loop workflows for smarter business operations.",
    features: ["Tool Connections", "Custom MCP Tools", "Cowork Setups", "Recurring Runs"],
    featureDescriptions: [
      "Connect Claude to your existing tools — CRMs, docs, sheets, email, and APIs — so it can read, draft, and act across your stack.",
      "Build bespoke MCP (Model Context Protocol) tools tailored to your workflows, giving Claude safe access to your data and systems.",
      "Set up Cowork environments where Claude pairs with your team on real work — drafting, reviewing, and routing tasks with approvals.",
      "Schedule recurring Claude runs for digests, reports, and routine ops — afternoon jobs finished in minutes, not hours."
    ],
    detailedContent: `
      <h2>Claude-Powered Automation, Done Right</h2>
      <p>Claude Automation pairs Anthropic's Claude with your existing tools and data — so repetitive knowledge work runs on autopilot, with humans staying in control of the important moments.</p>

      <h3>What You Get</h3>
      <ul>
        <li>Hours back every week on routine tasks</li>
        <li>Approval gates before any significant or irreversible action</li>
        <li>Full audit log of every tool call and file change</li>
        <li>Your data stays yours — never used to train models</li>
      </ul>

      <h3>Our 4-Week Rollout</h3>
      <ol>
        <li><strong>Audit & Map:</strong> Review your repetitive workflows and pick the highest-ROI ones</li>
        <li><strong>Connect & Build:</strong> Set up connectors and build custom MCP tools you need</li>
        <li><strong>Automate:</strong> Configure Cowork runs and scheduled tasks; you test on real work</li>
        <li><strong>Handover & Train:</strong> Your team learns to trigger, review, and tweak — no engineer required</li>
      </ol>
    `,
    caseStudies: [
      {
        title: "Weekly Ops Digest Automation",
        description: "We set up a scheduled Claude run that compiles weekly ops reports from Slack, email, and sheets — saving the team 6+ hours of manual compilation every week."
      },
      {
        title: "Document Review with MCP Tools",
        description: "Custom MCP tools let Claude review incoming contracts against the client's playbook, flag issues, and draft response emails for human approval."
      }
    ]
  },
  {
    icon: <Rocket size={32} className="text-primary" />,
    title: "Lightweight AI Apps",
    slug: "ai-apps-micro-saas",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/Lightweight-Image.webp",
    description: "Ship focused micro-SaaS and internal AI tools fast — single-purpose apps with clean UIs, built on modern stacks and ready to launch in weeks, not months.",
    features: ["Rapid MVPs", "Micro-SaaS Tools", "Internal Dashboards", "API-First Builds"],
    featureDescriptions: [
      "Validate ideas quickly with lean, functional MVPs that put a working AI product in front of real users in record time.",
      "Launch focused micro-SaaS products that solve one problem really well, with billing, auth, and AI baked in.",
      "Build internal tools and dashboards that wrap your AI workflows in a simple interface your team actually enjoys using.",
      "Deliver apps designed API-first so they plug cleanly into your existing systems and scale as you grow."
    ],
    detailedContent: `
      <h2>Small Apps, Big Impact</h2>
      <p>Not every AI project needs a massive platform. Lightweight AI apps let you ship a focused, polished tool fast — proving value before you invest in scale.</p>

      <h3>What We Build</h3>
      <ul>
        <li>Single-purpose micro-SaaS products with auth and billing</li>
        <li>Internal tools and admin dashboards for your team</li>
        <li>AI-powered utilities that wrap a model in a clean UI</li>
        <li>Prototypes and MVPs to validate ideas with real users</li>
      </ul>

      <h3>Our Stack</h3>
      <p>We build with modern, battle-tested tools — React, Next.js, Tailwind, and serverless backends — so your app is fast, maintainable, and easy to extend.</p>
    `,
    caseStudies: [
      {
        title: "AI Resume Screener",
        description: "We shipped a focused micro-SaaS that ranks incoming resumes against a job spec, helping a recruiting agency triage applicants 5x faster."
      },
      {
        title: "Internal Knowledge Search Tool",
        description: "A lightweight internal app let a client's team search across docs and tickets with natural language, cutting time-to-answer dramatically."
      }
    ]
  },
  {
    icon: <Boxes size={32} className="text-primary" />,
    title: "Custom AI Integrations",
    slug: "custom-ai-integrations",
    // 👇 IS CARD KI IMAGE — yahan apna real path daal dena (MOCK DATA — replace later)
    image: "https://4hooltce8r54joof.public.blob.vercel-storage.com/Ai-Service-Assets/Custom-Image.webp",
    description: "Mock placeholder service — connect AI models into your existing products with tailored integrations, embeddings, and vector search. Replace this copy later.",
    features: ["Model Integration", "Embeddings & RAG", "Vector Search", "Custom Pipelines"],
    featureDescriptions: [
      "Placeholder description — integrate large language models directly into your existing apps and services.",
      "Placeholder description — build retrieval-augmented generation pipelines on top of your own data.",
      "Placeholder description — add fast semantic search powered by vector databases.",
      "Placeholder description — design custom data and inference pipelines tailored to your needs."
    ],
    detailedContent: `
      <h2>Custom AI Integrations (Mock)</h2>
      <p>This is placeholder content for a sixth service. Replace it with real copy when ready.</p>

      <h3>Placeholder Section</h3>
      <ul>
        <li>Mock bullet one</li>
        <li>Mock bullet two</li>
        <li>Mock bullet three</li>
      </ul>
    `,
    caseStudies: [
      {
        title: "Mock Case Study One",
        description: "Placeholder case study description — replace with a real example later."
      },
      {
        title: "Mock Case Study Two",
        description: "Placeholder case study description — replace with a real example later."
      }
    ]
  },
];