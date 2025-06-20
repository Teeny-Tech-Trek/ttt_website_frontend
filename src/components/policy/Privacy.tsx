import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen mt-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Teeny Tech Trek</h1>
          <p className="mt-2 text-lg">Privacy Policy</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Effective Date:</strong> June 20, 2025
          </p>

          <p className="mb-4">
            At <strong>Teeny Tech Trek</strong>, we are committed to protecting your privacy and handling your personal data with care. This Privacy Policy outlines how we collect, use, store, and protect your information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We may collect the following types of information:</p>

          <h3 className="text-xl font-medium mt-4 mb-2">a. Personal Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Name, email address, phone number (via contact forms, subscriptions, or sign-ups)</li>
            <li>Business details (when requesting a consultation or proposal)</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">b. Usage Data</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Browser type, device information, IP address</li>
            <li>Pages visited, time spent, and user interaction on our website</li>
          </ul>

          <h3 className="text-xl font-medium mt-4 mb-2">c. Third-Party Integrations</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Payment details via secure third-party processors (e.g., Razorpay, Stripe)</li>
            <li>Data collected from newsletter subscriptions (e.g., Mailchimp)</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Respond to your inquiries or service requests</li>
            <li>Provide and improve our website, products, and services</li>
            <li>Send newsletters, updates, and promotional content (only with your consent)</li>
            <li>Analyze user behavior to improve user experience</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Cookies & Tracking Technologies</h2>
          <p className="mb-4">We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Enhance user experience</li>
            <li>Understand how users interact with our website</li>
            <li>Track conversions and service interest</li>
          </ul>
          <p className="mb-4">You can manage cookie preferences in your browser settings.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. How We Protect Your Data</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to secure your data, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>HTTPS encryption</li>
            <li>Secure cloud hosting</li>
            <li>Access control to internal systems</li>
          </ul>
          <p className="mb-4">
            We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
          <p className="mb-4">
            We may link to third-party websites or tools (e.g., Calendly, Google Forms, social media plugins). We are not responsible for the privacy practices of these services. We encourage you to review their privacy policies before providing personal information.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access the personal data we hold about you</li>
            <li>Request corrections or updates</li>
            <li>Withdraw consent or unsubscribe at any time</li>
          </ul>
          <p className="mb-4">
            For any privacy-related requests, please contact us at:{' '}
            <br />
            📧{' '}
            <a
              href="mailto:hello@teenytechtrek.com"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              hello@teenytechtrek.com
            </a>
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Children’s Privacy</h2>
          <p className="mb-4">
            Our services are not directed to individuals under the age of 13. We do not knowingly collect personal data from children. If we discover such data has been collected, we will promptly delete it.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with the revised effective date.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Teeny Tech Trek</strong>
            <br />
            📧{' '}
            <a
              href="mailto:hello@teenytechtrek.com"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              hello@teenytechtrek.com
            </a>
            <br />
            🌐{' '}
            <a
              href="https://www.teenytechtrek.com"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              www.teenytechtrek.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Privacy;