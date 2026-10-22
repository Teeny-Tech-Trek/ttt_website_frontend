import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  CheckCircle2,
  Bot,
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  Users,
  BarChart3,
  Headphones,
  Play,
  Calendar,
  Phone,
  PhoneCall,
  MessageCircle,
  Settings,
  Database,
  Video,
  Waves,
  Mic,
  MicOff,
  Loader2,
  ChevronDown,
  Send,
  Quote,
  HelpCircle,
  Globe,
  Search,
  ExternalLink,
} from 'lucide-react';
import { LiveAvatarSession, SessionEvent, SessionState, AgentEventsEnum } from '@heygen/liveavatar-web-sdk';
import {
  SiZendesk,
  SiIntercom,
  SiHubspot,
  SiShopify,
  SiWoocommerce,
  SiGmail,
  SiSlack,
  SiGooglesheets,
  SiCalendly,
  SiGooglecalendar,
  SiNotion,
  SiAirtable,
  SiSalesforce,
  SiWhatsapp,
} from 'react-icons/si';
import HashLink from '../../../components/ui/SectionLink';
import { useNavigate } from 'react-router-dom';
import yourAiAssistantImg from '../../../Images/services/web p chatbot service/your ai assistant.webp';
import multiChannelBotImg from '../../../Images/services/web p chatbot service/multi channel bot.webp';
import helpdeskConnectionImg from '../../../Images/services/web p chatbot service/helpdesk connection.webp';
import smartActionsImg from '../../../Images/services/web p chatbot service/smart actions.webp';

