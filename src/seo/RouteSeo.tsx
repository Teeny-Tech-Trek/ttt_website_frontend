import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.teenytechtrek.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/teeny-logo-O8OlOmsa.svg`;

type MetaConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  schemaJson?: string;
};

const HOME_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.teenytechtrek.com/#organization",
      "name": "Teeny Tech Trek",
      "alternateName": "TTT",
      "url": "https://www.teenytechtrek.com/",
      "logo": "https://www.teenytechtrek.com/assets/teeny-logo-O8OlOmsa.svg",
      "description": "AI consultancy for small and lean teams. Chatbots, agentic workflows, smart process automation, and lightweight AI apps shipped in 14-day pilots.",
      "foundingDate": "2024",
      "founder": {
        "@type": "Person",
        "name": "Anisha Singla",
        "jobTitle": "Founder & CEO",
        "worksFor": { "@id": "https://www.teenytechtrek.com/#organization" }
      },
      "sameAs": [
        "https://www.linkedin.com/company/teenytechtrek/",
        "https://www.instagram.com/teenytechtrek"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "anisha.singla@teenytechtrek.com",
          "telephone": "+91-98558-06696",
          "areaServed": "IN",
          "availableLanguage": ["English", "Hindi", "Punjabi"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "sales",
          "email": "anisha.singla@teenytechtrek.com",
          "telephone": "+1-647-864-5465",
          "areaServed": ["CA", "US"],
          "availableLanguage": "English"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd Floor, Kalkat Bhawan, Sector 66B, Block C, GMADA Aerocity",
        "addressLocality": "Sahibzada Ajit Singh Nagar",
        "addressRegion": "Punjab",
        "postalCode": "140306",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.teenytechtrek.com/#website",
      "url": "https://www.teenytechtrek.com/",
      "name": "Teeny Tech Trek",
      "description": "AI consultancy for small teams — chatbots, agentic workflows, automation, lightweight AI apps.",
      "publisher": { "@id": "https://www.teenytechtrek.com/#organization" },
      "inLanguage": "en"
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.teenytechtrek.com/#localbusiness",
      "name": "Teeny Tech Trek",
      "image": "https://www.teenytechtrek.com/assets/teeny-logo-O8OlOmsa.svg",
      "url": "https://www.teenytechtrek.com/",
      "telephone": "+91-98558-06696",
      "email": "anisha.singla@teenytechtrek.com",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2nd Floor, Kalkat Bhawan, Sector 66B, Block C, GMADA Aerocity",
        "addressLocality": "Sahibzada Ajit Singh Nagar",
        "addressRegion": "Punjab",
        "postalCode": "140306",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "City", "name": "Mohali" },
        { "@type": "City", "name": "Chandigarh" },
        { "@type": "City", "name": "Panchkula" },
        { "@type": "Country", "name": "India" },
        { "@type": "Country", "name": "Canada" }
      ],
      "parentOrganization": { "@id": "https://www.teenytechtrek.com/#organization" }
    }
  ]
}`;

const ABOUT_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.teenytechtrek.com/aboutUs#aboutpage",
      "url": "https://www.teenytechtrek.com/aboutUs",
      "name": "About Teeny Tech Trek",
      "description": "Founder story and operating principles of Teeny Tech Trek, an AI consultancy in Mohali founded in 2024 by Anisha Singla.",
      "isPartOf": { "@id": "https://www.teenytechtrek.com/#website" },
      "about": { "@id": "https://www.teenytechtrek.com/#organization" }
    },
    {
      "@type": "Person",
      "@id": "https://www.teenytechtrek.com/aboutUs#anisha-singla",
      "name": "Anisha Singla",
      "jobTitle": "Founder & CEO",
      "worksFor": { "@id": "https://www.teenytechtrek.com/#organization" },
      "sameAs": [
        "https://www.linkedin.com/company/teenytechtrek/"
      ]
    }
  ]
}`;

const CHATBOTS_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.teenytechtrek.com/services/ai-chatbots#service",
  "serviceType": "AI Chatbot Development",
  "name": "AI-Powered Chatbots & Virtual Assistants",
  "url": "https://www.teenytechtrek.com/services/ai-chatbots",
  "description": "Context-aware GPT-based chatbots for customer support, onboarding, and internal knowledge bases. Integrated with Slack, Notion, CRMs, helpdesk platforms, WhatsApp, and websites.",
  "provider": { "@id": "https://www.teenytechtrek.com/#organization" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://www.teenytechtrek.com/#contact",
    "availability": "https://schema.org/InStock"
  }
}`;

