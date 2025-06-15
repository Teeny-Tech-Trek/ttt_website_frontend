import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { createContact } from '../../services/contactService';
import { toast } from 'react-hot-toast';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

 const contactInfo = [
  {
    icon: <Mail size={20} className="text-blue-500" />,
    title: 'Email',
    value: 'anisha.singla@teenytechtrek.com',
    href: 'mailto:anisha.singla@teenytechtrek.com',
  },
  {
    icon: <Phone size={20} className="text-blue-500" />,
    title: 'Phone',
    value: '+1 647-864-5465, +91 98558 06696',
    href: 'tel:+16478645465', // You may consider only linking to one number
  },
  {
    icon: <MapPin size={20} className="text-blue-500" />,
    title: 'Location',
    value: `C-201, 2nd Floor, Sebiz Square Building,
Plot No. C-6, Sector-67, Mohali, SAS Nagar - 160062, Punjab, India`,
  },
];


  const services = [
    'AI-Powered Chatbots',
    'Agentic AI Workflows',
    'Smart Process Automation',
    'AI Apps & Micro-SaaS Tools',
    'Other / Consulting',
  ];

const socialLinks = [
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
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-20" />

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
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-16"
        >
          {/* Contact Info Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg h-full border border-gray-100">
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 tracking-tight">
                Contact Information
              </h3>
              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full shrink-0 group-hover:bg-blue-100 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-900 font-semibold hover:text-blue-500 transition-colors duration-300"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-lg font-semibold mb-4 text-gray-900">Follow Us</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-sm font-medium">{link.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div variants={itemVariants} className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 tracking-tight">
                Send Us a Message
              </h3>
              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center gap-3"
                    role="alert"
                  >
                    <svg
                      className="w-5 h-5 text-green-600"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 appearance-none"
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
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 min-h-[140px]"
                        placeholder="Tell us about your project or needs..."
                      />
                    </div>
                     <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
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