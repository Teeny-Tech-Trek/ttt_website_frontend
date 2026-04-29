export type RouteRegistry = Record<string, string>;

export type LearnMoreIntent =
  | 'services'
  | 'usecases'
  | 'about'
  | 'blog'
  | 'community'
  | 'auditform'
  | 'contact'
  | 'faq'
  | 'pricing';

const STATIC_ROUTES: RouteRegistry = {
  services: '/#services',
  solutions: '/#services',
  'ai solutions': '/#services',
  pricing: '/#pricing',
  contact: '/#contact',
  blogs: '/blogs',
  blog: '/blogs',
  articles: '#blogs',
  'use cases': '#use-cases',
  'about us': '/#about-us',
  about: '/#about-us',
  'who are you': '/#about-us',
  'why teeny tech trek': '/#about-us',
  faq: '/#faq',
  consultation: '/#pricing',
  'book consultation': '/#pricing',
  'strategy call': '/#pricing',
  community: '/community',
  'audit form': '/auditform',
  auditform: '/auditform',
};

const INTENT_KEYWORDS: Record<string, string[]> = {
  services: ['services', 'service', 'chatbots', 'automation'],
  pricing: ['pricing', 'price', 'plan', 'plans', 'consultation'],
  consultation: ['consultation', 'book consultation', 'strategy call'],
  contact: ['contact', 'email', 'phone', 'address'],
  blogs: ['blogs', 'blog', 'articles', 'resources', 'insights', 'ai insights'],
  solutions: ['solutions', 'solution', 'ai solutions', 'what solutions do you provide'],
  'use cases': ['use cases', 'use case', 'industries', 'industry examples'],
  faq: ['faq', 'frequently asked questions'],
  login: ['login', 'sign in', 'account login', 'dashboard login'],
};

export const discoverRouteRegistry = (): RouteRegistry => {
  const registry: RouteRegistry = { ...STATIC_ROUTES };
  const add = (key: string, target: string) => {
    const normalizedKey = key.trim().toLowerCase();
    const normalizedTarget = target.trim();
    if (!normalizedKey || !normalizedTarget) return;
    registry[normalizedKey] = normalizedTarget;
  };

  document.querySelectorAll<HTMLElement>('section[id]').forEach((section) => {
    const id = (section.id || '').trim().toLowerCase();
    if (!id) return;
    add(id, `#${id}`);
    if (id === 'use-cases') add('use cases', '#use-cases');
    if (id === 'book-consultation') {
      add('consultation', '#pricing');
      add('book consultation', '#pricing');
      add('strategy call', '#pricing');
    }
  });

  document.querySelectorAll<HTMLAnchorElement>('a[href], .nav-link[href]').forEach((link) => {
    const href = (link.getAttribute('href') || '').trim();
    const text = (link.textContent || '').trim().toLowerCase();
    if (!href) return;
    if (href.startsWith('#')) {
      const id = href.slice(1).trim().toLowerCase();
      if (id) {
        add(id, href);
        if (text) add(text, href);
      }
      return;
    }
    if (href.startsWith('/')) {
      const slug = href.replace(/^\/+/, '').toLowerCase();
      if (slug) {
        add(slug, href);
        if (text) add(text, href);
      }
    }
  });

  return registry;
};

export const detectIntentFromText = (text: string): string | null => {
  const query = text.trim().toLowerCase();
  if (!query) return null;
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((kw) => query.includes(kw))) {
      return intent;
    }
  }
  return null;
};