/* ------------------------------------------------------------------ */
/*  Shared bits (same pattern as the other revamped service pages)     */
/* ------------------------------------------------------------------ */

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: 'easeOut' },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const HandNote: React.FC<{ className?: string; children: React.ReactNode; rotate?: number }> = ({
  className = '',
  children,
  rotate = -4,
}) => (
  <div
    className={`hidden lg:block absolute text-blue-400 text-xl leading-snug pointer-events-none select-none ${className}`}
    style={{ fontFamily: "'Caveat', cursive", transform: `rotate(${rotate}deg)` }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const Eyebrow: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-blue-900 uppercase bg-blue-50 rounded-full">
    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
    {children}
  </div>
);

type AppIcon = { icon: React.ElementType; color: string };

const APP_ICONS: Record<string, AppIcon> = {
  Zendesk: { icon: SiZendesk, color: '#03363D' },
  Intercom: { icon: SiIntercom, color: '#1F8DED' },
  HubSpot: { icon: SiHubspot, color: '#FF7A59' },
  Freshdesk: { icon: Headphones, color: '#25C16F' },
  Shopify: { icon: SiShopify, color: '#95BF47' },
  WooCommerce: { icon: SiWoocommerce, color: '#96588A' },
  Gmail: { icon: SiGmail, color: '#EA4335' },
  Slack: { icon: SiSlack, color: '#4A154B' },
  'Google Sheets': { icon: SiGooglesheets, color: '#0F9D58' },
  Calendly: { icon: SiCalendly, color: '#006BFF' },
  'Google Calendar': { icon: SiGooglecalendar, color: '#4285F4' },
  Teams: { icon: Users, color: '#6264A7' },
  Notion: { icon: SiNotion, color: '#000000' },
  Airtable: { icon: SiAirtable, color: '#18BFFF' },
  Salesforce: { icon: SiSalesforce, color: '#00A1E0' },
  Website: { icon: Globe, color: '#1e3a8a' },
  WhatsApp: { icon: SiWhatsapp, color: '#25D366' },
  Helpdesk: { icon: Headphones, color: '#1e3a8a' },
};

const AppChip: React.FC<{ name: string; size?: 'sm' | 'md' }> = ({ name, size = 'sm' }) => {
  const entry = APP_ICONS[name];
  const dim = size === 'sm' ? 'w-7 h-7' : 'w-10 h-10';
  const iconDim = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  if (!entry) {
    return (
      <div className={`flex items-center justify-center ${dim} bg-gray-100 border border-gray-200 rounded-lg`} title={name}>
        <span className="text-[9px] font-bold text-gray-500">{name.slice(0, 1)}</span>
      </div>
    );
  }
  const Icon = entry.icon;
  return (
    <div className={`flex items-center justify-center ${dim} bg-white border border-gray-200 rounded-lg shadow-sm`} title={name}>
      <Icon className={iconDim} style={{ color: entry.color }} aria-hidden="true" />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    icon: PhoneCall,
    title: 'Voice Agents',
    tagline: 'AI that answers — and makes — calls',
    desc: 'Natural-sounding voice AI that handles inbound calls or places outbound ones: bookings, reminders, confirmations, support, and follow-up — trained on your business so every call sounds like your team, not a script.',
    bestFor: ['Inbound support & booking calls', 'Outbound reminders & confirmations', 'Lead qualification & follow-up'],
  },
  {
    icon: MessageSquare,
    title: 'Chatbots & Digital Twins',
    tagline: 'AI trained on exactly what you know',
    desc: 'A retrieval-first chat assistant trained on your docs, policies, and systems — answering with real citations, escalating cleanly to a human when it should, on web, WhatsApp, and your helpdesk.',
    bestFor: ['Website & helpdesk support', 'WhatsApp & Slack customer chat', 'Internal knowledge assistants'],
  },
  {
    icon: Video,
    title: 'Live Avatars',
    tagline: 'A face for your AI',
    desc: 'A realistic AI video avatar that talks, presents, and responds on screen — for kiosks, product walkthroughs, training content, or a more personal front door to your brand than a text box.',
    bestFor: ['Website/kiosk greeters & demos', 'Training & onboarding videos', 'Personalized video responses at scale'],
  },
];

const COMPARISON_ROWS: { label: string; values: [string, string, string] }[] = [
  { label: 'Best for', values: ['Calls — inbound & outbound', 'Text support at scale', 'Visual, high-touch moments'] },
  { label: 'Lives on', values: ['Phone lines', 'Website, WhatsApp, helpdesk', 'Website, kiosk, video content'] },
  { label: 'Setup time', values: ['~4 weeks', '~4 weeks', 'Varies by use case — ask us'] },
];

const AVATAR_SCRIPT = [
  "Hi there! I'm here to walk you through how this works.",
  'Just ask me a question, or pick one of the topics below to get started.',
];

/* ------------------------------------------------------------------ */
/*  Shared LiveAvatar session hook — powers both the Voice Agent and    */
/*  Live Avatar tabs. Proxied through our backend (/api/liveavatar/*)   */
/*  so the API key never reaches the browser. Sessions are capped      */
/*  client-side to a short demo length regardless of the account's own */
/*  limit, so a forgotten open tab can't quietly burn credits.         */
/* ------------------------------------------------------------------ */

const LIVEAVATAR_DEMO_LIMIT_SECONDS = 60;

type LiveAvatarStatus = 'idle' | 'connecting' | 'connected' | 'error';

function useLiveAvatarSession() {
  const DEFAULT_API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : 'https://api.teenytechtrek.com';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

  const [status, setStatus] = useState<LiveAvatarStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [avatarSpeaking, setAvatarSpeaking] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [lastReply, setLastReply] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sessionRef = useRef<InstanceType<typeof LiveAvatarSession> | null>(null);
  const sessionIdRef = useRef('');
  const limitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDemoTimers = () => {
    if (limitTimer.current) clearTimeout(limitTimer.current);
    if (warnTimer.current) clearTimeout(warnTimer.current);
  };

  const stop = () => {
    clearDemoTimers();
    sessionRef.current?.stop();
    sessionRef.current = null;
    setStatus('idle');
    setAvatarSpeaking(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => stop, []);

  const unlockAudio = () => {
    videoRef.current
      ?.play()
      .then(() => setAudioBlocked(false))
      .catch(() => {
        /* still blocked — user will need to try again */
      });
  };

  const start = async () => {
    setErrorMsg('');
    setAudioBlocked(false);
    setLastReply('');
    setStatus('connecting');
    sessionIdRef.current = `liveavatar-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const tokenRes = await fetch(`${API_BASE_URL}/api/liveavatar/get-access-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!tokenRes.ok) throw new Error(`token request failed (${tokenRes.status})`);
      const { token } = await tokenRes.json();
      if (!token) throw new Error('no session token returned');

      const session = new LiveAvatarSession(token, { voiceChat: false });
      sessionRef.current = session;

      session.on(SessionEvent.SESSION_STREAM_READY, () => {
        if (videoRef.current) {
          session.attach(videoRef.current);
          // Browsers can silently block unmuted autoplay once the click that
          // started the session is a few async hops back — retry explicitly
          // and surface a "tap to enable sound" affordance if it's rejected.
          videoRef.current.play().catch(() => setAudioBlocked(true));
        }
        setStatus('connected');

        limitTimer.current = setTimeout(() => {
          setErrorMsg(`This demo is capped at ${LIVEAVATAR_DEMO_LIMIT_SECONDS}s to keep it affordable — click Start again to continue.`);
          stop();
        }, LIVEAVATAR_DEMO_LIMIT_SECONDS * 1000);
        warnTimer.current = setTimeout(() => {
          setErrorMsg('Heads up — this demo ends in 10 seconds.');
        }, (LIVEAVATAR_DEMO_LIMIT_SECONDS - 10) * 1000);
      });
      session.on(SessionEvent.SESSION_DISCONNECTED, () => {
        clearDemoTimers();
        setStatus('idle');
        setAvatarSpeaking(false);
        if (videoRef.current) videoRef.current.srcObject = null;
      });
      session.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => setAvatarSpeaking(true));
      session.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => setAvatarSpeaking(false));

      await session.start();
    } catch (err) {
      console.error('LiveAvatar start error:', err);
      setStatus('error');
      setErrorMsg("Couldn't start the live demo. Please try again in a moment.");
    }
  };

  const ask = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (!sessionRef.current || sessionRef.current.state !== SessionState.CONNECTED) {
      setErrorMsg('Click "Start" first, then ask your question.');
      return;
    }
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/liveavatar/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed, session_id: sessionIdRef.current }),
      });
      const data = await res.json();
      const reply = data.reply_text || "Sorry, I didn't catch that — could you try again?";
      setLastReply(reply);
      sessionRef.current.repeat(reply);
    } catch (err) {
      console.error('LiveAvatar chat error:', err);
      setErrorMsg('Could not reach the assistant. Please try again.');
    }
  };

  return { videoRef, status, errorMsg, avatarSpeaking, audioBlocked, lastReply, start, stop, ask, unlockAudio };
}

