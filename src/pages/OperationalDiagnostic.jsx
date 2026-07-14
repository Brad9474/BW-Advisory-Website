import ReviewedDiagnosticFlow from '../components/ReviewedDiagnosticFlow';

// Real question content ported from the original build
// (C:\Users\bradl\OneDrive\AI Apps\BW-Advisory-Hub\operational-diagnostic.html) — unchanged.
const QUESTIONS = [
  { id: 'q1', type: 'text', label: 'Operational Priorities', q: 'What are the two or three most significant operational challenges your organisation is facing right now?', placeholder: 'Describe your most pressing operational issues…' },
  { id: 'q2', type: 'scale', label: 'Workflow Efficiency', q: 'How effectively does your current workflow turn inputs into outputs without significant delay, rework, or waste?', low: 'Significant friction', high: 'Highly efficient' },
  { id: 'q3', type: 'multiselect', label: 'Breakdown Location', q: 'Where is the most visible operational breakdown?', subtitle: 'Select up to two areas.', options: ['Process & workflow', 'People & capability', 'Technology & tools', 'Communication & coordination', 'Data & reporting', 'Resource allocation'], max: 2 },
  { id: 'q4', type: 'scale', label: 'Execution Consistency', q: 'How consistently does your team execute tasks to the required standard without close supervision?', low: 'Significant variation', high: 'Consistently reliable' },
  { id: 'q5', type: 'text', label: 'Failure Analysis', q: 'Describe a recent operational failure or near-miss. What caused it and what was the response?', placeholder: 'What happened and how was it handled…' },
  { id: 'q6', type: 'select', label: 'Performance Measurement', q: 'Which best describes how operational performance is measured in your organisation?', options: ['We measure well and act on the results', 'We measure but rarely act consistently', 'Our measures are incomplete or unreliable', 'No formal measurement exists'] },
  { id: 'q7', type: 'scale', label: 'Role Clarity', q: 'How clearly do your operational teams understand what success looks like for their specific role?', low: 'Limited clarity', high: 'Fully understood' },
  { id: 'q8', type: 'text', label: 'Change Required', q: 'What would need to change at the operational level for your organisation to perform measurably better within six months?', placeholder: 'Describe the changes that would move the dial…' },
  { id: 'q9', type: 'multiselect', label: 'Change Barriers', q: 'What is preventing that change from happening?', subtitle: 'Select up to two.', options: ['Unclear accountability', 'Limited resources', 'Skills or capability gaps', 'Technology constraints', 'Cultural resistance', 'Leadership bottleneck'], max: 2 },
  { id: 'q10', type: 'text', label: 'Success Definition', q: 'What does strong operational performance look like for your organisation in 12 months?', placeholder: 'Describe the operational state you are working toward…' },
];

const OperationalDiagnostic = () => (
  <ReviewedDiagnosticFlow
    diagnosticType="OPERATIONAL"
    kicker="Operational Diagnostic"
    titleLine1="Audit the machine."
    titleLine2="Uncover the friction."
    subtitle="Surfaces the functional friction between tactical decisions and frontline capability across processes, systems, and accountability."
    beginLabel="Begin Audit"
    questions={QUESTIONS}
  />
);

export default OperationalDiagnostic;
