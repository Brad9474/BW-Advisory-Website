import { useState } from 'react';
import posthog from 'posthog-js';
import Footer from './Footer';

const API_URL = 'https://command.bwadvisorysolutions.com.au/api/intake/diagnostic';

// Shared step-flow for the four reviewed diagnostics (Strategic, Operational,
// Loss Intelligence, Investigations). Unlike AI Readiness, these are not
// scored or revealed instantly — Brad reviews every submission personally
// and sends the finished report within 24 hours. This component only
// collects answers and confirms receipt.
//
// question shape: { id, type: 'text'|'scale'|'select'|'multiselect', label, q,
//   placeholder?, options?, low?, high?, max? }
const ReviewedDiagnosticFlow = ({
  diagnosticType,
  kicker,
  titleLine1,
  titleLine2,
  subtitle,
  beginLabel = 'Begin Assessment',
  questions,
}) => {
  const STEP_INTRO = 0;
  const STEP_CONTACT = 1;
  const STEP_Q0 = 2;
  const STEP_QEND = STEP_Q0 + questions.length - 1;
  const STEP_SUBMITTING = STEP_QEND + 1;
  const STEP_DONE = STEP_QEND + 2;
  const STEP_ERROR = STEP_QEND + 3;

  const [step, setStep] = useState(STEP_INTRO);
  const [contact, setContact] = useState({ name: '', organisation: '', role: '', email: '', phone: '' });
  const [consentToContact, setConsentToContact] = useState(false);
  const [answers, setAnswers] = useState(() => new Array(questions.length).fill(null));

  const onContactChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const contactValid = contact.name.trim() !== '' && contact.email.trim() !== '' && consentToContact;

  const setAnswer = (index, value) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const currentQuestionValid = (index) => {
    const q = questions[index];
    const a = answers[index];
    if (q.type === 'text') return typeof a === 'string' && a.trim().length > 0;
    if (q.type === 'scale') return typeof a === 'number';
    if (q.type === 'select') return typeof a === 'string' && a.length > 0;
    if (q.type === 'multiselect') return Array.isArray(a) && a.length > 0;
    return true;
  };

  const submit = async () => {
    setStep(STEP_SUBMITTING);
    const responses = {};
    questions.forEach((q, i) => {
      responses[q.id] = answers[i];
    });

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name.trim(),
          email: contact.email.trim(),
          organisation: contact.organisation.trim() || undefined,
          role: contact.role.trim() || undefined,
          phone: contact.phone.trim() || undefined,
          diagnosticType,
          responses,
          consentToContact: true,
          source: 'website_diagnostic',
          brand: 'BW_ADVISORY',
        }),
      });
      if (res.ok) {
        posthog.identify(contact.email.trim(), {
          name: contact.name.trim(),
          organisation: contact.organisation.trim(),
          role: contact.role.trim(),
        });
        posthog.capture('diagnostic_completed', { diagnostic_type: diagnosticType });
        setStep(STEP_DONE);
      } else {
        posthog.capture('diagnostic_submit_failed', { diagnostic_type: diagnosticType, status: res.status });
        setStep(STEP_ERROR);
      }
    } catch (err) {
      posthog.captureException(err, { context: 'reviewed_diagnostic', diagnostic_type: diagnosticType });
      console.error(`[${diagnosticType.toLowerCase()}-diagnostic] submission failed`, err);
      setStep(STEP_ERROR);
    }
  };

  const next = () => {
    if (step === STEP_CONTACT) {
      if (!contactValid) return;
      setStep(STEP_Q0);
      window.scrollTo(0, 0);
      return;
    }
    if (step >= STEP_Q0 && step <= STEP_QEND) {
      const qi = step - STEP_Q0;
      if (!currentQuestionValid(qi)) return;
      if (step === STEP_QEND) {
        submit();
        return;
      }
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prev = () => {
    setStep(Math.max(STEP_INTRO, step - 1));
    window.scrollTo(0, 0);
  };

  const showProgress = step >= STEP_Q0 && step <= STEP_QEND;
  const progressPct = showProgress ? Math.round(((step - STEP_Q0 + 1) / questions.length) * 100) : 0;

  return (
    <div className="bg-primary min-h-screen">
      <section className="relative pt-40 md:pt-48 pb-20 px-6 w-full z-10">
        <div className="max-w-3xl mx-auto">
          {showProgress && (
            <div className="mb-14 space-y-2">
              <div className="flex items-center justify-between text-silver/60 text-[11px] font-mono tracking-[0.3em] uppercase font-bold">
                <span>Question {step - STEP_Q0 + 1} of {questions.length}</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C9A84C] transition-all duration-500 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          )}

          {step === STEP_INTRO && (
            <div className="space-y-10">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">{kicker}</p>
              <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight leading-[1.05]">
                {titleLine1}
                {titleLine2 && (
                  <>
                    <br />
                    <span className="font-serif italic text-[#C9A84C]">{titleLine2}</span>
                  </>
                )}
              </h1>
              <p className="text-silver/75 text-lg md:text-xl font-light leading-relaxed max-w-2xl">{subtitle}</p>
              <button
                type="button"
                onClick={() => { posthog.capture('diagnostic_started', { diagnostic_type: diagnosticType }); setStep(STEP_CONTACT); window.scrollTo(0, 0); }}
                className="bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] font-bold px-10 py-4 rounded-lg tracking-[0.15em] uppercase text-sm transition-all cursor-pointer"
              >
                {beginLabel}
              </button>
            </div>
          )}

          {step === STEP_CONTACT && (
            <div className="space-y-10 max-w-xl">
              <div className="space-y-3">
                <h2 className="font-display font-bold text-3xl text-white tracking-tight">The setup.</h2>
                <p className="text-silver/60 font-light">Your report will be personalised — and reviewed by Brad before it's sent.</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Full name" name="name" value={contact.name} onChange={onContactChange} required />
                  <Field label="Organisation" name="organisation" value={contact.organisation} onChange={onContactChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Role" name="role" value={contact.role} onChange={onContactChange} />
                  <Field label="Email" name="email" type="email" value={contact.email} onChange={onContactChange} required />
                </div>
                <Field label="Phone (optional)" name="phone" value={contact.phone} onChange={onContactChange} />

                <label className="flex items-start gap-3 cursor-pointer group pt-2">
                  <input
                    type="checkbox"
                    checked={consentToContact}
                    onChange={(e) => setConsentToContact(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 accent-[#C9A84C] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-silver/75 font-light text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                    I consent to BW Advisory Solutions collecting and using the personal information in this form to prepare my diagnostic report, in line with the{' '}
                    <a href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</a> and the <em>Privacy Act 1988</em> (Cth). <span className="text-[#C9A84C]">*</span>
                  </span>
                </label>
              </div>
              <div className="flex items-center gap-6">
                <button type="button" onClick={prev} className="text-silver/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer">Back</button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!contactValid}
                  className="bg-[#C9A84C] hover:bg-[#E0BC60] disabled:opacity-40 disabled:cursor-not-allowed text-[#0F172A] font-bold px-10 py-4 rounded-lg tracking-[0.15em] uppercase text-sm transition-all cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step >= STEP_Q0 && step <= STEP_QEND && (
            <QuestionScreen
              question={questions[step - STEP_Q0]}
              value={answers[step - STEP_Q0]}
              onChange={(v) => setAnswer(step - STEP_Q0, v)}
              onNext={next}
              onPrev={prev}
              isLast={step === STEP_QEND}
              valid={currentQuestionValid(step - STEP_Q0)}
            />
          )}

          {step === STEP_SUBMITTING && (
            <div className="text-center space-y-8 py-16">
              <div className="w-14 h-14 border-2 border-[#C9A84C]/25 border-t-[#C9A84C] rounded-full animate-spin mx-auto" />
              <p className="text-white font-mono text-sm tracking-[0.2em] uppercase">Sending your responses through now</p>
            </div>
          )}

          {step === STEP_DONE && (
            <div className="space-y-10 py-16">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 border border-[#C9A84C] rounded-full flex items-center justify-center text-[#C9A84C] mx-auto">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h2 className="font-display font-bold text-3xl text-white">Assessment received.</h2>
                <p className="text-silver/70 font-light max-w-md mx-auto">
                  Brad Warburton will review your responses personally and send your diagnostic report within 24 hours.
                </p>
              </div>

              <div className="border-t border-white/10 pt-10 space-y-6">
                <p className="text-silver/50 font-mono text-xs tracking-[0.3em] uppercase font-bold text-center">Where to from here.</p>

                <div className="text-center">
                  <p className="text-silver/70 font-light text-base leading-relaxed max-w-lg mx-auto mb-5">
                    If what's in this assessment is worth a conversation, book a discovery call. Thirty minutes, no cost, no obligation — we work out whether an engagement makes sense.
                  </p>
                  <a
                    href="/consultation"
                    className="inline-flex items-center gap-3 bg-[#C9A84C] px-10 py-4 rounded-lg text-[#0F172A] font-bold text-sm tracking-[0.15em] uppercase hover:bg-[#E0BC60] transition-all duration-300 shadow-[0_8px_24px_rgba(201,168,76,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/60"
                  >
                    Book a discovery call
                  </a>
                </div>

                {import.meta.env.VITE_PURCHASE_SURFACE_ENABLED === 'true' && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4">
                    <p className="text-silver/65 font-light text-sm leading-relaxed">
                      Separately: if the AI and automation side of your operation is where the pressure is, the AI Snapshot Report ($497, GST inclusive) is a different instrument — an automated report that identifies your top workflow opportunities with named tools, verified pricing, and a setup plan for each. It isn't a substitute for the assessment above. It answers a narrower question, faster.
                    </p>
                    <a
                      href="/pricing#snapshot"
                      className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50 rounded"
                    >
                      See the Snapshot Report
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}

                <div className="text-center pt-4">
                  <a href="/" className="inline-block border border-white/15 px-10 py-4 rounded-lg text-xs font-bold tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[#0F172A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30">
                    Return to homepage
                  </a>
                </div>
              </div>
            </div>
          )}

          {step === STEP_ERROR && (
            <div className="text-center space-y-6 py-16">
              <p className="text-white font-display text-2xl font-bold">Something went wrong.</p>
              <p className="text-silver/60 font-light">Please try again, or email brad@bwadvisorysolutions.com.au directly.</p>
              <button
                type="button"
                onClick={() => setStep(STEP_QEND)}
                className="border border-white/15 px-8 py-3 rounded-lg text-xs font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-[#0F172A] transition-all cursor-pointer"
              >
                Back to assessment
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Field = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div className="space-y-2">
    <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-silver/50">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-transparent border-b border-white/15 py-3 text-white text-lg font-light focus:border-[#C9A84C] focus:outline-none transition-all"
    />
  </div>
);

const QuestionScreen = ({ question, value, onChange, onNext, onPrev, isLast, valid }) => (
  <div className="space-y-10">
    <div className="space-y-4">
      <p className="text-[#C9A84C] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">{question.label}</p>
      <h2 className="font-display text-3xl md:text-4xl text-white font-semibold leading-[1.2] tracking-tight">{question.q}</h2>
      {question.subtitle && <p className="text-silver/50 font-light text-sm">{question.subtitle}</p>}
    </div>

    <div className="py-4">
      {question.type === 'text' && (
        <textarea
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder ?? ''}
          className="w-full bg-transparent border-b border-white/15 py-4 text-white text-xl font-light focus:border-[#C9A84C] focus:outline-none transition-all resize-none min-h-[140px]"
        />
      )}

      {question.type === 'scale' && (
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-mono tracking-widest text-silver/40 uppercase">
            <span>{question.low}</span>
            <span>{question.high}</span>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange(v)}
                className={`border py-6 rounded-xl font-bold text-xl transition-all cursor-pointer ${
                  value === v ? 'bg-[#C9A84C] text-[#0F172A] border-[#C9A84C]' : 'border-white/15 text-white hover:border-[#C9A84C]/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {question.type === 'select' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`text-left border rounded-xl p-5 transition-all cursor-pointer ${
                value === opt ? 'bg-[#C9A84C]/10 border-[#C9A84C] text-white' : 'border-white/15 text-silver/85 hover:border-[#C9A84C]/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === 'multiselect' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {question.options.map((opt) => {
            const selected = Array.isArray(value) && value.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const current = Array.isArray(value) ? value : [];
                  if (selected) {
                    onChange(current.filter((v) => v !== opt));
                  } else if (question.max && current.length >= question.max) {
                    onChange([...current.slice(1), opt]);
                  } else {
                    onChange([...current, opt]);
                  }
                }}
                className={`text-left border rounded-xl p-5 transition-all cursor-pointer ${
                  selected ? 'bg-[#C9A84C]/10 border-[#C9A84C] text-white' : 'border-white/15 text-silver/85 hover:border-[#C9A84C]/40'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>

    <div className="flex items-center gap-6 pt-6 border-t border-white/10">
      <button type="button" onClick={onPrev} className="text-silver/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer">Previous</button>
      <button
        type="button"
        onClick={onNext}
        disabled={!valid}
        className="bg-[#C9A84C] hover:bg-[#E0BC60] disabled:opacity-40 disabled:cursor-not-allowed text-[#0F172A] font-bold px-10 py-4 rounded-lg tracking-[0.15em] uppercase text-xs transition-all cursor-pointer"
      >
        {isLast ? 'Complete' : 'Next'}
      </button>
    </div>
  </div>
);

export default ReviewedDiagnosticFlow;
