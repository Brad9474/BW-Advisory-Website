import Footer from '../components/Footer';

const EFFECTIVE_DATE = '11 September 2026';

export default function Privacy() {
  return (
    <>
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <header className="space-y-6 mb-8">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Privacy Policy</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white">
              How we handle your information.
            </h1>
            <p className="text-silver/75 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
              BW Advisory Solutions Pty Ltd is an Australian company. This page sets out what we collect, why, where it lives, how long we keep it, and how you ask us to change or delete it.
            </p>
            <p className="text-silver/50 font-light text-sm">
              Effective {EFFECTIVE_DATE}. BW Advisory Solutions Pty Ltd, ABN 32 701 834 513. Perth, Western Australia.
            </p>
          </header>

          <div className="space-y-12 text-silver/85 font-light leading-relaxed">

            {/* 1. Who we are */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">1. Who we are</h2>
              <p>
                BW Advisory Solutions Pty Ltd (ABN 32 701 834 513) is an Australian company based in Perth, Western Australia. We handle personal information in line with the Australian Privacy Principles in the <strong>Privacy Act 1988 (Cth)</strong>. Bradley Warburton is the sole director, and BW Advisory has no employees. Your information is accessed only by him, by subcontractors working on your engagement, who see only what they need for that work, and by the service providers named in section 3.
              </p>
            </section>

            {/* 2. What we collect */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">2. What we collect</h2>
              <p>
                We collect the information you give us in forms, emails and calls, and information about how you use this website.
              </p>
              <p>
                <strong>What you tell us in a form.</strong> When you submit a consultation request, an intake, or the contact details at the end of a diagnostic, we collect the information you enter — your name, email, organisation, role or practice size, and the description of what you are trying to fix or improve. Required fields are marked. Anything not marked required can be left blank.
              </p>
              <p>
                <strong>How you interacted with a diagnostic.</strong> When you use a diagnostic on this website (for example the AI Readiness Diagnostic), we record your responses, the score the diagnostic calculated, and whether you completed the questionnaire. If you arrived from a shared referral link, we record which link so we can acknowledge the referrer.
              </p>
              <p>
                We do not capture your IP address for identification purposes. We do not use cookies for advertising. We do not use third-party advertising trackers. Diagnostic responses are only linked to you once you submit your contact details at the end.
              </p>
            </section>

            {/* 3. Where your information is stored */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">3. Where your information is stored</h2>
              <p>
                <strong>Contact and CRM data</strong> is stored in HubSpot, our customer relationship management system, in HubSpot&apos;s Australian data centre in Sydney. Some of HubSpot&apos;s sub-processors may process information outside Australia. We use HubSpot to record your contact details, log emails and call notes, and track the status of an engagement from enquiry to delivery.
              </p>
              <p>
                <strong>Diagnostic responses and operational records</strong>, including intake submissions, scored diagnostic sessions, engagement notes and generated reports, are stored in a managed PostgreSQL database hosted in Australia (Sydney region).
              </p>
              <p>
                <strong>AI tools.</strong> We use AI tools, including models supplied by Anthropic, to help analyse diagnostic responses and to draft our analysis and reports. These providers may process information outside Australia, including in the United States.
              </p>
              <p>
                <strong>Email, documents and working notes</strong> are held in Google Workspace and Notion. Notes of calls may be produced with Granola, a transcription tool. These providers may store or process information outside Australia, including in the United States.
              </p>
              <p>
                <strong>Financial records</strong> (invoices, receipts and tax-related documents) are kept in our Australian-hosted database and in email, and are provided to our accountant and to the Australian Taxation Office where required.
              </p>
              <p>
                <strong>Website analytics.</strong> We use PostHog to measure how visitors use this website. PostHog records page views, interactions and device information, and sets cookies for that purpose. When you submit a form, we link that activity to your name, email and organisation. PostHog is hosted in the United States.
              </p>
              <p>
                <strong>Website and bookings.</strong> This website is hosted by Netlify, and our Command Centre application runs on Vercel. Bookings are handled by Cal.com, which receives your name, email, organisation and any notes you add. These providers may process information outside Australia, including in the United States.
              </p>
              <p>
                We do not sell your information. We share it only with the service providers named in this section, which hold it on our behalf, with subcontractors working on your engagement, with a referral partner if you agree to it, and where the law requires it.
              </p>
            </section>

            {/* 4. Why we collect it */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">4. Why we collect it</h2>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li>To understand your situation before our first conversation</li>
                <li>To produce the scored diagnostic report you have requested</li>
                <li>To respond to your enquiry and maintain continuity across our communications</li>
                <li>To deliver the consulting services we agree to provide</li>
                <li>To improve our diagnostic methodology, using information that has been de-identified</li>
                <li>To meet our record-keeping obligations under Australian tax law</li>
                <li>If you have opted in: to send occasional insights and updates (you can unsubscribe at any time)</li>
              </ul>
              <p>
                We do not use your information for advertising. We do not profile you. We do not sell your data.
              </p>
            </section>

            {/* 5. How long we keep it */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">5. How long we keep it</h2>
              <ul className="space-y-3 list-disc list-outside pl-6">
                <li><strong>Contact and intake information:</strong> retained in HubSpot for the duration of any active engagement, plus up to <strong>3 years</strong> after our last contact, then archived or deleted on request.</li>
                <li><strong>Diagnostic sessions and responses:</strong> retained for up to <strong>3 years</strong> from completion, then archived or deleted on request.</li>
                <li><strong>Incomplete diagnostic sessions</strong> (where you did not submit contact details): retained for <strong>90 days</strong> as anonymous response data, then deleted.</li>
                <li><strong>Referral tokens:</strong> retained for <strong>12 months</strong> to attribute referrals, then deleted.</li>
                <li><strong>Email and CRM activity logs:</strong> retained for the life of the contact record, then deleted on request.</li>
                <li><strong>Working papers supporting figures in a report</strong>, including the intake and diagnostic answers they rely on: retained for at least <strong>6 years</strong> from the date of the report. This overrides the shorter periods above.</li>
                <li><strong>Financial records</strong> (invoices, receipts, tax-related documents): retained for <strong>7 years</strong> as required by Australian tax law.</li>
              </ul>
            </section>

            {/* 6. Your rights */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">6. Your choices</h2>
              <p>
                You can:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li><strong>Access</strong> a copy of the personal information we hold about you</li>
                <li><strong>Correct</strong> any information that is inaccurate or out of date</li>
                <li><strong>Ask us to delete</strong> your information, subject to the records described in section 5</li>
                <li><strong>Withdraw consent</strong> for marketing communications at any time</li>
                <li><strong>Lodge a complaint</strong> with the Office of the Australian Information Commissioner if you believe we have mishandled your information</li>
              </ul>
            </section>

            {/* 7. How to request deletion or access */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">7. How to request deletion or access</h2>
              <p>
                Email{" "}
                <a href="mailto:brad@bwadvisorysolutions.com.au?subject=Privacy%20request" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a>{" "}
                with the subject line "Privacy request" and a brief description of what you are asking for. We will acknowledge your request promptly and action it within 30 days, and we will confirm in writing once your information has been deleted, exported, or corrected. Where we are legally required to retain a subset of records (for example, invoices under Australian tax law), we will tell you specifically what has been retained and why.
              </p>
              <p>
                You do not need to give a reason for a deletion request. There is no charge.
              </p>
            </section>

            {/* 8. Security */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">8. Security</h2>
              <p>
                All form submissions and data traffic are encrypted in transit. Data at rest in HubSpot and in our Australian-hosted database is encrypted. Access is limited to the principal, to subcontractors working on your engagement, and to the service providers named in section 3.
              </p>
            </section>

            {/* 9. Complaints */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">9. Complaints</h2>
              <p>
                If you believe we have mishandled your personal information, contact us first at{" "}
                <a href="mailto:brad@bwadvisorysolutions.com.au?subject=Privacy%20complaint" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a>. We will acknowledge your complaint within 5 business days and give you a written response within 30 days. If you are not satisfied with our response, you can lodge a complaint with the <strong>Office of the Australian Information Commissioner</strong> at{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer" className="text-[#C9A84C] hover:underline">www.oaic.gov.au</a>.
              </p>
            </section>

            {/* 10. Changes */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">10. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The effective date at the top of the page shows when it was last revised. Material changes will be notified by email to active contacts.
              </p>
            </section>

            {/* Contact card */}
            <section className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-[#C9A84C]/30 rounded-3xl p-8 md:p-10 mt-12">
              <h3 className="text-lg font-bold text-[#C9A84C] mb-4 tracking-wide">Privacy contact</h3>
              <div className="space-y-2 text-silver/80 text-sm font-light">
                <p><strong className="text-white">Bradley Warburton</strong> — Principal, BW Advisory Solutions Pty Ltd</p>
                <p>Email: <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a></p>
                <p>Phone: +61 407 779 474</p>
                <p>Perth, Western Australia</p>
              </div>
            </section>

            {/* Footer info */}
            <div className="pt-12 border-t border-[#C9A84C]/15 text-center text-silver/50 text-xs font-light">
              <p>BW Advisory Solutions Pty Ltd | ABN 32 701 834 513</p>
              <p>Effective {EFFECTIVE_DATE}</p>
              <p className="mt-4"><a href="/" className="text-[#C9A84C] hover:underline">Back to home</a></p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
