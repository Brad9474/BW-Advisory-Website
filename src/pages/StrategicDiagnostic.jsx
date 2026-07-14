import ReviewedDiagnosticFlow from '../components/ReviewedDiagnosticFlow';

// Real question content ported from the original build
// (C:\Users\bradl\OneDrive\AI Apps\BW-Advisory-Hub\diagnostic.html) — unchanged.
const QUESTIONS = [
  { id: 'q1', type: 'text', label: 'Strategic Direction', q: "What is your organisation's most important strategic objective for the next 12 months?", placeholder: 'Describe your primary goal…' },
  { id: 'q2', type: 'scale', label: 'Execution Alignment', q: 'How consistently does your strategy translate into changed behaviour at the operational level?', low: 'Rarely translates', high: 'Fully embedded' },
  { id: 'q3', type: 'multiselect', label: 'Gap Identification', q: 'Where is the most significant gap between where you need to be and where you currently are?', subtitle: 'Select up to two areas.', options: ['People & capability', 'Systems & process', 'Leadership alignment', 'Culture & behaviours', 'Technology & tools', 'Strategic clarity'], max: 2 },
  { id: 'q4', type: 'text', label: 'Core Constraint', q: 'What is the single most significant constraint preventing progress toward your strategic objective?', placeholder: 'Describe the primary barrier…' },
  { id: 'q5', type: 'scale', label: 'Decision Clarity', q: 'How clearly defined are decision-making authorities across your organisation?', low: 'Unclear or contested', high: 'Clearly defined' },
  { id: 'q6', type: 'scale', label: 'Operational Visibility', q: 'How accurately does your leadership team understand frontline performance in real time?', low: 'Very limited visibility', high: 'Full visibility' },
  { id: 'q7', type: 'text', label: 'Prior Attempts', q: 'What has previously been tried to address these challenges, and what was the outcome?', placeholder: 'Describe past initiatives and what happened…' },
  { id: 'q8', type: 'select', label: 'Capability Gap', q: 'In which area of your organisation is the capability gap most pronounced?', options: ['Strategic leadership', 'Middle management', 'Frontline execution', 'Technical & specialist skills', 'Change management'] },
  { id: 'q9', type: 'scale', label: 'Systems Fit', q: 'How well do your current systems and processes support your operational objectives?', low: 'Significant friction', high: 'Fully aligned' },
  { id: 'q10', type: 'text', label: 'Success Definition', q: "What does success look like in 12 months if this challenge is resolved?", placeholder: "Describe the outcome you're working toward…" },
];

const StrategicDiagnostic = () => (
  <ReviewedDiagnosticFlow
    diagnosticType="STRATEGIC"
    kicker="Strategic Diagnostic"
    titleLine1="Close the gap between"
    titleLine2="intent and execution."
    subtitle="Maps the systemic gap between leadership intent and organisational delivery. Focuses on alignment, execution, and risk posture."
    beginLabel="Begin Assessment"
    questions={QUESTIONS}
  />
);

export default StrategicDiagnostic;
