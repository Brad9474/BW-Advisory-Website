import Footer from '../components/Footer';

const EFFECTIVE_DATE = '27 July 2026';
const TERMS_VERSION = 'v1.1';

// D2 closed (comma resolved per Reg 90). D3 closed (30-day notice adopted).
// D1 deferred — business address/PO box still needed before publication.
const PURCHASE_ENABLED = import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true';

export default function Terms() {
  return (
    <>
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Draft notice — toned down now D2 and D3 are closed */}
          {!PURCHASE_ENABLED && (
            <div className="bg-white/5 border border-white/15 rounded-xl p-4 space-y-2">
              <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                Draft — pending final legal advice
              </p>
              <p className="text-silver/65 font-light text-sm leading-relaxed">
                Service Terms v1.1. One item deferred: [D1] a business address or PO box must be added to the Clause 7 warrantor details before publication. Two{' '}
                <code className="text-silver/45 text-xs">[LAWYER TO CONFIRM]</code>{' '}
                items remain open (Clause 8 s 64A fair-or-reasonable positioning; Clause 12 de-identification standard). Not yet solicitor-advised.
              </p>
            </div>
          )}

          {/* Header */}
          <header className="space-y-6 mb-8">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Service Terms</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-white">
              How we work together.
            </h1>
            <p className="text-silver/75 font-light text-lg md:text-xl leading-relaxed max-w-3xl">
              These terms govern every service BW Advisory Solutions supplies — the free AI Readiness diagnostic, both paid report tiers, and the AI Partner retainer. By ordering a service you agree to these terms.
            </p>
            <p className="text-silver/50 font-light text-sm">
              Version {TERMS_VERSION}. Effective {EFFECTIVE_DATE}. BW Advisory Solutions, ABN 11 892 244 979. Perth, Western Australia.
            </p>
          </header>

          {/* At a glance — top-of-doc executive summary */}
          <div className="bg-white/5 border-l-4 border-[#C9A84C]/60 rounded-r-xl pl-5 pr-6 py-5 space-y-2">
            <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold mb-3">At a glance</p>
            <ul className="space-y-2 text-silver/75 font-light text-sm leading-relaxed list-none">
              <li>BW Advisory supplies AI workflow reports — automated (Snapshot, $497) and personally reviewed (Solution Map, $1,497). These are business advisory reports, not legal, financial, tax or insurance advice.</li>
              <li>Reports are built from your intake answers. Savings figures are estimates with stated assumptions, not guarantees.</li>
              <li>If something is wrong, contact us: we correct it or refund you. Your Australian Consumer Law rights are never limited.</li>
              <li>Retainers run month to month — at least 30 days&apos; written notice before any price change; 14 days&apos; notice to cancel, no lock-in.</li>
              <li>Questions: <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a> · +61 407 779 474</li>
            </ul>
          </div>

          <div className="space-y-12 text-silver/85 font-light leading-relaxed">

            {/* Clause 1 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">1. Parties and application</h2>
              <p>
                These terms govern the AI Readiness diagnostic, the AI Snapshot Report, the AI Solution Map, implementation services and the AI Partner retainer supplied by Bradley Warburton trading as BW Advisory Solutions (ABN 11 892 244 979) (&ldquo;BW Advisory&rdquo;, &ldquo;we&rdquo;). &ldquo;You&rdquo; means the person or business ordering the service. By ordering a service you agree to these terms.
              </p>
              <p className="text-silver/50 text-sm font-light italic">
                Version 1.1 — {EFFECTIVE_DATE}. The version you accept at checkout is the version that governs your purchase.
              </p>
            </section>

            {/* Clause 2 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">2. Australian Consumer Law</h2>
              <p>
                Our services come with guarantees that cannot be excluded under the Australian Consumer Law. Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy conferred by the Australian Consumer Law or any other law that cannot lawfully be excluded, restricted or modified. Every other clause of these terms is subject to this clause.
              </p>
            </section>

            {/* Clause 3 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">3. What each service is</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-white mb-1">AI Snapshot Report ($497 incl. GST)</p>
                  <p>
                    An automated assessment generated by our diagnostic system from your questionnaire answers, identifying candidate AI tools for your business, with indicative pricing, estimated returns and a self-serve setup plan. No individual Snapshot Report is reviewed by a person before delivery. It is a starting point for your own evaluation of the tools named in it, not an implementation service and not bespoke advice.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">AI Solution Map ($1,497 incl. GST)</p>
                  <p>
                    A report and adoption roadmap generated from your completed intake and personally reviewed by Brad Warburton before delivery, plus a 60-minute video call with Brad Warburton held within 5 business days of delivery or at a later time you choose.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">Delivery</p>
                  <p>
                    Your intake link is emailed within minutes of payment. The Snapshot Report is delivered on submission of your completed intake. The Solution Map is delivered within 3 business days of your completed intake.
                  </p>
                  <p className="mt-2">
                    If your intake is not completed within 30 days of purchase, we will remind you. If it remains incomplete 14 days after that reminder, we will ask you to choose: we generate your report from the information available with the gaps noted, or we refund you in full. If we do not hear from you within a further 14 days, we will refund you in full.
                  </p>
                  <p className="mt-2">
                    If we cannot meet a delivery time, we will tell you promptly and you may cancel for a full refund.
                  </p>
                </div>
              </div>
              <p>
                Our services do not include legal advice, tax advice, financial product advice, medical or psychological advice, or guarantees of specific commercial outcomes — clients should engage the relevant professional for those matters.
              </p>
              <p>
                BW Advisory may decline or discontinue an engagement where it falls outside scope, requires professional advice we are not qualified to provide, involves subcontractor conflicts (see our published conflict register), or where continuing would be unsafe, unlawful, or inconsistent with our engagement standards.
              </p>
            </section>

            {/* Clause 4 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">4. Third-party tools and pricing currency</h2>
              <p>
                Our reports identify third-party software we consider worth evaluating for your business. We do not own, resell, control or warrant those products. Vendors change prices, features, hosting and terms, and may discontinue products, without notice. Tool pricing and availability in your report are checked as at the date stated in the report. Before purchasing any tool you should confirm current pricing and terms with the vendor. Your report tells you what to verify; verifying it with the vendor is part of the intended use of the report.
              </p>
            </section>

            {/* Clause 5 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">5. Estimates and returns</h2>
              <p>
                Savings, hours and return figures in our reports are estimates. Each is presented as a range, calculated from the information you provided and the assumptions stated alongside it in the report. They are not promises, forecasts or guarantees of results, which depend on your implementation and circumstances.
              </p>
            </section>

            {/* Clause 6 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">6. Not licensed advice</h2>
              <p>
                Our services are business advisory services about workflow and software selection. They are not financial product advice, insurance advice, tax agent services or legal services, and we are not licensed to provide those. Where a report raises an insurance, tax or legal question, it will say so and recommend you consult an appropriately licensed professional. Any observations about insurance readiness are general information about questions to raise with your own licensed insurance broker; we do not advise on, recommend or arrange any insurance product.
              </p>
            </section>

            {/* Clause 7 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">7. Fees, GST, guarantee, remedies and refunds</h2>
              <p>Prices are in Australian dollars and include GST.</p>
              <div>
                <p className="font-semibold text-white mb-1">If something is wrong with your report</p>
                <p>
                  Contact us. For problems that can be fixed, we will correct and reissue the report (or re-perform the affected service) within 5 business days at no charge. For a major failure, you are entitled to your rights under the Australian Consumer Law, which include cancelling the service and a refund, and compensation for reasonably foreseeable consequential loss.
                </p>
              </div>

              {/* Guarantee block */}
              <div className="bg-gradient-to-br from-white/6 to-white/2 border border-white/15 rounded-xl p-6 space-y-4">
                <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Our guarantee</p>
                <p>
                  If a primary recommended tool in your report had been discontinued, or its published price had increased by 20% or more, before your report was generated — contact us by email to{' '}
                  <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">
                    brad@bwadvisorysolutions.com.au
                  </a>{' '}
                  within 60 days of delivery. You choose the remedy: we correct and reissue the report within 5 business days, or refund the fee in full to your original payment method within 10 business days. Claiming costs you nothing.
                </p>
                <p>
                  This guarantee is given by Bradley Warburton trading as BW Advisory Solutions (ABN 11 892 244 979), Perth, Western Australia, +61 407 779 474,{' '}
                  <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">
                    brad@bwadvisorysolutions.com.au
                  </a>. The benefits under this guarantee are in addition to other rights and remedies you have under law.
                </p>

                {/* Reg 90 prescribed text */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <p>
                    Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled:
                  </p>
                  <ul className="list-disc list-outside pl-6 space-y-1">
                    <li>to cancel your service contract with us; and</li>
                    <li>to a refund for the unused portion, or to compensation for its reduced value.</li>
                  </ul>
                  <p>
                    You are also entitled to be compensated for any other reasonably foreseeable loss or damage. If the failure does not amount to a major failure you are entitled to have problems with the service rectified in a reasonable time and, if this is not done, to cancel your contract and obtain a refund for the unused portion of the contract.
                  </p>
                  <p>
                    Clients remain responsible for their own commercial decisions, actions and outcomes. BW Advisory&apos;s advice and reports are inputs to those decisions, not substitutes for them.
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">Pre-submission cancellation</p>
                <p>
                  If you cancel before submitting your intake, we will refund you in full. Because each report is generated for your business, we do not offer change-of-mind refunds once generation has begun. This does not affect your rights under the Australian Consumer Law.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">Snapshot credit</p>
                <p>
                  If you buy the AI Snapshot Report, the $497 you paid is credited in full against the AI Solution Map for 60 days from your Snapshot purchase. The credit is applied automatically at checkout through the upgrade link in your report and delivery email. It is not transferable, not redeemable for cash, and lapses after 60 days.
                </p>
              </div>
            </section>

            {/* Clause 8 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">8. Liability</h2>
              <div className="space-y-3">
                <p>
                  <strong className="text-white">(a) ACL guarantee claims.</strong> Subject to clause 2: where section 64A of the Australian Consumer Law permits, our liability for failure to comply with a consumer guarantee in respect of services not of a kind ordinarily acquired for personal, domestic or household use is limited, at our election, to supplying the services again or paying the cost of having the services supplied again.
                </p>
                <p>
                  <strong className="text-white">(b) All other claims.</strong> Subject to clauses 2 and 8(a): each party&apos;s total aggregate liability to the other for all other claims arising out of or in connection with a service, whether in contract, tort (including negligence), statute or otherwise, is limited to the fees paid for that service, and neither party is liable to the other for loss of profit, revenue, goodwill or business interruption or any indirect or consequential loss. This clause does not apply to liability for fraud, wilful misconduct, or either party&apos;s breach of confidentiality, and does not limit your rights under clause 2. This allocation reflects the price of the services and the availability of insurance to each party.
                </p>
              </div>
            </section>

            {/* Clause 9 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">9. Your information and inputs</h2>
              <p>
                You are responsible for the accuracy and completeness of the information you give us; our reports are only as good as the answers they are built on. You remain responsible for your own business decisions, your own systems, and your own legal and privacy obligations, including in respect of any tool you adopt. Before implementing any recommendation that changes how your business stores, processes or transmits data, confirm with your own insurance broker or insurer that your cover remains adequate.
              </p>
            </section>

            {/* Clause 10 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">10. Privacy, data handling, retention and deletion</h2>
              <p>
                We collect and hold the information you provide (contact details, business details, questionnaire answers, interview notes) to deliver the services, improve our diagnostic methodology and, with your consent, send you relevant material. Your information is stored on infrastructure hosted in Australia, with limited processing outside Australia as described in our privacy policy.
              </p>
              <p>
                Our collection notice and privacy policy at{' '}
                <a href="/privacy" className="text-[#C9A84C] hover:underline">bwadvisorysolutions.com.au/privacy</a>{' '}
                explain what we hold, where it is hosted, how long we keep it, and how to access, correct or delete it. You may ask us to delete your intake and report data at any time; we will do so within 30 days except records we must keep for tax, accounting or legal reasons, including the working papers supporting any figures in your report (retained for a minimum of 6 years from report generation).
              </p>
              <p>
                Please do not include health information or personal details about your patients, customers or staff in questionnaire answers or interviews — describe your systems and challenges, not identifiable individuals.
              </p>
            </section>

            {/* Clause 11 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">11. Subcontractors and referrals</h2>
              <p>
                We may use vetted subcontractors to deliver implementation services under our brand and supervision. We remain responsible to you for those services. Subcontractors are bound by confidentiality obligations no less protective than ours.
              </p>
              <p>
                If we refer you to a third-party professional (such as an insurance broker, lawyer or accountant), we will tell you at the time of the referral whether we receive a fee or other benefit for it, and you are free to use anyone you choose. We only pass your contact details to a referral partner with your consent.
              </p>
            </section>

            {/* Clause 12 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white border-l-4 border-[#C9A84C] pl-4">12. Intellectual property, retainer terms and general</h2>
              <div className="space-y-3">
                <p>
                  <strong className="text-white">Intellectual property.</strong> We own our methodology, templates, questionnaires, knowledge base and report formats. On payment you receive a perpetual, non-transferable licence to use your report and deliverables within your business, including sharing it with your professional advisers. Content and data you provide remain yours; you licence us to use them to deliver the services and, in de-identified form, to improve our methodology.
                </p>
                <p>
                  <strong className="text-white">Retainer.</strong> Retainers run month to month. We will give you at least 30 days&apos; written notice before any price change takes effect. If you cancel your retainer in response to a price change, the change does not apply to you. You may cancel at any time with 14 days&apos; notice without penalty. No automatic lock-in, no cancellation fee.
                </p>
                <p>
                  <strong className="text-white">Order screening.</strong> We may decline an order, or cancel it and refund it in full before your report is generated, if we reasonably consider the service is not suitable for your business.
                </p>
                <p>
                  <strong className="text-white">General.</strong> These terms are governed by the laws of Western Australia and the parties submit to the non-exclusive jurisdiction of its courts. Disputes: 14 days&apos; good-faith negotiation before proceedings (nothing prevents either party seeking urgent relief or using small-claims processes). Notices by email. Neither party may assign without consent. If part of a clause is void, the rest survives.
                </p>
              </div>
            </section>

            {/* Contact card */}
            <section className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-[#C9A84C]/30 rounded-3xl p-8 md:p-10 mt-12">
              <h3 className="text-lg font-bold text-[#C9A84C] mb-4 tracking-wide">Contact</h3>
              <div className="space-y-2 text-silver/80 text-sm font-light">
                <p><strong className="text-white">Bradley Warburton</strong> — Principal, BW Advisory Solutions</p>
                <p>Email: <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-[#C9A84C] hover:underline">brad@bwadvisorysolutions.com.au</a></p>
                <p>Phone: +61 407 779 474</p>
                <p>Perth, Western Australia</p>
                <p>ABN 11 892 244 979</p>
              </div>
            </section>

            {/* Footer */}
            <div className="pt-12 border-t border-[#C9A84C]/15 text-center text-silver/50 text-xs font-light">
              <p>BW Advisory Solutions | ABN 11 892 244 979</p>
              <p>Service Terms {TERMS_VERSION} — Effective {EFFECTIVE_DATE}</p>
              <p className="mt-4"><a href="/" className="text-[#C9A84C] hover:underline">Back to home</a></p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
