import Footer from '../components/Footer';

const EFFECTIVE_DATE = '18 July 2026';

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
              BW Advisory Solutions is an Australian sole-trader consultancy. This page sets out what we collect, why, where it lives, how long we keep it, and how you ask us to change or delete it.
            </p>
            <p className="text-silver/50 font-light text-sm">
              Effective {EFFECTIVE_DATE}. BW Advisory Solutions, ABN 11 892 244 979. Perth, Western Australia.
            </p>
          </header>

          <div className="space-y-12 text-silver/85 font-light leading-relaxed">

            {/* 1. Who we are */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">1. Who we are</h2>
              <p>
                BW Advisory Solutions (ABN 11 892 244 979) is an Australian sole-trader consultancy based in Perth, Western Australia. We adhere to the <strong>Privacy Act 1988 (Cth)</strong> and the Australian Privacy Principles. The principal is Bradley Warburton, and he is the only person with access to your information.
              </p>
            </section>

            {/* 2. What we collect */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">2. What we collect</h2>
              <p>
                We collect two categories of information, both provided by you.
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
                <strong>Contact and CRM data</strong> is stored in <strong>HubSpot</strong>, our customer relationship management system. HubSpot processes information on servers in the United States under a standard Data Processing Agreement consistent with the Australian Privacy Principles. We use HubSpot to record your contact details, log emails and call notes, and track the status of an engagement from enquiry to delivery.
              </p>
              <p>
                <strong>Diagnostic responses and operational records</strong> — including intake submissions, scored diagnostic sessions, engagement notes, and generated reports — are stored in a managed <strong>PostgreSQL database hosted in Australia (Sydney region)</strong>. This data does not leave Australian infrastructure.
              </p>
              <p>
                <strong>Financial records</strong> (invoices, receipts, tax-related documents) are stored on Australian-hosted accounting infrastructure and, where required, filed with the Australian Taxation Office.
              </p>
              <p>
                We do not sell your information. We do not share it with third parties other than the service providers (HubSpot, our Australian hosting infrastructure) that operate the platform on our behalf under written data-processing terms.
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
                <li><strong>Financial records</strong> (invoices, receipts, tax-related documents): retained for <strong>7 years</strong> as required by Australian tax law.</li>
              </ul>
            </section>

            {/* 6. Your rights */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">6. Your rights under the Privacy Act</h2>
              <p>
                Under the Privacy Act 1988 (Cth) you have the right to:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li><strong>Access</strong> a copy of the personal information we hold about you</li>
                <li><strong>Correct</strong> any information that is inaccurate or out of date</li>
                <li><strong>Request deletion</strong> of your information, subject to records we must retain for tax purposes</li>
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
                with the subject line "Privacy request" and a brief description of what you are asking for. We aim to acknowledge promptly and to action requests within a reasonable timeframe, and we will confirm in writing once your information has been deleted, exported, or corrected. Where we are legally required to retain a subset of records (for example, invoices under Australian tax law), we will tell you specifically what has been retained and why.
              </p>
              <p>
                You do not need to give a reason for a deletion request. There is no charge.
              </p>
            </section>

            {/* 8. Security */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">8. Security</h2>
              <p>
                All form submissions and data traffic are encrypted in transit. Data at rest in HubSpot and in our Australian-hosted database is encrypted. Access is restricted to the principal, and we do not share your information with third parties other than the service providers named in section 3.
              </p>
            </section>

            {/* 9. Complaints */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">9. Complaints</h2>
              <p>
                If you believe we have mishandled your personal information, contact us first at{" "}
                <a href="mailto:brad@bwadvisorysolutions.com.au?subject=Privacy%20complaint" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a>. If you are not satisfied with our response, you can lodge a complaint with the <strong>Office of the Australian Information Commissioner</strong> at{" "}
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
                <p><strong className="text-white">Bradley Warburton</strong> — Principal, BW Advisory Solutions</p>
                <p>Email: <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a></p>
                <p>Phone: +61 407 779 474</p>
                <p>Perth, Western Australia</p>
              </div>
            </section>

            {/* Footer info */}
            <div className="pt-12 border-t border-[#C9A84C]/15 text-center text-silver/50 text-xs font-light">
              <p>BW Advisory Solutions | ABN 11 892 244 979</p>
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
