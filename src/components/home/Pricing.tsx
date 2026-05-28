// import React, { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import {
//   CalendarDays,
//   Check,
//   CheckCircle2,
//   Clock,
//   Loader2,
//   Mail,
//   MessageSquare,
//   Sparkles,
//   User,
//   Video,
//   X,
// } from "lucide-react";
// import Container from "../ui/Container";
// import SectionHeading from "../ui/SectionHeading";

// const DEFAULT_API_BASE_URL = import.meta.env.DEV
//   ? "http://localhost:5000"
//   : "https://api.teenytechtrek.com";
// const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

// const meeting = {
//   id: "free-ai-strategy-call",
//   name: "AI Consultation Session",
//   description:
//     "Perfect for founders, startups, and teams exploring AI automation, workflows, integrations, chatbots, or custom AI solutions.",
//   priceLabel: "30 Min",
//   mode: "Google Meet",
//   ledBy: "TTT Team",
//   cta: "Book a Free Meet",
//   deliverables: [
//     "AI workflow discussion",
//     "Automation guidance",
//     "AI tool recommendations",
//     "Use-case brainstorming",
//     "Tech stack suggestions",
//     "Live Google Meet session",
//     "Follow-up resources via email",
//   ],
// };

// const timeSlots = [
//   { label: "10:00 AM", value: "10:00" },
//   { label: "10:30 AM", value: "10:30" },
//   { label: "11:00 AM", value: "11:00" },
//   { label: "11:30 AM", value: "11:30" },
//   { label: "2:00 PM", value: "14:00" },
//   { label: "2:30 PM", value: "14:30" },
//   { label: "3:00 PM", value: "15:00" },
//   { label: "3:30 PM", value: "15:30" },
//   { label: "4:00 PM", value: "16:00" },
//   { label: "4:30 PM", value: "16:30" },
// ];

// type BookingForm = {
//   name: string;
//   email: string;
//   message: string;
// };

// const formatDateValue = (date: Date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const formatCalendarLabel = (dateValue: string) => {
//   const date = new Date(`${dateValue}T12:00:00`);
//   return date.toLocaleDateString(undefined, {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//   });
// };

// const getSlotDateRange = (dateValue: string, timeValue: string) => {
//   const [hour, minute] = timeValue.split(":").map(Number);
//   const start = new Date(`${dateValue}T00:00:00`);
//   start.setHours(hour, minute, 0, 0);

//   const end = new Date(start);
//   end.setMinutes(end.getMinutes() + 30);

//   return {
//     startTime: start.toISOString(),
//     endTime: end.toISOString(),
//   };
// };

// const getInitialDate = () => {
//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   return formatDateValue(tomorrow);
// };

// const SchedulingModal = ({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) => {
//   const [selectedDate, setSelectedDate] = useState(getInitialDate);
//   const [selectedSlot, setSelectedSlot] = useState(timeSlots[0].value);
//   const [form, setForm] = useState<BookingForm>({ name: "", email: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState<{ meetLink?: string } | null>(null);

//   const days = useMemo(() => {
//     return Array.from({ length: 14 }, (_, index) => {
//       const date = new Date();
//       date.setDate(date.getDate() + index + 1);
//       return {
//         value: formatDateValue(date),
//         weekday: date.toLocaleDateString(undefined, { weekday: "short" }),
//         day: date.getDate(),
//         month: date.toLocaleDateString(undefined, { month: "short" }),
//       };
//     });
//   }, []);

//   if (!isOpen) return null;

//   const selectedSlotLabel =
//     timeSlots.find((slot) => slot.value === selectedSlot)?.label || timeSlots[0].label;

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError("");

//     if (!form.name.trim() || !form.email.trim()) {
//       setError("Please enter your name and email to receive the invite.");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const { startTime, endTime } = getSlotDateRange(selectedDate, selectedSlot);
//       const response = await fetch(`${API_BASE_URL}/api/consultations/book`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name.trim(),
//           email: form.email.trim(),
//           startTime,
//           endTime,
//           message: form.message.trim(),
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || "Could not book your meeting. Please try again.");
//       }

