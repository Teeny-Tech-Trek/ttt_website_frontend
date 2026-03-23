import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { discoverRouteRegistry, navigateFromSources } from '../utils/chatbotRouter';

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

interface ChatApiResult {
  reply: string;
  short_message?: string | null;
  full_message?: string | null;
  scroll_to?: string | null;
  open_login_modal?: boolean | null;
  buttons?: string[] | null;
  suggested_actions?: string[] | null;
  options?: ButtonOption[] | null;
}

const ServiceCard: React.FC<{ title: string; description: string; price?: string }> = ({ title, description, price }) => (
  <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
    <h3 className="text-sm font-semibold text-indigo-600">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{description}</p>
    {price && <p className="mt-2 text-sm font-bold text-gray-800">{price}</p>}
    <button className="mt-3 w-full px-3 py-2 text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700">
      Learn More
    </button>
  </div>
);

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const { openAuthModal } = useAuth();
  const DEFAULT_API_BASE_URL = import.meta.env.DEV
    ? 'http://localhost:5000'
    : 'https://api.teenytechtrek.com';
  const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>('');

  const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const getSessionId = () => {
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
  };

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

  const fetchIntroMessage = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chatbot/intro`);
      const data = await res.json();
      setMessages([
        {
          id: createId(),
          text: data.message || "Hello! I'm your AI assistant.",
          isUser: false,
          timestamp: new Date(),
          type: 'text',
        },
      ]);
    } catch (error) {
      console.error('Intro API Error:', error);
      setMessages([
        {
          id: createId(),
          text: "Hello! I'm your AI assistant. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
          type: 'text',
        },
      ]);
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
          stream: true,
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
                  open_login_modal: parsed.final.open_login_modal || false,
                  buttons: parsed.final.buttons || null,
                  suggested_actions: parsed.final.suggested_actions || null,
                  options: normalizeOptions(parsed.final.options || null, parsed.final.buttons || null),
                };
              }
            } catch (_error) {
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
    const assistantId = createId();
    const userBubble: Message = {
      id: createId(),
      text: visibleLabel || outboundText,
      isUser: true,
      timestamp: new Date(),
      type: 'text',
    };
    const assistantBubble: Message = {
      id: assistantId,
      text: '',
      isUser: false,
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userBubble, assistantBubble]);

    setIsTyping(true);
    const aiResponse = await sendMessageToAPI(
      { message: outboundText, type: requestType },
      (partialText, _done) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: partialText, timestamp: new Date() } : m))
        );
      }
    );
    setIsTyping(false);
    const routeRegistry = discoverRouteRegistry();
    if (aiResponse.open_login_modal) {
      openAuthModal('login');
    } else {
      navigateFromSources({
        scrollTo: aiResponse.scroll_to || null,
        buttonValue: requestType === 'button' ? outboundText : null,
        keywordText: requestType === 'text' ? outboundText : null,
        routeRegistry,
      });
    }

    const shortText = aiResponse.short_message || aiResponse.reply || '';
    const services = parseServices(shortText);
    const isService = services.length > 0;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId
          ? {
              ...m,
              text: shortText,
              fullText: aiResponse.full_message || undefined,
              scrollTo: aiResponse.scroll_to || undefined,
              suggestedActions: aiResponse.suggested_actions || undefined,
              type: isService ? 'service' : 'text',
              services,
              options: aiResponse.options || undefined,
            }
          : m
      )
    );
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
    await runConversationTurn(opt.value, 'button', opt.label);
  };

  const handleSuggestionClick = async (action: string) => {
    if (isTyping || !action.trim()) return;
    await runConversationTurn(action, 'text', action);
  };

  useEffect(() => {
    if (isOpen) {
      getSessionId();
      inputRef.current?.focus();
      fetchIntroMessage();
    } else {
      setMessages([]);
    }
  }, [isOpen]);

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

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm md:hidden" onClick={onClose} />}

      <div
        className={`
        fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[9999]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col border-l border-gray-200
      `}
      >
        <div className="flex items-center justify-between p-4 text-white border-b bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-white/20">
              <Bot size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Assistant</h2>
              <p className="flex items-center text-xs opacity-80">
                {isTyping ? (
                  <span className="flex items-center">
                    <span className="animate-pulse">Typing</span>
                    <span className="flex ml-1">
                      <span className="animate-bounce">.</span>
                      <span className="delay-100 animate-bounce">.</span>
                      <span className="delay-200 animate-bounce">.</span>
                    </span>
                  </span>
                ) : (
                  'Online • Ready to help'
                )}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white transition-all duration-200 rounded-full hover:bg-white/20">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              {msg.type === 'service' ? (
                <div className="flex flex-col gap-3 max-w-[85%]">
                  <div className="p-3 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 shadow-sm">{msg.text.split('\n\n')[0]}</div>
                  <div className="grid gap-3">
                    {msg.services?.map((srv, i) => (
                      <ServiceCard key={i} title={srv.title} description={srv.description} price={srv.price} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex max-w-[85%] gap-2">
                  {!msg.isUser && (
                    <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-full w-7 h-7">
                      <Bot size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none'
                        : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
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
                            className="px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full hover:bg-indigo-200 disabled:opacity-60"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {!msg.isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-3">
                        <p className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">Suggested</p>
                        <div className="flex flex-wrap gap-2">
                          {msg.suggestedActions.map((action) => (
                            <button
                              key={`suggest-${action}`}
                              type="button"
                              onClick={() => handleSuggestionClick(action)}
                              disabled={isTyping}
                              className="px-3 py-1.5 text-xs font-medium text-sky-700 bg-sky-100 rounded-full hover:bg-sky-200 disabled:opacity-60"
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={`mt-2 text-xs ${msg.isUser ? 'text-blue-100' : 'text-gray-500'} flex justify-end`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {msg.isUser && (
                    <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-blue-500 rounded-full w-7 h-7">
                      <User size={14} className="text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex max-w-[85%] gap-2">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-full w-7 h-7">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="p-3 text-gray-700 bg-white border border-gray-200 rounded-bl-none shadow-sm rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-150 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 delay-300 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-3 text-sm transition-all duration-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="submit"
              disabled={!message.trim() || isTyping}
              className="flex items-center justify-center px-4 py-3 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="mt-2 text-xs text-center text-gray-500">
            Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatbotModal;







