import ReviewedDiagnosticFlow from '../components/ReviewedDiagnosticFlow';

// Real question content ported from the original build
// (C:\Users\bradl\OneDrive\AI Apps\BW-Advisory-Hub\investigations-diagnostic.html) — unchanged.
const QUESTIONS = [
  { id: 'q1', type: 'text', label: 'Incident Picture', q: 'How does your organisation currently capture and record incidents — theft, fraud, safety, and policy breaches? What systems or processes are in place?', placeholder: 'Describe what is currently in place, even if basic or informal…' },
  { id: 'q2', type: 'scale', label: 'Data Connectivity', q: 'How effectively does your organisation connect incident data across locations, time periods, and staff — to identify patterns rather than isolated events?', low: 'Each incident is standalone', high: 'Patterns identified consistently' },
  { id: 'q3', type: 'select', label: 'Intelligence Posture', q: 'Which best describes how your organisation uses incident data?', options: ['We proactively identify threats before they escalate', 'We identify patterns after multiple incidents have occurred', 'We respond to incidents as they are reported to us', 'We have no structured approach to incident intelligence'] },
  { id: 'q4', type: 'scale', label: 'Investigation Process', q: "When a serious incident requires formal investigation, how structured and documented is your organisation's response?", low: 'No real process exists', high: 'Structured and consistently applied' },
  { id: 'q5', type: 'multiselect', label: 'Process Gaps', q: 'Where does your investigation process most often break down?', subtitle: 'Select up to two areas.', options: ['No documented procedure to follow', 'Evidence not properly preserved', 'Interviews handled inconsistently', 'Outcomes not enforced', 'No feedback loop to prevent recurrence', 'Incidents not escalated appropriately'], max: 2 },
  { id: 'q6', type: 'scale', label: 'Case Quality', q: 'If your investigations resulted in a police referral or a disciplinary proceeding, how confident are you that the evidence and documentation would meet the required standard?', low: 'Not confident at all', high: 'Fully confident' },
  { id: 'q7', type: 'select', label: 'Internal Threat', q: 'How does your organisation currently handle suspected internal misconduct — staff theft, fraud, or policy breaches?', options: ['Formal investigation process with documented procedures', 'Informal inquiry, handled case by case', 'Referred directly to HR with no investigation process', 'Rarely investigated — usually managed informally or ignored'] },
  { id: 'q8', type: 'scale', label: 'Outcome Enforcement', q: 'When investigations conclude, how consistently are outcomes enforced — whether disciplinary action, banning, police referral, or process improvement?', low: 'Outcomes rarely enforced', high: 'Outcomes consistently enforced' },
  { id: 'q9', type: 'text', label: 'Recent Investigation', q: 'Describe a recent investigation or incident that was handled poorly, or where the outcome fell short of what was warranted. What went wrong?', placeholder: 'Be as specific as you can — this shapes your diagnostic report…' },
  { id: 'q10', type: 'text', label: '12-Month Goal', q: 'What would a materially better investigations capability look like for your organisation in 12 months?', placeholder: 'Describe the investigations state you are working toward…' },
];

const InvestigationsDiagnostic = () => (
  <ReviewedDiagnosticFlow
    diagnosticType="INVESTIGATIONS"
    kicker="Investigations Capability Diagnostic"
    titleLine1="Build the capability to"
    titleLine2="investigate, and prove it."
    subtitle="Assesses the integrity of your investigation lifecycle — from signal collection to defensible documentation and outcome. Grounded in the PROVED protocol, built on law enforcement evidentiary standards."
    beginLabel="Begin Assessment"
    questions={QUESTIONS}
  />
);

export default InvestigationsDiagnostic;