//       setSuccess({ meetLink: data.meetLink });
//     } catch (err: any) {
//       setError(err.message || "Could not book your meeting. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96, y: 18 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         className="relative w-full max-w-5xl overflow-hidden bg-white border border-white shadow-2xl rounded-2xl"
//       >
//         <button
//           onClick={onClose}
//           className="absolute z-10 p-2 text-gray-500 transition-colors rounded-full right-4 top-4 hover:bg-gray-100 hover:text-gray-900"
//           aria-label="Close booking modal"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         {success ? (
//           <div className="grid min-h-[560px] place-items-center px-6 py-14 text-center">
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="max-w-lg"
//             >
//               <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-50">
//                 <CheckCircle2 className="w-10 h-10 text-green-600" />
//               </div>
//               <p className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-900 uppercase">
//                 Meeting booked
//               </p>
//               <h3 className="mb-4 text-3xl font-bold text-gray-900">
//                 Your Google Meet consultation has been booked successfully.
//               </h3>
//               <p className="mb-6 leading-relaxed text-gray-600">
//                 A calendar invite and meeting link have been sent to your email.
//               </p>
//               {success.meetLink && (
//                 <a
//                   href={success.meetLink}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="inline-flex items-center justify-center gap-2 px-5 py-3 mb-4 text-sm font-semibold text-blue-900 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
//                 >
//                   <Video className="w-4 h-4" />
//                   Open Google Meet
//                 </a>
//               )}
//               <div>
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-sm hover:bg-blue-700"
//                 >
//                   Done
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         ) : (
//           <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.9fr_1.25fr]">
//             <div className="relative p-8 overflow-hidden text-white bg-blue-950 sm:p-10">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950" />
//               <div className="relative z-10">
//                 <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wide uppercase rounded-full bg-white/10 text-blue-50 ring-1 ring-white/15">
//                   <Sparkles className="w-3.5 h-3.5" />
//                   Free Google Meet
//                 </span>
//                 <h3 className="mb-4 text-3xl font-bold leading-tight">
//                   Book your free AI Strategy Call
//                 </h3>
//                 <p className="mb-8 leading-relaxed text-blue-100">
//                   Discuss your AI goals, workflows, automation ideas, and implementation roadmap
//                   with our team in a live Google Meet consultation.
//                 </p>

//                 <div className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
//                       <Clock className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-blue-100">Duration</p>
//                       <p className="font-semibold">30 minutes</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
//                       <Video className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-blue-100">Mode</p>
//                       <p className="font-semibold">Google Meet invite by email</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="pt-8 mt-8 border-t border-white/15">
//                   <p className="mb-4 text-sm font-semibold text-blue-50">What we can cover</p>
//                   <ul className="space-y-3 text-sm text-blue-100">
//                     {meeting.deliverables.slice(0, 5).map((item) => (
//                       <li key={item} className="flex items-start gap-3">
//                         <Check className="w-4 h-4 mt-0.5 text-blue-200" />
//                         <span>{item}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="p-6 bg-white sm:p-8">
//               <div className="flex items-center gap-3 mb-5">
//                 <CalendarDays className="w-5 h-5 text-blue-900" />
//                 <div>
//                   <h4 className="text-lg font-bold text-gray-900">Choose a date</h4>
//                   <p className="text-sm text-gray-500">{formatCalendarLabel(selectedDate)}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-7 sm:grid-cols-4 lg:grid-cols-7">
//                 {days.map((day) => {
//                   const isSelected = day.value === selectedDate;
//                   return (
//                     <button
//                       type="button"
//                       key={day.value}
//                       onClick={() => setSelectedDate(day.value)}
//                       className={`rounded-xl border p-3 text-center transition-all ${
//                         isSelected
//                           ? "border-blue-900 bg-blue-900 text-white shadow-lg shadow-blue-900/20"
//                           : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
//                       }`}
//                     >
//                       <span className="block text-xs font-medium opacity-80">{day.weekday}</span>
//                       <span className="block text-xl font-bold">{day.day}</span>
//                       <span className="block text-xs opacity-80">{day.month}</span>
//                     </button>
//                   );
//                 })}
//               </div>

//               <div className="mb-7">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Clock className="w-5 h-5 text-blue-900" />
//                   <div>
//                     <h4 className="text-lg font-bold text-gray-900">Pick a time slot</h4>
//                     <p className="text-sm text-gray-500">Selected: {selectedSlotLabel}</p>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                   {timeSlots.map((slot) => {
//                     const isSelected = slot.value === selectedSlot;
//                     return (
//                       <button
//                         type="button"
//                         key={slot.value}
//                         onClick={() => setSelectedSlot(slot.value)}
//                         className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
//                           isSelected
//                             ? "border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/10"
//                             : "border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
//                         }`}
//                       >
//                         {slot.label}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="grid gap-4 mb-5 sm:grid-cols-2">
//                 <label className="block">
//                   <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
//                     <User className="w-4 h-4" />
//                     Name
//                   </span>
//                   <input
//                     value={form.name}
//                     onChange={(event) => setForm({ ...form, name: event.target.value })}
//                     className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
//                     placeholder="Your name"
//                   />
//                 </label>
//                 <label className="block">
//                   <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
//                     <Mail className="w-4 h-4" />
//                     Email
//                   </span>
//                   <input
//                     type="email"
//                     value={form.email}
//                     onChange={(event) => setForm({ ...form, email: event.target.value })}
//                     className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
//                     placeholder="you@example.com"
//                   />
//                 </label>
//               </div>

//               <label className="block mb-5">
//                 <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
//                   <MessageSquare className="w-4 h-4" />
//                   Message
//                 </span>
//                 <textarea
//                   value={form.message}
//                   onChange={(event) => setForm({ ...form, message: event.target.value })}
//                   className="w-full min-h-[104px] resize-none px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
//                   placeholder="Tell us what you want to explore. AI workflows, automation, chatbots, integrations..."
//                 />
//               </label>

//               {error && (
//                 <div className="px-4 py-3 mb-5 text-sm font-medium text-red-600 rounded-lg bg-red-50">
//                   {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center justify-center w-full gap-2 px-6 py-4 text-sm font-bold text-white transition-colors bg-blue-900 rounded-lg shadow-lg shadow-blue-900/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Booking your meeting...
//                   </>
//                 ) : (
//                   <>
//                     <Video className="w-4 h-4" />
//                     Book Meeting
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// const SubscriptionPricing: React.FC = () => {
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1, ease: [0.22, 1, 0.36, 1] } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
//   };

