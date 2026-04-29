import { Bot, Puzzle as PuzzlePiece, Cog, Lightbulb } from 'lucide-react';
import React from 'react';

export const services = [
  {
    icon: <Bot size={32} className="text-primary" />,
    title: "AI-Powered Chatbots & Virtual Assistants",
    slug: "ai-chatbots",
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
    icon: <Lightbulb size={32} className="text-primary" />,
    title: "Lightweight AI Apps & Micro-SaaS Tools",
    slug: "ai-apps-micro-saas",
    description: "MVPs built with Streamlit, Chainlit, or FastAPI — perfect for internal use, client delivery, or launching your next product idea fast.",
    features: ["Internal Tools", "Client Portals", "Product Prototypes", "Quick MVPs"],
    featureDescriptions: [
      "Create custom applications for your team that solve specific problems without the overhead of full-scale software development.",
      "Build branded portals that your clients can use to access your services, view reports, and manage their relationship with you.",
      "Rapidly develop prototypes to test new product ideas with real users before investing in full-scale development.",
      "Launch minimum viable products quickly to start generating revenue and feedback while you refine your offering."
    ],
    detailedContent: `
      <h2>Rapid Development, Real Results</h2>
      <p>Our lightweight AI apps and micro-SaaS tools give you the benefits of custom software without the typical time and budget requirements. We focus on creating solutions that:</p>
      
      <ul>
        <li>Solve a specific problem extremely well</li>
        <li>Can be developed and deployed in weeks, not months</li>
        <li>Are easy to use and require minimal training</li>
        <li>Can evolve based on user feedback</li>
      </ul>
      
      <h3>Development Platforms</h3>
      <p>We select the right platform based on your specific needs:</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">Streamlit</h4>
          <p>Perfect for data-focused applications with interactive visualizations and AI features.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">Chainlit</h4>
          <p>Ideal for chat-based applications that leverage large language models.</p>
        </div>
        <div class="border p-4 rounded-lg">
          <h4 class="font-bold">FastAPI</h4>
          <p>Great for building robust APIs and web applications that need more customization.</p>
        </div>
      </div>
      
      <h3>From MVP to Growth</h3>
      <p>Our micro-SaaS approach allows you to:</p>
      <ol>
        <li>Launch quickly with core functionality</li>
        <li>Gather real user feedback</li>
        <li>Iterate based on actual usage data</li>
        <li>Scale gradually as demand grows</li>
        <li>Expand features based on validated needs</li>
      </ol>
    `,
    caseStudies: [
      {
        title: "AI Document Analyzer",
        description: "We built a Streamlit app that helps a legal team extract key information from contracts, reducing review time by 70%."
      },
      {
        title: "Customer Insight Portal",
        description: "Our micro-SaaS solution allowed a consulting firm to deliver AI-powered market insights to their clients through a branded web application."
      }
    ]
  },
];