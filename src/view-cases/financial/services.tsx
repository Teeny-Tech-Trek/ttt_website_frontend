import React from 'react';
import { Shield, Lock, Eye, FileCheck, Server, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit with hardware security modules (HSMs) for key management.',
    },
    {
      icon: Lock,
      title: 'Zero-Trust Architecture',
      description: 'Multi-factor authentication, role-based access control, and continuous security validation for all system interactions.',
    },
    {
      icon: Eye,
      title: 'Real-Time Monitoring',
      description: '24/7 security operations center with AI-powered threat detection and automated incident response protocols.',
    },
    {
      icon: FileCheck,
      title: 'Compliance Auditing',
      description: 'Continuous compliance monitoring with automated audit trails and regulatory reporting capabilities.',
    }
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', icon: '🛡️' },
    { name: 'ISO 27001', status: 'Certified', icon: '🔒' },
    { name: 'PCI DSS Level 1', status: 'Compliant', icon: '💳' },
    { name: 'GDPR', status: 'Compliant', icon: '🇪🇺' },
    { name: 'HIPAA', status: 'Ready', icon: '🏥' },
    { name: 'FedRAMP', status: 'In Progress', icon: '🇺🇸' }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-black">
            <span className="text-blue-900">Bank-Grade Security</span> & Compliance
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-black">
            Enterprise-level security infrastructure designed specifically for financial institutions with the highest compliance standards
          </p>
        </div>

        {/* Security Features */}
        <div className="grid gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="p-6 transition-all duration-300 bg-white border border-blue-100 rounded-xl hover:shadow-lg hover:border-blue-200">
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-blue-900 rounded-lg bg-blue-50">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-blue-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-black">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
          {/* Security Infrastructure */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-blue-900">Enterprise Security Infrastructure</h3>
              <p className="mb-6 leading-relaxed text-black">
                Multi-layered security architecture with redundancy and failover mechanisms to protect your most sensitive financial data
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                  <Server className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900">Secure Cloud Infrastructure</h4>
                  <p className="text-sm text-black">AWS/Azure government cloud with dedicated tenancy and private network isolation</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                  <Globe className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900">Global Data Residency</h4>
                  <p className="text-sm text-black">Data stored in your jurisdiction with cross-border compliance controls</p>
                </div>
              </div>

              <div className="flex gap-4 p-4 border border-blue-100 rounded-lg bg-blue-50">
                <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                  <AlertTriangle className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900">Incident Response</h4>
                  <p className="text-sm text-black">24/7 security operations center with 15 minute incident response time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Security Dashboard */}
          <div className="p-8 bg-white border border-blue-100 shadow-lg rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-900 shadow-lg rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Security Dashboard</h3>
                <p className="text-sm text-black">Real-time security monitoring</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "System Security Status", value: "✓ Secure" },
                { label: "Encryption Status", value: "AES-256 Active" },
                { label: "Access Monitoring", value: "Real-time" },
                { label: "Threat Detection", value: "AI-Powered" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-blue-100 rounded-lg bg-blue-50">
                  <span className="text-sm font-medium text-black">{item.label}</span>
                  <span className="font-semibold text-blue-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-6 mt-6 border border-blue-100 bg-blue-50 rounded-xl">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-blue-900">99.99%</div>
                <div className="text-sm text-black">Security Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Certifications */}
        <div className="p-8 border border-blue-100 shadow-lg bg-blue-50 rounded-2xl">
          <div className="mb-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-blue-900">Compliance & Certifications</h3>
            <p className="text-black">Comprehensive compliance coverage across global regulatory frameworks</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {certifications.map((cert, index) => (
              <div key={index} className="p-4 text-center transition-all duration-300 bg-white border border-blue-100 rounded-xl hover:shadow-md hover:border-blue-200">
                <div className="mb-3 text-3xl">{cert.icon}</div>
                <h4 className="mb-2 font-semibold text-blue-900">{cert.name}</h4>
                <div className="px-3 py-1 text-xs font-medium text-blue-900 bg-blue-100 rounded-full">
                  {cert.status}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 mt-8 bg-white border border-blue-200 rounded-xl">
            <div className="flex items-center gap-4">
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
    </div>
  );
};

export default SecuritySection;
