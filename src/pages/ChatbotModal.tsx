import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Building2,
  Calendar,
  LayoutGrid,
  LogIn,
  MessageSquare,
  MoreVertical,
  Plug,
  Send,
  Sparkles,
  Tag,
  UserPlus,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  discoverRouteRegistry,
  getLearnMoreTarget,
  inferLearnMoreIntent,
  navigateToRoute,
} from '../utils/chatbotRouter';
import {
  getChatSessionId as readSessionIdFromStorage,
  isLeadCaptured,
  markLeadCaptured,
} from '../utils/leadCapture';
import tttLogo from '../assets/teeny-logo.svg';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullPage?: boolean;
}

interface ButtonOption {
  id: string;
  label: string;
  value: string;
}

interface LeadFieldOption {
  label: string;
  value: string;
}

type LeadFieldType = 'text' | 'email' | 'tel' | 'select' | 'textarea';

interface LeadField {
  name: string;
  label: string;
  type: LeadFieldType;
  required: boolean;
  placeholder?: string;
  options: LeadFieldOption[];
}

interface LeadFormSpec {
  title: string;
  description: string;
  submit_endpoint: string;
  submit_label: string;
  fields: LeadField[];
}

interface Message {
  id?: string;
  text: string;
  fullText?: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'service';
  services?: { title: string; description: string; price?: string }[];
  options?: ButtonOption[];
  scrollTo?: string | null;
  suggestedActions?: string[];
}

const DEFAULT_GREETING =
  "Hi! I'm the Teeny Tech Trek assistant. Ask me anything about our AI services, integrations, pricing, or solutions.";

const DEFAULT_GREETING_ACTIONS = ['AI Services', 'Integrations', 'Pricing', 'Solutions'];

// Pick a Lucide icon for a suggestion chip based on its label. Keyword-matched
// so it still works for arbitrary suggested_actions the backend may return.
const getChipIcon = (label: string): LucideIcon => {
  const l = label.toLowerCase();
  if (l.includes('integrat')) return Plug;
  if (l.includes('pric') || l.includes('plan') || l.includes('cost')) return Tag;
  if (l.includes('solution')) return LayoutGrid;
  if (l.includes('industr') || l.includes('use case') || l.includes('case stud')) return Building2;
  if (l.includes('consult') || l.includes('book') || l.includes('call') || l.includes('contact')) return Calendar;
  if (l.includes('blog') || l.includes('article') || l.includes('resource')) return BookOpen;
  if (l.includes('servic')) return Sparkles;
  return MessageSquare;
};

interface ChatApiResult {
  reply: string;
  short_message?: string | null;
  full_message?: string | null;
  scroll_to?: string | null;
  source?: string | null;
  open_login_modal?: boolean | null;
  buttons?: string[] | null;
  suggested_actions?: string[] | null;
  options?: ButtonOption[] | null;
  form?: LeadFormSpec | null;
  metadata?: { gate?: string | null } | null;
}