const AGENTIC_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.teenytechtrek.com/services/agentic-ai-workflows#service",
  "serviceType": "Agentic AI Workflow Development",
  "name": "Agentic AI Workflows",
  "url": "https://www.teenytechtrek.com/services/agentic-ai-workflows",
  "description": "Autonomous and semi-autonomous AI agents built with LangChain, AutoGen, and CrewAI. Agents retrieve data, summarise content, make decisions inside guardrails, and complete multi-step tasks with human-in-the-loop oversight.",
  "provider": { "@id": "https://www.teenytechtrek.com/#organization" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ]
}`;

const AUTOMATION_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.teenytechtrek.com/services/smart-process-automation#service",
  "serviceType": "Business Process Automation",
  "name": "Smart Process Automation",
  "url": "https://www.teenytechtrek.com/services/smart-process-automation",
  "description": "End-to-end automation of repetitive operational work using Python, APIs, Zapier, and Make. Connects CRM, email, helpdesk, and spreadsheets to remove manual copy-paste work.",
  "provider": { "@id": "https://www.teenytechtrek.com/#organization" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ]
}`;

const AI_APPS_SCHEMA_JSON = `{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.teenytechtrek.com/services/ai-apps-micro-saas#service",
  "serviceType": "Custom AI Application Development",
  "name": "Lightweight AI Apps & Micro-SaaS",
  "url": "https://www.teenytechtrek.com/services/ai-apps-micro-saas",
  "description": "Production MVPs built with Streamlit, Chainlit, or FastAPI for internal tools, client portals, and product prototypes. Most apps deployable in a fortnight.",
  "provider": { "@id": "https://www.teenytechtrek.com/#organization" },
  "areaServed": [
    { "@type": "Country", "name": "India" },
    { "@type": "Country", "name": "Canada" },
    { "@type": "Country", "name": "United States" }
  ]
}`;

const getMetaForPath = (pathname: string, hash: string): MetaConfig => {
  if (pathname === '/aboutUs') {
    return {
      title: 'About Teeny Tech Trek | Founder Story & AI Mission',
      description:
        'Learn about Teeny Tech Trek, founded by Anisha Singla, and our mission to ship practical AI solutions for small and lean teams.',
      canonicalPath: '/aboutUs',
      schemaJson: ABOUT_SCHEMA_JSON,
    };
  }

  if (pathname === '/services/ai-chatbots') {
    return {
      title: 'AI-Powered Chatbots & Virtual Assistants | Teeny Tech Trek',
      description:
        'Context-aware AI chatbots for support, onboarding, and knowledge bases with integrations across Slack, Notion, CRMs, and WhatsApp.',
      canonicalPath: '/services/ai-chatbots',
      schemaJson: CHATBOTS_SCHEMA_JSON,
    };
  }

  if (pathname === '/services/agentic-ai-workflows') {
    return {
      title: 'Agentic AI Workflows | Teeny Tech Trek',
      description:
        'Build autonomous and human-in-the-loop AI agents with LangChain, AutoGen, and CrewAI for real multi-step business workflows.',
      canonicalPath: '/services/agentic-ai-workflows',
      schemaJson: AGENTIC_SCHEMA_JSON,
    };
  }

  if (pathname === '/services/smart-process-automation') {
    return {
      title: 'Smart Process Automation | Teeny Tech Trek',
      description:
        'Automate repetitive workflows using Python, APIs, Zapier, and Make to reduce manual work and speed up operations.',
      canonicalPath: '/services/smart-process-automation',
      schemaJson: AUTOMATION_SCHEMA_JSON,
    };
  }

  if (pathname === '/services/ai-apps-micro-saas') {
    return {
      title: 'Lightweight AI Apps & Micro-SaaS | Teeny Tech Trek',
      description:
        'Custom AI MVPs built fast with Streamlit, Chainlit, and FastAPI for internal tools, portals, and micro-SaaS experiences.',
      canonicalPath: '/services/ai-apps-micro-saas',
      schemaJson: AI_APPS_SCHEMA_JSON,
    };
  }

  if (pathname === '/' && hash === '#contact') {
    return {
      title: 'Contact Teeny Tech Trek | AI Consultation & Project Enquiries',
      description:
        'Contact Teeny Tech Trek for AI consulting, chatbots, automation, and 14-day pilots. Speak with our team to plan your project.',
      canonicalPath: '/#contact',
    };
  }

  return {
    title: 'Teeny Tech Trek | AI Solutions for Small Teams',
    description:
      'Teeny Tech Trek builds AI chatbots, agentic workflows, smart automation, and lightweight AI apps for small and lean teams.',
    canonicalPath: '/',
    schemaJson: HOME_SCHEMA_JSON,
  };
};

const RouteSeo: React.FC = () => {
  const { pathname, hash } = useLocation();
  const meta = getMetaForPath(pathname, hash);
  const canonicalUrl = `${SITE_URL}${meta.canonicalPath}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Teeny Tech Trek" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {meta.schemaJson ? (
        <script type="application/ld+json">{meta.schemaJson}</script>
      ) : null}
    </Helmet>
  );
};

export default RouteSeo;
