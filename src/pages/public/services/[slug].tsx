import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, Check } from 'lucide-react';
import { Service } from '../../../types/service';
import Container from '../../../components/ui/Container';
import { services } from '../../../data/services';


const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

useEffect(() => {
  const foundService = services.find((s) => s.slug === slug); // <-- this is correct
  setService(foundService || null);
  window.scrollTo(0, 0);
}, [slug]);

  if (!service) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Service not found</h2>
            <button onClick={() => navigate('/services')} className="btn btn-primary">
              Back to Services
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 pt-32">
      <Container>
        <div className="mb-8">
          <Link to="/services" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                {service.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold">{service.title}</h1>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl">{service.description}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="card">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Overview</h2>
              <div className="prose max-w-none">
                {service.longDescription?.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 text-primary">Key Features</h2>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {service.benefits && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="card bg-primary-100 border border-primary/10">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={20} className="text-primary shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {service.caseStudies && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.caseStudies.map((caseStudy, i) => (
                <div key={i} className="card">
                  <h3 className="text-xl font-semibold mb-3">{caseStudy.title}</h3>
                  <p className="text-gray-600">{caseStudy.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {service.faq && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-primary">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faq.map((item, i) => (
                <div key={i} className="card">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Contact us today to discuss how our {service.title} can help your business grow.
          </p>
          <Link to="/contact" className="btn btn-primary inline-flex items-center gap-2">
            Discuss Your Project
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default ServiceDetail;