//   return (
//     <section className="relative py-20 overflow-hidden bg-gray-50">
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/50" />
//       <Container className="relative z-10">
//         <SectionHeading
//           title="Book your free AI Strategy Call"
//           subtitle="Discuss your AI goals, workflows, automation ideas, and implementation roadmap with our team in a live Google Meet consultation."
//         />

//         <motion.div
//           ref={ref}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           variants={containerVariants}
//           className="max-w-xl mx-auto"
//         >
//           <motion.div
//             variants={itemVariants}
//             className="relative flex flex-col p-8 transition-all bg-white border border-gray-100 shadow-lg sm:p-10 rounded-2xl hover:shadow-xl"
//             itemScope
//             itemType="http://schema.org/Product"
//           >
//             <meta itemProp="name" content={meeting.name} />
//             <meta itemProp="description" content={meeting.description} />

//             <div className="mb-6 text-center">
//               <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold tracking-wide text-blue-800 uppercase rounded-full bg-blue-100">
//                 <Video className="w-3.5 h-3.5" />
//                 Free Google Meet
//               </span>
//               <h3 className="mb-2 text-3xl font-bold text-gray-900">{meeting.name}</h3>
//               <p className="text-gray-600">{meeting.description}</p>
//             </div>

//             <div className="mb-6 text-center">
//               <span className="text-5xl font-bold text-gray-900">{meeting.priceLabel}</span>
//             </div>

//             <div className="flex flex-wrap justify-center mb-6 text-sm text-gray-500 gap-x-6 gap-y-1">
//               <span>
//                 <span className="font-medium text-gray-700 mr-1.5">Mode:</span>
//                 {meeting.mode}
//               </span>
//               <span>
//                 <span className="font-medium text-gray-700 mr-1.5">Led by:</span>
//                 {meeting.ledBy}
//               </span>
//             </div>

