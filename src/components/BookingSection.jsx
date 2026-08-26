import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import posthog from 'posthog-js';

const WHAT_HAPPENS = [
  { n: '01', text: "You pick a time. Confirmation lands immediately with a video link." },
  { n: '02', text: "We talk for thirty minutes. I'll have read what you sent." },
  { n: '03', text: "If I can help, I'll say how. If I can't, I'll say that instead." },
];

const FETCH_WINDOW_DAYS = 21;
const DAYS_PER_PAGE = 3;
const SLOTS_PER_DAY = 2;

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());

const getTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
};

const getTimeZoneLabel = (tz) => {
  try {
    return (
      new Intl.DateTimeFormat('en-AU', { timeZoneName: 'long', timeZone: tz })
        .formatToParts(new Date())
        .find((p) => p.type === 'timeZoneName')?.value || tz
    );
  } catch {
    return tz;
  }
};

const formatSlot = (iso, tz) => {
  const d = new Date(iso);
  const dayLabel = new Intl.DateTimeFormat('en-AU', { weekday: 'short', day: 'numeric', timeZone: tz }).format(d);
  const timeLabel = new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz }).format(d);
  return { dayLabel, timeLabel };
};

const fieldLabelClass = 'block text-[rgba(240,244,248,0.65)] font-mono text-[9px] tracking-[0.18em] uppercase font-bold mb-1.5';
const fieldClass =
  'w-full bg-white/5 border border-white/15 focus:border-[#C9A84C]/70 focus:bg-white/10 rounded-lg px-3.5 py-3 text-white placeholder-silver/35 font-light text-sm outline-none transition-colors';