// Browser-native speech recognition (Chrome/Edge only). `active` should be
// `micEnabled && !avatarSpeaking` so the mic doesn't pick up the avatar's own
// voice through the speakers.
function useSpeechRecognition(active: boolean, onResult: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition));
  }, []);

  useEffect(() => {
    if (!active || !supported) return undefined;
    const SpeechRecognitionImpl = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const last = event.results[event.results.length - 1];
      if (last.isFinal) onResultRef.current(last[0].transcript.trim());
    };
    recognition.onend = () => {
      // Browsers auto-stop recognition after a silence timeout — restart it
      // to keep the "always listening" feel while this mic is meant to be on.
      try {
        recognition.start();
      } catch {
        /* already running */
      }
    };
    try {
      recognition.start();
    } catch {
      /* already running */
    }
    return () => {
      recognition.onend = null;
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, supported]);

  return { supported };
}

/* ------------------------------------------------------------------ */
/*  Chat tab — opens the site's real chatbot widget as the demo, rather */
/*  than a scripted mockup                                             */
/* ------------------------------------------------------------------ */

const ChatDemoCTA: React.FC<{ onOpenChatbot?: () => void }> = ({ onOpenChatbot }) => (
  <div className="grid items-center max-w-4xl gap-10 mx-auto lg:grid-cols-2">
    <div className="p-10 text-center bg-white border border-gray-200 shadow-xl rounded-2xl">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-5 bg-blue-100 rounded-2xl">
        <Bot className="w-8 h-8 text-blue-900" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-black">Try our real chatbot — not a mockup</h3>
      <p className="mb-6 text-gray-700">
        This opens the exact AI assistant running on this site right now, trained on our real docs, policies, and services.
      </p>
      <button
        type="button"
        onClick={onOpenChatbot}
        className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
      >
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        Chat with our AI Assistant
      </button>
    </div>

    {/* A real client quote, kept verbatim per the content plan. */}
    <div className="relative p-6 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-xl">
      <Quote className="absolute w-12 h-12 text-blue-50 top-4 right-4" aria-hidden="true" />
      <div className="relative flex items-center gap-3 mb-4">
        <Star className="w-6 h-6 text-yellow-500" aria-hidden="true" />
        <h4 className="text-lg font-semibold text-gray-900">What Users Say</h4>
      </div>
      <div className="relative p-4 rounded-lg bg-gray-50">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
          ))}
        </div>
        <p className="text-sm italic text-gray-700">
          "TeenyBot resolved my issue in seconds. It's like having a super-smart assistant available 24/7!"
        </p>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full">S</div>
          <div>
            <div className="text-sm font-medium text-gray-900">Sarah Chen</div>
            <div className="text-xs text-gray-600">Product Manager</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  NetTwin Spotlight — Single-line banner matching website theme       */
/* ------------------------------------------------------------------ */

const NetTwinSpotlight: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-3.5 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/90 border border-blue-200/80 rounded-2xl shadow-sm my-2">
    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-semibold text-blue-900 uppercase bg-blue-100 rounded-full shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
        Product
      </span>
      <p className="text-sm sm:text-base text-gray-800 font-medium">
        Try our product <strong className="font-bold text-blue-900">NetTwin</strong> — your 24/7 AI Digital Persona & Twin
      </p>
    </div>
    <a
      href="https://nettwin.techtrekkers.ai/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors shadow-sm shrink-0"
    >
      <span>Try NetTwin</span>
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Voice Agent tab — real HeyGen LiveAvatar session, mic-first: click  */
/*  the mic and the voice agent talks back. Same backend as Avatar tab.*/
/* ------------------------------------------------------------------ */

