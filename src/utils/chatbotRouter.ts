export type RouteRegistry = Record<string, string>;

const STATIC_ROUTES: RouteRegistry = {
  services: '#services',
  solutions: '#services',
  'ai solutions': '#services',
  pricing: '#pricing',
  contact: '#contact',
  blogs: '#blogs',
  blog: '#blogs',
  articles: '#blogs',
  'use cases': '#use-cases',
  faq: '#faq',
  consultation: '#pricing',
  'book consultation': '#pricing',
  'strategy call': '#pricing',
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
  if (raw.startsWith('#')) return raw;
  if (raw.startsWith('/')) return null;
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
    contact: 'contact',
  };
  const canonical = aliasMap[normalized] || normalized;
  return routeRegistry[canonical] || routeRegistry[canonical.replace(/-/g, ' ')] || null;
};

export const navigateToRoute = (selector: string | null | undefined): boolean => {
  if (!selector) return false;
  const target = selector.trim();
  if (!target) return false;
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
}): boolean => {
  const { scrollTo, buttonValue, keywordText, routeRegistry } = params;
  const targetFromScroll = resolveRouteTarget(scrollTo || null, routeRegistry);
  if (navigateToRoute(targetFromScroll)) return true;

  const targetFromButton = resolveRouteTarget(buttonValue || null, routeRegistry);
  if (navigateToRoute(targetFromButton)) return true;

  const keywordIntent = keywordText ? detectIntentFromText(keywordText) : null;
  const targetFromKeyword = resolveRouteTarget(keywordIntent, routeRegistry);
  if (navigateToRoute(targetFromKeyword)) return true;

  return false;
};