const BookingSection = ({ variant = 'section' }) => {
  const isPage = variant === 'page';
  const tz = useMemo(getTimeZone, []);
  const tzLabel = useMemo(() => getTimeZoneLabel(tz), [tz]);

  const [slotsByDay, setSlotsByDay] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [dayOffset, setDayOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [form, setForm] = useState({ name: '', organisation: '', email: '', notes: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const start = new Date();
    const end = new Date(Date.now() + FETCH_WINDOW_DAYS * 24 * 3600 * 1000);
    const params = new URLSearchParams({ start: start.toISOString(), end: end.toISOString(), timeZone: tz });
    fetch(`/api/booking/slots?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((json) => setSlotsByDay(json.data || {}))
      .catch(() => {
        setLoadError(true);
        setSlotsByDay({});
      });
  }, [tz]);

  const dayKeys = useMemo(() => (slotsByDay ? Object.keys(slotsByDay).sort() : []), [slotsByDay]);
  const visibleKeys = dayKeys.slice(dayOffset, dayOffset + DAYS_PER_PAGE);
  const hasMore = dayOffset + DAYS_PER_PAGE < dayKeys.length;
  const hasEarlier = dayOffset > 0;

  const onMoreTimes = () => {
    setDayOffset((o) => o + DAYS_PER_PAGE);
    posthog.capture('booking_more_times_clicked');
  };

  const onEarlierTimes = () => {
    setDayOffset((o) => Math.max(0, o - DAYS_PER_PAGE));
    posthog.capture('booking_earlier_times_clicked');
  };

  const selectSlot = (iso) => {
    const { dayLabel, timeLabel } = formatSlot(iso, tz);
    setSelectedSlot({ iso, dayLabel, timeLabel });
    posthog.capture('booking_slot_selected', { day: dayLabel, time: timeLabel });
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canSubmit = !!selectedSlot && form.name.trim() !== '' && isValidEmail(form.email);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/booking/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: selectedSlot.iso,
          name: form.name.trim(),
          organisation: form.organisation.trim(),
          email: form.email.trim(),
          notes: form.notes.trim(),
          timeZone: tz,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      posthog.identify(form.email.trim(), { name: form.name.trim(), organisation: form.organisation.trim() });
      posthog.capture('booking_confirmed', { day: selectedSlot.dayLabel, time: selectedSlot.timeLabel });
      setStatus('success');
    } catch {
      posthog.capture('booking_confirm_failed');
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* ── LEFT: what happens ── */}
      <div className="space-y-8">
        <div className="space-y-4">
          <p className={isPage ? 'text-[#C9A84C] font-mono tracking-[0.3em] uppercase text-xs font-bold' : 'text-accent font-mono tracking-[0.3em] uppercase text-xs font-bold'}>
            {isPage ? 'Book a Consultation' : "Let's Talk"}
          </p>
          {isPage ? (
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">Thirty minutes. No pitch.</h1>
          ) : (
            <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white tracking-tight">The Gap Closes with Conversation</h2>
          )}
        </div>
        <p className="text-xl text-silver/80 font-light leading-relaxed">
          {isPage
            ? "I'll understand your challenge. You'll understand my approach. No proposal until we've talked."
            : "Thirty minutes is enough. I'll understand your challenge. You'll understand my approach. No proposal until we've talked."}
        </p>

        <div className="space-y-6 pt-8 border-t border-accent/20">
          {isPage && (
            <p className="font-mono text-[10px] font-bold tracking-[0.24em] uppercase text-[rgba(201,168,76,0.85)]">What happens</p>
          )}
          {WHAT_HAPPENS.map((item) => (
            <div key={item.n} className="flex items-start gap-4">
              <span className="font-mono text-[11px] font-bold text-[rgba(27,110,194,0.9)] flex-shrink-0 mt-0.5">{item.n}</span>
              <p className="text-silver/85 font-light text-base leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {isPage ? (
          <div className="space-y-2 pt-2">
            <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">Direct</p>
            <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-silver/80 hover:text-accent transition-colors font-light text-lg">brad@bwadvisorysolutions.com.au</a>
          </div>
        ) : (
          <>
            <p className="text-base text-silver/55 font-light leading-relaxed">
              Working outside these sectors? The fundamentals apply everywhere —{' '}
              <a href="mailto:brad@bwadvisorysolutions.com.au" className="text-silver/70 hover:text-accent underline decoration-silver/30 hover:decoration-accent/60 underline-offset-4 transition-colors duration-300">get in touch</a>.
            </p>

            <div className="space-y-6 pt-2">
              {[
                { label: 'Email', href: 'mailto:brad@bwadvisorysolutions.com.au', text: 'brad@bwadvisorysolutions.com.au' },
                { label: 'Phone', href: 'tel:+61407779474', text: '+61 407 779 474' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/bradwarburton', text: 'linkedin.com/in/bradwarburton', external: true },
              ].map(({ label, href, text, external }) => (
                <div key={label} className="space-y-2">
                  <p className="text-accent/70 font-mono text-xs tracking-widest uppercase font-bold">{label}</p>
                  <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className="text-silver/80 hover:text-accent transition-colors font-light text-lg">{text}</a>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── RIGHT: booking card ── */}
      <div className="relative">
        <div className="relative bg-[#101B2E] border border-white/15 rounded-[22px] p-8 md:p-10 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          {status === 'success' ? (
            <div className="text-center space-y-5 py-6">
              <p className="text-[#C9A84C] font-mono text-xs tracking-[0.3em] uppercase font-bold">Booked</p>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white">
                {selectedSlot.dayLabel}, {selectedSlot.timeLabel}
              </h3>
              <p className="text-silver/80 font-light text-base leading-relaxed">
                Check your email for the confirmation and video link. I'll have read what you sent before we talk.
              </p>
            </div>
          ) : (
          <>
          <div className="space-y-3">
            <p className="text-[#1B6EC2] font-mono text-[10px] tracking-[0.3em] uppercase font-bold">Pick a Time</p>
            <h3 className="font-display font-bold text-3xl text-white leading-[1.1]">Thirty minutes. No pitch.</h3>
          </div>

          {slotsByDay === null ? (
            <p className="text-silver/50 font-light text-sm py-6 text-center">Loading available times…</p>
          ) : loadError || dayKeys.length === 0 ? (
            <div className="space-y-4 py-4 text-center">
              <p className="text-silver/70 font-light text-sm leading-relaxed">
                Live times aren't loading right now. Email me directly and I'll find a slot that works.
              </p>
              <a href="mailto:brad@bwadvisorysolutions.com.au" className="inline-flex text-[#C9A84C] text-sm font-semibold hover:underline">
                brad@bwadvisorysolutions.com.au
              </a>
            </div>
          ) : (
            <>
              <div className="space-y-2.5">
                <p className="text-[rgba(240,244,248,0.55)] font-mono text-[9px] tracking-[0.2em] uppercase font-bold">Next available</p>
                <div className="grid grid-cols-3 gap-[10px]">
                  {visibleKeys.map((dateKey) => {
                    const daySlots = (slotsByDay[dateKey] || []).slice(0, SLOTS_PER_DAY);
                    const { dayLabel } = daySlots[0] ? formatSlot(daySlots[0].start, tz) : { dayLabel: dateKey };
                    return (
                      <div key={dateKey} className="flex flex-col gap-2">
                        <p className="font-mono text-[10px] font-bold text-[rgba(240,244,248,0.7)] text-center">{dayLabel}</p>
                        <div className="flex flex-col gap-2">
                          {daySlots.map((slot) => {
                            const { timeLabel } = formatSlot(slot.start, tz);
                            const isSelected = selectedSlot?.iso === slot.start;
                            return (
                              <button
                                key={slot.start}
                                type="button"
                                onClick={() => selectSlot(slot.start)}
                                className={`min-h-[44px] px-1.5 py-3 rounded-lg border-2 text-sm transition-colors duration-150 cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0F172A] font-bold shadow-[0_4px_16px_rgba(201,168,76,0.35)]'
                                    : 'bg-white/[0.14] border-white/30 text-white font-medium hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#0F172A] hover:font-bold'
                                }`}
                              >
                                {timeLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[rgba(240,244,248,0.55)] font-light text-xs">
                  Times shown in your local time — {tzLabel}
                </p>
                {(hasEarlier || hasMore) && (
                  <div className="flex items-center justify-between gap-4">
                    {hasEarlier ? (
                      <button type="button" onClick={onEarlierTimes} className="text-[#C9A84C] text-xs font-semibold hover:underline whitespace-nowrap cursor-pointer">
                        ← Earlier times
                      </button>
                    ) : <span />}
                    {hasMore && (
                      <button type="button" onClick={onMoreTimes} className="text-[#C9A84C] text-xs font-semibold hover:underline whitespace-nowrap cursor-pointer">
                        More times →
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="h-px bg-white/10" />

              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="bk-name" className={fieldLabelClass}>Name</label>
                    <input id="bk-name" name="name" type="text" required value={form.name} onChange={onFormChange} className={fieldClass} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="bk-organisation" className={fieldLabelClass}>Organisation</label>
                    <input id="bk-organisation" name="organisation" type="text" value={form.organisation} onChange={onFormChange} className={fieldClass} autoComplete="organization" />
                  </div>
                </div>
                <div>
                  <label htmlFor="bk-email" className={fieldLabelClass}>Email</label>
                  <input id="bk-email" name="email" type="email" required value={form.email} onChange={onFormChange} className={fieldClass} autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="bk-notes" className={fieldLabelClass}>
                    What's not working? <span className="text-[rgba(240,244,248,0.45)] font-normal lowercase tracking-normal">— one line is plenty</span>
                  </label>
                  <textarea id="bk-notes" name="notes" rows={2} value={form.notes} onChange={onFormChange} className={`${fieldClass} resize-y`} />
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-sm text-[#F5A98C] font-light leading-relaxed">
                    Something went wrong — please email{' '}
                    <a href="mailto:brad@bwadvisorysolutions.com.au" className="underline decoration-[#F5A98C]/40 underline-offset-2">brad@bwadvisorysolutions.com.au</a>{' '}directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!canSubmit || status === 'submitting'}
                  className={`w-full px-10 py-[22px] rounded-lg font-bold text-sm tracking-[0.15em] uppercase transition-all duration-200 ${
                    canSubmit && status !== 'submitting'
                      ? 'bg-[#C9A84C] hover:bg-[#E0BC60] text-[#0F172A] shadow-[0_8px_24px_rgba(201,168,76,0.3)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)] cursor-pointer'
                      : 'bg-white/10 text-silver/40 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {status === 'submitting'
                    ? 'Confirming…'
                    : selectedSlot
                      ? `Confirm ${selectedSlot.dayLabel}, ${selectedSlot.timeLabel}`
                      : 'Pick a time above'}
                </button>
                <p className="text-center text-[rgba(240,244,248,0.6)] font-light text-[13px]">
                  You'll be talking to me, not a salesperson. Cancel or move it any time.
                </p>
              </form>

              <div className="h-px bg-white/10" />

              <div className="space-y-2 text-center">
                <p className="text-silver/70 font-light text-sm leading-relaxed">
                  Not ready to talk? Take an eight-minute diagnostic instead and I'll send you a written assessment.
                </p>
                <Link to="/diagnostics" className="inline-flex items-center gap-1.5 text-[#C9A84C] text-sm font-semibold hover:underline">
                  See the diagnostics →
                </Link>
              </div>

              <p className="text-center text-[rgba(240,244,248,0.45)] font-light text-[11px] leading-relaxed">
                By booking, you agree to be contacted about this enquiry. See the{' '}
                <Link to="/privacy" className="underline decoration-white/20 hover:decoration-white/50">Privacy Policy</Link>.
              </p>
            </>
          )}
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
