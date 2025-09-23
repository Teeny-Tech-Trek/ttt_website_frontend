import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { createContact } from '../../services/contactService';
import { toast } from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

interface ContactInfo {
  icon: JSX.Element;
  title: string;
  value: string;
  href?: string;
}

interface SocialLink {
  platform: string;
  icon: JSX.Element;
  href: string;
  ariaLabel: string;
}

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        country_code: '',
        phone_number: '',
        message: formData.message,
        subject: formData.service,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
      toast.success('Message sent successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail size={20} className="text-[#3b82f6]" />,
      title: 'Email',
      value: 'anisha.singla@teenytechtrek.com',
      href: 'mailto:anisha.singla@teenytechtrek.com',
    },
    {
      icon: <Phone size={20} className="text-[#3b82f6]" />,
      title: 'Phone',
      value: '+1 647-864-5465, +91 98558 06696',
      href: 'tel:+16478645465',
    },
    {
      icon: <MapPin size={20} className="text-[#3b82f6]" />,
      title: 'Location',
      value:
        'C-201, 2nd Floor, Sebiz Square Building, Plot No. C-6, Sector-67, Mohali, SAS Nagar - 160062, Punjab, India',
    },
  ];

  const services = [
    'AI-Powered Chatbots',
    'Agentic AI Workflows',
    'Smart Process Automation',
    'AI Apps & Micro-SaaS Tools',
    'Other / Consulting',
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: 'Instagram',
      icon: <FaInstagram />,
      href: 'https://www.instagram.com/teenytechtrek?igsh=cng0djJjbjN1dzFo&utm_source=qr',
      ariaLabel: 'Visit our Instagram page',
    },
    {
      platform: 'LinkedIn',
      icon: <FaLinkedinIn />,
      href: 'https://www.linkedin.com/company/teenytechtrek/',
      ariaLabel: 'Visit our LinkedIn page',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  return (
    <section id="contact" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.08)_1px,transparent_0)] bg-[size:40px_40px] opacity-40" />
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-20 h-20 bg-[#93c5fd]/30 rounded-full blur-xl"
      />
      <motion.div
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-[#3b82f6]/30 rounded-full blur-xl"
      />

      <Container className="relative z-10">
        <SectionHeading
          title="Let's Connect"
          subtitle="Ready to transform your business with AI? Reach out to discuss your project."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-5"
        >
          {/* Contact Info Section */}
          <motion.div variants={itemVariants} className="order-2 lg:col-span-2 lg:order-1">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg h-full border border-[#93c5fd]/50">
              <h3 className="text-2xl font-semibold mb-8 text-[#1e40af] tracking-tight">
                Contact Information
              </h3>
              <div className="mb-10 space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 group perspective-1000"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-[#93c5fd]/20 rounded-full shrink-0 group-hover:bg-[#93c5fd]/30 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-[#1e40af]/80 font-medium">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[#1e40af] font-semibold hover:text-[#3b82f6] transition-colors duration-300 break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#1e40af] font-semibold whitespace-pre-wrap">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="pt-8 border-t border-[#93c5fd]/20">
                <h4 className="text-lg font-semibold mb-4 text-[#1e40af]">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="w-10 h-10 flex items-center justify-center bg-[#93c5fd]/20 rounded-full hover:bg-[#3b82f6]/30 transition-all duration-300 transform hover:scale-105"
                      whileHover={{ rotate: 5 }}
                    >
                      <span className="text-sm font-medium text-[#3b82f6]">{link.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div variants={itemVariants} className="order-1 lg:col-span-3 lg:order-2">
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-[#93c5fd]/50">
              <h3 className="text-2xl font-semibold mb-8 text-[#1e40af] tracking-tight">
                Send Us a Message
              </h3>
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#93c5fd]/20 border border-[#93c5fd]/50 text-[#1e40af] p-4 rounded-lg flex items-center gap-3"
                    role="alert"
                  >
                    <svg
                      className="w-5 h-5 text-[#3b82f6]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <strong className="font-semibold">Success!</strong>
                      <span className="block text-sm">Your message has been sent. We'll respond soon.</span>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                      <motion.div variants={inputFocusVariants} whileFocus="focus">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#1e40af]/80 mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#93c5fd]/50 rounded-lg focus:ring-0 focus:border-[#3b82f6] transition-all duration-300 bg-[#f8fafc]"
                          placeholder="John Doe"
                        />
                      </motion.div>
                      <motion.div variants={inputFocusVariants} whileFocus="focus">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#1e40af]/80 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#93c5fd]/50 rounded-lg focus:ring-0 focus:border-[#3b82f6] transition-all duration-300 bg-[#f8fafc]"
                          placeholder="john@example.com"
                        />
                      </motion.div>
                    </div>
                    <motion.div variants={inputFocusVariants} whileFocus="focus" className="mb-6">
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-[#1e40af]/80 mb-2"
                      >
                        Service Interested In
                      </label>
                      <div className="relative">
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#93c5fd]/50 rounded-lg focus:ring-0 focus:border-[#3b82f6] transition-all duration-300 bg-[#f8fafc] appearance-none"
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          {services.map((service, index) => (
                            <option key={index} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                          <svg className="w-4 h-4 text-[#1e40af]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div variants={inputFocusVariants} whileFocus="focus" className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#1e40af]/80 mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#93c5fd]/50 rounded-lg focus:ring-0 focus:border-[#3b82f6] transition-all duration-300 bg-[#f8fafc] min-h-[140px]"
                        placeholder="Tell us about your project or needs..."
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white hover:text-black font-semibold rounded-lg hover:bg-[#1e40af] transition-all duration-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 -ml-1 text-black animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;