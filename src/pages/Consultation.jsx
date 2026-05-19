import { useState } from 'react';
import Footer from '../components/Footer';

const COMMAND_CENTRE_ENDPOINT = "https://command.bwadvisorysolutions.com.au/api/intake/contact";
const CALENDLY_URL = "https://calendar.app.google/m5nPtDntM5vzigPx6";

const HELP_OPTIONS = [
  "AI Readiness & Process Optimisation",
  "Security Hardening & Cyber Risk",
  "Operational Resilience Diagnostic",
  "Loss Intelligence & Investigations",
  "Strategic & Operational Advisory",
  "Not sure yet — I just know something needs to change",
];

const PRACTICE_SIZE_OPTIONS = [
  "Sole trader",
  "2–5 staff",
  "6–10 staff",
  "11–20 staff",
  "20+ staff",
];

const SOURCE_OPTIONS = [
  "Referral from a colleague",
  "LinkedIn",
  "Google search",
  "Industry event",
  "Other",
];

const Consultation = () => {
  const [values, setValues] = useState({
    name: "",
    organisation: "",
    role: "",
    email: "",
    phone: "",
    practiceSize: "",
    objective: "",
    constraint: "",
    helpWith: "",
    biggestConcern: "",
    referralSource: "",
    consentToContact: false,
    consentToMarketing: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!values.consentToContact) return;
    setSubmitting(true);
    setErrorVisible(false);

    const interest = values.helpWith || "Unspecified";
    const objective = `[Interest: ${interest}] ${values.objective.trim()}`;

    try {
      const res = await fetch(COMMAND_CENTRE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          organisation: values.organisation.trim(),
          role: values.role.trim(),
          phone: values.phone.trim(),
          practiceSize: values.practiceSize,
          objective,
          constraint: values.constraint.trim(),
          biggestConcern: values.biggestConcern.trim(),
          referralSource: values.referralSource,
          areaOfInterest: "smb_advisory",
          source: "website_consultation",
          brand: "BW_ADVISORY",
          consentToContact: values.consentToContact,
          consentToMarketing: values.consentToMarketing,
        }),
      });
      if (res.status === 201) {
        window.location.href = CALENDLY_URL;
        return;
      }
      setErrorVisible(true);
    } catch (err) {
      setErrorVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/15 focus:border-[#C9A84C]/70 focus:bg-white/10 rounded-lg px-4 py-3 text-white placeholder-silver/40 font-light text-base outline-none transition-colors";
  const labelClass =
    "block text-silver/70 font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2";
  const sectionLabelClass =
    "text-accent font-mono tracking-[0.3em] uppercase text-[10px] font-bold";

  return (
    <>
      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* LEFT COLUMN — copy */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <p className={sectionLabelClass}>BOOK A CONSULTATION</p>
                <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
                  Thirty minutes. No pitch.
                </h1>
                <p className="text-silver/80 font-light text-lg md:text-xl leading-relaxed pt-4">
                  Tell us what's not working. This helps me prepare — so the call is about your situation, not introductions.
                </p>
              </div>

              <ul className="space-y-4 pt-4">
                {[
                  "No obligation",
                  "No proposal until we've talked",
                  "Prepared for your specific situation",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block w-2 h-2 rounded-full bg-[#C9A84C] shadow-[0_0_12px_rgba(201,168,76,0.6)] flex-shrink-0"
                    />
                    <span className="text-silver/85 font-light text-base md:text-lg leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT COLUMN — form */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/40 to-accent/0 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-accent/30 hover:border-accent/60 rounded-3xl p-8 md:p-10 lg:p-12 transition-all duration-500 group-hover:bg-white/12">
                <form onSubmit={onSubmit} className="space-y-8" noValidate>
                  <section className="space-y-5">
                    <p className={sectionLabelClass}>YOUR INFORMATION</p>

                    <div>
                      <label htmlFor="cp-name" className={labelClass}>Full Name</label>
                      <input id="cp-name" name="name" type="text" required value={values.name} onChange={onChange} className={inputClass} autoComplete="name" />
                    </div>

                    <div>
                      <label htmlFor="cp-organisation" className={labelClass}>Organisation</label>
                      <input id="cp-organisation" name="organisation" type="text" required value={values.organisation} onChange={onChange} className={inputClass} autoComplete="organization" />
                    </div>

                    <div>
                      <label htmlFor="cp-role" className={labelClass}>Role</label>
                      <input id="cp-role" name="role" type="text" required value={values.role} onChange={onChange} className={inputClass} autoComplete="organization-title" />
                    </div>

                    <div>
                      <label htmlFor="cp-email" className={labelClass}>Email</label>
                      <input id="cp-email" name="email" type="email" required value={values.email} onChange={onChange} className={inputClass} autoComplete="email" />
                    </div>

                    <div>
                      <label htmlFor="cp-phone" className={labelClass}>
                        Phone <span className="text-silver/40 font-normal lowercase tracking-normal">(optional)</span>
                      </label>
                      <input
                        id="cp-phone"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={onChange}
                        placeholder="+61"
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>

                    <div>
                      <label htmlFor="cp-practiceSize" className={labelClass}>Practice size</label>
                      <select
                        id="cp-practiceSize"
                        name="practiceSize"
                        required
                        value={values.practiceSize}
                        onChange={onChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select one</option>
                        {PRACTICE_SIZE_OPTIONS.map((label) => (
                          <option key={label} value={label} className="bg-[#0F172A] text-white">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  <section className="space-y-5 pt-2">
                    <p className={sectionLabelClass}>YOUR SITUATION</p>

                    <div>
                      <label htmlFor="cp-objective" className={labelClass}>What are you trying to fix or improve?</label>
                      <textarea
                        id="cp-objective"
                        name="objective"
                        required
                        rows={3}
                        value={values.objective}
                        onChange={onChange}
                        placeholder="What does better look like for your practice or business?"
                        className={`${inputClass} resize-y min-h-[90px]`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cp-constraint" className={labelClass}>What's getting in the way?</label>
                      <textarea
                        id="cp-constraint"
                        name="constraint"
                        required
                        rows={3}
                        value={values.constraint}
                        onChange={onChange}
                        placeholder="Time, systems, compliance, security — or something else?"
                        className={`${inputClass} resize-y min-h-[90px]`}
                      />
                    </div>
                  </section>

                  <section className="space-y-5 pt-2">
                    <p className={sectionLabelClass}>ENGAGEMENT FOCUS</p>

                    <div>
                      <label htmlFor="cp-helpWith" className={labelClass}>What do you need help with?</label>
                      <select
                        id="cp-helpWith"
                        name="helpWith"
                        required
                        value={values.helpWith}
                        onChange={onChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select one</option>
                        {HELP_OPTIONS.map((label) => (
                          <option key={label} value={label} className="bg-[#0F172A] text-white">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cp-biggestConcern" className={labelClass}>
                        Biggest concern right now <span className="text-silver/40 font-normal lowercase tracking-normal">(optional)</span>
                      </label>
                      <textarea
                        id="cp-biggestConcern"
                        name="biggestConcern"
                        rows={3}
                        value={values.biggestConcern}
                        onChange={onChange}
                        placeholder="What's keeping you up at night? Even if it's not fully formed, it helps me prepare."
                        className={`${inputClass} resize-y min-h-[90px]`}
                      />
                    </div>

                    <div>
                      <label htmlFor="cp-referralSource" className={labelClass}>How did you hear about us?</label>
                      <select
                        id="cp-referralSource"
                        name="referralSource"
                        required
                        value={values.referralSource}
                        onChange={onChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select one</option>
                        {SOURCE_OPTIONS.map((label) => (
                          <option key={label} value={label} className="bg-[#0F172A] text-white">
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </section>

                  <section className="space-y-4 pt-2">
                    <p className={sectionLabelClass}>YOUR CONSENT</p>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="cp-consentToContact"
                        name="consentToContact"
                        type="checkbox"
                        checked={values.consentToContact}
                        onChange={onChange}
                        required
                        className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0"
                      />
                      <span className="text-silver/85 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                        I consent to BW Advisory Solutions collecting and using the personal information in this form for the purpose of responding to my enquiry and preparing for our conversation, in line with the{" "}
                        <a href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</a> and the <em>Privacy Act 1988</em> (Cth). <span className="text-[#C9A84C]">*</span>
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="cp-consentToMarketing"
                        name="consentToMarketing"
                        type="checkbox"
                        checked={values.consentToMarketing}
                        onChange={onChange}
                        className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0"
                      />
                      <span className="text-silver/85 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                        I'd also like to receive occasional insights, articles, and updates from BW Advisory Solutions. I understand I can unsubscribe at any time.
                      </span>
                    </label>
                  </section>

                  {errorVisible && (
                    <p role="alert" className="text-sm text-[#F5A98C] font-light leading-relaxed">
                      Something went wrong — please email{" "}
                      <a href="mailto:brad@bwadvisorysolutions.com.au" className="underline decoration-[#F5A98C]/40 underline-offset-2">
                        brad@bwadvisorysolutions.com.au
                      </a>{" "}
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || !values.consentToContact}
                    className="group/btn relative overflow-hidden bg-[#C9A84C] px-12 md:px-14 py-5 md:py-6 rounded-lg text-[#0F172A] font-bold text-sm md:text-base hover:bg-[#E0BC60] transition-all duration-300 tracking-[0.15em] uppercase inline-flex items-center justify-center gap-4 shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] border border-white/10 w-full cursor-pointer disabled:opacity-60 disabled:cursor-wait disabled:hover:bg-[#C9A84C]"
                  >
                    {submitting ? "Sending..." : "START THE CONVERSATION"}
                    {!submitting && (
                      <svg className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                    )}
                  </button>

                  <p className="text-center text-silver/50 font-light text-xs leading-relaxed pt-1">
                    Your data is protected under the{" "}
                    <a href="/privacy" className="text-[#C9A84C] hover:underline">Australian Privacy Act</a>.
                    {" "}Read our{" "}
                    <a href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Consultation;
