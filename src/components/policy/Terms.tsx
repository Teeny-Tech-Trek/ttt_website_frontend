import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen mt-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Teeny Tech Trek</h1>
          <p className="mt-2 text-lg">Terms and Conditions</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Effective Date:</strong> June 20, 2025
          </p>

          <p className="mb-4">
            Welcome to Teeny Tech Trek! These Terms and Conditions govern your access to and use of our website, products, and services. By using our platform, you agree to be bound by these terms. If you do not agree, please do not use the site or services.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. Introduction</h2>
          <p className="mb-4">
            Teeny Tech Trek (“we,” “our,” “us”) provides AI-driven consultancy, automation tools, and technology services to clients through digital channels. These Terms apply to all visitors, users, and others who access or use the service.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use of Our Services</h2>
          <p className="mb-4">You agree to use our website and services only for lawful purposes. You must not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use our content or software for commercial purposes without permission</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Post or transmit harmful, threatening, or otherwise unlawful material</li>
          </ul>
          <p className="mb-4">We reserve the right to terminate access for any user who violates these terms.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including text, graphics, logos, videos, and software, is the property of Teeny Tech Trek or its content suppliers and is protected by intellectual property laws.
          </p>
          <p className="mb-4">
            You may not reproduce, distribute, modify, or use any part of our content without prior written permission.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Service Terms</h2>
          <p className="mb-4">When you engage with Teeny Tech Trek for consulting, development, or digital services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>A separate proposal or agreement will define project scope, pricing, deliverables, and timelines.</li>
            <li>All services are offered on a best-effort basis, using commercially reasonable skill and care.</li>
            <li>We may use third-party tools (e.g., APIs, automation platforms) to deliver our solutions.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Payments & Refunds</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Payments for services are to be made as per agreed milestones or packages.</li>
            <li>Unless stated otherwise in writing, all payments are non-refundable.</li>
            <li>Delays in payment may lead to a pause or termination of the service.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Disclaimers</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We do not guarantee that the website or services will be error-free or uninterrupted.</li>
            <li>Our tools and automations are provided “as is” without warranties of any kind.</li>
            <li>You use our services at your own risk.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, Teeny Tech Trek is not liable for any indirect, incidental, or consequential damages arising from your use of our services or website.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">8. Privacy</h2>
          <p className="mb-4">
            Use of our services is also governed by our{' '}
            <a
              href="https://www.teenytechtrek.com/"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Privacy Policy
            </a>
            . Please review it to understand how we collect and handle your data.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We may update these Terms from time to time. Continued use of our services after changes implies acceptance of the updated terms. The most recent version will always be posted here.
          </p>

          <h2 class-cybersecurity mt-6 mb-4>Contact Us</h2>
          <p className="mb-4">
            For any questions or concerns related to these Terms, you can reach us at:
            <br />
            📧{' '}
            <a
              href="mailto:anisha.singla@teenytechtrek.com"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              anisha.singla@teenytechtrek.com
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
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Teeny Tech Trek</strong>
            <br />
            📧{' '}
            <a
              href="mailto:anisha.singla@teenytechtrek.com"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              anisha.singla@teenytechtrek.com
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

export default Terms;