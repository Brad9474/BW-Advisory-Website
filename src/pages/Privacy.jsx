export default function Privacy() {
  return (
    <div className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6 mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white">
            Privacy Policy
          </h1>
          <p className="text-silver/70 text-lg leading-relaxed max-w-2xl">
            How we protect your data and comply with Australian Privacy Principles.
          </p>
        </div>

        {/* Content */}
        <div className="max-w-none space-y-8 text-silver/80">
          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">1. Introduction</h2>
          <p className="leading-relaxed">BW Advisory Solutions (ABN 11 892 244 979) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your data when you engage with our services.</p>

          <p className="leading-relaxed">We operate in accordance with the <strong>Australian Privacy Act 1988 (Cth)</strong> and adopt the <strong>ANZPAA (Australia New Zealand Police Advisory Agencies) Responsible and Ethical Artificial Intelligence Framework</strong> to ensure responsible, transparent, and ethical handling of your information.</p>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">2. Data We Collect</h2>

          <h3 className="text-xl font-bold text-gold">From Intake Forms</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Organisation name</li>
            <li>Your role or title</li>
            <li>Strategic objectives</li>
            <li>Current constraints and challenges</li>
            <li>Engagement focus area</li>
          </ul>

          <h3 className="text-xl font-bold text-gold">From Diagnostic Questionnaires</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Your responses to assessment questions</li>
            <li>Engagement type selected</li>
          </ul>

          <h3 className="text-xl font-bold text-gold">From Email & Communications</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Email open events (when you open diagnostic reports)</li>
            <li>Link clicks (when you click call-to-action links)</li>
            <li>IP address and browser information</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">3. Why We Collect Your Data</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>To understand your organisational challenges and strategic objectives</li>
            <li>To prepare for productive consultation conversations</li>
            <li>To provide appropriate advisory recommendations</li>
            <li>To deliver tailored diagnostic analysis and insights</li>
            <li>To measure engagement with reports (to improve our service)</li>
            <li>To maintain contact and send relevant updates</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">4. How We Use & Disclose Your Data</h2>
          <p className="leading-relaxed">Your data is processed and stored by third-party service providers to support our operations, including customer relationship management, artificial intelligence-assisted analysis, and secure cloud storage. All providers are located in the <strong>United States</strong> and are bound by Data Processing Agreements that require compliance with Australian Privacy Act standards.</p>

          <p className="leading-relaxed">In addition to these systems, your personal data and working documents may also be stored in cloud storage services during your engagement, which are also <strong>US-based and subject to the same privacy protections</strong> outlined in this policy.</p>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">5. How We Use Artificial Intelligence — ANZPAA-Aligned</h2>

          <h3 className="text-xl font-bold text-gold">AI for Better Service Delivery</h3>
          <p className="leading-relaxed">BW Advisory Solutions uses artificial intelligence systems to streamline analysis and deliver insights faster. AI assists with initial data synthesis, pattern recognition, and documentation — enabling us to provide expert analysis more efficiently without compromising quality or accountability.</p>

          <p className="leading-relaxed"><strong>This approach allows you to benefit from both AI efficiency and human expertise.</strong> You receive analysis that is accelerated by technology but reviewed, validated, and approved by a human expert with 30 years of professional experience.</p>

          <h3 className="text-xl font-bold text-gold">Our Commitment to Responsible AI</h3>
          <p className="leading-relaxed">We adopt the <strong>ANZPAA Responsible and Ethical Artificial Intelligence Framework</strong> as the basis for all AI use. This ensures our approach meets the highest standards for transparency, accountability, and human oversight — the same framework adopted by Australian and New Zealand police agencies and government bodies.</p>

          <p className="leading-relaxed">Additionally, we review our AI practices and privacy safeguards <strong>quarterly</strong> to ensure alignment with evolving privacy laws, security standards, and emerging AI ethics frameworks.</p>

          <h3 className="text-xl font-bold text-gold">What You Get: Brad's Expertise & Accountability</h3>
          <p className="leading-relaxed"><strong>Every piece of work you receive is reviewed, validated, and delivered by Brad Warburton</strong> — principal advisor with 30 years in law enforcement command and operational transformation.</p>
          <p className="leading-relaxed">You are not receiving raw AI output. You are receiving:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>AI-accelerated analysis reviewed by human expertise</li>
            <li>Brad's expert judgment applied to your situation</li>
            <li>Brad's professional accountability for all findings</li>
            <li>30 years of operational and strategic experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">6. Data Retention</h2>
          <ul className="space-y-3">
            <li><strong>Intake form data:</strong> 3 years post-engagement or on request</li>
            <li><strong>Diagnostic responses:</strong> 3 years post-engagement or on request</li>
            <li><strong>Financial/invoice records:</strong> 7 years (Australian tax requirement)</li>
            <li><strong>Email tracking (opens/clicks):</strong> 12 months, then deleted</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">7. Your Rights</h2>
          <p className="leading-relaxed">Under the Australian Privacy Act, you have the right to:</p>

          <h3 className="text-xl font-bold text-gold">Access</h3>
          <p className="leading-relaxed">Request a copy of your personal data. We will provide your data in a machine-readable format (CSV/JSON) within 14 days.</p>

          <h3 className="text-xl font-bold text-gold">Correct</h3>
          <p className="leading-relaxed">Request corrections to inaccurate information. We will update your data and confirm the change.</p>

          <h3 className="text-xl font-bold text-gold">Delete</h3>
          <p className="leading-relaxed">Request deletion of your data — simply reach out and we'll remove it, except where we're legally required to retain data (e.g., invoices for tax purposes).</p>

          <h3 className="text-xl font-bold text-gold">Lodge a Complaint</h3>
          <p className="leading-relaxed">If you believe we've mishandled your data, you can lodge a complaint with the <strong>Office of the Australian Information Commissioner (OAIC)</strong> at www.oaic.gov.au.</p>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">8. Security</h2>
          <p className="leading-relaxed">Your data is protected by:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>HTTPS encryption</strong> in transit (all communications encrypted)</li>
            <li><strong>Encryption at rest</strong> via secure systems (AES-256)</li>
            <li><strong>Access restricted</strong> to Brad Warburton (principal) only</li>
            <li><strong>No unauthorised third-party access</strong></li>
            <li><strong>Data Processing Agreements</strong> with all service providers</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">9. International Data Transfer</h2>
          <p className="leading-relaxed">Your data may be stored or processed in the <strong>United States</strong>. These systems comply with Australian Privacy Act standards. However, you should be aware that:</p>
          <ul className="space-y-2 list-disc list-inside">
            <li>US laws may permit government access to data</li>
            <li>We have Data Processing Agreements in place to protect your rights</li>
          </ul>

          <h2 className="text-2xl font-bold text-white border-l-4 border-gold pl-4">10. Changes to This Policy</h2>
          <p className="leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of material changes via email or by prominently posting the new policy on our website. Your continued engagement indicates your acceptance of the updated policy.</p>

          <div className="bg-white/5 border-l-4 border-gold p-6 rounded mt-12">
            <p className="text-silver/80 text-sm leading-relaxed">
              <span className="text-gold font-semibold">Framework Alignment: ANZPAA & Australian AI Ethics</span><br />
              BW Advisory Solutions aligns with the ANZPAA Responsible and Ethical AI Framework (adopted by Australian and New Zealand police agencies) and the Australian AI Ethics Framework. We commit to Human Oversight, Transparency, Explainability, Accountability, Fairness, Privacy & Security, and Reliability — ensuring your analysis meets government standards for responsible and ethical AI deployment.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary to-[#1A3560] p-8 rounded-lg border border-gold/20 mt-12">
            <h3 className="text-lg font-bold text-gold mb-4">Questions or Data Subject Requests?</h3>
            <p className="text-silver/80 text-sm mb-4">To request access to your data, request corrections, request deletion, or lodge a complaint about privacy handling:</p>
            <div className="space-y-2 text-silver/70 text-sm">
              <p><strong>Email:</strong> <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-gold hover:underline">brad@bwadvisorysolutions.com.au</a></p>
              <p><strong>Phone:</strong> +61 407 779 474</p>
              <p><strong>Address:</strong> Perth, WA, Australia</p>
              <p><strong>Response timeframe:</strong> 14 days</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-12 border-t border-accent/20 text-center text-silver/50 text-xs">
          <p>BW Advisory Solutions | ABN 11 892 244 979</p>
          <p>Privacy Policy effective 29 April 2026</p>
          <p className="mt-4"><a href="/" className="text-gold hover:underline">Back to home</a></p>
        </div>
      </div>
    </div>
  );
}