const ServiceCard: React.FC<{ title: string; description: string; price?: string }> = ({ title, description, price }) => (
  <div className="p-4 border rounded-xl border-blue-100 bg-white shadow-sm hover:shadow-md transition-all duration-200">
    <h3 className="text-sm font-semibold text-blue-700">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
    {price && <p className="mt-2 text-sm font-bold text-gray-800">{price}</p>}
    <button className="mt-3 w-full px-3 py-2 text-sm text-white rounded-lg bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] hover:bg-[linear-gradient(135deg,#1D4ED8,#1E40AF)] transition-all duration-200">
      Learn More
    </button>
  </div>
);

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose, fullPage = false }) => {
  const { openAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const DEFAULT_API_BASE_URL = import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://api.teenytechtrek.com';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Lead-capture gate: when set, the intake form is shown and chat is blocked
  // until it's submitted. The shape is owned by the backend (/api/chatbot/intro).
  const [leadForm, setLeadForm] = useState<LeadFormSpec | null>(null);
  const [leadValues, setLeadValues] = useState<Record<string, string>>({});
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>('');

  const createId = useCallback(() => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, []);

  const getSessionId = useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current;
    // Shared storage key lives in utils/leadCapture so the Contact Us form
    // can satisfy the chatbot's gate for the same anonymous visitor.
    const id = readSessionIdFromStorage();
    sessionIdRef.current = id;
    return id;
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const parseServices = (reply: string) => {
    const regex = /\d+\.\s\*\*(.*?)\*\*:\s([\s\S]*?)(?:starts at\s\*\*(.*?)\*\*)/g;
    const matches = Array.from(reply.matchAll(regex));
    return matches.map((m) => ({
      title: m[1].trim(),
      description: m[2].trim(),
      price: m[3]?.trim(),
    }));
  };

  const normalizeOptions = (options?: ButtonOption[] | null, buttons?: string[] | null): ButtonOption[] | null => {
    if (options && options.length > 0) return options;
    if (!buttons || buttons.length === 0) return null;
    return buttons.map((label) => {
      const low = label.trim().toLowerCase();
      let value = label;
      if (low === 'back to main menu') value = 'menu';
      if (low === 'learn more') value = 'learn_more';
      if (low === 'contact information') value = 'contact';
      return {
        id: low.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'btn',
        label,
        value,
      };
    });
  };

  const isWelcomeResponse = (text?: string, options?: ButtonOption[] | null): boolean => {
    const labels = new Set((options || []).map((opt) => opt.label.trim().toLowerCase()));
    if (
      labels.has('explore ai services') &&
      labels.has('industries we work with') &&
      labels.has('pricing & consultation')
    ) {
      return true;
    }
    const normalizedText = (text || '').trim().toLowerCase();
    return normalizedText.includes("what would you like to explore?");
  };

  const shouldKeepFlowOptions = (response: ChatApiResult): boolean =>
    isWelcomeResponse(response.short_message || response.reply || '', response.options);

  const ensureUiButtons = (options?: ButtonOption[] | null, learnMoreTarget?: string | null): ButtonOption[] => {
    const normalized = [...(options || [])].map((opt) => {
      if (learnMoreTarget && opt.label.trim().toLowerCase() === 'learn more') {
        return { ...opt, value: `learn_more:${learnMoreTarget}` };
      }
      return opt;
    });
    const seen = new Set(normalized.map((opt) => opt.label.trim().toLowerCase()));

    if (learnMoreTarget && !seen.has('learn more')) {
      normalized.unshift({
        id: 'learn-more',
        label: 'Learn More',
        value: `learn_more:${learnMoreTarget}`,
      });
      seen.add('learn more');
    }

    if (!seen.has('back to main menu')) {
      normalized.push({
        id: 'back-to-main-menu',
        label: 'Back to Main Menu',
        value: 'menu',
      });
    }

    return normalized;
  };

  const showGreetingMessage = useCallback(() => {
    setMessages([
      {
        id: createId(),
        text: DEFAULT_GREETING,
        isUser: false,
        timestamp: new Date(),
        type: 'text',
        suggestedActions: DEFAULT_GREETING_ACTIONS,
      },
    ]);
  }, [createId]);

  const buildEmptyLeadValues = useCallback((form: LeadFormSpec): Record<string, string> => {
    const values: Record<string, string> = {};
    (form.fields || []).forEach((field) => {
      values[field.name] = '';
    });
    return values;
  }, []);

  // Show the intake form and reset any prior field state. Chat stays blocked
  // (the input is hidden) until the form submits successfully.
  const showLeadForm = useCallback(
    (form: LeadFormSpec) => {
      setLeadForm(form);
      setLeadValues(buildEmptyLeadValues(form));
      setLeadErrors({});
    },
    [buildEmptyLeadValues]
  );

  // Mirror the backend's per-field validation so users don't bounce off a 422.
  const validateLeadField = useCallback((field: LeadField, rawValue: string): string | null => {
    const value = (rawValue || '').trim();
    if (field.required && !value) {
      return `${field.label} is required.`;
    }
    if (!value) return null; // optional + empty: nothing else to check
    if (field.type === 'select') {
      const allowed = (field.options || []).map((opt) => opt.value);
      if (allowed.length > 0 && !allowed.includes(value)) {
        return `Please choose a valid ${field.label.toLowerCase()}.`;
      }
    }
    // Per-field rules mirror the Contact Us form (name / email / service / message).
    // Unknown field names fall through — generic required + select-membership
    // checks above still cover them, so the form keeps working if the backend
    // tweaks the spec.
    switch (field.name) {
      case 'name':
        if (value.length > 120) return 'Name must be 120 characters or fewer.';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Enter a valid email like you@company.com.';
        }
        break;
      case 'service':
        if (value.length > 120) return 'Please choose a valid service.';
        break;
      case 'message':
        if (value.length < 2) return 'Please share a short message.';
        if (value.length > 2000) return 'Message must be 2000 characters or fewer.';
        break;
      default:
        break;
    }
    return null;
  }, []);

  // Raw call to the intro endpoint. Returns either the gated shape ({ message, form })
  // or the legacy shape ({ message, options }). Callers decide how to render it.
  const requestIntro = useCallback(async () => {
    const sessionId = getSessionId();
    const response = await fetch(
      `${API_BASE_URL}/api/chatbot/intro?session_id=${encodeURIComponent(sessionId)}`
    );
    if (!response.ok) throw new Error('Intro request failed');
    return response.json();
  }, [API_BASE_URL, getSessionId]);

  // Called on widget open. Branches on whether the response carries a "form".
  // If the visitor already submitted either form (chatbot or Contact Us) inside
  // the TTL, we bypass the gate even when the backend returns one — the local
  // flag is our cross-touchpoint memory.
  const fetchIntro = useCallback(async () => {
    try {
      const data = await requestIntro();
      const alreadyCaptured = isLeadCaptured();
      if (data && data.form && !alreadyCaptured) {
        setMessages([
          {
            id: createId(),
            text: data.message || DEFAULT_GREETING,
            isUser: false,
            timestamp: new Date(),
            type: 'text',
          },
        ]);
        showLeadForm(data.form);
        return;
      }
      const introOptions =
        Array.isArray(data?.options) && data.options.length > 0
          ? (data.options as ButtonOption[])
          : undefined;
      setLeadForm(null);
      // If we're bypassing a returned form via the local flag, the backend's
      // "share a few details" copy would be confusing — fall back to the
      // standard greeting.
      const introText = alreadyCaptured && data?.form
        ? DEFAULT_GREETING
        : data?.message || DEFAULT_GREETING;
      setMessages([
        {
          id: createId(),
          text: introText,
          isUser: false,
          timestamp: new Date(),
          type: 'text',
          options: introOptions,
          suggestedActions: introOptions ? undefined : DEFAULT_GREETING_ACTIONS,
        },
      ]);
    } catch (error) {
      console.error('Intro API Error:', error);
      setLeadForm(null);
      showGreetingMessage();
    }
  }, [createId, requestIntro, showGreetingMessage, showLeadForm]);

  const handleLeadChange = (name: string, value: string) => {
    setLeadValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as the user fixes it.
    setLeadErrors((prev) => {
      if (!prev[name] && !prev._form) return prev;
      const next = { ...prev };
      delete next[name];
      delete next._form;
      return next;
    });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm || isSubmittingLead) return;

    // Validate everything client-side first.
    const errors: Record<string, string> = {};
    leadForm.fields.forEach((field) => {
      const err = validateLeadField(field, leadValues[field.name] || '');
      if (err) errors[field.name] = err;
    });
    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }
    setLeadErrors({});
    setIsSubmittingLead(true);

    try {
      const body: Record<string, string> = { session_id: getSessionId() };
      leadForm.fields.forEach((field) => {
        body[field.name] = (leadValues[field.name] || '').trim();
      });

      const response = await fetch(`${API_BASE_URL}${leadForm.submit_endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // FastAPI validation error: surface inline and let the user retry.
      if (response.status === 422) {
        const data = await response.json().catch(() => null);
        const fieldErrors: Record<string, string> = {};
        if (data && Array.isArray(data.detail)) {
          data.detail.forEach((item: { loc?: unknown[]; msg?: string }) => {
            const loc = Array.isArray(item.loc) ? item.loc : [];
            const fieldName = loc[loc.length - 1];
            if (typeof fieldName === 'string' && fieldName !== 'body') {
              fieldErrors[fieldName] = item.msg || 'Invalid value.';
            }
          });
        }
        setLeadErrors(
          Object.keys(fieldErrors).length > 0
            ? fieldErrors
            : { _form: 'Please check your details and try again.' }
        );
        return;
      }

      if (!response.ok) throw new Error('Lead submit failed');

      const data = await response.json();
      const welcomeOptions =
        Array.isArray(data?.options) && data.options.length > 0
          ? (data.options as ButtonOption[])
          : undefined;

      // Form passed: hide it, drop the welcome bubble + menu, re-enable chat.
      // Also flag the lead as captured so Contact Us can bypass on this device.
      markLeadCaptured('chatbot');
      setLeadForm(null);
      setLeadValues({});
      setLeadErrors({});
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          text: data?.message || DEFAULT_GREETING,
          isUser: false,
          timestamp: new Date(),
          type: 'text',
          options: welcomeOptions,
          suggestedActions: welcomeOptions ? undefined : DEFAULT_GREETING_ACTIONS,
        },
      ]);
    } catch (error) {
      console.error('Lead submit error:', error);
      setLeadErrors({ _form: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const sendMessageToAPI = async (
    payload: { message: string; type: 'text' | 'button' },
    onPartial: (text: string, done: boolean) => void
  ): Promise<ChatApiResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: payload.message,
          type: payload.type,
          session_id: getSessionId(),
          stream: false,
          route_registry: discoverRouteRegistry(),
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let combined = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';

          for (const evt of events) {
            const line = evt.split('\n').find((l) => l.startsWith('data:'));
            if (!line) continue;
            const rawPayload = line.slice(5).trim();
            if (!rawPayload) continue;

            try {
              const parsed = JSON.parse(rawPayload);
              if (parsed.token) {
                combined += parsed.token;
                onPartial(combined, false);
              }
              if (parsed.done && parsed.final) {
                const finalText = parsed.final.short_message || parsed.final.message || parsed.final.reply || combined;
                onPartial(finalText, true);
                return {
                  reply: finalText,
                  short_message: parsed.final.short_message || null,
                  full_message: parsed.final.full_message || null,
                  scroll_to: parsed.final.scroll_to || null,
                  source: parsed.final.source || null,
                  open_login_modal: parsed.final.open_login_modal || false,
                  buttons: parsed.final.buttons || null,
                  suggested_actions: parsed.final.suggested_actions || null,
                  options: normalizeOptions(parsed.final.options || null, parsed.final.buttons || null),
                  form: parsed.final.form || null,
                  metadata: parsed.final.metadata || null,
                };
              }
            } catch {
              // Ignore malformed partial events.
            }
          }
        }

        const finalFallback = combined || "Sorry, I'm having trouble connecting right now.";
        onPartial(finalFallback, true);
        return { reply: finalFallback, options: null };
      }

      const data = await response.json();
      const text = data.short_message || data.reply || data.message || "Sorry, I'm having trouble connecting right now.";
      onPartial(text, true);
      return {
        reply: text,
        short_message: data.short_message || null,
        full_message: data.full_message || null,
        scroll_to: data.scroll_to || null,
        source: data.source || null,
        open_login_modal: data.open_login_modal || false,
        buttons: data.buttons || null,
        suggested_actions: data.suggested_actions || null,
        options: normalizeOptions(data.options || null, data.buttons || null),
        form: data.form || null,
        metadata: data.metadata || null,
      };
    } catch (error) {
      console.error('Chat API Error:', error);
      const fallback = "Sorry, I'm having trouble connecting right now.";
      onPartial(fallback, true);
      return { reply: fallback, options: null };
    }
  };

  const runConversationTurn = async (
    outboundText: string,
    requestType: 'text' | 'button' = 'text',
    visibleLabel?: string
  ) => {
    const userBubble: Message = {
      id: createId(),
      text: visibleLabel || outboundText,
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userBubble]);

    setIsTyping(true);
    const aiResponse = await sendMessageToAPI({ message: outboundText, type: requestType }, () => {});
    setIsTyping(false);
    if (aiResponse.open_login_modal) {
      openAuthModal('login');
    }

    // Defensive: the gate can fire mid-session. If /chat returns a form (or
    // metadata.gate === "lead_capture"), re-show the intake form instead of a
    // chat bubble — unless the local capture flag says this visitor already
    // gave us their details via Contact Us / earlier session, in which case we
    // fall through and render the reply normally.
    const backendWantsForm = !!aiResponse.form || aiResponse.metadata?.gate === 'lead_capture';
    if (backendWantsForm && !isLeadCaptured()) {
      const gateText = aiResponse.short_message || aiResponse.reply;
      if (gateText) {
        setMessages((prev) => [
          ...prev,
          { id: createId(), text: gateText, isUser: false, timestamp: new Date(), type: 'text' },
        ]);
      }
      if (aiResponse.form) {
        showLeadForm(aiResponse.form);
      } else {
        // Gate fired without a form payload — pull the spec from the intro endpoint.
        try {
          const data = await requestIntro();
          if (data && data.form) showLeadForm(data.form);
        } catch (error) {
          console.error('Failed to load lead form spec:', error);
        }
      }
      return;
    }
    if (backendWantsForm) {
      // Local flag overrides the backend gate. Worth a log so a real
      // server-side gating bug doesn't go silent.
      console.warn('Chatbot gate fired despite local capture flag — rendering reply anyway.');
    }

    const shortText = aiResponse.short_message || aiResponse.reply || '';
    const services = parseServices(shortText);
    const isService = services.length > 0;
    const learnMoreIntent = inferLearnMoreIntent(visibleLabel || outboundText);
    const learnMoreTarget = getLearnMoreTarget(learnMoreIntent);
    const finalOptions = shouldKeepFlowOptions(aiResponse)
      ? (aiResponse.options || undefined)
      : ensureUiButtons(aiResponse.options, learnMoreTarget);

    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        text: shortText,
        fullText: aiResponse.full_message || undefined,
        isUser: false,
        timestamp: new Date(),
        scrollTo: aiResponse.scroll_to || undefined,
        suggestedActions: aiResponse.suggested_actions || undefined,
        type: isService ? 'service' : 'text',
        services,
        options: finalOptions,
      },
    ]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isTyping) return;
    const text = message;
    setMessage('');
    await runConversationTurn(text, 'text');
  };

  const handleOptionClick = async (opt: ButtonOption) => {
    if (isTyping) return;
    if (opt.value.startsWith('learn_more')) {
      const target = opt.value.includes(':') ? opt.value.slice(opt.value.indexOf(':') + 1) : null;
      if (target) {
        navigateToRoute(target, navigate, location.pathname);
      }
      return;
    }
    await runConversationTurn(opt.value, 'button', opt.label);
  };

  const handleSuggestionClick = async (action: string) => {
    if (isTyping || !action.trim()) return;
    await runConversationTurn(action, 'text', action);
  };

  const handleAccountNavigate = (path: '/login' | '/signup') => {
    setIsMenuOpen(false);
    navigate(path);
  };

  // Conversion CTA on the opening screen — routes to the consultation section.
  const handleBookConsultation = () => {
    navigateToRoute('/#pricing', navigate, location.pathname);
    if (!fullPage) onClose();
  };

  const latestSuggestedActions =
    [...messages].reverse().find((msg) => !msg.isUser && msg.suggestedActions && msg.suggestedActions.length > 0)
      ?.suggestedActions || [];

  // The opening state (rich chip cards + CTA) only shows before the visitor sends anything.
  const hasUserMessages = messages.some((msg) => msg.isUser);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setLeadForm(null);
      setLeadValues({});
      setLeadErrors({});
      return;
    }
    getSessionId();
    fetchIntro();
    // Defer focus until the input has mounted/animated in.
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(focusTimer);
  }, [getSessionId, isOpen, fetchIntro]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, leadForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.ctrlKey && e.key === '/') inputRef.current?.focus();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onWindowClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  return (
    <>
      {isOpen && !fullPage && <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Full-page backdrop on tablet/desktop — keeps the centered card from floating on a blank screen.
          Hidden on mobile because the chat fills the viewport edge-to-edge. */}
      {fullPage && isOpen && (
        <div className="fixed inset-0 z-[9998] hidden md:block bg-gradient-to-br from-blue-50 via-white to-blue-50" />
      )}

      <div
        role="dialog"
        aria-modal={!fullPage}
        aria-label="Teeny Tech Trek AI assistant chat"
        className={
          fullPage
            ? `fixed z-[9999] inset-0 h-[100dvh] bg-white overflow-hidden flex flex-col
               md:max-w-[760px] md:mx-auto md:border-x md:border-blue-100
               lg:inset-y-4 lg:h-auto lg:rounded-[18px] lg:border lg:border-blue-100 lg:shadow-[0_25px_60px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.08)]
               transition-opacity duration-200
               ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`
            : `
        fixed z-[9999] flex flex-col overflow-hidden bg-white border border-blue-100
        shadow-[0_25px_60px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.08)]
        inset-0 rounded-none
        md:inset-auto md:bottom-24 md:right-6 md:left-auto md:top-auto
        md:h-[560px] md:max-h-[560px] md:w-[400px] md:min-w-[390px] md:rounded-[18px]
        transform-gpu origin-bottom-right transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
      `}
      >
        <div className="relative flex items-center justify-between h-[58px] px-4 text-white border-b border-blue-200/60 bg-[linear-gradient(135deg,#2563EB,#4F46E5)]">
          <div className="flex items-center min-w-0 gap-3">
            <div className="relative flex items-center justify-center bg-white rounded-full w-9 h-9 shrink-0">
              <img src={tttLogo} alt="Teeny Tech Trek" className="object-contain w-5 h-6" />
              <span className="absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full -right-0.5 bottom-0" />
            </div>
            <div className="flex flex-col justify-center min-w-0 gap-1">
              <h2 className="text-[15px] leading-none font-semibold tracking-tight truncate">Teeny Tech Trek</h2>
              <p className="text-[11px] leading-none text-blue-100/95">
                {isTyping ? 'Typing…' : 'AI Assistant · Online'}
              </p>
            </div>
          </div>
          <div ref={menuRef} className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="p-2 rounded-full text-white/90 transition-all duration-200 hover:bg-white/15 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Open menu"
            >
              <MoreVertical size={19} />
            </button>
            {!fullPage && (
              <button
                onClick={onClose}
                className="p-2 text-white/90 transition-all duration-200 rounded-full hover:bg-white/15 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label="Close chat"
              >
                <X size={19} />
              </button>
            )}

            {isMenuOpen && (
              <div className="absolute right-2 top-[52px] z-20 w-40 p-2 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-gray-100 animate-fade-in-up">
                <button
                  type="button"
                  onClick={() => handleAccountNavigate('/login')}
                  className="flex items-center w-full gap-2 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <LogIn size={16} className="text-blue-600" />
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleAccountNavigate('/signup')}
                  className="flex items-center w-full gap-2 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <UserPlus size={16} className="text-blue-600" />
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="flex-1 px-4 pt-2.5 pb-4 space-y-3.5 overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-white scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent"
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Conversation"
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
              {msg.type === 'service' ? (
                <div className="flex flex-col gap-3.5 max-w-[85%]">
                  <div className="p-3 text-sm border rounded-lg bg-white border-blue-100 text-gray-700 shadow-sm">{msg.text.split('\n\n')[0]}</div>
                  <div className="grid gap-3">
                    {msg.services?.map((srv, i) => (
                      <ServiceCard key={i} title={srv.title} description={srv.description} price={srv.price} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-start max-w-[86%] gap-2.5">
                  {!msg.isUser && (
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-200 shrink-0">
                      <img src={tttLogo} alt="TTT" className="w-4 h-5 object-contain" />
                    </div>
                  )}
                  <div
                    className={`text-sm leading-relaxed shadow-sm ${
                      msg.isUser
                        ? 'bg-[linear-gradient(135deg,#3B82F6,#2563EB)] text-white rounded-[14px] px-[14px] py-[10px]'
                        : 'bg-[#F3F4F6] text-[#1F2937] border border-gray-200 rounded-[14px] px-[12px] py-[10px]'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    {!msg.isUser && msg.options && msg.options.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleOptionClick(opt)}
                            disabled={isTyping}
                            className="px-3 py-1.5 text-[13px] font-medium text-blue-700 bg-[#EEF2FF] rounded-[20px] hover:bg-blue-100 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className={`mt-2 text-[11px] ${msg.isUser ? 'text-blue-100' : 'text-gray-600'} flex justify-end`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="flex items-start gap-2.5">
                <div className="flex items-center justify-center bg-white border border-gray-200 rounded-full w-9 h-9 shrink-0">
                  <img src={tttLogo} alt="" className="object-contain w-4 h-5" />
                </div>
                <div className="px-3.5 py-3 bg-[#F3F4F6] border border-gray-200 rounded-[14px] shadow-sm">
                  <span className="sr-only">Assistant is typing</span>
                  <div className="flex space-x-1" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-blue-400/80 animate-bounce"></span>
                    <span className="w-2 h-2 delay-150 rounded-full bg-blue-400/80 animate-bounce"></span>
                    <span className="w-2 h-2 delay-300 rounded-full bg-blue-400/80 animate-bounce"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {leadForm && (
            <div className="animate-fade-in-up">
              <form
                onSubmit={handleLeadSubmit}
                className="p-4 space-y-3 bg-white border shadow-sm border-blue-100 rounded-[14px]"
                noValidate
              >
                <div>
                  <h3 className="text-sm font-semibold text-blue-700">{leadForm.title}</h3>
                  {leadForm.description && (
                    <p className="mt-1 text-xs leading-relaxed text-gray-500">{leadForm.description}</p>
                  )}
                </div>

                {leadForm.fields.map((field) => {
                  const value = leadValues[field.name] || '';
                  const error = leadErrors[field.name];
                  const fieldId = `lead-${field.name}`;
                  const baseClasses = `w-full px-3 py-2 text-sm text-gray-800 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.25)] ${
                    error
                      ? 'border-red-300 focus:border-red-400'
                      : 'border-blue-100 focus:border-[#60A5FA]'
                  }`;

                  return (
                    <div key={field.name} className="flex flex-col gap-1">
                      <label htmlFor={fieldId} className="text-xs font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          id={fieldId}
                          value={value}
                          onChange={(e) => handleLeadChange(field.name, e.target.value)}
                          className={baseClasses}
                          aria-invalid={!!error}
                        >
                          <option value="" disabled>
                            {field.placeholder || 'Select an option'}
                          </option>
                          {(field.options || []).map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={fieldId}
                          value={value}
                          rows={3}
                          placeholder={field.placeholder}
                          onChange={(e) => handleLeadChange(field.name, e.target.value)}
                          className={`${baseClasses} min-h-[80px] resize-none`}
                          aria-invalid={!!error}
                        />
                      ) : (
                        <input
                          id={fieldId}
                          type={field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
                          value={value}
                          placeholder={field.placeholder}
                          onChange={(e) => handleLeadChange(field.name, e.target.value)}
                          className={baseClasses}
                          aria-invalid={!!error}
                        />
                      )}

                      {error && <p className="text-[11px] text-red-500">{error}</p>}
                    </div>
                  );
                })}

                {leadErrors._form && <p className="text-[11px] text-red-500">{leadErrors._form}</p>}

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full px-3 py-2.5 text-sm font-medium text-white rounded-lg bg-[linear-gradient(135deg,#2563EB,#1D4ED8)] hover:brightness-110 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                >
                  {isSubmittingLead ? 'Submitting…' : leadForm.submit_label}
                </button>
              </form>
            </div>
          )}

          {/* Opening state: richer tappable cards + a conversion CTA. Fills the panel
              so it never reads as "content failed to load", and disappears once the
              visitor starts chatting. */}
          {!leadForm && !hasUserMessages && (
            <div className="pt-1 space-y-2.5 animate-fade-in-up">
              {latestSuggestedActions.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {latestSuggestedActions.map((action) => {
                    const Icon = getChipIcon(action);
                    return (
                      <button
                        key={`chip-${action}`}
                        type="button"
                        onClick={() => handleSuggestionClick(action)}
                        disabled={isTyping}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-left text-[13px] font-medium text-gray-700 bg-white border border-blue-100 shadow-sm rounded-xl hover:border-blue-300 hover:bg-blue-50/60 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EEF2FF] text-blue-600 shrink-0">
                          <Icon size={15} />
                        </span>
                        <span className="leading-tight">{action}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                type="button"
                onClick={handleBookConsultation}
                className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white shadow-sm rounded-xl bg-[linear-gradient(135deg,#2563EB,#4F46E5)] hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
              >
                <Calendar size={16} />
                Book a free consultation
              </button>
            </div>
          )}

          {/* Mid-conversation: keep suggestions light so they don't dominate the thread. */}
          {!leadForm && hasUserMessages && latestSuggestedActions.length > 0 && (
            <div className="pt-3 mt-2 border-t border-gray-200 animate-fade-in-up">
              <p className="mb-1.5 text-xs font-semibold tracking-wide text-gray-500">Suggested</p>
              <div className="flex flex-wrap gap-1.5">
                {latestSuggestedActions.map((action) => (
                  <button
                    key={`suggest-panel-${action}`}
                    type="button"
                    onClick={() => handleSuggestionClick(action)}
                    disabled={isTyping}
                    className="px-3 py-1 text-[12.5px] font-medium text-blue-700 bg-[#EEF2FF] rounded-[20px] hover:bg-blue-100 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div
          className="p-3 border-t bg-white border-blue-100"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          {leadForm ? (
            <p className="text-xs text-center text-gray-400">
              Complete the form above to start chatting.
            </p>
          ) : (
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-200 border border-blue-100 rounded-full bg-white focus:outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[rgba(59,130,246,0.25)]"
                autoFocus
              />
              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className="flex items-center justify-center w-11 h-11 text-white transition-all duration-200 rounded-full bg-[linear-gradient(135deg,#3B82F6,#2563EB)] hover:shadow-md hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1"
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
          )}
          <p className="mt-2 text-[11px] text-center text-gray-400">
            Responses are AI-generated · Powered by Teeny Tech Trek
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatbotModal;







