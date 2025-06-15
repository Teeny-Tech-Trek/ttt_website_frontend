// import { useNavigate } from 'react-router-dom';
import { services } from '../../../data/services';
import Container from '../../../components/ui/Container';
import SectionHeading from '../../../components/ui/SectionHeading';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServicesPage() {
  // const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          title="Our Services"
          subtitle="Explore our full range of AI solutions tailored for small teams with big ambitions."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {services.map((service, index) => (
            <Link 
              to={`/services/${service.slug}`} 
              key={index}
              className="card group hover:border-primary hover:border border-transparent transition-all duration-300"
            >
              <div className="mb-6 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-primary font-medium">Learn more →</div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-medium">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </Container>
    </section>
  );
}