const VoiceAgentDemoTab: React.FC = () => {
  const { videoRef, status, errorMsg, avatarSpeaking, audioBlocked, lastReply, start, stop, ask, unlockAudio } = useLiveAvatarSession();
  const [micEnabled, setMicEnabled] = useState(false);
  const [typedQuestion, setTypedQuestion] = useState('');

  const handleHeard = (text: string) => {
    if (!text) return;
    ask(text);
  };
  const { supported: micSupported } = useSpeechRecognition(micEnabled && status === 'connected' && !avatarSpeaking, handleHeard);

  const handleMicClick = async () => {
    if (status === 'idle' || status === 'error') {
      setMicEnabled(true);
      await start();
      return;
    }
    setMicEnabled((v) => !v);
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = typedQuestion;
    setTypedQuestion('');
    ask(text);
  };

  const listening = status === 'connected' && micEnabled && !avatarSpeaking;

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
        <div className="p-6 text-white bg-blue-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <Mic className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-lg font-bold">TeenyVoice Assistant</div>
                <div className="text-sm text-blue-100">AI Voice Agent • Live Demo</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-blue-300'}`} />
              <span className="text-sm">
                {status === 'connected' ? (avatarSpeaking ? 'Speaking…' : listening ? 'Listening…' : 'Connected') : status === 'connecting' ? 'Connecting…' : 'Tap the mic'}
              </span>
            </div>
          </div>
        </div>

        {/* Real LiveAvatar audio plays through this element; kept visually
            tiny (not display:none, which some browsers use to throttle
            media) since this tab is voice-first, not video-first. */}
        <video ref={videoRef} autoPlay playsInline className="absolute w-px h-px overflow-hidden opacity-0" />

        <div className="relative flex items-center justify-center gap-1 p-6 bg-gray-50 h-28">
          {[10, 22, 14, 28, 18, 32, 12, 24, 16, 26, 10, 20].map((h, i) => (
            <motion.span
              key={i}
              className={`w-2 rounded-full ${avatarSpeaking ? 'bg-blue-900' : listening ? 'bg-green-500' : 'bg-gray-300'}`}
              style={{ height: h }}
              animate={status === 'connected' ? { scaleY: [1, 1.6, 0.8, 1] } : { scaleY: 1 }}
              transition={{ duration: 1.2, repeat: status === 'connected' ? Infinity : 0, ease: 'easeInOut', delay: i * 0.06 }}
            />
          ))}
          {audioBlocked && (
            <button
              type="button"
              onClick={unlockAudio}
              className="absolute inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 rounded-full bottom-3"
            >
              🔊 Tap to enable sound
            </button>
          )}
        </div>

        <div className="p-6 min-h-[10rem] bg-gray-50">
          <p className="text-sm leading-relaxed text-gray-700">
            {lastReply || (status === 'connected' ? 'Ask a question out loud — I\'m listening.' : 'Tap the mic to start talking to the voice agent.')}
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 text-xs border-t text-amber-800 bg-amber-50 border-amber-100">
            <HelpCircle className="flex-shrink-0 w-3.5 h-3.5 mt-0.5" aria-hidden="true" />
            {errorMsg}
          </div>
        )}

        <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={handleMicClick}
            disabled={status === 'connecting'}
            aria-pressed={listening}
            aria-label={micEnabled ? 'Disable microphone' : 'Enable microphone'}
            className={`flex items-center justify-center w-16 h-16 rounded-full transition-colors disabled:opacity-60 ${
              listening ? 'bg-green-600 text-white' : status === 'connected' ? 'bg-gray-200 text-gray-500' : 'bg-blue-900 text-white'
            }`}
          >
            {status === 'connecting' ? (
              <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true" />
            ) : listening ? (
              <Mic className="w-6 h-6" aria-hidden="true" />
            ) : (
              <MicOff className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
          {status === 'connected' && (
            <button type="button" onClick={stop} className="text-xs font-semibold text-gray-500 hover:text-gray-700">
              End session
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-blue-900">
          <Waves className="w-5 h-5" aria-hidden="true" />
          Talk to the voice agent
        </h3>

        <div className="space-y-3">
          {['Book me an appointment for Thursday', 'Check my order status', 'Transfer me to a human'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <PhoneCall className="flex-shrink-0 w-4 h-4 text-blue-900" aria-hidden="true" />
              <span className="text-sm text-black">"{item}"</span>
            </div>
          ))}
        </div>

        {!micSupported && (
          <form onSubmit={handleTypedSubmit} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl">
            <input
              type="text"
              value={typedQuestion}
              onChange={(e) => setTypedQuestion(e.target.value)}
              placeholder="Voice input needs Chrome/Edge — type here instead"
              className="flex-1 px-3 py-2 text-sm outline-none placeholder:text-gray-400"
            />
            <button type="submit" className="flex items-center justify-center w-9 h-9 text-white bg-blue-900 rounded-lg">
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        )}

        <p className="flex items-start gap-2 p-4 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-xl">
          <HelpCircle className="flex-shrink-0 w-4 h-4 mt-0.5 text-gray-400" aria-hidden="true" />
          Real voice agent, powered by our own chatbot's answers — tap the mic and speak. Demo sessions are capped to
          {` ${LIVEAVATAR_DEMO_LIMIT_SECONDS}s`} to keep this affordable. Voice input needs Chrome or Edge.
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Avatar tab — real HeyGen LiveAvatar session, proxied through our    */
/*  backend (/api/liveavatar/*) so the API key never reaches the browser*/
/* ------------------------------------------------------------------ */

const AvatarDemoTab: React.FC = () => {
  const { videoRef, status, errorMsg, avatarSpeaking, audioBlocked, lastReply, start, stop, ask, unlockAudio } = useLiveAvatarSession();
  const [question, setQuestion] = useState('');
  const [micEnabled, setMicEnabled] = useState(false);

  const handleHeard = (text: string) => {
    setQuestion('');
    ask(text);
  };
  const { supported: micSupported } = useSpeechRecognition(micEnabled && status === 'connected' && !avatarSpeaking, handleHeard);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const text = question;
    setQuestion('');
    ask(text);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
        <div className="p-6 text-white bg-blue-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
                <Video className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-lg font-bold">TeenyAvatar</div>
                <div className="text-sm text-blue-100">AI Live Avatar • Live Demo</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-blue-300'}`} />
              <span className="text-sm">
                {status === 'connected' ? (avatarSpeaking ? 'Speaking…' : 'Connected') : status === 'connecting' ? 'Connecting…' : 'Live Demo'}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center bg-gray-900 aspect-video">
          <video ref={videoRef} autoPlay playsInline className="absolute inset-0 object-cover w-full h-full" />
          {status !== 'connected' && (
            <div className="relative z-10 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={start}
                disabled={status === 'connecting'}
                className="flex items-center justify-center w-20 h-20 text-blue-900 transition-transform bg-white rounded-full hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                aria-label="Start avatar"
              >
                {status === 'connecting' ? (
                  <Loader2 className="w-7 h-7 animate-spin" aria-hidden="true" />
                ) : (
                  <Play className="w-7 h-7 ml-0.5" aria-hidden="true" />
                )}
              </button>
              <span className="text-sm font-medium text-white">
                {status === 'connecting' ? 'Connecting to live avatar…' : 'Start Avatar'}
              </span>
            </div>
          )}
          {audioBlocked && (
            <button
              type="button"
              onClick={unlockAudio}
              className="absolute z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 rounded-full bottom-3"
            >
              🔊 Tap to enable sound
            </button>
          )}
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 p-3 text-xs border-t text-amber-800 bg-amber-50 border-amber-100">
            <HelpCircle className="flex-shrink-0 w-3.5 h-3.5 mt-0.5" aria-hidden="true" />
            {errorMsg}
          </div>
        )}

        <div className="p-4 text-sm text-center text-white bg-gray-800">
          {lastReply || (status === 'connected' ? 'Ask a question below to hear the avatar respond.' : AVATAR_SCRIPT[0])}
        </div>

        {status === 'connected' && (
          <div className="flex items-center justify-end p-3 bg-white border-t border-gray-100">
            <button type="button" onClick={stop} className="text-xs font-semibold text-gray-500 hover:text-gray-700">
              End session
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-blue-900">
          <Video className="w-5 h-5" aria-hidden="true" />
          Ask the avatar a question:
        </h3>

        <form onSubmit={handleSubmitQuestion} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. What services do you offer?"
            className="flex-1 px-3 py-2 text-sm outline-none placeholder:text-gray-400"
          />
          {micSupported && (
            <button
              type="button"
              onClick={() => setMicEnabled((v) => !v)}
              aria-pressed={micEnabled}
              aria-label={micEnabled ? 'Disable microphone' : 'Enable microphone'}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                micEnabled ? 'bg-blue-100 text-blue-900' : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              {micEnabled ? <Mic className="w-4 h-4" aria-hidden="true" /> : <MicOff className="w-4 h-4" aria-hidden="true" />}
            </button>
          )}
          <button type="submit" className="flex items-center justify-center w-9 h-9 text-white bg-blue-900 rounded-lg">
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        <div className="space-y-3">
          {['Website/kiosk greeters & demos', 'Training & onboarding videos', 'Personalized video responses at scale'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-blue-500" aria-hidden="true" />
              <span className="text-sm text-black">{item}</span>
            </div>
          ))}
        </div>

        <p className="flex items-start gap-2 p-4 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-xl">
          <HelpCircle className="flex-shrink-0 w-4 h-4 mt-0.5 text-gray-400" aria-hidden="true" />
          Real HeyGen live avatar, powered by our own chatbot's answers — click "Start Avatar" to connect. Demo
          sessions are capped to {LIVEAVATAR_DEMO_LIMIT_SECONDS}s to keep this affordable; click Start again to
          continue. Voice input needs Chrome or Edge; the text box above always works.
        </p>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  What We Deliver — mini illustrative widgets per card                */
/* ------------------------------------------------------------------ */

const DeliverWidgetAnalytics = () => (
  <div className="p-4 mt-4 bg-gray-50 border border-gray-100 rounded-xl">
    <div className="grid grid-cols-3 gap-2 mb-3">
      {[
        { value: '78%', label: 'Deflection rate', delta: '↑ 12%' },
        { value: '12s', label: 'Avg. response', delta: '↑ 40%' },
        { value: '4.8/5', label: 'CSAT score', delta: '↑ 0.6' },
      ].map((s) => (
        <div key={s.label} className="p-2 text-center bg-white border border-gray-200 rounded-lg">
          <div className="text-sm font-bold text-blue-900">{s.value}</div>
          <div className="text-[9px] text-gray-500 leading-tight">{s.label}</div>
          <div className="text-[9px] font-semibold text-green-600">{s.delta}</div>
        </div>
      ))}
    </div>
    <svg viewBox="0 0 200 40" className="w-full h-8" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points="0,30 28,20 57,24 85,12 114,16 142,6 171,10 200,2"
        fill="none"
        stroke="#1e3a8a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div className="flex justify-between mt-1 text-[8px] text-gray-400">
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
        <span key={d}>{d}</span>
      ))}
    </div>
  </div>
);

