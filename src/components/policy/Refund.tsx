import React from 'react';

const Refund: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen mt-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Teeny Tech Trek</h1>
          <p className="mt-2 text-lg">Refund Policy</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="bg-white shadow-md rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">
            <strong>Effective Date:</strong> June 20, 2025
          </p>

          <p className="mb-4">
            At <strong>Teeny Tech Trek</strong>, we strive to deliver high-value AI consultancy, automation, and digital services with care and commitment. This Refund Policy explains the terms under which refunds may be issued for purchases made on{' '}
            <a href="https://www.teenytechtrek.com" className="text-blue-600 underline hover:text-blue-800 transition-colors">
              www.teenytechtrek.com
            </a>{' '}
            or through direct engagement.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">1. General Policy</h2>
          <p className="mb-4">
            Due to the customized, consultative, and digital nature of our services, <strong>all payments are considered final and non-refundable</strong>, unless otherwise specified in a service agreement.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">2. Exceptions – When Refunds May Apply</h2>
          <p className="mb-4">We may issue partial or full refunds in the following cases:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Service Not Delivered:</strong> If no work has commenced and the client cancels within 48 hours of payment, a full refund may be issued.
            </li>
            <li>
              <strong>Duplicate Payment:</strong> If a payment was made more than once for the same service, we will refund the duplicate amount.
            </li>
            <li>
              <strong>Project-Specific Agreements:</strong> If a service agreement or proposal includes a custom refund clause, it will override this general policy.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">3. Non-Refundable Circumstances</h2>
          <p className="mb-4">Refunds will <strong>not</strong> be issued for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Change of mind after work has started</li>
            <li>Delays caused by client inaction or lack of response</li>
            <li>Completed or partially delivered services</li>
            <li>AI tools, digital products, or code already shared or delivered</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-4">4. Process for Requesting a Refund</h2>
          <p className="mb-4">
            To request a refund, please email{' '}
            <a href="mailto:anisha.singla@teenytechtrek.com" className="text-blue-600 underline hover:text-blue-800 transition-colors">
              anisha.singla@teenytechtrek.com
            </a>{' '}
            with:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your full name and email used for the transaction</li>
            <li>Description of the service purchased</li>
            <li>Reason for requesting a refund</li>
            <li>Payment confirmation/transaction ID</li>
          </ul>
          <p className="mb-4">We aim to respond to refund requests within <strong>5 business days</strong>.</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">5. Refund Method</h2>
          <p className="mb-4">
            Approved refunds will be processed using the original payment method (e.g., Razorpay, Stripe, UPI). Refund processing times may vary depending on your bank or payment provider.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">6. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this policy periodically. The latest version will always be available on our{' '}
            <a href="https://www.teenytechtrek.com" className="text-blue-600 underline hover:text-blue-800 transition-colors">
              website
            </a>.
          </p>
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-gray-600">
            <strong>Teeny Tech Trek</strong>
            <br />
            📧{' '}
            <a href="mailto:anisha.singla@teenytechtrek.com" className="text-blue-600 underline hover:text-blue-800 transition-colors">
              anisha.singla@teenytechtrek.com
            </a>
            <br />
            🌐{' '}
            <a href="https://www.teenytechtrek.com" className="text-blue-600 underline hover:text-blue-800 transition-colors">
              www.teenytechtrek.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Refund;