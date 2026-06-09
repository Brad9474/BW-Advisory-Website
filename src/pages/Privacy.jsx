import Footer from '../components/Footer';

const EFFECTIVE_DATE = '15 May 2026';

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
              BW Advisory Solutions is an Australian sole-trader consultancy. This page sets out what we collect, why we collect it, how long we keep it, and how you ask us to delete it.
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
                BW Advisory Solutions (ABN 11 892 244 979) is an Australian sole-trader consultancy based in Perth, Western Australia. We are bound by the <strong>Privacy Act 1988 (Cth)</strong> and the Australian Privacy Principles. The principal is Brad Warburton. The principal is the only person with access to your information.
              </p>
            </section>

            {/* 2. What we collect — diagnostic tools */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">2. Information we collect — diagnostic tools</h2>
              <p>
                When you use a diagnostic on this website (for example the AI Readiness Diagnostic), we record a <strong>DiagnosticSession</strong> linked to the email and organisation details you supply at the end of the questionnaire. A DiagnosticSession contains:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li>A <strong>session identifier</strong> — a random token we generate to distinguish your run from any other</li>
                <li>The <strong>diagnostic type</strong> you selected (for example "Healthcare Practice" or "Professional Services Firm")</li>
                <li>The <strong>responses</strong> you gave to each question</li>
                <li>The <strong>score</strong> the diagnostic calculated</li>
                <li>The <strong>completion status</strong> — whether you finished the questionnaire or abandoned it part-way</li>
                <li>A <strong>referral token</strong> if you arrived from a shared link, so we know who referred you</li>
                <li>Approximate timestamps for start and completion</li>
              </ul>
              <p>
                We do not capture your IP address, your precise location, or any third-party advertising identifiers. We do not use cookies for advertising. Diagnostic responses are only linked to you once you submit your contact details at the end.
              </p>
            </section>

            {/* 3. What we collect — intake forms */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">3. Information we collect — intake forms</h2>
              <p>
                When you submit a consultation request or a diagnostic intake, we collect the information you provide directly:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li><strong>Name</strong></li>
                <li><strong>Email address</strong></li>
                <li><strong>Organisation</strong> (practice or firm name)</li>
                <li><strong>Practice size</strong> (number of staff or fee-earners — used to scope the conversation)</li>
                <li><strong>Source</strong> (how you heard about us)</li>
                <li><strong>Biggest concern</strong> (your description of what you are trying to fix or improve)</li>
                <li>Optional fields you choose to complete: role, phone number, current constraints, engagement focus</li>
              </ul>
              <p>
                We only collect what is necessary to prepare for a productive conversation with you. Required fields are marked. Anything not marked required can be left blank.
              </p>
            </section>

            {/* 4. HubSpot CRM */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">4. Where your information is stored — HubSpot CRM</h2>
              <p>
                Intake submissions and contact details are stored in our customer relationship management system, <strong>HubSpot</strong>. HubSpot is a United States-based service provider that we use to keep track of contacts, conversations, deals, and notes. We use HubSpot to:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li>Record your contact details so we can respond to your enquiry</li>
                <li>Log emails and call notes against your record so we have continuity across conversations</li>
                <li>Track the status of an engagement from initial enquiry through to delivery</li>
                <li>Issue and follow up on proposals, invoices, and agreements</li>
              </ul>
              <p>
                HubSpot is bound by a Data Processing Agreement and operates to standards consistent with the Australian Privacy Principles. Information held in HubSpot may be transferred to or stored on servers located in the United States. We do not sell or share your information with HubSpot for any purpose other than storing and processing it on our behalf.
              </p>
              <p>
                Diagnostic responses are also stored in our own secure Australian-managed database — separate from HubSpot — for the purpose of generating your scored report. They are not shared with third parties.
              </p>
            </section>

            {/* 5. Why we collect it */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">5. Why we collect this information</h2>
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

            {/* 6. Retention */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">6. How long we keep it</h2>
              <ul className="space-y-3 list-disc list-outside pl-6">
                <li><strong>Intake form submissions:</strong> retained in HubSpot for the duration of any active engagement, plus up to <strong>3 years</strong> after our last contact, then archived or deleted on request.</li>
                <li><strong>Diagnostic sessions and responses:</strong> retained for up to <strong>3 years</strong> from completion, then archived or deleted on request.</li>
                <li><strong>Abandoned diagnostic sessions</strong> (where you did not submit contact details): retained for <strong>90 days</strong> as anonymous response data, then deleted.</li>
                <li><strong>Referral tokens:</strong> retained for <strong>12 months</strong> to attribute referrals, then deleted.</li>
                <li><strong>Email and CRM activity logs:</strong> retained for the life of the contact record, then deleted on request.</li>
                <li><strong>Financial records</strong> (invoices, receipts, tax-related documents): retained for <strong>7 years</strong> as required by Australian tax law.</li>
              </ul>
            </section>

            {/* 7. Your rights */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">7. Your rights under the Privacy Act</h2>
              <p>
                Under the Privacy Act 1988 (Cth) you have the right to:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li><strong>Access</strong> a copy of the personal information we hold about you</li>
                <li><strong>Correct</strong> any information that is inaccurate or out of date</li>
                <li><strong>Request deletion</strong> of your information (subject to records we must retain for tax purposes)</li>
                <li><strong>Withdraw consent</strong> for marketing communications at any time</li>
                <li><strong>Lodge a complaint</strong> with the Office of the Australian Information Commissioner if you believe we have mishandled your information</li>
              </ul>
            </section>

            {/* 8. How to request deletion */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">8. How to request deletion or access</h2>
              <p>
                To request access, correction, or deletion of your information, email{" "}
                <a href="mailto:brad@bwadvisorysolutions.com.au?subject=Privacy%20request" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a>{" "}
                with the subject line "Privacy request" and a brief description of what you are asking for. We will:
              </p>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li>Acknowledge your request within <strong>2 business days</strong></li>
                <li>Action it within <strong>14 days</strong>, or explain why we need longer</li>
                <li>Confirm in writing once your information has been deleted, exported, or corrected</li>
                <li>Retain only what we are legally required to keep (for example, invoices and tax records — we will tell you specifically what has been retained and why)</li>
              </ul>
              <p>
                You do not need to give a reason for a deletion request. There is no charge.
              </p>
            </section>

            {/* 9. Security */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">9. Security</h2>
              <ul className="space-y-2 list-disc list-outside pl-6">
                <li>All form submissions and API traffic are encrypted in transit over HTTPS</li>
                <li>Data at rest in HubSpot and in our managed database is encrypted</li>
                <li>Access to your information is restricted to Brad Warburton</li>
                <li>API endpoints are rate-limited and validated to prevent abuse</li>
                <li>We do not share your information with third parties other than the service providers (HubSpot, hosting infrastructure) that operate the platform on our behalf under written data-processing terms</li>
              </ul>
            </section>

            {/* 10. Complaints */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">10. Complaints</h2>
              <p>
                If you believe we have mishandled your personal information, contact us first at{" "}
                <a href="mailto:brad@bwadvisorysolutions.com.au?subject=Privacy%20complaint" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a>. We will respond within 14 days.
              </p>
              <p>
                If you are not satisfied with our response, you can lodge a complaint with the <strong>Office of the Australian Information Commissioner</strong> at{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noreferrer" className="text-[#C9A84C] hover:underline">www.oaic.gov.au</a>.
              </p>
            </section>

            {/* 11. Changes */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">11. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The effective date at the top of the page shows when it was last revised. Material changes will be notified by email to active contacts.
              </p>
            </section>

            {/* Contact card */}
            <section className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-[#C9A84C]/30 rounded-3xl p-8 md:p-10 mt-12">
              <h3 className="text-lg font-bold text-[#C9A84C] mb-4 tracking-wide">Privacy contact</h3>
              <div className="space-y-2 text-silver/80 text-sm font-light">
                <p><strong className="text-white">Brad Warburton</strong> — Principal, BW Advisory Solutions</p>
                <p>Email: <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a></p>
                <p>Phone: +61 407 779 474</p>
                <p>Perth, Western Australia</p>
                <p className="pt-2">Response time: 2 business days for acknowledgement, 14 days to action.</p>
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