const DELIVERABLES: {
  icon: React.ElementType;
  pill: string;
  title: string;
  desc: string;
  widget?: React.ElementType;
  image?: string;
}[] = [
  {
    icon: MessageSquare,
    pill: 'Interface',
    title: 'Multi-Channel Deployment',
    desc: 'Deploy on website, WhatsApp, phone lines, and social platforms — one trained assistant, everywhere your customers already are.',
    image: multiChannelBotImg,
  },
  {
    icon: Headphones,
    pill: 'Integration',
    title: 'Helpdesk Connection',
    desc: 'Seamless handoffs to Zendesk, Intercom, or HubSpot with full conversation context — whether the handoff comes from a chat, a call, or an avatar interaction.',
    image: helpdeskConnectionImg,
  },
  {
    icon: Settings,
    pill: 'Automation',
    title: 'Smart Actions',
    desc: 'Order lookups, ticket creation, appointment booking, and system updates — automatically, across voice, chat, and video.',
    image: smartActionsImg,
  },
  {
    icon: BarChart3,
    pill: 'Analytics',
    title: 'Performance Tracking',
    desc: 'Real-time dashboards showing deflection rates, response times, and customer satisfaction — across every channel your assistant runs on.',
    widget: DeliverWidgetAnalytics,
  },
];