export const resolveRouteTarget = (
  routeOrIntent: string | null | undefined,
  routeRegistry: RouteRegistry
): string | null => {
  if (!routeOrIntent) return null;
  const raw = routeOrIntent.trim();
  if (!raw) return null;
  if (raw.startsWith('#') || raw.startsWith('/')) return raw;
  const normalized = raw.toLowerCase().replace(/^#/, '');
  const aliasMap: RouteRegistry = {
    solution: 'services',
    solutions: 'services',
    'ai solutions': 'services',
    consultation: 'pricing',
    'book consultation': 'pricing',
    'strategy call': 'pricing',
    blog: 'blogs',
    blogs: 'blogs',
    articles: 'blogs',
    community: 'community',
    audit: 'auditform',
    'audit form': 'auditform',
    contact: 'contact',
  };
  const canonical = aliasMap[normalized] || normalized;
  return routeRegistry[canonical] || routeRegistry[canonical.replace(/-/g, ' ')] || null;
};

export const navigateToRoute = (
  targetOrSelector: string | null | undefined,
  navigate?: ((to: string) => void) | null,
  currentPathname?: string | null
): boolean => {
  if (!targetOrSelector) return false;
  const target = targetOrSelector.trim();
  if (!target) return false;

  if (target.startsWith('/')) {
    const [pathname, hash] = target.split('#');
    if (navigate) {
      navigate(hash ? `${pathname || '/'}#${hash}` : pathname || '/');
    } else {
      window.history.pushState({}, '', hash ? `${pathname || '/'}#${hash}` : pathname || '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    if (hash) {
      const shouldScrollNow = !pathname || pathname === currentPathname || pathname === '/';
      const selector = `#${hash}`;
      const scroll = () => {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      if (shouldScrollNow) {
        window.setTimeout(scroll, 50);
      } else {
        window.setTimeout(scroll, 250);
      }
    }
    return true;
  }

  const normalizedSelector = target.startsWith('#') ? target : `#${target}`;
  const el = document.querySelector(normalizedSelector) as HTMLElement | null;
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
};

export const navigateFromSources = (params: {
  scrollTo?: string | null;
  buttonValue?: string | null;
  keywordText?: string | null;
  routeRegistry: RouteRegistry;
  navigate?: ((to: string) => void) | null;
  currentPathname?: string | null;
}): boolean => {
  const { scrollTo, buttonValue, keywordText, routeRegistry, navigate, currentPathname } = params;
  const targetFromScroll = resolveRouteTarget(scrollTo || null, routeRegistry);
  if (navigateToRoute(targetFromScroll, navigate, currentPathname)) return true;

  const targetFromButton = resolveRouteTarget(buttonValue || null, routeRegistry);
  if (navigateToRoute(targetFromButton, navigate, currentPathname)) return true;

  const keywordIntent = keywordText ? detectIntentFromText(keywordText) : null;
  const targetFromKeyword = resolveRouteTarget(keywordIntent, routeRegistry);
  if (navigateToRoute(targetFromKeyword, navigate, currentPathname)) return true;

  return false;
};

const LEARN_MORE_ROUTE_MAP: Record<LearnMoreIntent, string> = {
  services: '/#services',
  usecases: '/use-cases',
  about: '/#about-us',
  blog: '/blogs',
  community: '/community',
  auditform: '/auditform',
  contact: '/#contact',
  faq: '/#faq',
  pricing: '/#pricing',
};

export const inferLearnMoreIntent = (text: string): LearnMoreIntent | null => {
  const query = text.trim().toLowerCase();
  if (!query) return null;

  if (/(login|sign[\s-]?up|signup|sign[\s-]?in|register|create account)/.test(query)) {
    return null;
  }

  if (/(about us|about teeny tech trek|what is teeny tech trek|who are you|who is teeny tech trek|tell me about teeny tech trek|why teeny tech trek)/.test(query)) {
    return 'about';
  }
  if (/(use cases|use case|case studies|case study|industries you work with|industries|industry examples)/.test(query)) {
    return 'usecases';
  }
  if (/(blog|blogs|article|articles|resources|resource)/.test(query)) return 'blog';
  if (/(community|join community|forum|discussion)/.test(query)) return 'community';
  if (/(audit form|audit|assessment form)/.test(query)) return 'auditform';
  if (/(contact|get in touch|reach out|email|phone|address|call us)/.test(query)) return 'contact';
  if (/(faq|frequently asked questions|common questions)/.test(query)) return 'faq';
  if (/(pricing|price|plans|plan|consultation|book consultation|strategy call)/.test(query)) return 'pricing';
  if (/(services|service|solutions|solution|chatbot|chatbots|automation|agentic|ai app|ai apps|workflow|workflows)/.test(query)) {
    return 'services';
  }

  return null;
};

export const getLearnMoreTarget = (intent: LearnMoreIntent | null): string | null => {
  if (!intent) return null;
  return LEARN_MORE_ROUTE_MAP[intent] || null;
};