//             <div className="p-5 mb-6 border border-gray-100 sm:p-6 rounded-xl bg-gray-50">
//               <p className="mb-4 text-sm font-semibold text-gray-900">What's included</p>
//               <ul className="text-left text-gray-700 space-y-3.5">
//                 {meeting.deliverables.map((deliverable) => (
//                   <li key={deliverable} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
//                     <span className="text-sm">{deliverable}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="pt-2 mt-auto">
//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="flex items-center justify-center w-full h-12 gap-2 px-3 text-sm font-medium text-white transition-colors bg-blue-900 rounded-lg shadow-sm hover:bg-blue-700"
//                 >
//                   <CalendarDays className="w-4 h-4" />
//                   <span className="leading-tight text-center">{meeting.cta}</span>
//                 </button>
//               </motion.div>

//               <div className="flex flex-wrap justify-center gap-2 mt-4">
//                 <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
//                   Free
//                 </span>
//                 <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
//                   Calendar invite
//                 </span>
//                 <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
//                   Google Meet
//                 </span>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : { opacity: 0 }}
//           className="mt-20 text-center"
//         >
//           <h2 className="mb-6 text-3xl font-bold text-gray-900">
//             Book a time that works for you
//           </h2>
//           <p className="max-w-3xl mx-auto mb-6 text-lg leading-relaxed text-gray-600">
//             Choose a date and time in the popup. Your booking creates a Google Calendar invite
//             with a Google Meet link automatically.
//           </p>
//           <p className="mt-6 text-lg text-gray-600">
//             Can't use the scheduler? Email us at{" "}
//             <a
//               href="mailto:anisha.singla@teenytechtrek.com"
//               className="font-medium text-blue-900 hover:underline"
//             >
//               anisha.singla@teenytechtrek.com
//             </a>
//           </p>
//         </motion.div>
//       </Container>

//       <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </section>
//   );
// };

// export default SubscriptionPricing;






import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Video,
  X,
} from "lucide-react";
import Container from "../ui/Container";

const DEFAULT_API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://api.teenytechtrek.com";
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

const meeting = {
  id: "free-ai-strategy-call",
  name: "AI Consultation Session",
  description:
    "Perfect for founders, startups, and teams exploring AI automation, workflows, integrations, chatbots, or custom AI solutions.",
  priceLabel: "30 Min",
  mode: "Google Meet",
  ledBy: "TTT Team",
  cta: "Book a Free Meet",
  deliverables: [
    "AI workflow discussion",
    "Automation guidance",
    "AI tool recommendations",
    "Use-case brainstorming",
    "Tech stack suggestions",
    "Live Google Meet session",
    "Follow-up resources via email",
  ],
};

// Presentational only — left-column highlights shown in the mockup.
const features = [
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Get personalized advice from AI experts aligned with your business goals.",
  },
  {
    icon: Rocket,
    title: "Actionable Roadmap",
    description: "Walk away with a clear plan and next steps for implementation.",
  },
  {
    icon: Clock,
    title: "Save Time & Resources",
    description: "Avoid trial and error with proven strategies and tools.",
  },
  {
    icon: ShieldCheck,
    title: "No Commitment",
    description: "It's a free, no-obligation call to explore how we can help.",
  },
];

const timeSlots = [
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "2:00 PM", value: "14:00" },
  { label: "2:30 PM", value: "14:30" },
  { label: "3:00 PM", value: "15:00" },
  { label: "3:30 PM", value: "15:30" },
  { label: "4:00 PM", value: "16:00" },
  { label: "4:30 PM", value: "16:30" },
];

type BookingForm = {
  name: string;
  email: string;
  message: string;
};

const formatDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatCalendarLabel = (dateValue: string) => {
  const date = new Date(`${dateValue}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const getSlotDateRange = (dateValue: string, timeValue: string) => {
  const [hour, minute] = timeValue.split(":").map(Number);
  const start = new Date(`${dateValue}T00:00:00`);
  start.setHours(hour, minute, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30);

  return {
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  };
};

const getInitialDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateValue(tomorrow);
};

const SchedulingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedDate, setSelectedDate] = useState(getInitialDate);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0].value);
  const [form, setForm] = useState<BookingForm>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ meetLink?: string } | null>(null);

  const days = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index + 1);
      return {
        value: formatDateValue(date),
        weekday: date.toLocaleDateString(undefined, { weekday: "short" }),
        day: date.getDate(),
        month: date.toLocaleDateString(undefined, { month: "short" }),
      };
    });
  }, []);

  if (!isOpen) return null;

  const selectedSlotLabel =
    timeSlots.find((slot) => slot.value === selectedSlot)?.label || timeSlots[0].label;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email to receive the invite.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { startTime, endTime } = getSlotDateRange(selectedDate, selectedSlot);
      const response = await fetch(`${API_BASE_URL}/api/consultations/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          startTime,
          endTime,
          message: form.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not book your meeting. Please try again.");
      }

      setSuccess({ meetLink: data.meetLink });
    } catch (err: any) {
      setError(err.message || "Could not book your meeting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-5xl overflow-hidden bg-white border border-white shadow-2xl rounded-2xl"
      >
        <button
          onClick={onClose}
          className="absolute z-10 p-2 text-gray-500 transition-colors rounded-full right-4 top-4 hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="grid min-h-[560px] place-items-center px-6 py-14 text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-green-50">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <p className="mb-3 text-xs font-bold tracking-[0.2em] text-blue-900 uppercase">
                Meeting booked
              </p>
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Your Google Meet consultation has been booked successfully.
              </h3>
              <p className="mb-6 leading-relaxed text-gray-600">
                A calendar invite and meeting link have been sent to your email.
              </p>
              {success.meetLink && (
                <a
                  href={success.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 mb-4 text-sm font-semibold text-blue-900 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                  <Video className="w-4 h-4" />
                  Open Google Meet
                </a>
              )}
              <div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-900 rounded-lg shadow-sm hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.9fr_1.25fr]">
            <div className="relative p-8 overflow-hidden text-white bg-blue-950 sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wide uppercase rounded-full bg-white/10 text-blue-50 ring-1 ring-white/15">
                  <Sparkles className="w-3.5 h-3.5" />
                  Free Google Meet
                </span>
              
                <p className="mb-8 leading-relaxed text-blue-100">
                  Discuss your AI goals, workflows, automation ideas, and implementation roadmap
                  with our team in a live Google Meet consultation.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Duration</p>
                      <p className="font-semibold">30 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-100">Mode</p>
                      <p className="font-semibold">Google Meet invite by email</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/15">
                  <p className="mb-4 text-sm font-semibold text-blue-50">What we can cover</p>
                  <ul className="space-y-3 text-sm text-blue-100">
                    {meeting.deliverables.slice(0, 5).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-4 h-4 mt-0.5 text-blue-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 bg-white sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <CalendarDays className="w-5 h-5 text-blue-900" />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">Choose a date</h4>
                  <p className="text-sm text-gray-500">{formatCalendarLabel(selectedDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-7 sm:grid-cols-4 lg:grid-cols-7">
                {days.map((day) => {
                  const isSelected = day.value === selectedDate;
                  return (
                    <button
                      type="button"
                      key={day.value}
                      onClick={() => setSelectedDate(day.value)}
                      className={`rounded-xl border p-3 text-center transition-all ${
                        isSelected
                          ? "border-blue-900 bg-blue-900 text-white shadow-lg shadow-blue-900/20"
                          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      <span className="block text-xs font-medium opacity-80">{day.weekday}</span>
                      <span className="block text-xl font-bold">{day.day}</span>
                      <span className="block text-xs opacity-80">{day.month}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mb-7">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-900" />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Pick a time slot</h4>
                    <p className="text-sm text-gray-500">Selected: {selectedSlotLabel}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {timeSlots.map((slot) => {
                    const isSelected = slot.value === selectedSlot;
                    return (
                      <button
                        type="button"
                        key={slot.value}
                        onClick={() => setSelectedSlot(slot.value)}
                        className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
                          isSelected
                            ? "border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/10"
                            : "border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 mb-5 sm:grid-cols-2">
                <label className="block">
                  <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4" />
                    Name
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block mb-5">
                <span className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="w-full min-h-[104px] resize-none px-4 py-3 transition-colors border border-gray-200 rounded-lg outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10"
                  placeholder="Tell us what you want to explore. AI workflows, automation, chatbots, integrations..."
                />
              </label>

              {error && (
                <div className="px-4 py-3 mb-5 text-sm font-medium text-red-600 rounded-lg bg-red-50">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full gap-2 px-6 py-4 text-sm font-bold text-white transition-colors bg-blue-900 rounded-lg shadow-lg shadow-blue-900/20 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Booking your meeting...
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4" />
                    Book Meeting
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const SubscriptionPricing: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, ease: [0.22, 1, 0.36, 1] } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-white sm:py-24">
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          {/* LEFT — heading + features */}
          <motion.div variants={itemVariants}>
            

            <h2 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
              Book Your Free
              <br />
              <span className="text-blue-900">AI</span>{" "}
              Strategy Call
            </h2>

            <p className="max-w-md mt-5 text-lg leading-relaxed text-slate-600">
              Let's discuss your goals, explore possibilities, and build a roadmap tailored for
              your business.
            </p>

            <div className="mt-8 space-y-5">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex items-center justify-center bg-blue-50 w-11 h-11 rounded-xl ring-1 ring-blue-100 shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{feature.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — booking card */}
          <motion.div
            variants={itemVariants}
            className="relative p-6 bg-white border border-gray-100 shadow-xl rounded-3xl sm:p-8"
            itemScope
            itemType="http://schema.org/Product"
          >
            <meta itemProp="name" content={meeting.name} />
            <meta itemProp="description" content={meeting.description} />

            {/* Header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-[11px] font-bold tracking-wide uppercase rounded-full bg-blue-100 text-blue-900">
                <Video className="w-3.5 h-3.5" />
                Google Meet
              </span>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">{meeting.name}</h3>
              <p className="max-w-md mx-auto mt-2 text-sm leading-relaxed text-slate-500">
                {meeting.description}
              </p>
            </div>

            {/* Highlights row */}
            <div className="grid grid-cols-1 gap-4 mt-7 sm:grid-cols-3 sm:gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-blue-900 bg-blue-100 rounded-full shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{meeting.priceLabel}</p>
                  <p className="text-xs text-slate-500">Session</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-blue-900 bg-blue-100 rounded-full shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{meeting.mode}</p>
                  <p className="text-xs text-slate-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 text-blue-900 bg-blue-100 rounded-full shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Led by</p>
                  <p className="text-xs text-slate-500">{meeting.ledBy}</p>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="p-5 mt-7 border bg-gray-50 border-gray-100 rounded-2xl">
              <p className="mb-4 text-sm font-bold text-slate-900">What's included</p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {meeting.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-blue-100 shrink-0">
                      <Check className="w-3 h-3 text-blue-900" />
                    </span>
                    <span className="text-sm text-slate-600">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Choose a time prompt */}
            <div className="flex items-start gap-3 p-4 mt-4 border border-blue-100 bg-blue-50 rounded-2xl">
              <div className="flex items-center justify-center text-blue-900 bg-white rounded-lg shadow-sm w-9 h-9 shrink-0">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Choose a time that works for you
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  Select your preferred date and time on the next screen.
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="mt-5">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center w-full gap-2 py-4 text-sm font-bold text-white transition-colors shadow-lg bg-blue-900 rounded-xl shadow-blue-900/20 hover:bg-blue-700"
              >
                <CalendarDays className="w-4 h-4" />
                Book a Free Meeting
              </button>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-900">
                <Check className="w-3 h-3 text-blue-900" />
                Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-900">
                <CalendarDays className="w-3 h-3 text-blue-900" />
                Calendar Invite
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-900">
                <Video className="w-3 h-3 text-blue-900" />
                Google Meet
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default SubscriptionPricing;