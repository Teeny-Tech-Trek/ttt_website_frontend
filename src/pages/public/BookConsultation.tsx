// src/pages/public/BookConsultation.tsx
import { Helmet } from 'react-helmet-async';
import Pricing from '../../components/home/Pricing';

/**
 * Dedicated consultation route (`/book-consultation`).
 *
 * Reuses the EXACT same consultation component (`Pricing` →
 * `SubscriptionPricing`) and its built-in `SchedulingModal` booking flow that
 * the Home Page renders. No UI is duplicated and no logic is re-implemented —
 * this page simply mounts that section on its own route so consultation CTAs
 * land users directly on the booking section with no scroll-from-top jump.
 *
 * The `id="pricing"` / `id="book-consultation"` wrappers mirror the Home Page so
 * any existing anchor/registry that resolves `#pricing` keeps working here too.
 */
const BookConsultation = () => {
  return (
    <main className="min-h-screen bg-white pt-[60px] sm:pt-[80px]">
      <Helmet>
        <title>Book a Free AI Strategy Call — Teeny Tech Trek</title>
        <meta
          name="description"
          content="Book your free AI strategy call with Teeny Tech Trek. Discuss your goals, explore AI automation, and get a roadmap tailored to your business."
        />
        <meta property="og:title" content="Book a Free AI Strategy Call — Teeny Tech Trek" />
        <meta
          property="og:description"
          content="Book your free AI strategy call with Teeny Tech Trek. Discuss your goals and get a tailored AI automation roadmap."
        />
        <meta property="og:url" content="https://www.teenytechtrek.com/book-consultation" />
        <link rel="canonical" href="https://www.teenytechtrek.com/book-consultation" />
      </Helmet>

      <section id="pricing">
        <div id="book-consultation">
          <Pricing />
        </div>
      </section>
    </main>
  );
};

export default BookConsultation;
