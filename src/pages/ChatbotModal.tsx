import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LogIn, MoreVertical, Send, UserPlus, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  discoverRouteRegistry,
  getLearnMoreTarget,
  inferLearnMoreIntent,
  navigateToRoute,
} from '../utils/chatbotRouter';
import tttLogo from '../assets/teeny-logo.svg';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ButtonOption {
  id: string;
  label: string;
  value: string;
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
  "Hey there! I'm Anisha, your AI assistant at Teeny Tech Trek. Ask me anything about our AI services, integrations, pricing, or solutions.";

const DEFAULT_GREETING_ACTIONS = ['AI Services', 'Integrations', 'Pricing', 'Solutions'];

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

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>('');

  const createId = useCallback(() => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, []);

  const getSessionId = useCallback(() => {
    if (sessionIdRef.current) return sessionIdRef.current;
    const storageKey = 'ttt_chat_session_id';
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      sessionIdRef.current = existing;
      return existing;
    }
    const newId = `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(storageKey, newId);
    sessionIdRef.current = newId;
    return newId;
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

  const latestSuggestedActions =
    [...messages].reverse().find((msg) => !msg.isUser && msg.suggestedActions && msg.suggestedActions.length > 0)
      ?.suggestedActions || [];

  useEffect(() => {
    if (isOpen) {
      getSessionId();
      inputRef.current?.focus();
      showGreetingMessage();
    } else {
      setMessages([]);
    }
  }, [getSessionId, isOpen, showGreetingMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      {isOpen && <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden" onClick={onClose} />}

      <div
        className={`
        fixed z-[9999] border border-blue-100 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.15),0_8px_20px_rgba(0,0,0,0.08)]
        right-3 left-3 bottom-24 md:left-auto md:right-6 md:bottom-24
        w-auto md:w-[400px] md:min-w-[390px]
        h-[500px] max-h-[500px]
        rounded-[18px] overflow-hidden
        transform-gpu origin-bottom-right transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}
        flex flex-col
      `}
      >
        <div className="relative flex items-center justify-between h-[58px] px-4 text-white border-b border-blue-200/60 bg-[linear-gradient(135deg,#2563EB,#4F46E5)]">
          <div className="flex items-center min-w-0 gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white shrink-0">
              <img src={tttLogo} alt="Teeny Tech Trek" className="w-5 h-6 object-contain" />
              <span className="absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full -right-0.5 bottom-0" />
            </div>
            <div className="flex flex-col justify-center min-w-0 gap-0.5">
              <p className="text-[10px] leading-none text-blue-100/95">Chat with</p>
              <h2 className="text-[15px] leading-none font-semibold tracking-tight">Anisha</h2>
            </div>
          </div>
          <div ref={menuRef} className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
              className="p-2 rounded-full text-white/90 transition-all duration-200 hover:bg-white/15 hover:scale-105"
              aria-label="Open menu"
            >
              <MoreVertical size={19} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/90 transition-all duration-200 rounded-full hover:bg-white/15 hover:scale-105"
              aria-label="Close chat"
            >
              <X size={19} />
            </button>

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

        <div className="flex-1 px-4 pt-2.5 pb-4 space-y-3.5 overflow-y-auto bg-gradient-to-b from-blue-50 via-white to-white scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
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
                            className="px-3 py-1.5 text-[13px] font-medium text-blue-700 bg-[#EEF2FF] rounded-[20px] hover:bg-blue-100 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className={`mt-2 text-xs ${msg.isUser ? 'text-blue-100/90' : 'text-gray-500'} flex justify-end`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="max-w-[85%] px-3 py-2.5 text-gray-600 bg-[#F8FAFF] border border-blue-100 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400/80 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 delay-150 bg-blue-400/80 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 delay-300 bg-blue-400/80 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}

          {latestSuggestedActions.length > 0 && (
            <div className="pt-3 mt-2 border-t border-gray-200 animate-fade-in-up">
              <p className="mb-1.5 text-xs font-semibold tracking-wide text-gray-500">Suggested</p>
              <div className="flex flex-wrap gap-1.5">
                {latestSuggestedActions.map((action) => (
                  <button
                    key={`suggest-panel-${action}`}
                    type="button"
                    onClick={() => handleSuggestionClick(action)}
                    disabled={isTyping}
                    className="px-3 py-1 text-[12.5px] font-medium text-blue-700 bg-[#EEF2FF] rounded-[20px] hover:bg-blue-100 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t bg-white border-blue-100">
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
              className="flex items-center justify-center w-11 h-11 text-white transition-all duration-200 rounded-full bg-[linear-gradient(135deg,#3B82F6,#2563EB)] hover:shadow-md hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
          <p className="mt-2 text-xs text-center text-gray-500">Powered by TeenyTech Trek</p>
        </div>
      </div>
    </>
  );
};

export default ChatbotModal;







