import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Server,
  Globe,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description:
        'AES-256 encryption for data at rest and TLS 1.3 for data in transit with hardware security modules (HSMs) for key management.',
    },
    {
      icon: Lock,
      title: 'Zero-Trust Architecture',
      description:
        'Multi-factor authentication, role-based access control, and continuous security validation for all system interactions.',
    },
    {
      icon: Eye,
      title: 'Real-Time Monitoring',
      description:
        '24/7 security operations center with AI-powered threat detection and automated incident response protocols.',
    },
    {
      icon: FileCheck,
      title: 'Compliance Auditing',
      description:
        'Continuous compliance monitoring with automated audit trails and regulatory reporting capabilities.',
    },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', icon: '🛡️' },
    { name: 'ISO 27001', status: 'Certified', icon: '🔒' },
    { name: 'PCI DSS Level 1', status: 'Compliant', icon: '💳' },
    { name: 'GDPR', status: 'Compliant', icon: '🇪🇺' },
    { name: 'HIPAA', status: 'Ready', icon: '🏥' },
    { name: 'FedRAMP', status: 'In Progress', icon: '🇺🇸' },
  ];

  return (
    <div className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
            <span className="text-blue-900">Bank-Grade Security</span> & Compliance
          </h2>
          <p className="max-w-2xl mx-auto text-base text-black sm:text-lg">
            Enterprise-level security infrastructure designed specifically for financial institutions with the highest compliance standards
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="p-6 transition-all bg-white border border-blue-100 rounded-xl hover:shadow-md hover:border-blue-200"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-blue-900 rounded-lg bg-blue-50">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-blue-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-black break-words">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Security Infrastructure & Dashboard */}
        <div className="grid grid-cols-1 gap-8 mb-16 lg:grid-cols-2">
          {/* Infrastructure */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-bold text-blue-900 sm:text-2xl">Enterprise Security Infrastructure</h3>
              <p className="mb-6 text-base leading-relaxed text-black">
                Multi-layered security architecture with redundancy and failover mechanisms to protect your most sensitive financial data
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Server,
                  title: 'Secure Cloud Infrastructure',
                  desc: 'AWS/Azure government cloud with dedicated tenancy and private network isolation',
                },
                {
                  icon: Globe,
                  title: 'Global Data Residency',
                  desc: 'Data stored in your jurisdiction with cross-border compliance controls',
                },
                {
                  icon: AlertTriangle,
                  title: 'Incident Response',
                  desc: '24/7 security operations center with 15 minute incident response time',
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50"
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-blue-900">{item.title}</h4>
                      <p className="text-sm text-black">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dashboard */}
          <div className="p-6 bg-white border border-blue-100 shadow-lg sm:p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 text-white bg-blue-900 shadow-lg rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Security Dashboard</h3>
                <p className="text-sm text-black">Real-time security monitoring</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'System Security Status', value: '✓ Secure' },
                { label: 'Encryption Status', value: 'AES-256 Active' },
                { label: 'Access Monitoring', value: 'Real-time' },
                { label: 'Threat Detection', value: 'AI-Powered' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border border-blue-100 rounded-lg bg-blue-50"
                >
                  <span className="text-sm font-medium text-black">{item.label}</span>
                  <span className="font-semibold text-blue-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-6 mt-6 text-center border border-blue-100 bg-blue-50 rounded-xl">
              <div className="mb-1 text-2xl font-bold text-blue-900 sm:text-3xl">99.99%</div>
              <div className="text-sm text-black">Security Uptime SLA</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="p-6 border border-blue-100 shadow-md sm:p-8 bg-blue-50 rounded-2xl">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-xl font-bold text-blue-900 sm:text-2xl">Compliance & Certifications</h3>
            <p className="text-base text-black">Comprehensive compliance coverage across global regulatory frameworks</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 text-center transition-all bg-white border border-blue-100 rounded-xl hover:shadow-md hover:border-blue-200"
              >
                <div className="mb-2 text-3xl">{cert.icon}</div>
                <h4 className="mb-1 text-sm font-semibold text-blue-900 sm:text-base">{cert.name}</h4>
                <div className="inline-block px-3 py-1 text-xs font-medium text-blue-900 bg-blue-100 rounded-full">
                  {cert.status}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-4 p-4 mt-8 bg-white border border-blue-200 sm:p-6 rounded-xl sm:flex-row sm:items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-900 shadow-lg rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="mb-1 font-bold text-blue-900">Continuous Compliance Monitoring</h4>
              <p className="text-sm text-black">Automated compliance checks ensure ongoing adherence to all regulatory requirements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
