import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Brain, Zap } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const missions = [
    {
      icon: <Rocket className="text-primary" size={24} />,
      title: "Build small. Launch fast.",
      description: "We create lean AI solutions that get to market quickly without sacrificing quality.",
    },
    {
      icon: <Brain className="text-primary" size={24} />,
      title: "Intelligent integration.",
      description: "Our AI systems integrate seamlessly with your existing tools and workflows.",
    },
    {
      icon: <Zap className="text-primary" size={24} />,
      title: "Scale smart.",
      description: "Solutions designed to grow efficiently alongside your business needs.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-primary-100">
      <Container>
        <SectionHeading
          title="Our Mission"
          subtitle="To help visionary teams harness the power of AI — without the complexity, cost, or overhead of big tech."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
              className="card flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md mb-6">
                {mission.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-gray-600">{mission.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 bg-white p-8 rounded-xl shadow-md"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Lean Teams, Remarkable Results
              </h3>
              <p className="text-gray-600 mb-6">
                At Teeny Tech Trek, we believe in the power of focused teams augmented by AI. We specialize in crafting custom AI chatbots, autonomous agents, and automation systems that help startups, solopreneurs, and product teams do more — without needing a full-blown engineering department.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium">Speed with intention</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm font-medium">Clarity over complexity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <span className="text-sm font-medium">True collaboration</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-square bg-primary-100 rounded-xl flex items-center justify-center">
                 <img
                    src="/mission.svg"
                    alt="AI Neural Network"
                    className="w-5/6 h-5/6 object-contain animate-pulse-slow"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium">
                  Innovation at the edge
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;