// NOTE: this list is deliberately chat/helpdesk tooling only. Voice Agents
// need a telephony provider (e.g. a Twilio-style number/SIP integration) and
// Live Avatars need a video/avatar-generation vendor — neither is a confirmed,
// currently-supported integration yet. Add a "Voice & Video" category here
// once those are finalized; don't list aspirational vendors in the meantime.
const integrations = ['Zendesk', 'Intercom', 'HubSpot', 'Freshdesk', 'Shopify', 'WooCommerce', 'Gmail', 'Slack', 'Google Sheets', 'Calendly', 'Google Calendar', 'Teams', 'Notion', 'Airtable', 'Salesforce'];

const faqs = [
  { q: 'Will it replace agents?', a: 'No — it handles repetitive work and escalates the rest.' },
  { q: 'How long does setup take?', a: 'Most pilots are live in 4 weeks.' },
  { q: 'Can it use our tone?', a: 'Yes — style and vocabulary are configurable.' },
  { q: 'Is our data secure?', a: 'Yes — we use secure, permission-based access and follow best practices for data privacy.' },
  { q: 'Do we need new tools?', a: 'No — start with what you have.' },
  { q: 'What tools does it integrate with?', a: 'It connects to 200+ tools, and we can build custom integrations for any tool with an API.' },
  {
    q: 'Can it make outbound calls, not just answer them?',
    a: 'Yes — voice agents can be configured for both inbound and outbound calling depending on your use case (reminders, confirmations, follow-ups).',
  },
  {
    q: "What's involved in creating a live avatar?",
    a: "We're still finalizing the exact process — broadly, it involves selecting or recording a base likeness, connecting it to the same knowledge base as your chatbot, and choosing where it's deployed. Ask us for specifics on a call.",
    // TODO(content owner): replace with the finalized avatar creation
    // process before this answer is treated as final customer-facing copy.
    placeholder: true,
  },
  {
    q: 'Which assistant type is right for us?',
    a: "Depends on where your customers already are and how personal you want the interaction to feel — happy to help you figure that out on a call.",
  },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                                */
/* ------------------------------------------------------------------ */

type ChatbotsPageProps = { onOpenChatbot?: () => void };

const ChatbotsPage: React.FC<ChatbotsPageProps> = ({ onOpenChatbot }) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleTryDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenChatbot) onOpenChatbot();
  };

  const handle4WeekPilotBtn = () => navigate('/pilot');

  return (
    <div className="min-h-screen bg-white mt-16">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap" rel="stylesheet" />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 bg-gray-100 rounded-full w-96 h-96 blur-3xl opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-gray-50 blur-3xl opacity-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </div>

        <div className="relative px-6 pt-8 mx-auto max-w-7xl sm:pt-12 lg:pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div className="space-y-8" initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div
                className="items-center hidden gap-2 px-4 py-2 text-blue-900 bg-gray-100 rounded-full lg:inline-flex"
                variants={scaleIn}
              >
                <Bot className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">AI Virtual Assistants</span>
              </motion.div>

              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black" variants={fadeInUp}>
                AI Virtual Assistants — <span className="text-blue-900">On the Phone, in Chat, or on Screen</span>
              </motion.h1>

              <motion.p className="text-xl leading-relaxed text-gray-700" variants={fadeInUp}>
                Voice agents, retrieval-trained chatbots, and live AI avatars — all built on your data, all with a human
                in the loop. Give customers an AI assistant that actually knows your business, however they prefer to
                reach you.
              </motion.p>

              <motion.div className="flex flex-col gap-4 sm:flex-row" variants={fadeInUp}>
                <motion.button
                  onClick={handleTryDemo}
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-colors bg-blue-900 rounded-lg hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" aria-hidden="true" />
                  Try the live demo
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-blue-900 transition-colors bg-white border-2 border-blue-900 rounded-lg hover:bg-blue-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handle4WeekPilotBtn}
                >
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  See a 4-week pilot plan
                </motion.button>
              </motion.div>

              <motion.div className="flex flex-wrap gap-x-6 gap-y-2" variants={fadeInUp}>
                {['Answers from your real data', 'Works across voice, chat & video', 'Human-in-the-loop'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </motion.div>

              <motion.div className="p-4 border border-blue-200 rounded-lg bg-blue-50" variants={fadeInUp}>
                <p className="text-sm text-black">
                  <span className="font-semibold text-blue-900">For:</span> Support, sales, and ops teams that want
                  instant, brand-safe answers — on the phone, in chat, or on screen — with a human always in the loop.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            >
              <motion.div className="p-4" whileHover={{ y: -10, transition: { duration: 0.3 } }}>
                <img
                  src={yourAiAssistantImg}
                  alt="Your AI Assistant chat window with refund-policy Q&A, connected to your docs, systems, and analytics"
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= THREE WAYS TO GIVE YOUR BUSINESS A VOICE ================= */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Sparkles}>Three Assistant Types</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">Three Ways to Give Your Business a Voice</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-700">
              Same foundation — your data, your systems, a human in the loop — three different ways to put it in front
              of people.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PILLARS.map((p) => (
              <motion.div key={p.title} className="p-8 bg-white border border-gray-200 rounded-2xl" variants={fadeInUp} whileHover={{ y: -6 }}>
                <div className="flex items-center justify-center w-14 h-14 mb-5 bg-blue-100 rounded-2xl">
                  <p.icon className="w-7 h-7 text-blue-900" aria-hidden="true" />
                </div>
                <h3 className="mb-1 text-xl font-bold text-black">{p.title}</h3>
                <p className="mb-3 text-sm italic font-medium text-blue-900">{p.tagline}</p>
                <p className="mb-5 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <div className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">Best for</div>
                  <ul className="space-y-1.5">
                    {p.bestFor.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Not Sure Which Fits? comparison table */}
          <motion.div
            className="mt-10 overflow-hidden bg-white border border-gray-200 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="p-6 text-center border-b border-gray-100">
              <h3 className="text-xl font-bold text-black">Not Sure Which Fits?</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left text-gray-500" />
                    {PILLARS.map((p) => (
                      <th key={p.title} className="p-4 font-semibold text-left text-blue-900">
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="p-4 font-semibold text-gray-500 whitespace-nowrap">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="p-4 text-gray-700">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SEE IT IN ACTION ================= */}
      <section id="see-it-work" className="relative py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <HandNote className="top-4 right-6" rotate={4}>
            Test real{'\n'}use cases
          </HandNote>

          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Play}>Live Demo</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              See It In <span className="text-blue-900">Action</span>
            </h2>
            <p className="text-xl text-gray-700">Watch how each type of AI assistant handles a real conversation.</p>
          </motion.div>
        </div>

        <div className="space-y-16">
          <div className="px-6 mx-auto max-w-7xl">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-blue-900 uppercase bg-blue-100 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
              Voice Agent Demo
            </motion.span>
            <VoiceAgentDemoTab />
          </div>

          <div className="py-12 bg-gray-50 border-y border-gray-100">
            <div className="max-w-3xl px-6 mx-auto text-center">
              <p className="text-lg font-medium leading-relaxed text-gray-700">
                Prefer text over talking? Here's the same assistant answering in chat.
              </p>
            </div>
          </div>

          <div className="px-6 mx-auto max-w-7xl">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-blue-900 uppercase bg-blue-100 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
              Chat Assistant Demo
            </motion.span>
            <ChatDemoCTA onOpenChatbot={onOpenChatbot} />
          </div>

          {/* NetTwin Digital Persona Product Spotlight */}
          <div className="px-6 mx-auto max-w-7xl">
            <NetTwinSpotlight />
          </div>

          <div className="py-12 bg-gray-50 border-y border-gray-100">
            <div className="max-w-3xl px-6 mx-auto text-center">
              <p className="text-lg font-medium leading-relaxed text-gray-700">
                Want a face on it? Here's what a live avatar looks like answering the same way.
              </p>
            </div>
          </div>

          <div className="px-6 mx-auto max-w-7xl">
            <motion.span
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-blue-900 uppercase bg-blue-100 rounded-full"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              Live Avatar Demo
            </motion.span>
            <AvatarDemoTab />
          </div>
        </div>

        <div className="px-6 mx-auto max-w-7xl">
          <div className="pt-10 mt-16 border-t border-gray-100">
            <div className="mb-4 text-xs font-semibold tracking-wide text-center text-gray-500 uppercase">
              Works where your customers are
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Website', 'WhatsApp', 'Slack', 'Intercom', 'Zendesk', 'Teams'].map((n) => (
                <div key={n} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <AppChip name={n} />
                  <span className="text-sm text-gray-700">{n}</span>
                </div>
              ))}
              <span className="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 rounded-full">+ More</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE DELIVER ================= */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Database}>What We Deliver</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              What We <span className="text-blue-900">Deliver</span>
            </h2>
            <p className="text-xl text-gray-700">
              The same platform underneath every assistant type — trained on your data, deployed however you want it.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {DELIVERABLES.map((item) =>
              item.image ? (
                <motion.div key={item.title} variants={fadeInUp} whileHover={{ y: -6 }}>
                  <img src={item.image} alt={`${item.title} — ${item.desc}`} className="w-full h-auto rounded-2xl" />
                </motion.div>
              ) : (
                <motion.div key={item.title} className="p-6 bg-white border border-gray-200 rounded-2xl" variants={fadeInUp} whileHover={{ y: -6 }}>
                  <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-xl">
                    <item.icon className="w-6 h-6 text-blue-900" aria-hidden="true" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 mb-3 text-xs font-medium text-blue-900 bg-blue-100 rounded-full">
                    {item.pill}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-black">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                  {item.widget && <item.widget />}
                </motion.div>
              )
            )}
          </motion.div>

          <div className="pt-10 mt-12 border-t border-gray-200">
            <div className="mb-4 text-xs font-semibold tracking-wide text-center text-gray-500 uppercase">
              Works with the tools you already use
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Zendesk', 'Intercom', 'HubSpot', 'Slack', 'Teams', 'WhatsApp'].map((n) => (
                <div key={n} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                  <AppChip name={n} />
                  <span className="text-sm text-gray-700">{n}</span>
                </div>
              ))}
              <span className="px-4 py-2 text-sm font-semibold text-blue-900 bg-blue-50 rounded-full">+ 200+ more</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTEGRATIONS ================= */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={Search}>Integrations</Eyebrow>
            <h2 className="mb-2 text-4xl font-bold text-blue-900">Integrations</h2>
            <p className="text-lg font-semibold text-black">Works with the tools you already use</p>
            <p className="mt-2 text-gray-700">
              Connects to 200+ tools with secure, permission-based access — and supports custom integrations for any
              tool with an API.
            </p>
          </motion.div>

          <motion.div
            className="grid max-w-4xl grid-cols-3 gap-4 mx-auto sm:grid-cols-4 lg:grid-cols-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            {integrations.map((integration) => (
              <motion.div
                key={integration}
                className="flex flex-col items-center gap-2 p-4 text-center bg-white border border-gray-200 rounded-xl"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <AppChip name={integration} size="md" />
                <span className="text-xs font-medium text-black">{integration}</span>
              </motion.div>
            ))}
            <motion.div
              className="flex flex-col items-center justify-center gap-2 p-4 text-center bg-blue-50 border border-blue-100 rounded-xl"
              variants={scaleIn}
            >
              <Zap className="w-6 h-6 text-blue-900" aria-hidden="true" />
              <span className="text-xs font-semibold text-blue-900">+ 200+ more</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm">
            {['Secure, permission-based connectors', 'Works with your existing stack', 'Custom integrations via API or MCP'].map((p) => (
              <div key={p} className="flex items-center gap-2 text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-500" aria-hidden="true" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl px-6 mx-auto">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
            <h2 className="mb-4 text-4xl font-bold text-black">
              Frequently Asked <span className="text-blue-900">Questions</span>
            </h2>
            <p className="text-lg text-gray-700">Quick answers to common questions about our AI assistant solutions.</p>
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div key={faq.q} className="bg-white border border-gray-200 rounded-xl" variants={fadeInUp}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full gap-3 p-6 text-left"
                  >
                    <span className="font-bold text-blue-900">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 text-blue-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-black">
                          {faq.a}
                          {(faq as any).placeholder && (
                            <span className="block mt-2 text-xs font-medium text-amber-600">
                              Placeholder answer — to be finalized before launch.
                            </span>
                          )}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex justify-center mt-10">
            <HashLink
              smooth
              to="/book-consultation"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-900 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Still have questions? Book a call
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </HashLink>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-20 overflow-hidden text-black bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 bg-blue-100 rounded-full w-96 h-96 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 rounded-full w-80 h-80 bg-blue-50 opacity-10 blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl px-6 mx-auto text-center">
          <HandNote className="top-24 right-0" rotate={-6}>
            See real{'\n'}results in{'\n'}4 weeks
          </HandNote>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 mb-6 bg-blue-100 border border-blue-200 rounded-full backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <Bot className="w-5 h-5 text-blue-900" aria-hidden="true" />
              <span className="text-sm font-medium text-blue-900">Ready to get started?</span>
            </motion.div>

            <motion.h2
              className="mb-6 text-4xl font-bold text-black lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              Start a <span className="text-blue-900">4-week pilot</span>
            </motion.h2>

            <motion.p
              className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
              Get your AI assistant up and running with measurable results. No long commitments, just proven outcomes.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center gap-4 mb-8 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          >
            <motion.button
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-900 shadow-lg rounded-xl hover:bg-blue-800 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handle4WeekPilotBtn}
            >
              <Zap className="w-5 h-5" aria-hidden="true" />
              Start a 4-week pilot
            </motion.button>

            <HashLink
              smooth
              to="/book-consultation"
              className="flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-blue-900 transition-all duration-300 bg-white border-2 border-blue-900 shadow-lg rounded-xl hover:bg-blue-50 hover:border-blue-800"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Book a 45-min call
            </HashLink>
          </motion.div>

          <motion.div
            className="grid max-w-2xl gap-6 mx-auto sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 1.0 }}
          >
            {['No setup fees', 'Quick deployment', 'Proven results'].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2 text-black">
                <CheckCircle2 className="w-5 h-5 text-blue-900" aria-hidden="true" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ChatbotsPage;
