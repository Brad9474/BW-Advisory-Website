import ReviewedDiagnosticFlow from '../components/ReviewedDiagnosticFlow';

// Real question content ported from the original build
// (C:\Users\bradl\OneDrive\AI Apps\BW-Advisory-Hub\loss-intelligence-diagnostic.html) — unchanged.
const QUESTIONS = [
  { id: 'q1', type: 'text', label: 'Loss Landscape', q: 'How does your organisation currently approach loss intelligence — what structures, processes, or reporting exist to manage it?', placeholder: 'Describe what is currently in place, even if informal…' },
  { id: 'q2', type: 'scale', label: 'Leadership Visibility', q: 'How clearly does your leadership team understand the true cost of loss — shrink, fraud, safety incidents, and supply chain losses — across your operation?', low: 'Very limited visibility', high: 'Clear and complete picture' },
  { id: 'q3', type: 'select', label: 'Accountability Structure', q: 'Who in your organisation is formally accountable for managing loss intelligence?', options: ['A dedicated loss prevention function', 'Operations or store management', 'Shared across several teams with no clear lead', 'No formal accountability exists', 'Not sure'] },
  { id: 'q4', type: 'scale', label: 'Loss Reporting', q: 'How confident are you that the reporting reaching your leadership team is complete, accurate, and timely enough to act on?', low: 'Incomplete or unreliable', high: 'Complete and actionable' },
  { id: 'q5', type: 'multiselect', label: 'Governance Gaps', q: 'Which of the following does your loss function currently lack?', subtitle: 'Select up to three.', options: ['A documented loss framework', 'Clear escalation and response levels', 'A live risk register', 'Regular reporting to senior leadership', 'Defined roles and accountability'], max: 3 },
  { id: 'q6', type: 'select', label: 'Loss Measurement', q: 'Which best describes how your organisation measures operational loss?', options: ['We measure accurately and act on the results', 'We measure but reporting is incomplete or inconsistent', 'We rely on periodic stocktakes with limited real-time visibility', 'No formal loss measurement exists'] },
  { id: 'q7', type: 'scale', label: 'Incident Response', q: 'When a significant incident occurs — theft, fraud, or a workplace safety event — how consistently does your organisation respond in a structured, documented way?', low: 'Ad hoc and inconsistent', high: 'Structured and consistent' },
  { id: 'q8', type: 'text', label: 'Biggest Exposure', q: 'What is the single loss intelligence area where you feel most exposed right now, and why?', placeholder: 'Be as specific as you can…' },
  { id: 'q9', type: 'multiselect', label: 'Change Barriers', q: 'What is preventing a stronger loss capability from being built in your organisation?', subtitle: 'Select up to two.', options: ['No clear ownership', 'Limited budget or resources', 'Lack of expertise', 'No structured framework to build from', 'Leadership not prioritising it', 'Reactive culture'], max: 2 },
  { id: 'q10', type: 'text', label: '12-Month Goal', q: 'What would a materially stronger loss intelligence capability look like for your organisation in 12 months?', placeholder: 'Describe the state you are working toward…' },
];

const LossIntelligenceDiagnostic = () => (
  <ReviewedDiagnosticFlow
    diagnosticType="LOSS_INTELLIGENCE"
    kicker="Loss Intelligence Diagnostic"
    titleLine1="Measure the loss."
    titleLine2="Define the strategy."
    subtitle="Assesses your capability to transform incident data into actionable loss intelligence. For leaders seeking to disrupt systemic retail crime and minimise exposure."
    beginLabel="Begin Assessment"
    questions={QUESTIONS}
  />
);

export default LossIntelligenceDiagnostic;
